import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

const url = "http://localhost:4856/users";

function SignUpPage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Must be at least 3 characters")
        .max(15, "Must be at most 15 characters")
        .required("*Required"),
      password: Yup.string()
        .password()
        .minLowercase(1, "Password must contain at least 1 lower-case letter")
        .minUppercase(1, "Password must contain at least 1 upper-case letter")
        .minNumbers(1, "Password must contain at least 1 number")
        .minSymbols(1, "Password must contain at least 1 special character"),
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
      console.log("Response:", data);
      navigate("/login");
    },
  });

  return (
    <div>
      <section className="bg-cover bg-blend-darken bg-[url('https://images.unsplash.com/photo-1521671413015-ce2b0103c8c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80')]">
        <div className="hero-content mx-auto max-w-screen-xl lg:h-screen lg:items-center lg:flex">
          <div className="hero-content align-bottom bg-slate-50 rounded-lg text-left overflow-hidden shadow-2xl transform transition-all">
            <div className="max-w-xl text-center content-center mx-12">
              <div className="hero-content">
                <img src="./Logo.png" alt="logo" className="w-80" />
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-4 items-center bg-slate-50 bg-opacity-70 p-5 rounded-md"
              >
                <h1 className="text-2xl font-extrabold text-transparent sm:text-3xl bg-clip-text bg-gradient-to-r from-rose-300 via-blue-500 to-purple-600 drop-shadow-xl mb-5">
                  Sign up
                </h1>

                <div className="flex flex-row gap-2">
                  <div className="flex self-center text-blue-800 m-3">Name</div>
                  <input
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className="input input-bordered"
                  />
                </div>

                <div className="flex flex-row gap-2">
                  <div className="flex self-center text-blue-800">Username</div>
                  <input
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    className="input input-bordered"
                  />

                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-sm text-red-300 italic">
                      {formik.errors.username}
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-row gap-2">
                  <div className="flex self-center text-blue-800 m-1">
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

                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-sm text-red-300 italic">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="block w-full px-12 py-3 text-sm font-medium text-white bg-rose-500 border border-rose-500 rounded md:w-auto active:text-opacity-75 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring drop-shadow-xl"
                >
                  Join
                </button>
                <Link to="/login" className="text-xs hover:text-cyan-700">
                  sign in
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUpPage;

// import SignUpPage from "./Pages/SignUpPage";
// <SignUpPage />
