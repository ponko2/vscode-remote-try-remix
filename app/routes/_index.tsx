import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";
import { TodoList } from "~/components/TodoList";
import { deleteTodo, updateTodo } from "~/models/todos";
import type { loader as rootLoader } from "~/root";

export default function Index() {
  const rootData = useRouteLoaderData<typeof rootLoader>("root");
  return <TodoList todos={rootData?.todos ?? []} />;
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const _action = formData.get("_action");
  if (_action === "delete") {
    const id = formData.get("id") as string;
    await deleteTodo({ id });
  }
  if (_action === "update") {
    const id = formData.get("id") as string;
    const title = (formData.get("title") as string).trim();
    const completed = (formData.get("completed") as string) === "true";
    await updateTodo({ id, title, completed });
  }
  return json({ ok: true });
};
