import type { Todo } from "@prisma/client";
import prisma from "~/db.server";

export async function fetchTodos() {
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

export async function createTodo({ title }: { title: Todo["title"] }) {
  if (title) {
    await prisma.todo.create({ data: { title } });
  }
}

export async function updateTodo({ id, title, completed }: Todo) {
  if (title) {
    await prisma.todo.update({
      where: { id },
      data: { title, completed },
    });
  } else {
    await deleteTodo({ id });
  }
}

export async function deleteTodo({ id }: { id: Todo["title"] }) {
  await prisma.todo.delete({ where: { id } });
}
