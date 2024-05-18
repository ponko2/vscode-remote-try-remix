import type { Todo } from "@prisma/client";
import TodoItem from "~/components/TodoItem";

interface Props {
  todos: Todo[];
}

export default function TodoList({ todos }: Props) {
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
