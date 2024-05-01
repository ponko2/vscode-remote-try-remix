import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
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

export const Click = {
  ...Basic,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
} satisfies Story;
