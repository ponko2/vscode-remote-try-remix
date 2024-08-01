import { unstable_defineLoader as defineLoader } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchTodos } from "~/.server/models/todo";
import TodoPage from "~/components/TodoPage";

export const loader = defineLoader(async () => {
  return { todos: await fetchTodos() };
});

export default function Active() {
  const data = useLoaderData<typeof loader>();
  return <TodoPage todos={data.todos} type="active" />;
}
