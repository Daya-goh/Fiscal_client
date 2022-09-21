import { useState, useEffect } from "react";
const SERVER = import.meta.env.VITE_SERVER;

function UserBudgetLog() {
  const [budget, setBudget] = useState([]);

  //* fetch budget data
  useEffect(() => {
    const urlBudget = `${SERVER}budget/active`;
    fetch(urlBudget)
      .then((response) => response.json())
      .then((data) => {
        setBudget(data);
      });
  }, []);

  return (
    <>
      {/* <table>
        <caption>Budget Log</caption>
        <thead>
          <tr>
            <th>{budget.income}</th>
            <th>{budget.income}</th>
            <th>Fixed Expenses</th>
            <th>Savings</th>
          </tr>
        </thead>
        <tbody>
          {budget.map((r) => (
            <tr key={r._id}>
              <td>{r.income?.title}</td>
              <td>{r.income?.amount}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <div>
        <h1>{budget.income?.title}</h1>
      </div>
    </>
  );
}

export default UserBudgetLog;
