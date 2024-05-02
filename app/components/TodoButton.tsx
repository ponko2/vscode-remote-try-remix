import { cn } from "~/lib/utils";

type Props = React.ComponentPropsWithoutRef<"button">;

export function TodoButton({ className, children, ...props }: Props) {
  return (
    <button className={cn("appearance-none", className)} {...props}>
      {children}
    </button>
  );
}
