import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

const initialValues = {
  savings: [
    {
      title: "",
      amount: "",
    },
  ],
};

const SavingsForm = () => (
  <div>
    <h1 className="font-bold">SAVINGS</h1>
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="savings">
            {({ insert, remove, push }) => (
              <div className="flex-auto">
                {values.savings.length > 0 &&
                  values.savings.map((savings, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <label htmlFor={`savings.${index}.title`}>Title</label>
                        <Field
                          name={`savings.${index}.title`}
                          placeholder="e.g. Salary"
                          type="text"
                        />
                        <ErrorMessage
                          name={`savings.${index}.title`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <label htmlFor={`savings.${index}.amount`}>
                          Amount
                        </label>
                        <Field
                          name={`savings.${index}.amount`}
                          placeholder="1000"
                          type="number"
                        />
                        <ErrorMessage
                          name={`savings.${index}.title`}
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
                  Add New savings
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

export default SavingsForm;
