import { format } from "date-fns";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
const SERVER = import.meta.env.VITE_SERVER;

const UpdateExpense = ({ targetExpense, token }) => {
  console.log(targetExpense);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  /* ------------------- fetch data for category ------------------ */
  useEffect(() => {
    const urlCategory = `${SERVER}category/`;
    fetch(urlCategory, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
      });
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      //! fill user_id and budget_id info after validation
      user_id: targetExpense.user_id,
      budget_id: targetExpense.budget_id,
      category: targetExpense?.category,
      date: targetExpense?.date?.split("T")[0],
      amount: targetExpense?.amount,
      name: targetExpense?.name,
      description: targetExpense?.description,
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
      const urlExpense = `${SERVER}expense/${targetExpense._id}`;
      fetch(urlExpense, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      //!on submit navigate to overview page
      navigate("/personal/transactions");
    },
  });

  const handleDelete = (event) => {
    console.log(event.target.id);
    const urlDelete = `${SERVER}expense/delete/${event.target.id}`;
    fetch(urlDelete, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    navigate("/personal/transactions");
  };

  return (
    <div>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
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
                  Update your expenses
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Do not save what is left after spending but spend what is left
                  after saving.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <form
                  onSubmit={formik.handleSubmit}
                  className="expense flex flex-col gap-8 mx-2 items-center"
                >
                  <div className="flex flex-col">
                    <label className="text-center">Category</label>
                    <select
                      name="category"
                      onChange={formik.handleChange}
                      className="input input-bordered w-60 max-w-xs text-center"
                      value={formik.values.category}
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
                    <label className="text-center">Date of expense</label>
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
                      <div className="text-sm text-red-300 italic">
                        {formik.errors.date}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-center">Amount</label>
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
                      <div className="text-sm text-red-300 italic">
                        {formik.errors.amount}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-center">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      className="input input-bordered w-60 max-w-xs text-center"
                    />
                    {formik.errors.name ? (
                      <div className="text-sm text-red-300 italic">
                        {formik.errors.name}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-center">Description</label>
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
                  <button className="btn bg-rose-500 border-rose-500 hover:bg-rose-300 hover:border-rose-300 w-20">
                    Update
                  </button>
                </form>
                <button
                  onClick={(event) => handleDelete(event)}
                  className="btn bg-blue-500 border-blue-500 hover:bg-blue-300 hover:border-blue-300 w-20"
                  id={targetExpense._id}
                >
                  Delete
                </button>
              </div>
            </div>
          </main>

          <section className="relative flex items-center justify-center h-32 bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="umbrella"
              src="https://images.unsplash.com/photo-1526653054275-5a4f37ea1c64?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
              className="absolute inset-0 object-cover w-full h-full opacity-80"
            />

            <div className="hidden lg:block lg:relative lg:p-12 bg-white bg-opacity-20 rounded-sm">
              <h1 className="mt-3 text-4xl font-bold text-white sm:text-3xl md:text-4xl text-center">
                Update your expenses
              </h1>

              <p className="mt-4 leading-relaxed text-white/90 text-3xl sm:text-xl md:text-2xl text-center">
                Do not save what is left after spending but spend what is left
                after saving.
              </p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default UpdateExpense;
