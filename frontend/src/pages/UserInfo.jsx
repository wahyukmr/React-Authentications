import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../auth/useToken";
import useUser from "../auth/useUser";

export default function UserInfoPage() {
  const [token, setToken] = useToken();
  const [showMessage, setShowMessage] = useState("");
  const navigate = useNavigate();

  const user = useUser();
  const { id, email, info } = user;

  const saveChangesHandle = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/auth/${id}`,
        {
          favoriteFood: values.favoriteFood,
          hairColor: values.hairColor,
          bio: values.bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setToken(response.data.token);
      setShowMessage("Successfully saved user data!");
    } catch (error) {
      setShowMessage(
        (error.response?.data.message || error.message) ??
          "something went wrong we couldn't save changes!"
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      favoriteFood: info?.favoriteFood ?? "",
      hairColor: info?.hairColor ?? "",
      bio: info?.bio ?? "",
    },
    onSubmit: (values, actions) => {
      setTimeout(() => {
        saveChangesHandle(values);
        actions.setSubmitting(false);
      }, 400);
    },
  });

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage("");
      }, 4000);
    }
  }, [showMessage]);

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  console.log(info);

  const resetValues = () => {
    formik.resetForm({
      values: {
        favoriteFood: info?.favoriteFood ?? "",
        hairColor: info?.hairColor ?? "",
        bio: info?.bio ?? "",
      },
    });
  };

  const userName = email.split("@")[0];
  const successMessage =
    showMessage === "Successfully saved user data!" ? "success" : "fail";

  return (
    <form onSubmit={formik.handleSubmit} className="content-container">
      <h1>Info for {userName}</h1>
      {showMessage && <div className={successMessage}>{showMessage}</div>}
      <label>
        Favorite Food:
        <input
          name="favoriteFood"
          onChange={formik.handleChange}
          value={formik.values.favoriteFood}
          aria-description="favoriteFood value should be a string"
        />
      </label>
      <label>
        Hair Color:
        <input
          name="hairColor"
          onChange={formik.handleChange}
          value={formik.values.hairColor}
          aria-description="Hair Color value should be a string"
        />
      </label>
      <label>
        Bio:
        <input
          name="bio"
          onChange={formik.handleChange}
          value={formik.values.bio}
          aria-description="Bio value should be a string, number or both"
        />
      </label>
      <hr />
      <button type="submit" disabled={showMessage || formik.isSubmitting}>
        Save Changes
      </button>
      <button
        type="button"
        disabled={showMessage || formik.isSubmitting}
        onClick={resetValues}
      >
        Reset Values
      </button>
      <button type="button" onClick={logOut}>
        Log Out
      </button>
    </form>
  );
}
