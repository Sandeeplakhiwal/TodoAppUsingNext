"use client";
import { Context } from "@latest/components/client/client";
import { redirect, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

function AddTodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const { user } = useContext(Context);
  const router = useRouter();

  const sumbitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/newtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      const data = await res.json();
      if (data && !data.success) {
        toast.error(data.message);
        setLoading(false);
      }
      if (data && data.success) {
        setLoading(false);
        toast.success(data.message);
        router.refresh();
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
  };

  if (!user._id) {
    redirect("/login");
  }

  return (
    <main className="form_container">
      <section className="todo_container">
        <form onSubmit={sumbitHandler}>
          <input
            type={"text"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a task title..."
            required
          />
          <input
            type={"text"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description..."
            required
          />
          <button type="submit">{loading ? "Adding..." : "Add task"}</button>
        </form>
      </section>
    </main>
  );
}

export default AddTodoForm;
