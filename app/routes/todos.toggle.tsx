import { unstable_defineAction as defineAction } from "@remix-run/node";
import { toggleAllTodos } from "~/.server/models/todo";

export const action = defineAction(async () => {
  await toggleAllTodos();
  return null;
});
