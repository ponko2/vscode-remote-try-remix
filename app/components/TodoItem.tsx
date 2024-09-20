import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import type { Todo } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import { cva } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";
import TodoButton from "~/components/TodoButton";
import { cn } from "~/lib/utils";
import type { action } from "~/routes/todos.$todoId";
import { deleteTodoSchema, updateTodoSchema } from "~/schemas/todo";

interface Props {
  todo: Todo;
}

function UpdateForm({
  todo,
  onEditChange,
}: Props & { onEditChange: (edit: boolean) => void }) {
  const fetcher = useFetcher<typeof action>();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, fields] = useForm({
    defaultValue: {
      ...todo,
      _method: "put",
      completed: todo.completed ? "on" : null,
    },
    lastResult: fetcher.state === "idle" ? fetcher.data : null,
    onSubmit() {
      onEditChange(false);
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: updateTodoSchema });
    },
  });
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.status !== "error") {
      formRef.current?.reset();
    }
  }, [fetcher.state, fetcher.data, todo]);
  return (
    <fetcher.Form
      action={`/todos/${todo.id}`}
      method="post"
      ref={formRef}
      {...getFormProps(form)}
    >
      <input
        {...getInputProps(fields._method, { type: "hidden" })}
        key={fields._method.key}
      />
      <input
        {...getInputProps(fields.id, { type: "hidden" })}
        key={fields.id.key}
      />
      {todo.completed ? (
        <input
          {...getInputProps(fields.completed, { type: "hidden" })}
          key={fields.completed.key}
        />
      ) : null}
      <input
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        className={cn(
          "size-full border border-neutral-400 px-4 py-3 shadow-inner",
          "focus:shadow focus:shadow-red-400 focus:outline-none",
        )}
        onBlur={(event) => event.currentTarget.form?.requestSubmit()}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
          }
        }}
        {...getInputProps(fields.title, { type: "text" })}
        key={fields.title.key}
      />
    </fetcher.Form>
  );
}

function ToggleForm({
  todo,
  onEditChange,
}: Props & { onEditChange: (edit: boolean) => void }) {
  const fetcher = useFetcher<typeof action>();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, fields] = useForm({
    defaultValue: {
      ...todo,
      _method: "put",
      completed: todo.completed ? "on" : null,
    },
    lastResult: fetcher.state === "idle" ? fetcher.data : null,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: updateTodoSchema });
    },
  });
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.status !== "error") {
      formRef.current?.reset();
    }
  }, [fetcher.state, fetcher.data, todo]);
  return (
    <fetcher.Form
      action={`/todos/${todo.id}`}
      method="post"
      ref={formRef}
      {...getFormProps(form)}
    >
      <input
        {...getInputProps(fields._method, { type: "hidden" })}
        key={fields._method.key}
      />
      <input
        {...getInputProps(fields.id, { type: "hidden" })}
        key={fields.id.key}
      />
      <input
        {...getInputProps(fields.title, { type: "hidden" })}
        key={fields.title.key}
      />
      <input
        className="peer absolute inset-y-0 my-auto size-12 appearance-none outline-none"
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
        {...getInputProps(fields.completed, { type: "checkbox" })}
        key={fields.completed.key}
      />
      <label
        className={cn(
          "block h-full break-words bg-unchecked bg-left bg-no-repeat py-4 pl-14 pr-4 font-normal leading-tight text-neutral-700 transition-colors duration-500",
          "peer-checked:bg-checked peer-checked:text-neutral-400 peer-checked:line-through",
          "peer-focus:shadow peer-focus:shadow-red-400 peer-focus:outline-none",
        )}
        onDoubleClick={() => onEditChange(true)}
      >
        {todo.title}
      </label>
    </fetcher.Form>
  );
}

function DeleteForm({ todo }: Props) {
  const fetcher = useFetcher<typeof action>();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, fields] = useForm({
    defaultValue: { ...todo, _method: "delete" },
    lastResult: fetcher.state === "idle" ? fetcher.data : null,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: deleteTodoSchema });
    },
  });
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.status !== "error") {
      formRef.current?.reset();
    }
  }, [fetcher.state, fetcher.data, todo]);
  return (
    <fetcher.Form
      action={`/todos/${todo.id}`}
      method="post"
      ref={formRef}
      {...getFormProps(form)}
    >
      <input
        {...getInputProps(fields._method, { type: "hidden" })}
        key={fields._method.key}
      />
      <input
        {...getInputProps(fields.id, { type: "hidden" })}
        key={fields.id.key}
      />
      <TodoButton
        className={cn(
          "absolute inset-y-0 right-2.5 my-auto hidden size-10 text-3xl text-neutral-400 transition-colors duration-200 ease-out",
          "after:block after:h-full after:content-['×']",
          "hover:text-red-400",
          "focus:text-red-400",
          "group-hover:block",
        )}
        type="submit"
      />
    </fetcher.Form>
  );
}

export default function TodoItem({ todo }: Props) {
  const [editing, setEditing] = useState(false);
  const list = cva("relative h-16 text-2xl", {
    variants: {
      intent: {
        primary: ["group"],
        editing: ["pl-11"],
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  });
  if (editing) {
    return (
      <li className={list({ intent: "editing" })}>
        <UpdateForm onEditChange={setEditing} todo={todo} />
      </li>
    );
  }
  return (
    <li className={list()}>
      <ToggleForm onEditChange={setEditing} todo={todo} />
      <DeleteForm todo={todo} />
    </li>
  );
}
