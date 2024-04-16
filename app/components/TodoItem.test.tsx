import type { ActionFunctionArgs } from "@remix-run/node";
import { createRemixStub } from "@remix-run/testing";
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TodoItem } from "~/components/TodoItem";

describe("<TodoItem/>", () => {
  // Temporary workaround for https://github.com/vitest-dev/vitest/issues/1430
  afterEach(() => {
    cleanup();
  });

  it("Todoを修正後フォーカスアウト", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    const RemixStub = createRemixStub([
      {
        path: "/",
        Component() {
          return (
            <TodoItem
              todo={{
                id: "cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
                title: "foo",
                completed: false,
              }}
            />
          );
        },
      },
      {
        path: "/todos/cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
        async action({ request }: ActionFunctionArgs) {
          spy(Object.fromEntries(await request.formData()));
          return null;
        },
      },
    ]);

    render(<RemixStub initialEntries={["/"]} />);

    await user.dblClick(screen.getByText("foo"));

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "bar");
    await user.click(document.body);

    expect(spy).toHaveBeenCalledWith({
      _method: "put",
      id: "cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
      title: "bar",
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Todoを修正後エンター", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    const RemixStub = createRemixStub([
      {
        path: "/",
        Component() {
          return (
            <TodoItem
              todo={{
                id: "cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
                title: "foo",
                completed: false,
              }}
            />
          );
        },
      },
      {
        path: "/todos/cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
        async action({ request }: ActionFunctionArgs) {
          spy(Object.fromEntries(await request.formData()));
          return null;
        },
      },
    ]);

    render(<RemixStub initialEntries={["/"]} />);

    await user.dblClick(screen.getByText("foo"));

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "{b}{a}{r}{Enter}");

    expect(spy).toHaveBeenCalledWith({
      _method: "put",
      id: "cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
      title: "bar",
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Todoを空文字に修正して削除", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    const RemixStub = createRemixStub([
      {
        path: "/",
        Component() {
          return (
            <TodoItem
              todo={{
                id: "cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
                title: "foo",
                completed: false,
              }}
            />
          );
        },
      },
      {
        path: "/todos/cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
        async action({ request }: ActionFunctionArgs) {
          spy(Object.fromEntries(await request.formData()));
          return null;
        },
      },
    ]);

    render(<RemixStub initialEntries={["/"]} />);

    await user.dblClick(screen.getByText("foo"));

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "{Enter}");

    expect(spy).toHaveBeenCalledWith({
      _method: "put",
      id: "cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
      title: "",
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Todoを削除ボタンで削除", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    const RemixStub = createRemixStub([
      {
        path: "/",
        Component() {
          return (
            <TodoItem
              todo={{
                id: "2c1e6aab-6d91-4414-bf80-3cef026284ab",
                title: "bar",
                completed: false,
              }}
            />
          );
        },
      },
      {
        path: "/todos/2c1e6aab-6d91-4414-bf80-3cef026284ab",
        async action({ request }: ActionFunctionArgs) {
          spy(Object.fromEntries(await request.formData()));
          return null;
        },
      },
    ]);

    render(<RemixStub initialEntries={["/"]} />);

    await user.click(screen.getByRole("button"));

    expect(spy).toHaveBeenCalledWith({
      _method: "delete",
      id: "2c1e6aab-6d91-4414-bf80-3cef026284ab",
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Todoを切り替え", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();

    const RemixStub = createRemixStub([
      {
        path: "/",
        Component() {
          return (
            <TodoItem
              todo={{
                id: "fb58ba5e-bf51-4e44-b79a-d3cc58ddfeb1",
                title: "baz",
                completed: false,
              }}
            />
          );
        },
      },
      {
        path: "/todos/fb58ba5e-bf51-4e44-b79a-d3cc58ddfeb1",
        async action({ request }: ActionFunctionArgs) {
          spy(Object.fromEntries(await request.formData()));
          return null;
        },
      },
    ]);

    render(<RemixStub initialEntries={["/"]} />);

    await user.click(screen.getByRole("checkbox"));

    expect(spy).toHaveBeenCalledWith({
      _method: "put",
      id: "fb58ba5e-bf51-4e44-b79a-d3cc58ddfeb1",
      title: "baz",
      completed: "on",
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
