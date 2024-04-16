import { createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import { TodoItem } from "~/components/TodoItem";

const meta: Meta<typeof TodoItem> = {
  component: TodoItem,
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    todo: {
      id: "cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
      title: "Hello, World!!",
      completed: false,
    },
  },
};

export const Completed: Story = {
  args: {
    ...Basic.args,
    todo: {
      id: "cfc332c5-f8c2-45e1-bcdd-8e26a11c9ffc",
      title: "Hello, World!!",
      completed: true,
    },
  },
};
