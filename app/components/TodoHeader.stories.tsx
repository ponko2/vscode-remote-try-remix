import { createRemixStub } from "@remix-run/testing";
import type { Meta, StoryObj } from "@storybook/react";
import { TodoHeader } from "~/components/TodoHeader";

const meta = {
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
} satisfies Meta<typeof TodoHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    todosCount: 0,
    completedTodosCount: 0,
  },
} satisfies Story;

export const HasActive = {
  args: {
    ...Basic.args,
    todosCount: 1,
    completedTodosCount: 0,
  },
} satisfies Story;

export const IsAllCompleted = {
  args: {
    ...Basic.args,
    todosCount: 1,
    completedTodosCount: 1,
  },
} satisfies Story;
