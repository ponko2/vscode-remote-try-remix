import { useRouteLoaderData } from "@remix-run/react";
import { TodoList } from "~/components/TodoList";
import type { loader as rootLoader } from "~/root";

export default function Active() {
  const rootData = useRouteLoaderData<typeof rootLoader>("root");
  return (
    <TodoList todos={rootData?.todos.filter((todo) => !todo.completed) ?? []} />
  );
}

export { action } from "~/routes/_index";
