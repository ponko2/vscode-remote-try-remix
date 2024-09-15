import { parseWithZod } from "@conform-to/zod";
import type { ActionFunctionArgs } from "@remix-run/node";
import { createTodo } from "~/.server/models/todo";
import { createTodoSchema } from "~/schemas/todo";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: createTodoSchema });
  if (submission.status !== "success") {
    return submission.reply();
  }
  await createTodo(submission.value);
  return submission.reply();
}
