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

      if (data.msg === "No such user found.") {
        alert("No such user found. Please create an account.");
        navigate("/login");
      } else if (data.msg === "Wrong password.") {
        alert("Wrong password. Please try again.");
        navigate("/login");
      } else {
        setUsername(data.userid);
        setToken(data.token);
        navigate("/personal");
      }
    },
  });

  return (
    <div>
      <section className="bg-cover bg-blend-darken bg-[url('https://images.unsplash.com/photo-1521671413015-ce2b0103c8c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80')]">
        <div className="hero-content mx-auto max-w-screen-xl lg:h-screen lg:items-center lg:flex">
          <div className="hero-content align-bottom bg-slate-50 rounded-lg text-left overflow-hidden shadow-2xl transform transition-all">
            <div className="max-w-xl mx-auto text-center mb-4">
              <div className="hero-content">
                <img src="./Logo.png" alt="logo" className="w-80" />
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-4 items-center bg-slate-50 bg-opacity-70 p-5 mx-14 rounded-md"
              >
                <div className="flex flex-col">
                  <div className="flex flex-row w-72 justify-between">
                    <div className="flex self-center text-blue-800 font-light mr-2">
                      Username
                    </div>
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
                    <div className="flex self-center text-blue-800 font-light mr-3">
                      Password
                    </div>
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
                    <div className="text-sm text-rose-500 italic">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="block w-full px-12 py-3 text-sm font-medium text-white bg-rose-500 border border-rose-500 rounded md:w-auto active:text-opacity-75 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring drop-shadow-xl"
                >
                  Login
                </button>
                <Link to="/signup" className="text-xs hover:text-cyan-700">
                  sign up
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;

// import LoginPage from "./Pages/LoginPage";
// <LoginPage />
