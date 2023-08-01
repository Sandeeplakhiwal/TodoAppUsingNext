"use client";

import Link from "next/link";

import { Toaster, toast } from "react-hot-toast";
import { useState, createContext, useContext, useEffect } from "react";

export const Context = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
      });
  }, []);

  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
      <Toaster />
    </Context.Provider>
  );
};

export const LogoutBtn = () => {
  const { user, setUser } = useContext(Context);
  const logoutHandler = async () => {
    try {
      const res = await fetch("/api/logout");
      const data = await res.json();
      if (data && !data.success) return toast.error(data.message);
      setUser(data.user);
      toast.success(data.message);
    } catch (error) {
      toast.error(data.message);
    }
  };
  return user && user._id ? (
    <button className="btn" onClick={logoutHandler}>
      Logout
    </button>
  ) : (
    <Link href={"/login"}>Login</Link>
  );
};

export function TodoListItemBtn({ todoId, completed }) {
  const deleteHandler = (todoId) => {
    console.log(todoId);
  };
  const [checked, setChecked] = useState(false);
  return (
    <div
      className="todoListItemBtn"
      style={{
        display: "flex",
        gap: "20px",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <input
        type={"checkbox"}
        checked={completed}
        style={{ width: "20px", height: "20px", margin: "auto" }}
        onChange={() => setChecked(!checked)}
        onClick={() => setChecked(!checked)}
      />
      <button
        type={"button"}
        onClick={() => deleteHandler(todoId)}
        style={{
          padding: "10px 12px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        delete
      </button>
    </div>
  );
}
