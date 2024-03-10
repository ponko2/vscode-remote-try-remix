import { createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import { TodoFooter } from "~/components/TodoFooter";

const meta: Meta<typeof TodoFooter> = {
  component: TodoFooter,
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    todosCount: 1,
    completedTodosCount: 1,
  },
};

export const HasCompleted: Story = {
  args: {
    ...Basic.args,
    todosCount: 2,
    completedTodosCount: 1,
  },
};
