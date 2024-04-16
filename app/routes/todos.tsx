import { parseWithZod } from "@conform-to/zod";
import { json, type ActionFunctionArgs } from "@remix-run/node";
import { createTodo } from "~/.server/models/todo";
import { createTodoSchema } from "~/schemas/todo";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: createTodoSchema });
  if (submission.status !== "success") {
    return json(submission.reply());
  }
  await createTodo(submission.value);
  return json(submission.reply({ resetForm: true }));
};
