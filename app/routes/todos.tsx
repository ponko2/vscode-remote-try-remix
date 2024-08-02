import { parseWithZod } from "@conform-to/zod";
import { unstable_defineAction as defineAction } from "@remix-run/node";
import { createTodo } from "~/.server/models/todo";
import { createTodoSchema } from "~/schemas/todo";

export const action = defineAction(async ({ request }) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: createTodoSchema });
  if (submission.status !== "success") {
    return submission.reply();
  }
  await createTodo(submission.value);
  return submission.reply();
});
