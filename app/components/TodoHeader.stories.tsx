import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent } from "@storybook/test";
import type { ActionFunctionArgs } from "react-router";
import { createRoutesStub } from "react-router";
import TodoHeader from "~/components/TodoHeader";

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
      const RemixStub = createRoutesStub([
        {
          path: "/",
          Component: Story,
        },
      ]);
      return <RemixStub />;
    },
  ],
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole("checkbox")).toBeNull();
  },
} satisfies Story;

export const HasActive = {
  ...Basic,
  args: {
    todosCount: 1,
    completedTodosCount: 0,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox")).not.toBeChecked();
  },
} satisfies Story;

export const IsAllCompleted = {
  ...Basic,
  args: {
    todosCount: 1,
    completedTodosCount: 1,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox")).toBeChecked();
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
        const RemixStub = createRoutesStub([
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
    play: async ({ canvas }) => {
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
        const RemixStub = createRoutesStub([
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
    play: async ({ canvas }) => {
      await userEvent.click(canvas.getByRole("checkbox"));
      await expect(spy).toHaveBeenCalledTimes(1);
    },
  } satisfies Story;
})();
