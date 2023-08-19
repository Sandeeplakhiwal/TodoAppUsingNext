"use client";
import { Context } from "@latest/components/client/client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import { signupSchema } from "@latest/schema";
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
      validationSchema: signupSchema,
      onSubmit: (values, action) => {
        submitHandler(values);
        action.resetForm();
      },
    });

  const submitHandler = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(formData),
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
        <form onSubmit={handleSubmit}>
          <input
            type={"text"}
            placeholder="Username"
            name="name"
            id="name"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.name && touched.name ? (
            <p className="input-err-p">{errors.name}</p>
          ) : null}
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

          <button type="submit">{loading ? "Loading..." : "Signup"}</button>
          <p>OR</p>
          <Link href={"/login"}>Login into existing account</Link>
        </form>
      </section>
    </div>
  );
}

export default Page;
