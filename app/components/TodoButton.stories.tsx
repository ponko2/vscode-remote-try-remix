import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import TodoButton from "~/components/TodoButton";

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
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Hello, World!!")).toBeInTheDocument();
  },
} satisfies Story;

export const Click = {
  ...Basic,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button"));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
} satisfies Story;
