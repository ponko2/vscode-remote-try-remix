import { prisma } from "~/.server/database";
import type { Todo } from "~/generated/prisma/client";

// Temporary workaround for https://github.com/colinhacks/zod/issues/635
type Optional<T, K extends keyof T> = Omit<T, K> & {
  [P in K]?: T[P] | undefined;
};

export function fetchTodos() {
  return prisma.todo.findMany();
}

export async function toggleAllTodos() {
  const todos = await fetchTodos();
  const completed = !todos.every((todo) => todo.completed);
  await prisma.todo.updateMany({ data: { completed } });
}

export async function deleteCompletedTodos() {
  const todos = await fetchTodos();
  await prisma.todo.deleteMany({
    where: {
      id: {
        in: todos.filter(({ completed }) => completed).map(({ id }) => id),
      },
    },
  });
}

export function createTodo(data: Pick<Todo, "title">) {
  return prisma.todo.create({ data });
}

export function updateTodo({ id, title, completed }: Optional<Todo, "title">) {
  if (title) {
    return prisma.todo.update({
      where: { id },
      data: { title, completed },
    });
  }
  return deleteTodo({ id });
}

export function deleteTodo(where: Pick<Todo, "id">) {
  return prisma.todo.delete({ where });
}
