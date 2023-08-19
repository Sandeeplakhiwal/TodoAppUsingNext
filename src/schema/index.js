import * as Yup from "yup";

export const signupSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your avatar name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().required("Please enter your password"),
});
