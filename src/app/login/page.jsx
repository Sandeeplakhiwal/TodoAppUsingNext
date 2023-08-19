"use client";
import { Context } from "@latest/components/client/client";
import { redirect } from "next/navigation";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { loginSchema } from "@latest/schema";
import { useFormik } from "formik";

function Page() {
  const { user, setUser } = useContext(Context);

  const [loading, setLoading] = useState(false);

  // Defined Initial Values of FormData
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  // Using Formik to handle Form Validation
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        loginHandler(values);
        action.resetForm();
      },
    });

  const loginHandler = async (formData) => {
    setLoading(true);
    try {
      document.getElementById("loginBtn").disabled = true;
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(formData),
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
        <form onSubmit={handleSubmit}>
          <label htmlFor="Email" />
          <input
            type={"email"}
            placeholder="Email"
            name="email"
            id="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.email && touched.email ? (
            <p className="input-err-p">{errors.email}</p>
          ) : null}

          <label htmlFor="Password" />

          <input
            type={"password"}
            placeholder="Password"
            name="password"
            id="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.password && touched.password ? (
            <p className="input-err-p">{errors.password}</p>
          ) : null}

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
