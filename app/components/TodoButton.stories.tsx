import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { TodoButton } from "~/components/TodoButton";

const meta = {
  component: TodoButton,
} satisfies Meta<typeof TodoButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic = {
  args: {
    onClick: fn(),
    children: "Hello, World!!",
  },
} satisfies Story;
