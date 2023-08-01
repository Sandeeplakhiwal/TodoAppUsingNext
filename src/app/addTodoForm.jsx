"use client";
import React from "react";

function addTodoForm() {
  return (
    <main className="container">
      <section className="todoContainer">
        <form>
          <input type={"text"} placeholder="Enter a task title..." />
          <input type={"text"} placeholder="Enter task description..." />
          <button type="submit">Add task</button>
        </form>
      </section>
    </main>
  );
}

export default addTodoForm;
