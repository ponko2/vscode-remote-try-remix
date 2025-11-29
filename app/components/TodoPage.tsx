import TodoFooter from "~/components/TodoFooter";
import TodoHeader from "~/components/TodoHeader";
import TodoList from "~/components/TodoList";
import type { Todo } from "~/generated/prisma/client";
import { cn } from "~/lib/utils";

interface Props {
  todos: Todo[];
  type: "all" | "active" | "completed";
}

export default function TodoPage({ todos, type }: Props) {
  const todosCount = todos.length;
  const completedTodosCount = todos.filter((todo) => todo.completed).length;
  return (
    <div className="h-screen overflow-y-auto bg-neutral-100 text-sm font-light text-neutral-900 antialiased">
      <div className="container mx-auto max-w-xl min-w-60">
        <section
          className={cn(
            "relative my-10 divide-y divide-neutral-200 bg-white shadow-2xl",
            "before:absolute before:inset-x-0 before:bottom-0 before:h-12",
            "before:shadow-[0_1px_1px_rgba(0,0,0,0.2),0_8px_0_-3px_#f5f5f5,0_9px_1px_-3px_rgba(0,0,0,0.2),0_16px_0_-6px_#f5f5f5,0_17px_2px_-6px_rgba(0,0,0,0.2)]",
          )}
        >
          <TodoHeader
            completedTodosCount={completedTodosCount}
            todosCount={todosCount}
          />
          <TodoList
            todos={((): Todo[] => {
              switch (type) {
                case "active":
                  return todos.filter(({ completed }) => !completed);
                case "completed":
                  return todos.filter(({ completed }) => completed);
                default:
                  return todos;
              }
            })()}
          />
          <TodoFooter
            completedTodosCount={completedTodosCount}
            todosCount={todosCount}
          />
        </section>
      </div>
    </div>
  );
}
