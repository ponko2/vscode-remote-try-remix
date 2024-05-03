import { createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import TodoPage from "~/components/TodoPage";

const meta = {
  component: TodoPage,
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
} satisfies Meta<typeof TodoPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    todos: [
      {
        id: "cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
        title: "foo",
        completed: false,
      },
      {
        id: "2c1e6aab-6d91-4414-bf80-3cef026284ab",
        title: "bar",
        completed: true,
      },
    ],
    type: "all",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("foo")).toBeInTheDocument();
    await expect(canvas.getByText("bar")).toBeInTheDocument();
  },
} satisfies Story;

export const Active = {
  args: {
    ...Basic.args,
    type: "active",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("foo")).toBeInTheDocument();
    await expect(canvas.queryByText("bar")).toBeNull();
  },
} satisfies Story;

export const Completed = {
  args: {
    ...Basic.args,
    type: "completed",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByText("foo")).toBeNull();
    await expect(canvas.getByText("bar")).toBeInTheDocument();
  },
} satisfies Story;
