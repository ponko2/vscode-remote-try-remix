import { useLoaderData } from "@remix-run/react";
import { fetchTodos } from "~/.server/models/todo";
import TodoPage from "~/components/TodoPage";

export async function loader() {
  return { todos: await fetchTodos() };
}

export default function Active() {
  const data = useLoaderData<typeof loader>();
  return <TodoPage todos={data.todos} type="active" />;
}
