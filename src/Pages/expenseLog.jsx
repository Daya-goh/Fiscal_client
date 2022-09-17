import { useFormik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import * as Yup from "yup";
const SERVER = import.meta.env.VITE_SERVER;

const ExpenseForm = () => {
  const [category, setCategory] = useState([]);
  /* ------------------- fetch data for category ------------------ */
  useEffect(() => {
    const urlCategory = `${SERVER}category/`;
    fetch(urlCategory)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCategory(data);
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
      console.log("submit");
      console.log(JSON.stringify(values));
      alert(JSON.stringify(values, null, 2));
      const urlExpense = `${SERVER}expense/`;
      fetch(urlExpense, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      //!on submit navigate to overview page
    },
  });
  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="expense flex flex-col gap-8 mx-2 "
      >
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold ">Log Your Expenses</h1>
        </div>

        <div className="flex flex-col">
          <label>Category</label>
          <select
            name="category"
            onChange={formik.handleChange}
            className="input input-bordered w-full max-w-xs"
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
            <div className="text-sm text-red-300 italic">
              {formik.errors.category}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <label>Date of expense</label>
          <input
            id="date"
            name="date"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
            className="input input-bordered w-full max-w-xs"
          />
          {formik.touched.date && formik.errors.date ? (
            <div className="text-sm text-red-300 italic">
              {formik.errors.date}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <label>Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.amount}
            className="input input-bordered w-full max-w-xs"
          />
          {formik.errors.amount ? (
            <div className="text-sm text-red-300 italic">
              {formik.errors.amount}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <label>Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name.toLocaleLowerCase()}
            className="input input-bordered w-full max-w-xs"
          />
          {formik.errors.name ? (
            <div className="text-sm text-red-300 italic">
              {formik.errors.name}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <label>Description</label>
          <input
            id="description"
            name="description"
            type="textarea"
            placeholder="Optional"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <button type="submit" className="btn btn-error w-20">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
