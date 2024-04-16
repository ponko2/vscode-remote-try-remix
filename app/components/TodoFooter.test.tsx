import { createRemixStub } from "@remix-run/testing";
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TodoFooter } from "~/components/TodoFooter";

describe("<TodoFooter/>", () => {
  // Temporary workaround for https://github.com/vitest-dev/vitest/issues/1430
  afterEach(() => {
    cleanup();
  });

  it("全てを表示", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    function Component() {
      return <TodoFooter completedTodosCount={1} todosCount={2} />;
    }

    const RemixStub = createRemixStub([
      {
        path: "/",
        Component,
      },
      {
        path: "/active",
        Component,
      },
      {
        path: "/completed",
        Component,
      },
      {
        path: "/todos/completed",
        action() {
          spy();
          return null;
        },
      },
    ]);

    render(<RemixStub initialEntries={["/active"]} />);

    const button = await screen.findByText("All");

    expect(button).not.toHaveClass("border-red-700");

    await user.click(button);

    expect(button).toHaveClass("border-red-700");
    expect(spy).not.toHaveBeenCalled();
  });

  it("未完了のものを表示", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    function Component() {
      return <TodoFooter completedTodosCount={1} todosCount={2} />;
    }

    const RemixStub = createRemixStub([
      {
        path: "/",
        Component,
      },
      {
        path: "/active",
        Component,
      },
      {
        path: "/completed",
        Component,
      },
      {
        path: "/todos/completed",
        action() {
          spy();
          return null;
        },
      },
    ]);

    render(<RemixStub />);

    const button = await screen.findByText("Active");

    expect(button).not.toHaveClass("border-red-700");

    await user.click(button);

    expect(button).toHaveClass("border-red-700");
    expect(spy).not.toHaveBeenCalled();
  });

  it("完了したものを表示", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    function Component() {
      return <TodoFooter completedTodosCount={1} todosCount={2} />;
    }

    const RemixStub = createRemixStub([
      {
        path: "/",
        Component,
      },
      {
        path: "/active",
        Component,
      },
      {
        path: "/completed",
        Component,
      },
      {
        path: "/todos/completed",
        action() {
          spy();
          return null;
        },
      },
    ]);

    render(<RemixStub />);

    const button = await screen.findByText("Completed");

    expect(button).not.toHaveClass("border-red-700");

    await user.click(button);

    expect(button).toHaveClass("border-red-700");
    expect(spy).not.toHaveBeenCalled();
  });

  it("完了したものを削除", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    function Component() {
      return <TodoFooter completedTodosCount={1} todosCount={2} />;
    }

    const RemixStub = createRemixStub([
      {
        path: "/",
        Component,
      },
      {
        path: "/active",
        Component,
      },
      {
        path: "/completed",
        Component,
      },
      {
        path: "/todos/completed",
        action() {
          spy();
          return null;
        },
      },
    ]);

    render(<RemixStub />);

    await user.click(await screen.findByText("Clear completed"));

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
