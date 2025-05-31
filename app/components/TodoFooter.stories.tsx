import type { Meta, StoryObj } from "@storybook/react-vite";
import { createRoutesStub } from "react-router";
import { expect, fn } from "storybook/test";
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
      const RoutesStub = createRoutesStub([
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
      return <RoutesStub />;
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
      const RoutesStub = createRoutesStub([
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
      return <RoutesStub initialEntries={["/active"]} />;
    },
  ],
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByText("All");
    await expect(button).not.toHaveClass("border-red-700");
    await userEvent.click(button);
    await expect(canvas.getByText("All")).toHaveClass("border-red-700");
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
      const RoutesStub = createRoutesStub([
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
      return <RoutesStub initialEntries={["/"]} />;
    },
  ],
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByText("Active");
    await expect(button).not.toHaveClass("border-red-700");
    await userEvent.click(button);
    await expect(canvas.getByText("Active")).toHaveClass("border-red-700");
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
      const RoutesStub = createRoutesStub([
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
      return <RoutesStub initialEntries={["/"]} />;
    },
  ],
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByText("Completed");
    await expect(button).not.toHaveClass("border-red-700");
    await userEvent.click(button);
    await expect(canvas.getByText("Completed")).toHaveClass("border-red-700");
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
        const RoutesStub = createRoutesStub([
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
        return <RoutesStub />;
      },
    ],
    play: async ({ canvas, userEvent }) => {
      await userEvent.click(canvas.getByText("Clear completed"));
      await expect(spy).toHaveBeenCalledTimes(1);
    },
  } satisfies Story;
})();
