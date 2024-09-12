import { deleteCompletedTodos } from "~/.server/models/todo";

export async function action() {
  await deleteCompletedTodos();
  return null;
}
