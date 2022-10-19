import * as yup from "yup";

export const emailRule = yup
  .string()
  .email("Wrong email")
  .max(255)
  .required("Email is required");
