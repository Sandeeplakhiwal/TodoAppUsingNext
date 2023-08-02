import { TodoListItem } from "@latest/components/server/serverComponents";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const fetchTodo = async (token) => {
  try {
    const res = await fetch(`${process.env.URL}/api/mytask`, {
      cache: "no-cache",
      headers: {
        cookie: `token=${token}`,
      },
    });
    const data = await res.json();
    if (data && !data.success) return [];
    if (data && data.success) return data.tasks;
  } catch (error) {
    return [];
  }
};

async function Todos() {
  const token = cookies().get("token")?.value;
  const tasks = await fetchTodo(token);
  return (
    <section className="todosContainer">
      {tasks?.map((item) => (
        <TodoListItem
          title={item.title}
          description={item.description}
          id={item._id}
          key={item._id}
          completed={item.isCompleted}
        />
      ))}
    </section>
  );
}

export default Todos;
