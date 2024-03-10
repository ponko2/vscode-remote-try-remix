import { createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import { TodoHeader } from "~/components/TodoHeader";

const meta: Meta<typeof TodoHeader> = {
  component: TodoHeader,
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    todosCount: 0,
    completedTodosCount: 0,
  },
};

export const HasActive: Story = {
  args: {
    ...Basic.args,
    todosCount: 1,
    completedTodosCount: 0,
  },
};

export const IsAllCompleted: Story = {
  args: {
    ...Basic.args,
    todosCount: 1,
    completedTodosCount: 1,
  },
};
