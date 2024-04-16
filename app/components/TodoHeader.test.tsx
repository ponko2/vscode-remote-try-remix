import { parseWithZod } from "@conform-to/zod";
import { json, type ActionFunctionArgs } from "@remix-run/node";
import { createRemixStub } from "@remix-run/testing";
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TodoHeader } from "~/components/TodoHeader";
import { createTodoSchema } from "~/schemas/todo";

describe("<TodoHeader/>", () => {
  // Temporary workaround for https://github.com/vitest-dev/vitest/issues/1430
  afterEach(() => {
    cleanup();
  });

  it("Todoを追加", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    const RemixStub = createRemixStub([
      {
        path: "/",
        Component() {
          return <TodoHeader completedTodosCount={0} todosCount={0} />;
        },
      },
      {
        path: "/todos",
        async action({ request }: ActionFunctionArgs) {
          const formData = await request.formData();
          const submission = parseWithZod(formData, {
            schema: createTodoSchema,
          });
          if (submission.status !== "success") {
            return json(submission.reply());
          }
          spy(submission.value);
          return json(submission.reply({ resetForm: true }));
        },
      },
    ]);

    render(<RemixStub />);

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "foo");

    expect(input).toHaveValue("foo");

    await user.type(input, "{Enter}");

    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(spy).toHaveBeenCalledWith({ title: "foo" });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("全てのTodoを切り替え", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    const RemixStub = createRemixStub([
      {
        path: "/",
        Component() {
          return <TodoHeader completedTodosCount={0} todosCount={1} />;
        },
      },
      {
        path: "/todos/toggle",
        action() {
          spy();
          return null;
        },
      },
    ]);

    render(<RemixStub />);

    await user.click(screen.getByRole("checkbox"));

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
