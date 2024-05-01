import { createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { TodoFooter } from "~/components/TodoFooter";

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
      const RemixStub = createRemixStub([
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
} satisfies Story;

export const HasCompleted = {
  ...Basic,
  args: {
    todosCount: 2,
    completedTodosCount: 1,
  },
} satisfies Story;

export const ShowAll = {
  args: {
    todosCount: 2,
    completedTodosCount: 1,
  },
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
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
      const RemixStub = createRemixStub([
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
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
      const RemixStub = createRemixStub([
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
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
        const RemixStub = createRemixStub([
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
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      await userEvent.click(await canvas.findByText("Clear completed"));
      await expect(spy).toHaveBeenCalledTimes(1);
    },
  } satisfies Story;
})();
