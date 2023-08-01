import AddTodoForm from "./addTodoForm";
import { TodoListItem } from "@latest/components/server/serverComponents";
import Header from "./header";

export default function Home() {
  return (
    <div
      className="container"
      style={{ backgroundColor: "whitesmoke", height: "92vh" }}
    >
      <AddTodoForm />
      <section className="todosContainer">
        <TodoListItem
          title="Dance"
          description="On chamma chamma song"
          id="sampleId"
          completed={true}
        />
      </section>
    </div>
  );
}
