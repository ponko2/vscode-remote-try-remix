import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFetcher } from "@remix-run/react";
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
  const [form, fields] = useForm({
    lastResult: fetcher.data,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createTodoSchema });
    },
  });
  return (
    <fetcher.Form action="/todos" method="post" {...getFormProps(form)}>
      <input
        className={cn(
          "size-full py-4 pl-14 pr-4 text-2xl shadow-inner",
          "placeholder:font-normal placeholder:italic placeholder:text-black/40",
          "focus:shadow focus:shadow-red-400 focus:outline-none",
        )}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            fetcher.submit(event.currentTarget.form);
          }
        }}
        placeholder="What needs to be done?"
        {...getInputProps(fields.title, { type: "text" })}
        key={fields.title.key}
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
          onClick={(event) => {
            event.preventDefault();
            fetcher.submit(event.currentTarget.form);
          }}
          readOnly
          type="checkbox"
        />
        <span
          className={cn(
            "absolute left-0 top-0 flex h-full w-12 items-center justify-center text-[0]",
            "before:inline-block before:rotate-90 before:px-7 before:py-2.5 before:text-2xl before:text-neutral-400 before:content-['❯']",
            "peer-checked:before:text-neutral-700",
            "peer-focus:shadow peer-focus:shadow-red-400 peer-focus:outline-none",
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
