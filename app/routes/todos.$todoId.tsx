import { parseWithZod } from "@conform-to/zod";
import { unstable_defineAction as defineAction } from "@remix-run/node";
import * as R from "remeda";
import { z } from "zod";
import { deleteTodo, updateTodo } from "~/.server/models/todo";
import { deleteTodoSchema, updateTodoSchema } from "~/schemas/todo";

export const action = defineAction(async ({ request }) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: z.discriminatedUnion("_method", [
      deleteTodoSchema,
      updateTodoSchema,
    ]),
  });
  if (submission.status !== "success") {
    return submission.reply();
  }
  if (submission.value._method === "delete") {
    await deleteTodo(R.omit(submission.value, ["_method"]));
  }
  if (submission.value._method === "put") {
    await updateTodo(R.omit(submission.value, ["_method"]));
  }
  return submission.reply();
});
