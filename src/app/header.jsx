import Link from "next/link";
import React from "react";
import { LogoutBtn } from "../components/client/client";

function header() {
  return (
    <div className="header">
      <Link href={"/"}>DearTodo</Link>
      <div className="navMenu">
        <Link href={"/"}>Home</Link>
        <Link href={"/about"}>About</Link>
        <LogoutBtn />
      </div>
    </div>
  );
}

export default header;
