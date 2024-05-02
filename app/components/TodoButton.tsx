import { twMerge } from "tailwind-merge";

type Props = React.ComponentPropsWithoutRef<"button">;

export function TodoButton({ className, children, ...restProps }: Props) {
  return (
    <button className={twMerge("appearance-none", className)} {...restProps}>
      {children}
    </button>
  );
}
