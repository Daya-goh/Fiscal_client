import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

const initialValues = {
  income: [
    {
      title: "",
      amount: "",
    },
  ],
};

const IncomeForm = () => (
  <div>
    <h1 className="font-bold">INCOME</h1>
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="income">
            {({ insert, remove, push }) => (
              <div>
                {values.income.length > 0 &&
                  values.income.map((income, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <label htmlFor={`income.${index}.title`}>Title</label>
                        <Field
                          name={`income.${index}.title`}
                          placeholder="e.g. Salary"
                          type="text"
                        />
                        <ErrorMessage
                          name={`income.${index}.title`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <label htmlFor={`income.${index}.amount`}>Amount</label>
                        <Field
                          name={`income.${index}.amount`}
                          placeholder="1000"
                          type="number"
                        />
                        <ErrorMessage
                          name={`income.${index}.title`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="secondary"
                  onClick={() => push({ title: "", amount: "" })}
                >
                  Add New Income
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default IncomeForm;
