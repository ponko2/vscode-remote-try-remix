import TodoItem from "~/components/TodoItem";
import type { Todo } from "~/generated/prisma/client";

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
