import { cva } from "class-variance-authority";
import { NavLink, useFetcher } from "react-router";
import TodoButton from "~/components/TodoButton";
import type { action } from "~/routes/todos.completed";

interface Props {
  todosCount: number;
  completedTodosCount: number;
}

function CompletedForm() {
  const fetcher = useFetcher<typeof action>();
  return (
    <fetcher.Form
      action="/todos/completed"
      className="text-right"
      method="post"
    >
      <TodoButton
        className="cursor-pointer no-underline hover:underline active:no-underline"
        type="submit"
      >
        Clear completed
      </TodoButton>
    </fetcher.Form>
  );
}

export default function TodoFooter({ todosCount, completedTodosCount }: Props) {
  if (todosCount <= 0) {
    return null;
  }

  const activeCount = todosCount - completedTodosCount;

  const link = cva(
    "m-1 rounded-sm border px-2 py-1 no-underline hover:border-red-400",
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
    <footer className="isolate grid grid-cols-2 gap-2 px-4 py-2.5 sm:grid-cols-3">
      <span>
        <strong className="font-light">{activeCount ?? "No"}</strong>{" "}
        {activeCount === 1 ? "item" : "items"} left
      </span>
      <ul className="order-last col-span-full text-center sm:order-0 sm:col-auto">
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
      {!!completedTodosCount && <CompletedForm />}
    </footer>
  );
}
