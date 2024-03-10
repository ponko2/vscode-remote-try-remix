import type { ActionFunctionArgs } from "@remix-run/node";
import { createRemixStub } from "@remix-run/testing";
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TodoHeader } from "~/components/TodoHeader";

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
        async action({ request }: ActionFunctionArgs) {
          spy(Object.fromEntries(await request.formData()));
          return null;
        },
        Component() {
          return <TodoHeader completedTodosCount={0} todosCount={0} />;
        },
      },
    ]);

    render(<RemixStub />);

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "foo");

    expect(input).toHaveValue("foo");

    await user.type(input, "{Enter}");

    expect(input).toHaveValue("");
    expect(spy).toHaveBeenCalledWith({
      _action: "create",
      title: "foo",
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("全てのTodoを切り替え", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    const RemixStub = createRemixStub([
      {
        path: "/",
        async action({ request }: ActionFunctionArgs) {
          spy(Object.fromEntries(await request.formData()));
          return null;
        },
        Component() {
          return <TodoHeader completedTodosCount={0} todosCount={1} />;
        },
      },
    ]);

    render(<RemixStub />);

    await user.click(screen.getByRole("checkbox"));

    expect(spy).toHaveBeenCalledWith({ _action: "toggleAll" });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
