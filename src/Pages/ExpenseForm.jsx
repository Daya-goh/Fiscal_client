import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { PersonContext } from "../App";

const SERVER = import.meta.env.VITE_SERVER;

const ExpenseForm = ({ token }) => {
  const [category, setCategory] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const navigate = useNavigate();
  const userID = useContext(PersonContext);
  console.log(userID);

  /* ------------------- fetch data for category ------------------ */
  useEffect(() => {
    const urlCategory = `${SERVER}category/`;
    fetch(urlCategory)
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
      });
    const urlActiveBudget = `${SERVER}rebudget/active/`;
    fetch(urlActiveBudget, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBudgetData(data);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      category: "",
      date: new Date().toLocaleDateString("en-CA"),
      amount: "",
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      category: Yup.string().required("Required"),
      date: Yup.date()
        .max(new Date(), "Cannot log future expenses")
        .required("Required"),
      amount: Yup.number()
        .min(0, "cost cannot be negative!")
        .required("Required"),
      name: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      alert(
        JSON.stringify(
          { user_id: userID, budget_id: budgetData[0]?._id, ...values },
          null,
          2
        )
      );
      const urlExpense = `${SERVER}expense/`;
      fetch(urlExpense, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userID,
          budget_id: budgetData[0]?._id,
          ...values,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));

      //on submit navigate to overview page
      navigate("/personal/transactions");
    },
  });

  return (
    <div>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex items-center justify-center h-32 bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="umbrella"
              src="https://images.unsplash.com/photo-1571152852353-4960a32df75a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"
              className="absolute inset-0 object-cover w-full h-full opacity-80"
            />

            <div className="hidden lg:block lg:relative lg:p-12 bg-white bg-opacity-20 rounded-sm">
              <h1 className="mt-3 text-4xl font-bold text-white sm:text-3xl md:text-4xl text-center">
                FI$CAL
              </h1>

              <p className="mt-4 leading-relaxed text-white/90 text-3xl sm:text-xl md:text-2xl text-center">
                Beware of little expenses.
              </p>
              <p className="mt-4 leading-relaxed text-white/90 text-3xl sm:text-xl md:text-2xl text-center">
                A small leak will sink great ship.
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
                  FI$CAL
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Beware of little expenses. A small leak will sink great ship.
                </p>
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className=" flex flex-col gap-6 items-center "
              >
                <div className="flex flex-col items-center">
                  <h1 className="text-4xl font-bold ">Log Your Expenses</h1>
                </div>

                <div className="flex flex-col items-center">
                  <label>Category</label>
                  <select
                    name="category"
                    onChange={formik.handleChange}
                    className="input input-bordered w-60 max-w-md text-center"
                  >
                    {" "}
                    <option value="">Please choose an option</option>
                    {category.map((cat) => (
                      <option value={cat._id} key={cat._id}>
                        {cat.category}
                      </option>
                    ))}
                  </select>
                  {formik.errors.category ? (
                    <div className="text-sm text-red-500 italic">
                      {formik.errors.category}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col items-center">
                  <label>Date of expense</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                    className="input input-bordered w-60 max-w-xs text-center"
                  />
                  {formik.touched.date && formik.errors.date ? (
                    <div className="text-sm text-red-500 italic">
                      {formik.errors.date}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col items-center">
                  <label>Amount</label>
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.amount}
                    className="input input-bordered w-60 max-w-xs text-center"
                  />
                  {formik.errors.amount ? (
                    <div className="text-sm text-red-500 italic">
                      {formik.errors.amount}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col items-center">
                  <label>Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name.toLocaleLowerCase()}
                    className="input input-bordered w-60 max-w-xs text-center"
                  />
                  {formik.errors.name ? (
                    <div className="text-sm text-red-500 italic">
                      {formik.errors.name}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col items-center">
                  <label>Description</label>
                  <input
                    id="description"
                    name="description"
                    type="textarea"
                    placeholder="Optional"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    className="input input-bordered w-60 max-w-xs text-center"
                  />
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
};

export default ExpenseForm;

// import { useState } from "react";
// import ExpenseForm from "./Pages/ExpenseForm";
// const [remainder, setRemainder] = useState("");
// <ExpenseForm remainder={remainder} />
