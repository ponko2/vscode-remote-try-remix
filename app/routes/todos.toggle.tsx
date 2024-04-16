import { toggleAllTodos } from "~/.server/models/todo";

export const action = async () => {
  await toggleAllTodos();
  return null;
};
