import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent } from "@storybook/test";
import { createRoutesStub } from "react-router";
import TodoFooter from "~/components/TodoFooter";

const meta = {
  component: TodoFooter,
} satisfies Meta<typeof TodoFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    todosCount: 1,
    completedTodosCount: 1,
  },
  decorators: [
    (Story) => {
      const RemixStub = createRoutesStub([
        {
          path: "/",
          Component: Story,
        },
        {
          path: "/active",
          Component: Story,
        },
        {
          path: "/completed",
          Component: Story,
        },
      ]);
      return <RemixStub />;
    },
  ],
  play: async ({ canvas }) => {
    await expect(canvas.getByText("0")).toBeInTheDocument();
  },
} satisfies Story;

export const HasCompleted = {
  ...Basic,
  args: {
    todosCount: 2,
    completedTodosCount: 1,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("1")).toBeInTheDocument();
  },
} satisfies Story;

export const ShowAll = {
  args: {
    todosCount: 2,
    completedTodosCount: 1,
  },
  decorators: [
    (Story) => {
      const RemixStub = createRoutesStub([
        {
          path: "/",
          Component: Story,
        },
        {
          path: "/active",
          Component: Story,
        },
        {
          path: "/completed",
          Component: Story,
        },
      ]);
      return <RemixStub initialEntries={["/active"]} />;
    },
  ],
  play: async ({ canvas }) => {
    const button = await canvas.findByText("All");
    await expect(button).not.toHaveClass("border-red-700");
    await userEvent.click(button);
    await expect(button).toHaveClass("border-red-700");
    await userEvent.click(document.body);
  },
} satisfies Story;

export const ShowActive = {
  args: {
    todosCount: 2,
    completedTodosCount: 1,
  },
  decorators: [
    (Story) => {
      const RemixStub = createRoutesStub([
        {
          path: "/",
          Component: Story,
        },
        {
          path: "/active",
          Component: Story,
        },
        {
          path: "/completed",
          Component: Story,
        },
      ]);
      return <RemixStub initialEntries={["/"]} />;
    },
  ],
  play: async ({ canvas }) => {
    const button = await canvas.findByText("Active");
    await expect(button).not.toHaveClass("border-red-700");
    await userEvent.click(button);
    await expect(button).toHaveClass("border-red-700");
    await userEvent.click(document.body);
  },
} satisfies Story;

export const ShowCompleted = {
  args: {
    todosCount: 2,
    completedTodosCount: 1,
  },
  decorators: [
    (Story) => {
      const RemixStub = createRoutesStub([
        {
          path: "/",
          Component: Story,
        },
        {
          path: "/active",
          Component: Story,
        },
        {
          path: "/completed",
          Component: Story,
        },
      ]);
      return <RemixStub initialEntries={["/"]} />;
    },
  ],
  play: async ({ canvas }) => {
    const button = await canvas.findByText("Completed");
    await expect(button).not.toHaveClass("border-red-700");
    await userEvent.click(button);
    await expect(button).toHaveClass("border-red-700");
    await userEvent.click(document.body);
  },
} satisfies Story;

export const ClearCompleted = (() => {
  const spy = fn();
  return {
    args: {
      todosCount: 2,
      completedTodosCount: 1,
    },
    decorators: [
      (Story) => {
        const RemixStub = createRoutesStub([
          {
            path: "/",
            Component: Story,
          },
          {
            path: "/active",
            Component: Story,
          },
          {
            path: "/completed",
            Component: Story,
          },
          {
            path: "/todos/completed",
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
      await userEvent.click(await canvas.findByText("Clear completed"));
      await expect(spy).toHaveBeenCalledTimes(1);
    },
  } satisfies Story;
})();
