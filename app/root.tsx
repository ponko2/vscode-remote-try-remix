import type {
  ActionFunctionArgs,
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import clsx from "clsx";
import { TodoFooter } from "~/components/TodoFooter";
import { TodoHeader } from "~/components/TodoHeader";
import {
  createTodo,
  deleteCompletedTodos,
  fetchTodos,
  toggleAllTodos,
} from "~/models/todos";
import stylesheet from "~/tailwind.css?url";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const loader = async () => {
  return json({ todos: await fetchTodos() });
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body
        className={clsx(
          "bg-neutral-100",
          "text-sm",
          "font-light",
          "text-neutral-900",
          "antialiased",
        )}
      >
        <div className={clsx("container", "mx-auto", "min-w-60", "max-w-xl")}>
          <section
            className={clsx(
              "relative",
              "my-10",
              "divide-y",
              "divide-neutral-200",
              "bg-white",
              "shadow-2xl",
              "before:absolute",
              "before:inset-x-0",
              "before:bottom-0",
              "before:h-12",
              "before:shadow-[0_1px_1px_rgba(0,0,0,0.2),0_8px_0_-3px_#f5f5f5,0_9px_1px_-3px_rgba(0,0,0,0.2),0_16px_0_-6px_#f5f5f5,0_17px_2px_-6px_rgba(0,0,0,0.2)]",
            )}
          >
            {children}
          </section>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { todos } = useLoaderData<typeof loader>();
  const todosCount = todos.length;
  const completedTodosCount = todos.filter((todo) => todo.completed).length;
  return (
    <>
      <TodoHeader
        completedTodosCount={completedTodosCount}
        todosCount={todosCount}
      />
      <Outlet />
      <TodoFooter
        completedTodosCount={completedTodosCount}
        todosCount={todosCount}
      />
    </>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const _action = formData.get("_action");
  if (_action === "create") {
    const title = (formData.get("title") as string).trim();
    await createTodo({ title });
  }
  if (_action === "toggleAll") {
    await toggleAllTodos();
  }
  if (_action === "clearCompleted") {
    await deleteCompletedTodos();
  }
  return json({ ok: true });
};
