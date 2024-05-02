import type { Todo } from "@prisma/client";
import { TodoItem } from "~/components/TodoItem";

type Props = {
  todos: Todo[];
};

export function TodoList({ todos }: Props) {
  return (
    <section>
      <ul className="divide-y divide-neutral-200">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
}
