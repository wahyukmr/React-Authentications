import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useToken from "../auth/useToken";

export default function SignUpPage() {
  const [errorMsg, setErrorMsg] = useState("");
  const [, setToken] = useToken();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .matches(/(?=.*[0-9])/, "Password must contain numbers")
        .min(8, "Password of at least 8 characters")
        .required("Required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password")],
        "Confirm password must be the same as password"
      ),
    }),
    onSubmit: (values, helpers) => {
      onSignUpHandle(values);
      helpers.resetForm();
    },
  });

  const onSignUpHandle = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/signup",
        {
          email: values.email,
          password: values.password,
        }
      );
      setToken(response.data.token);
      navigate("/");
    } catch (error) {
      setErrorMsg(error.response?.data.message ?? error.message);
    }
  };

  const onLogInHandle = () => navigate("/login");

  useEffect(() => {
    if (errorMsg) {
      const hideErrorMessage = setTimeout(() => {
        setErrorMsg("");
      }, 4000);
      return () => clearTimeout(hideErrorMessage);
    }
  }, [errorMsg]);

  const isValid =
    formik.isValid &&
    formik.values.email &&
    formik.values.password &&
    formik.values.confirmPassword &&
    !errorMsg;

  return (
    <form onSubmit={formik.handleSubmit} className="content-container">
      <h1>Sign Up</h1>
      <input
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="someone@gmail.com"
        type="text"
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}
      <input
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="password"
        type="password"
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}
      <input
        name="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="password"
        type="password"
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <div>{formik.errors.confirmPassword}</div>
      ) : null}
      {errorMsg && <div className="fail">{errorMsg}</div>}

      <hr />
      <button disabled={!isValid} type="submit">
        Sign Up
      </button>
      <button onClick={onLogInHandle} type="button">
        Already have an account? log in
      </button>
    </form>
  );
}
