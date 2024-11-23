import { useLoaderData } from "react-router";
import { fetchTodos } from "~/.server/models/todo";
import TodoPage from "~/components/TodoPage";

export async function loader() {
  return { todos: await fetchTodos() };
}

export default function Completed() {
  const data = useLoaderData<typeof loader>();
  return <TodoPage todos={data.todos} type="completed" />;
}
