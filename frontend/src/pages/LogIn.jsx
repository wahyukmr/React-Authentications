import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useToken from "../auth/useToken";

export default function LogInPage() {
  const [errorMsg, setErrorMsg] = useState("");
  const [, setToken] = useToken();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .matches(/(?=.*[0-9])/, "Password must contain numbers")
        .min(8, "Password of at least 8 characters")
        .required("Required"),
    }),
    onSubmit: (values, helpers) => {
      onLogInHandle(values);
      helpers.resetForm();
    },
  });

  const onLogInHandle = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        { email: values.email, password: values.password }
      );
      setToken(response.data.token);
      navigate("/");
    } catch (error) {
      setErrorMsg(error.response?.data.message ?? error.message);
    }
  };

  const onForgotPasswordHandle = () => {
    navigate("/forgot-password");
  };

  const onSignUpHandle = () => {
    navigate("/signup");
  };

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
    !errorMsg;

  return (
    <form onSubmit={formik.handleSubmit} className="content-container">
      <h1>Log In</h1>
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
      {errorMsg && <div className="fail">{errorMsg}</div>}

      <hr />
      <button disabled={!isValid} type="submit">
        Log In
      </button>
      <button onClick={onForgotPasswordHandle} type="button">
        Forgot your password?
      </button>
      <button onClick={onSignUpHandle} type="button">
        {"Don't have an account? Sign Up"}
      </button>
    </form>
  );
}
