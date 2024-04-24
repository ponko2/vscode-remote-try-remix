import { createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import { TodoList } from "~/components/TodoList";

const meta = {
  component: TodoList,
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
} satisfies Meta<typeof TodoList>;

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
      {
        id: "fb58ba5e-bf51-4e44-b79a-d3cc58ddfeb1",
        title: "baz",
        completed: false,
      },
    ],
  },
} satisfies Story;
