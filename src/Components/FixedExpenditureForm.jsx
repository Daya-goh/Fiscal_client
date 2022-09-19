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
                  Add New Fixed Expenditure
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

export default FixedExpenditureForm;
