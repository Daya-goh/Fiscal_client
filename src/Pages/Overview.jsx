/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { format, getDaysInMonth, getMonth } from "date-fns";
const SERVER = import.meta.env.VITE_SERVER;

function Overview({ userName, token }) {
  const budgetOverviewURL = `${SERVER}rebudget`;
  const expenseOverviewURL = `${SERVER}transactions/today/`;
  const [allowance, setAllowance] = useState();
  const [expensesToday, setExpensesToday] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    //* Fetch budget data
    fetch(budgetOverviewURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setAllowance(data[0].allowance));

    //* Fetch transaction data
    fetch(expenseOverviewURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setExpensesToday(data);
      });
  }, [userName, token, budgetOverviewURL, expenseOverviewURL]);

  //* Using the fetched transaction data (expense amount) for today and sum
  let totalExpenseSum = 0;
  expensesToday.map((entry) => (totalExpenseSum += entry.amount));
  console.log(totalExpenseSum);

  //* Get the number of days in a month of a given date
  const currentMonth = getMonth(date);
  const numberOfDays = getDaysInMonth(date);
  console.log(currentMonth);
  console.log(numberOfDays);

  //* Display the month in string
  const currentMonthString = format(new Date(), "MMMM");

  //* Calculations
  const allowanceBudgetPerDay = (allowance / numberOfDays).toFixed(2);
  const allowanceForTheDay = (allowanceBudgetPerDay - totalExpenseSum).toFixed(
    2
  );
  const expensesForTheDay = totalExpenseSum.toFixed(2);

  return (
    <>
      <h1>
        Greetings <span className="font-extrabold">{userName}</span>, welcome to{" "}
        <span className="font-bold">FI$CAL</span>
      </h1>
      <div>
        <h1>Overview</h1>
        <h1>
          Current Month:{" "}
          <span className="font-extrabold">{currentMonthString}</span>
        </h1>
        <h1>
          Number of Days in {currentMonthString}:{" "}
          <span className="font-extrabold">{numberOfDays}</span>
        </h1>
        <h1>
          Total Allowances for the month:{" "}
          <span className="font-extrabold">${allowance}</span>
        </h1>
        <h1>
          Total Expenses for the day:{" "}
          <span className="font-extrabold">${expensesForTheDay}</span>
        </h1>
        <h1>
          Allowance budget per day:{" "}
          <span className="font-extrabold">${allowanceBudgetPerDay}</span>
        </h1>
        <h1>
          Allowance balance for the day:{" "}
          <span className="font-extrabold">${allowanceForTheDay}</span>
        </h1>

        <div
        // className="radial-progress bg-rose-300 text-primary-content border-4 border-rose-300"
        // style={{ "--value": 20 }}
        ></div>
      </div>
    </>
  );
}

export default Overview;
