import type { ActionFunctionArgs } from "@remix-run/node";
import { createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import TodoItem from "~/components/TodoItem";

const meta = {
  component: TodoItem,
} satisfies Meta<typeof TodoItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    todo: {
      id: "cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
      title: "Hello, World!!",
      completed: false,
    },
  },
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          path: "/",
          Component: Story,
        },
      ]);
      return (
        <ul>
          <RemixStub />
        </ul>
      );
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("checkbox")).not.toBeChecked();
    await expect(canvas.getByText("Hello, World!!")).toBeInTheDocument();
  },
} satisfies Story;

export const Completed = {
  ...Basic,
  args: {
    todo: {
      id: "cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
      title: "Hello, World!!",
      completed: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("checkbox")).toBeChecked();
    await expect(canvas.getByText("Hello, World!!")).toBeInTheDocument();
  },
} satisfies Story;

export const EditViaFocusOut = (() => {
  const spy = fn();
  return {
    args: {
      todo: {
        id: "cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
        title: "foo",
        completed: false,
      },
    },
    decorators: [
      (Story) => {
        const RemixStub = createRemixStub([
          {
            path: "/",
            Component: Story,
          },
          {
            path: "/todos/cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
            async action({ request }: ActionFunctionArgs) {
              spy(Object.fromEntries(await request.formData()));
              return null;
            },
          },
        ]);
        return (
          <ul>
            <RemixStub />
          </ul>
        );
      },
    ],
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      await userEvent.dblClick(canvas.getByText("foo"));
      const input = canvas.getByRole("textbox");
      await userEvent.clear(input);
      await userEvent.type(input, "bar");
      await userEvent.click(document.body);
      await expect(spy).toHaveBeenCalledTimes(1);
      await expect(spy).toHaveBeenCalledWith({
        _method: "put",
        id: "cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
        title: "bar",
      });
    },
  } satisfies Story;
})();

export const EditViaEnterKey = (() => {
  const spy = fn();
  return {
    args: {
      todo: {
        id: "cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
        title: "foo",
        completed: false,
      },
    },
    decorators: [
      (Story) => {
        const RemixStub = createRemixStub([
          {
            path: "/",
            Component: Story,
          },
          {
            path: "/todos/cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
            async action({ request }: ActionFunctionArgs) {
              spy(Object.fromEntries(await request.formData()));
              return null;
            },
          },
        ]);
        return (
          <ul>
            <RemixStub />
          </ul>
        );
      },
    ],
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      await userEvent.dblClick(canvas.getByText("foo"));
      const input = canvas.getByRole("textbox");
      await userEvent.clear(input);
      await userEvent.type(input, "{b}{a}{r}{enter}");
      await expect(spy).toHaveBeenCalledTimes(1);
      await expect(spy).toHaveBeenCalledWith({
        _method: "put",
        id: "cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
        title: "bar",
      });
    },
  } satisfies Story;
})();

export const DeleteViaEmptyEdit = (() => {
  const spy = fn();
  return {
    args: {
      todo: {
        id: "cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
        title: "foo",
        completed: false,
      },
    },
    decorators: [
      (Story) => {
        const RemixStub = createRemixStub([
          {
            path: "/",
            Component: Story,
          },
          {
            path: "/todos/cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
            async action({ request }: ActionFunctionArgs) {
              spy(Object.fromEntries(await request.formData()));
              return null;
            },
          },
        ]);
        return (
          <ul>
            <RemixStub />
          </ul>
        );
      },
    ],
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      await userEvent.dblClick(canvas.getByText("foo"));
      const input = canvas.getByRole("textbox");
      await userEvent.clear(input);
      await userEvent.type(input, "{enter}");
      await expect(spy).toHaveBeenCalledTimes(1);
      await expect(spy).toHaveBeenCalledWith({
        _method: "put",
        id: "cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
        title: "",
      });
    },
  } satisfies Story;
})();

export const DeleteViaDeleteButton = (() => {
  const spy = fn();
  return {
    args: {
      todo: {
        id: "2c1e6aab-6d91-4414-bf80-3cef026284ab",
        title: "bar",
        completed: false,
      },
    },
    decorators: [
      (Story) => {
        const RemixStub = createRemixStub([
          {
            path: "/",
            Component: Story,
          },
          {
            path: "/todos/2c1e6aab-6d91-4414-bf80-3cef026284ab",
            async action({ request }: ActionFunctionArgs) {
              spy(Object.fromEntries(await request.formData()));
              return null;
            },
          },
        ]);
        return (
          <ul>
            <RemixStub />
          </ul>
        );
      },
    ],
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      await userEvent.hover(canvas.getByRole("listitem"));
      await userEvent.click(canvas.getByRole("button", { hidden: true }));
      await expect(spy).toHaveBeenCalledTimes(1);
      await expect(spy).toHaveBeenCalledWith({
        _method: "delete",
        id: "2c1e6aab-6d91-4414-bf80-3cef026284ab",
      });
    },
  } satisfies Story;
})();

export const Toggle = (() => {
  const spy = fn();
  return {
    args: {
      todo: {
        id: "fb58ba5e-bf51-4e44-b79a-d3cc58ddfeb1",
        title: "baz",
        completed: false,
      },
    },
    decorators: [
      (Story) => {
        const RemixStub = createRemixStub([
          {
            path: "/",
            Component: Story,
          },
          {
            path: "/todos/fb58ba5e-bf51-4e44-b79a-d3cc58ddfeb1",
            async action({ request }: ActionFunctionArgs) {
              spy(Object.fromEntries(await request.formData()));
              return null;
            },
          },
        ]);
        return (
          <ul>
            <RemixStub />
          </ul>
        );
      },
    ],
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      await userEvent.click(canvas.getByRole("checkbox"));
      await expect(spy).toHaveBeenCalledTimes(1);
      await expect(spy).toHaveBeenCalledWith({
        _method: "put",
        id: "fb58ba5e-bf51-4e44-b79a-d3cc58ddfeb1",
        title: "baz",
        completed: "on",
      });
    },
  } satisfies Story;
})();
