import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFetcher } from "@remix-run/react";
import { useEffect, useRef } from "react";
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
    lastResult: fetcher.state === "idle" ? fetcher.data : null,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createTodoSchema });
    },
  });
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.status !== "error") {
      formRef.current?.reset();
    }
  }, [fetcher.state, fetcher.data]);
  return (
    <fetcher.Form
      action="/todos"
      method="post"
      ref={formRef}
      {...getFormProps(form)}
    >
      <input
        className={cn(
          "size-full py-4 pl-14 pr-4 text-2xl shadow-inner",
          "placeholder:font-normal placeholder:italic placeholder:text-black/40",
          "focus:shadow focus:shadow-red-400 focus:outline-none",
        )}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
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
          onClick={(event) => event.currentTarget.form?.requestSubmit()}
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
