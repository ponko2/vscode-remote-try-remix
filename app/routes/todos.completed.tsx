import { deleteCompletedTodos } from "~/.server/models/todo";

export const action = async () => {
  await deleteCompletedTodos();
  return null;
};
