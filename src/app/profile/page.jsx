"use client";
import { Context } from "@latest/components/client/client";
import { redirect } from "next/navigation";
import React, { useContext } from "react";

function Page() {
  const { user } = useContext(Context);
  if (!user._id) return redirect("/login");
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Dear {user.name}</h1>
      <p style={{ textAlign: "center" }}>{user.email}</p>
    </div>
  );
}

export default Page;
