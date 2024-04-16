import { useRouteLoaderData } from "@remix-run/react";
import { TodoList } from "~/components/TodoList";
import type { loader as rootLoader } from "~/root";

export default function Index() {
  const rootData = useRouteLoaderData<typeof rootLoader>("root");
  return <TodoList todos={rootData?.todos ?? []} />;
}
