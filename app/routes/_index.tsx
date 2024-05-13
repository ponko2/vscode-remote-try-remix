import { unstable_defineLoader as defineLoader } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { fetchTodos } from "~/.server/models/todo";
import TodoPage from "~/components/TodoPage";

export const loader = defineLoader(async () => {
  return json({ todos: await fetchTodos() });
});

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return <TodoPage todos={data.todos} type="all" />;
}
