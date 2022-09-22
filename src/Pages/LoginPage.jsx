import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";

const url = "http://localhost:4856/login";

function LoginPage({ setUsername, setToken }) {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("*Required"),
      password: Yup.string().required("*Required"),
    }),
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      console.log("Response for login:", data);
      console.log(data);
      setUsername(data.userid);
      setToken(data.token);
      navigate("/personal");
    },
  });

  return (
    <div
      className=" w-screen h-screen bg-cover "
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1521671413015-ce2b0103c8c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80")`,
      }}
    >
      <div className=" flex flex-col items-center justify-center w-screen h-screen bg-cover bg-opacity-40 bg-white">
        <div>
          <img src="/logo.png" alt="logo" className="h-48 w-auto m-2" />
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 items-center bg-slate-50 bg-opacity-70 p-5 rounded-md"
        >
          <div className="flex flex-col">
            <div className="flex flex-row w-72 justify-between">
              <div className="flex self-center">Username</div>
              <input
                name="username"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className="input input-bordered"
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-sm text-red-500 italic">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row w-72 justify-between">
              <div className="flex self-center">Password</div>
              <input
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="input input-bordered"
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-sm text-red-500 italic">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="btn btn-error w-20 hover:bg-red-300 hover:border-red-300"
          >
            Login
          </button>
          <Link to="/signup" className="text-xs hover:text-cyan-700">
            sign up
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

// import LoginPage from "./Pages/LoginPage";
// <LoginPage />
