import { parseWithZod } from "@conform-to/zod";
import { createTodo } from "~/.server/models/todo";
import { createTodoSchema } from "~/schemas/todo";
import type { Route } from "./+types/todos";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: createTodoSchema });
  if (submission.status !== "success") {
    return submission.reply();
  }
  await createTodo(submission.value);
  return submission.reply();
}
