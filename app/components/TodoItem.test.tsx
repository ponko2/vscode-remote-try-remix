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
        async action({ request }: ActionFunctionArgs) {
          spy(Object.fromEntries(await request.formData()));
          return null;
        },
        Component() {
          return (
            <TodoItem
              todo={{
                id: "01FYH5XVSNVSXTSGB8KB858REF",
                title: "foo",
                completed: false,
              }}
            />
          );
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
      _action: "update",
      id: "01FYH5XVSNVSXTSGB8KB858REF",
      title: "bar",
      completed: "false",
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Todoを修正後エンター", async () => {
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
          return (
            <TodoItem
              todo={{
                id: "01FYH5XVSNVSXTSGB8KB858REF",
                title: "foo",
                completed: false,
              }}
            />
          );
        },
      },
    ]);

    render(<RemixStub initialEntries={["/"]} />);

    await user.dblClick(screen.getByText("foo"));

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "{b}{a}{r}{Enter}");

    expect(spy).toHaveBeenCalledWith({
      _action: "update",
      id: "01FYH5XVSNVSXTSGB8KB858REF",
      title: "bar",
      completed: "false",
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Todoを空文字に修正して削除", async () => {
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
          return (
            <TodoItem
              todo={{
                id: "01FYH5XVSNVSXTSGB8KB858REF",
                title: "foo",
                completed: false,
              }}
            />
          );
        },
      },
    ]);

    render(<RemixStub initialEntries={["/"]} />);

    await user.dblClick(screen.getByText("foo"));

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "{Enter}");

    expect(spy).toHaveBeenCalledWith({
      _action: "update",
      id: "01FYH5XVSNVSXTSGB8KB858REF",
      title: "",
      completed: "false",
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Todoを削除ボタンで削除", async () => {
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
          return (
            <TodoItem
              todo={{
                id: "01G46BYCGQ1SGVGFMEXZ0DKZAY",
                title: "bar",
                completed: false,
              }}
            />
          );
        },
      },
    ]);

    render(<RemixStub initialEntries={["/"]} />);

    await user.click(screen.getByRole("button"));

    expect(spy).toHaveBeenCalledWith({
      _action: "delete",
      id: "01G46BYCGQ1SGVGFMEXZ0DKZAY",
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Todoを切り替え", async () => {
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
          return (
            <TodoItem
              todo={{
                id: "01G46BZM28F68BCY7EP016G1EZ",
                title: "baz",
                completed: false,
              }}
            />
          );
        },
      },
    ]);

    render(<RemixStub initialEntries={["/"]} />);

    await user.click(screen.getByRole("checkbox"));

    expect(spy).toHaveBeenCalledWith({
      _action: "update",
      id: "01G46BZM28F68BCY7EP016G1EZ",
      title: "baz",
      completed: "true",
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
