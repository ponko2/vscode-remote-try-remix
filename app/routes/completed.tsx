import { json, useLoaderData } from "@remix-run/react";
import { fetchTodos } from "~/.server/models/todo";
import TodoPage from "~/components/TodoPage";

export const loader = async () => {
  return json({ todos: await fetchTodos() });
};

export default function Completed() {
  const data = useLoaderData<typeof loader>();
  return <TodoPage todos={data.todos} type="completed" />;
}
