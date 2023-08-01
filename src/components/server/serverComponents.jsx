// "use server";
import React from "react";
import { TodoListItemBtn } from "../client/client";

export function TodoListItem({ title, description, id, completed }) {
  return (
    <div className="todoList">
      <div className="todoListItem">
        <div className="todoListItemDetails">
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
        <div>
          <TodoListItemBtn todoId={id} completed={completed} />
        </div>
      </div>
    </div>
  );
}
