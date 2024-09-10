import { toggleAllTodos } from "~/.server/models/todo";

export async function action() {
  await toggleAllTodos();
  return null;
}
