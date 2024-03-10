import { useFetcher } from "@remix-run/react";
import clsx from "clsx";
import { useEffect, useRef } from "react";

type Props = {
  todosCount: number;
  completedTodosCount: number;
};

export function TodoHeader({
  todosCount,
  completedTodosCount: completedTodosCount,
}: Props) {
  const createFormRef = useRef<HTMLFormElement>(null);
  const createFetcher = useFetcher();
  const toggleAllFetcher = useFetcher();

  useEffect(() => {
    if (createFetcher.state === "submitting") {
      createFormRef.current?.reset();
    }
  }, [createFetcher.state]);

  return (
    <header className={clsx("relative", "mt-32", "h-16")}>
      <h1
        className={clsx(
          "absolute",
          "bottom-16",
          "w-full",
          "pb-6",
          "text-center",
          "text-7xl/none",
          "font-extralight",
          "text-red-700",
          "[text-rendering:optimizeLegibility]",
        )}
      >
        todos
      </h1>
      <createFetcher.Form method="post" ref={createFormRef}>
        <input name="_action" type="hidden" value="create" />
        <input
          className={clsx(
            "size-full",
            "py-4",
            "pl-14",
            "pr-4",
            "text-2xl",
            "shadow-inner",
            "placeholder:font-normal",
            "placeholder:italic",
            "placeholder:text-black/40",
            "focus:shadow",
            "focus:shadow-red-400",
            "focus:outline-none",
          )}
          name="title"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              createFetcher.submit(event.currentTarget.form);
            }
          }}
          placeholder="What needs to be done?"
          type="text"
        />
      </createFetcher.Form>
      {!!todosCount && (
        <toggleAllFetcher.Form method="post">
          <input name="_action" type="hidden" value="toggleAll" />
          <label>
            <input
              checked={completedTodosCount === todosCount}
              className={clsx("peer", "appearance-none")}
              onClick={(event) =>
                toggleAllFetcher.submit(event.currentTarget.form)
              }
              readOnly
              type="checkbox"
            />
            <span
              className={clsx(
                "absolute",
                "left-0",
                "top-0",
                "flex",
                "h-full",
                "w-12",
                "items-center",
                "justify-center",
                "text-[0]",
                "before:inline-block",
                "before:rotate-90",
                "before:px-7",
                "before:py-2.5",
                "before:text-2xl",
                "before:text-neutral-400",
                "before:content-['❯']",
                "peer-checked:before:text-neutral-700",
                "peer-focus:shadow",
                "peer-focus:shadow-red-400",
                "peer-focus:outline-none",
              )}
            >
              Mark all as complete
            </span>
          </label>
        </toggleAllFetcher.Form>
      )}
    </header>
  );
}
