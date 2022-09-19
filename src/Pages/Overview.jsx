// import { response } from "express";
import { useEffect, useState } from "react";
const SERVER = import.meta.env.VITE_SERVER;

const Overview = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const urlToday = `${SERVER}transactions/today/`;
    fetch(urlToday)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setExpenses(data);
      });
  }, []);

  //! i have to fetch the budget
  const budget = 50;
  let sum = null;
  expenses.map((entry) => (sum += entry.amount));
  console.log(sum);

  return (
    <div>
      <h1>Overview</h1>
      <div
        className="radial-progress bg-rose-300 text-primary-content border-4 border-rose-300"
        style={{ "--value": 20 }}
      >
        {budget - sum}
      </div>
    </div>
  );
};

export default Overview;
