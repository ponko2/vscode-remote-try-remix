import { NavLink, useFetcher } from "@remix-run/react";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { TodoButton } from "~/components/TodoButton";

type Props = {
  todosCount: number;
  completedTodosCount: number;
};

export function TodoFooter({
  todosCount,
  completedTodosCount: completedTodosCount,
}: Props) {
  const fetcher = useFetcher();

  if (todosCount <= 0) {
    return null;
  }

  const activeCount = todosCount - completedTodosCount;

  const link = cva(
    [
      "m-1",
      "rounded",
      "border",
      "px-2",
      "py-1",
      "no-underline",
      "hover:border-red-400",
    ],
    {
      variants: {
        intent: {
          active: ["border-red-700"],
          inactive: ["border-transparent"],
        },
      },
    },
  );

  return (
    <footer
      className={clsx(
        "isolate",
        "grid",
        "grid-cols-2",
        "gap-2",
        "px-4",
        "py-2.5",
        "sm:grid-cols-3",
      )}
    >
      <span>
        <strong className="font-light">{activeCount ?? "No"}</strong>{" "}
        {activeCount === 1 ? "item" : "items"} left
      </span>
      <ul
        className={clsx(
          "order-last",
          "col-span-full",
          "text-center",
          "sm:order-none",
          "sm:col-auto",
        )}
      >
        {[
          { href: "/", text: "All" },
          { href: "/active", text: "Active" },
          { href: "/completed", text: "Completed" },
        ].map(({ href, text }) => (
          <li className="inline" key={href}>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? link({ intent: "active" })
                  : link({ intent: "inactive" })
              }
              to={href}
            >
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
      {!!completedTodosCount && (
        <fetcher.Form className="text-right" method="post">
          <input name="_action" type="hidden" value="clearCompleted" />
          <TodoButton
            className={clsx(
              "cursor-pointer",
              "no-underline",
              "hover:underline",
              "active:no-underline",
            )}
            type="submit"
          >
            Clear completed
          </TodoButton>
        </fetcher.Form>
      )}
    </footer>
  );
}
