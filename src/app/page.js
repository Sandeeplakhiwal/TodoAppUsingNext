import { Suspense } from "react";
import AddTodoForm from "./addTodoForm";
import Todos from "./todos";

export default async function Home() {
  return (
    <div className="home">
      <AddTodoForm />
      <Suspense
        fallback={<div style={{ textAlign: "center" }}>loading...</div>}
      >
        <Todos />
      </Suspense>
    </div>
  );
}
