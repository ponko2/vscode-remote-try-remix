import { z } from "zod/v4";

export const createTodoSchema = z.object({
  title: z.string().trim().min(1),
});

export const updateTodoSchema = z.object({
  _method: z.literal("put"),
  id: z.uuid(),
  title: z.string().trim().optional(),
  completed: z
    .literal("on")
    .optional()
    .transform((value) => value === "on"),
});

export const deleteTodoSchema = z.object({
  _method: z.literal("delete"),
  id: z.uuid(),
});
