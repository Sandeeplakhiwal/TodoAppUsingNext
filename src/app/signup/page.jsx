"use client";
import { Context } from "@latest/components/client/client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);

  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data && !data.success) {
        setLoading(false);
        toast.error(data.message);
      }
      if (data && data.success) {
        setLoading(false);
        setEmail("");
        setPassword("");
        setName("");
        toast.success(data.message);
        setUser(data.user);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
  };

  if (user && user._id) redirect("/");

  return (
    <div className="login">
      <section>
        <h1
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            textDecoration: "underline",
            marginBottom: "10%",
          }}
        >
          Signup
        </h1>
        <form onSubmit={submitHandler}>
          <input
            type={"text"}
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type={"email"}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={"password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{loading ? "Loading..." : "Signup"}</button>
          <p>OR</p>
          <Link href={"/login"}>Login into existing account</Link>
        </form>
      </section>
    </div>
  );
}

export default Page;
