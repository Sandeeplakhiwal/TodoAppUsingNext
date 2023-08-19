"use client";
import { Context } from "@latest/components/client/client";
import { redirect } from "next/navigation";
import React, { useContext } from "react";

function Page() {
  const { user } = useContext(Context);
  if (!user._id) return redirect("/login");
  return (
    <div className="profile">
      <section>
        <main>
          <h1 className="profile_username">Dear {user.name}</h1>
          <p className="profile_useremail">{user.email}</p>
        </main>
      </section>
    </div>
  );
}

export default Page;
