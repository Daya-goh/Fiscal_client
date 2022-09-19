import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as yup from "yup";

const initialValues = {
  fixedExpenditure: [
    {
      title: "",
      amount: "",
    },
  ],
};

let validationSchema = yup.object().shape({
  title: yup.string().required("title is required"),
  amount: yup.string().required("Amount is required"),
});

const FixedExpenditureForm = () => (
  <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <h1 className="font-bold">FIXED EXPENDITURE</h1>
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="fixedExpenditure">
            {({ insert, remove, push }) => (
              <div>
                {values.fixedExpenditure.length > 0 &&
                  values.fixedExpenditure.map((fixedExpenditure, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 mt-2"
                          htmlFor={`fixedExpenditure.${index}.title`}
                        >
                          Title
                        </label>
                        <Field
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          name={`fixedExpenditure.${index}.title`}
                          placeholder="e.g. Medical Insurance"
                          type="text"
                        />
                        <ErrorMessage
                          name={`fixedExpenditure.${index}.title`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 mt-2"
                          htmlFor={`fixedExpenditure.${index}.amount`}
                        >
                          Amount
                        </label>
                        <Field
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                          name={`fixedExpenditure.${index}.amount`}
                          placeholder="1000"
                          type="number"
                        />
                        <ErrorMessage
                          name={`fixedExpenditure.${index}.title`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="secondary text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="secondary text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2"
                  onClick={() => push({ title: "", amount: "" })}
                >
                  Add New Fixed Expenditure
                </button>
              </div>
            )}
          </FieldArray>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default FixedExpenditureForm;
