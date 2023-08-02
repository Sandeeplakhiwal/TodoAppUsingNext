import Link from "next/link";
import React from "react";
import { LogoutBtn } from "../components/client/client";

function Header() {
  return (
    <div className="header">
      <h3>DearTodo :)</h3>
      <div className="navMenu">
        <Link href={"/"}>Home</Link>
        <Link href={"/profile"}>Profile</Link>
        <LogoutBtn />
      </div>
    </div>
  );
}

export default Header;
