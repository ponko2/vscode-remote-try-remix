import { unstable_defineAction as defineAction } from "@remix-run/node";
import { deleteCompletedTodos } from "~/.server/models/todo";

export const action = defineAction(async () => {
  await deleteCompletedTodos();
  return null;
});
