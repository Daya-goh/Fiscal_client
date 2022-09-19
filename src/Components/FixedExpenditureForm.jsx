import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

const initialValues = {
  fixedExpenditure: [
    {
      title: "",
      amount: "",
    },
  ],
};

const FixedExpenditureForm = () => (
  <div>
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
                        <label htmlFor={`fixedExpenditure.${index}.title`}>
                          Title
                        </label>
                        <Field
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
                        <label htmlFor={`fixedExpenditure.${index}.amount`}>
                          Amount
                        </label>
                        <Field
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
