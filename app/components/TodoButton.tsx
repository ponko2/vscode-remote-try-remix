import type React from "react";
import { twMerge } from "tailwind-merge";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function TodoButton({ className, children, ...restProps }: Props) {
  return (
    <button className={twMerge("appearance-none", className)} {...restProps}>
      {children}
    </button>
  );
}
