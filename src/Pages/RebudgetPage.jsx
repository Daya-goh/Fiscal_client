import { useFormik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { PersonContext } from "../App";

const url = "http://localhost:4856/rebudget";

function RebudgetPage({ setNewBudget }) {
    const userID = useContext(PersonContext); 
    const navigate = useNavigate(); 

  //* Creation of form using Formik
  const formik = useFormik({
    initialValues: {
      income: "",
      fixedExpenditure: "",
      savings: "",
      active: true,
    },
    validationSchema: Yup.object({
      income: Yup.number().required("Required"),
      fixedExpenditure: Yup.number()
        .min(0, "Please put 0 if there is none")
        .required("Required"),
      savings: Yup.number()
        .min(0, "Please put 0 if there is none")
        .required("Required"),
      active: Yup.boolean().required("Required"),
    }),
    onSubmit: async (values) => {
      alert(
        JSON.stringify({ user_id: userID, 
          ...values,
          allowance: values.income - values.fixedExpenditure - values.savings,
        }, null, 2)
      );

      const res = await fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json", 
        }, 
        body: JSON.stringify({ user_id: userID, 
            ...values,
            allowance: values.income - values.fixedExpenditure - values.savings,
          })
      }); 
      const data = await res.json(); 
      console.log("New Budget created:", data);
      navigate("/personal/budget/history"); 
      setNewBudget(true); 
    },
  });

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="expense flex flex-col gap-8 mx-2 "
      >
        <div className="flex flex-col">
          <label>Income</label>
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
          <label>Fixed Expenditure</label>
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
          <label>Savings</label>
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

        <div className="flex flex-col">
          <label>Active</label>
          <select
            name="active"
            onChange={formik.handleChange}
            className="input input-bordered w-full max-w-xs"
          >
            {" "}
            <option selected value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          {formik.errors.active ? (
            <div className="text-sm text-red-300 italic">
              {formik.errors.active}
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
  );
}

export default RebudgetPage;
