import { useFormik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { PersonContext } from "../App";

const url = "http://localhost:4856/rebudget/create";
const SERVER = import.meta.env.VITE_SERVER;

function RebudgetPage({ setNewBudget, token }) {
  const userID = useContext(PersonContext);
  const budgetHistoryURL = `${SERVER}rebudget`;
  const navigate = useNavigate();

  const setOldBudgetToInactive = (data) => {
    data[data.length - 2].active = false;
    // console.log(data[data.length - 2]);
    fetch(`${SERVER}rebudget/${data[data.length - 2]._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data[data.length - 2]),
    }).then((response) => response.JSON());
    // .then((dataFinal) => {
    //   console.log(dataFinal);
    //   setBudgetData(dataFinal);
    // setNewBudget(false);
    // });
  };

  //* Creation of form using Formik
  const formik = useFormik({
    initialValues: {
      income: "",
      fixedExpenditure: "",
      savings: "",
      // active: true,
    },
    validationSchema: Yup.object({
      income: Yup.number().required("Required"),
      fixedExpenditure: Yup.number()
        .min(0, "Please put 0 if there is none")
        .required("Required"),
      savings: Yup.number()
        .min(0, "Please put 0 if there is none")
        .required("Required"),
      // active: Yup.boolean().required("Required"),
    }),
    onSubmit: async (values) => {
      fetch(budgetHistoryURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // setBudgetData(data)
          setOldBudgetToInactive(data);

          // setBudgetData();
        });

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userID,
          ...values,
          allowance: values.income - values.fixedExpenditure - values.savings,
          active: true,
        }),
      });
      const data = await res.json();

      navigate("/personal/budget/history");
      setNewBudget(true);
    },
  });

  return (
    <div>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex items-center justify-center h-32 bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="umbrella"
              src="https://images.unsplash.com/photo-1524673450801-b5aa9b621b76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80"
              className="absolute inset-0 object-cover w-full h-full opacity-80"
            />

            <div className="hidden lg:block lg:relative lg:p-12 bg-white bg-opacity-20 rounded-sm">
              <h1 className="mt-3 text-4xl font-bold text-white sm:text-3xl md:text-4xl text-center">
                Create a budget!
              </h1>

              <p className="mt-4 leading-relaxed text-white/90 text-3xl sm:text-xl md:text-2xl text-center">
                Budgeting is the first step toward financial freedom.
              </p>
            </div>
          </section>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative block -mt-16 lg:hidden">
                <a
                  className="inline-flex items-center justify-center w-16 h-16 text-blue-600 bg-white rounded-full sm:w-20 sm:h-20"
                  href="/"
                >
                  <span className="sr-only">Home</span>
                  <div
                    className="h-8 sm:h-10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <img src="/logored.png" alt="logo" className="w-14" />
                  </div>
                </a>

                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Create a Budget
                </h1>

                <p className="mt-4 leading-relaxed text-white/90 text-3xl sm:text-xl md:text-2xl text-center">
                  Budgeting is the first step toward financial freedom.
                </p>
              </div>

              <form
                onSubmit={formik.handleSubmit}
                className=" flex flex-col gap-8 mx-2 items-center "
              >
                <div className="flex flex-col">
                  <label className="text-center">Income</label>
                  <input
                    id="income"
                    name="income"
                    type="number"
                    step="0.01"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.income}
                    className="input input-bordered w-full max-w-xs"
                  />
                  {formik.errors.income ? (
                    <div className="text-sm text-red-300 italic">
                      {formik.errors.income}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col">
                  <label className="text-center">Fixed Expenditure</label>
                  <input
                    id="fixedExpenditure"
                    name="fixedExpenditure"
                    type="number"
                    step="0.01"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fixedExpenditure}
                    className="input input-bordered w-full max-w-xs"
                  />
                  {formik.errors.fixedExpenditure ? (
                    <div className="text-sm text-red-300 italic">
                      {formik.errors.fixedExpenditure}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col">
                  <label className="text-center">Savings</label>
                  <input
                    id="savings"
                    name="savings"
                    type="number"
                    step="0.01"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.savings}
                    className="input input-bordered w-full max-w-xs"
                  />
                  {formik.errors.savings ? (
                    <div className="text-sm text-red-300 italic">
                      {formik.errors.savings}
                    </div>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="btn bg-rose-500 border-rose-500 hover:bg-rose-300 hover:border-rose-300 w-20"
                >
                  Submit
                </button>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}

export default RebudgetPage;
