"use client";
import { Context } from "@latest/components/client/client";
import { redirect } from "next/navigation";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);

  const [loading, setLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      document.getElementById("loginBtn").disabled = true;
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data) {
        document.getElementById("loginBtn").disabled = false;
        setLoading(false);
      }
      if (data && data.success) {
        toast.success(data.message);
        setUser(data.user);
      }
      if (data && data.success === false) toast.error(data.message);
    } catch (error) {
      document.getElementById("loginBtn").disabled = false;
      setLoading(false);
      toast.error(error);
    }
  };
  if (user && user._id) return redirect("/");
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
          Login
        </h1>
        <form onSubmit={loginHandler}>
          <label htmlFor="Email" />
          <input
            type={"email"}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor="Password" />
          <input
            type={"password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button id="loginBtn" type="submit">
            {loading ? "Loading..." : "Login"}
          </button>
          <p>OR</p>
          <Link href={"/signup"}>New User</Link>
        </form>
      </section>
    </div>
  );
}

export default Page;
