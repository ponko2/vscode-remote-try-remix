import { parseWithZod } from "@conform-to/zod";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import * as R from "remeda";
import { z } from "zod";
import { deleteTodo, updateTodo } from "~/.server/models/todo";
import { deleteTodoSchema, updateTodoSchema } from "~/schemas/todo";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: z.discriminatedUnion("_method", [
      deleteTodoSchema,
      updateTodoSchema,
    ]),
  });
  if (submission.status !== "success") {
    return json(submission.reply());
  }
  if (submission.value._method === "delete") {
    await deleteTodo(R.omit(submission.value, ["_method"]));
  }
  if (submission.value._method === "put") {
    await updateTodo(R.omit(submission.value, ["_method"]));
  }
  return json(submission.reply());
}
