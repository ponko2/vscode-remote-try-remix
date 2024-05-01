import type { ActionFunctionArgs } from "@remix-run/node";
import { createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { TodoHeader } from "~/components/TodoHeader";

const meta = {
  component: TodoHeader,
} satisfies Meta<typeof TodoHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    todosCount: 0,
    completedTodosCount: 0,
  },
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          path: "/",
          Component: Story,
        },
      ]);
      return <RemixStub />;
    },
  ],
} satisfies Story;

export const HasActive = {
  ...Basic,
  args: {
    todosCount: 1,
    completedTodosCount: 0,
  },
} satisfies Story;

export const IsAllCompleted = {
  ...Basic,
  args: {
    todosCount: 1,
    completedTodosCount: 1,
  },
} satisfies Story;

export const Add = (() => {
  const spy = fn();
  return {
    args: {
      todosCount: 0,
      completedTodosCount: 0,
    },
    decorators: [
      (Story) => {
        const RemixStub = createRemixStub([
          {
            path: "/",
            Component: Story,
          },
          {
            path: "/todos",
            async action({ request }: ActionFunctionArgs) {
              spy(Object.fromEntries(await request.formData()));
              return null;
            },
          },
        ]);
        return <RemixStub />;
      },
    ],
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const input = canvas.getByRole("textbox");
      await userEvent.type(input, "{f}{o}{o}{enter}");
      await expect(spy).toHaveBeenCalledTimes(1);
      await expect(spy).toHaveBeenCalledWith({ title: "foo" });
    },
  } satisfies Story;
})();

export const Toggle = (() => {
  const spy = fn();
  return {
    args: {
      todosCount: 1,
      completedTodosCount: 0,
    },
    decorators: [
      (Story) => {
        const RemixStub = createRemixStub([
          {
            path: "/",
            Component: Story,
          },
          {
            path: "/todos/toggle",
            action() {
              spy();
              return null;
            },
          },
        ]);
        return <RemixStub />;
      },
    ],
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      await userEvent.click(canvas.getByRole("checkbox"));
      await expect(spy).toHaveBeenCalledTimes(1);
    },
  } satisfies Story;
})();
