import { useFetcher } from "@remix-run/react";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { TodoButton } from "~/components/TodoButton";

type Props = {
  todo: {
    id: string;
    title: string;
    completed: boolean;
  };
};

export function TodoItem({ todo }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.title);
  const updateFetcher = useFetcher();
  const toggleFetcher = useFetcher();
  const deleteFetcher = useFetcher();
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      titleRef.current?.focus();
    }
  }, [editing]);

  useEffect(() => {
    if (updateFetcher.state === "submitting") {
      setEditing(false);
    }
  }, [updateFetcher.state]);

  const list = cva(["relative", "text-2xl", "h-16"], {
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
        <updateFetcher.Form method="post">
          <input name="_action" type="hidden" value="update" />
          <input name="id" type="hidden" value={todo.id} />
          <input
            name="completed"
            type="hidden"
            value={todo.completed ? "true" : "false"}
          />
          <input
            className={clsx(
              "size-full",
              "border",
              "border-neutral-400",
              "px-4",
              "py-3",
              "shadow-inner",
              "focus:shadow",
              "focus:shadow-red-400",
              "focus:outline-none",
            )}
            name="title"
            onBlur={(event) => updateFetcher.submit(event.currentTarget.form)}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                updateFetcher.submit(event.currentTarget.form);
              }
            }}
            ref={titleRef}
            type="text"
            value={value}
          />
        </updateFetcher.Form>
      </li>
    );
  }
  return (
    <li className={list()}>
      <toggleFetcher.Form method="post">
        <input name="_action" type="hidden" value="update" />
        <input name="id" type="hidden" value={todo.id} />
        <input name="title" type="hidden" value={todo.title} />
        <input
          checked={todo.completed}
          className={clsx(
            "peer",
            "absolute",
            "inset-y-0",
            "my-auto",
            "size-12",
            "appearance-none",
            "outline-none",
          )}
          name="completed"
          onChange={(event) => toggleFetcher.submit(event.currentTarget.form)}
          type="checkbox"
          value="true"
        />
        <label
          className={clsx(
            "block",
            "h-full",
            "break-words",
            "bg-unchecked",
            "bg-left",
            "bg-no-repeat",
            "py-4",
            "pl-14",
            "pr-4",
            "font-normal",
            "leading-tight",
            "text-neutral-700",
            "transition-colors",
            "duration-500",
            "peer-checked:bg-checked",
            "peer-checked:text-neutral-400",
            "peer-checked:line-through",
            "peer-focus:shadow",
            "peer-focus:shadow-red-400",
            "peer-focus:outline-none",
          )}
          onDoubleClick={() => setEditing(true)}
        >
          {todo.title}
        </label>
      </toggleFetcher.Form>
      <deleteFetcher.Form method="post">
        <input name="_action" type="hidden" value="delete" />
        <input name="id" type="hidden" value={todo.id} />
        <TodoButton
          className={clsx(
            "absolute",
            "inset-y-0",
            "right-2.5",
            "my-auto",
            "hidden",
            "size-10",
            "text-3xl",
            "text-neutral-400",
            "transition-colors",
            "duration-200",
            "ease-out",
            "after:block",
            "after:h-full",
            "after:content-['×']",
            "hover:text-red-400",
            "focus:text-red-400",
            "group-hover:block",
          )}
          type="submit"
        />
      </deleteFetcher.Form>
    </li>
  );
}
