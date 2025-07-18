import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { useRef } from "react";
import { useFetcher } from "react-router";
import { cn } from "~/lib/utils";
import type { action as createAction } from "~/routes/todos";
import type { action as toggleAction } from "~/routes/todos.toggle";
import { createTodoSchema } from "~/schemas/todo";

interface Props {
  todosCount: number;
  completedTodosCount: number;
}

function CreateForm() {
  const fetcher = useFetcher<typeof createAction>();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, fields] = useForm({
    defaultValue: { title: "" },
    lastResult: fetcher.state === "idle" ? fetcher.data : null,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createTodoSchema });
    },
  });
  return (
    <fetcher.Form
      {...getFormProps(form)}
      action="/todos"
      method="post"
      ref={formRef}
    >
      <input
        {...getInputProps(fields.title, { type: "text" })}
        className={cn(
          "size-full py-4 pr-4 pl-14 text-2xl shadow-inner",
          "placeholder:font-normal placeholder:text-black/40 placeholder:italic",
          "focus:shadow-sm focus:shadow-red-400 focus:outline-hidden",
        )}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
          }
        }}
        placeholder="What needs to be done?"
      />
    </fetcher.Form>
  );
}

function ToggleForm({ checked }: { checked: boolean }) {
  const fetcher = useFetcher<typeof toggleAction>();
  return (
    <fetcher.Form action="/todos/toggle" method="post">
      <label>
        <input
          checked={checked}
          className="peer appearance-none"
          onClick={(event) => event.currentTarget.form?.requestSubmit()}
          readOnly
          type="checkbox"
        />
        <span
          className={cn(
            "absolute top-0 left-0 flex h-full w-12 items-center justify-center text-[0px]",
            "before:inline-block before:rotate-90 before:px-7 before:py-2.5 before:text-2xl before:text-neutral-400 before:content-['❯']",
            "peer-checked:before:text-neutral-700",
            "peer-focus:shadow-sm peer-focus:shadow-red-400 peer-focus:outline-hidden",
          )}
        >
          Mark all as complete
        </span>
      </label>
    </fetcher.Form>
  );
}

export default function TodoHeader({ todosCount, completedTodosCount }: Props) {
  return (
    <header className="relative mt-32 h-16">
      <h1 className="absolute bottom-16 w-full pb-6 text-center text-7xl/none font-extralight text-red-700 [text-rendering:optimizeLegibility]">
        todos
      </h1>
      <CreateForm />
      {!!todosCount && (
        <ToggleForm checked={completedTodosCount === todosCount} />
      )}
    </header>
  );
}
