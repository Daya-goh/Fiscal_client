/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { format, getDaysInMonth, getMonth } from "date-fns";
const SERVER = import.meta.env.VITE_SERVER;

function Overview({ userName, token }) {
  const budgetOverviewURL = `${SERVER}rebudget`;
  const expenseOverviewURL = `${SERVER}transactions/today/`;
  const userDataURL = `${SERVER}user/:id`;
  const [allowance, setAllowance] = useState();
  const [expensesToday, setExpensesToday] = useState([]);
  const [date, setDate] = useState(new Date());
  const [userData, setUserData] = useState([]);

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

    //* Fetch user data
    fetch(userDataURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // setUserData(data);
      });
  }, [userName, token, budgetOverviewURL, expenseOverviewURL, userDataURL]);

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

  //* Display the date
  const currentDate = format(new Date(), "dd-MMM-yyyy");

  //* Calculations
  const allowanceBudgetPerDay = (allowance / numberOfDays).toFixed(2);
  const allowanceForTheDay = (allowanceBudgetPerDay - totalExpenseSum).toFixed(
    2
  );
  const expensesForTheDay = totalExpenseSum.toFixed(2);

  return (
    <>
      {/* Start: Stats Cards */}
      <div className="flex flex-col items-center">
        <h1>
          Greetings <span className="font-extrabold">{userName}</span>
        </h1>
        <h1>
          Welcome to <span className="font-extrabold">FI$CAL</span>
        </h1>
      </div>
      <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
        <div className="sm:flex sm:space-x-4">
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <div className="bg-white p-5">
              <div className="sm:flex sm:items-start">
                <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                  <h3 className="text-sm leading-6 font-medium text-gray-400">
                    Total Allowance for
                  </h3>
                  <h3 className="text-sm leading-6 font-light text-gray-400">
                    {currentMonthString}
                  </h3>
                  <p className="text-3xl font-bold text-black">${allowance}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <div className="bg-white p-5">
              <div className="sm:flex sm:items-start">
                <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                  <h3 className="text-sm leading-6 font-medium text-gray-400">
                    Allowance Budgeted for Today:
                  </h3>
                  <h3 className="text-sm leading-6 font-light text-gray-400">
                    {currentDate}
                  </h3>
                  <p className="text-3xl font-bold text-black">
                    ${allowanceBudgetPerDay}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <div className="bg-white p-5">
              <div className="sm:flex sm:items-start">
                <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                  <h3 className="text-sm leading-6 font-medium text-gray-400">
                    Total Expenses for Today
                  </h3>
                  <h3 className="text-sm leading-6 font-light text-gray-400">
                    {currentDate}
                  </h3>
                  <p className="text-3xl font-bold text-black">
                    ${expensesForTheDay}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <div className="bg-white p-5">
              <div className="sm:flex sm:items-start">
                <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                  <h3 className="text-sm leading-6 font-medium text-gray-400">
                    Allowance Balance for Today
                  </h3>
                  <h3 className="text-sm leading-6 font-light text-gray-400">
                    {currentDate}
                  </h3>
                  <p className="text-3xl font-bold text-black">
                    ${allowanceForTheDay}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End: Stats Cards */}

      {/* Start: Expense Table */}
      <div className="max-w-full mx-12 py-6 sm:mx-auto sm:px-6 lg:px-8">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Expense
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center">Amount</div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center">Description</div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex items-center">Date</div>
                </th>
              </tr>
            </thead>

            {/* map expenses to rows */}
            {expensesToday.map((expense) => {
              return (
                <tbody key={expense._id}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {expense?.name}
                    </th>
                    <td className="py-4 px-6">${expense?.amount}</td>
                    <td className="py-4 px-6">{expense?.description}</td>
                    <td className="py-4 px-6">{currentDate}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
      {/* End: Expense Table */}

      {/* QianYi References */}
      <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
        <div className="sm:flex sm:space-x-4">
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <div className="bg-white p-5">
              <div className="sm:flex sm:items-start">
                <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                  <h1 className="font-light text-red-700">
                    Overview References for QianYi (to be removed when deployed
                    to prod)
                  </h1>
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
                    <span className="font-extrabold">
                      ${allowanceBudgetPerDay}
                    </span>
                  </h1>
                  <h1>
                    Allowance balance for the day:{" "}
                    <span className="font-extrabold">
                      ${allowanceForTheDay}
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Radial Stats */}
        <div
        // className="radial-progress bg-rose-300 text-primary-content border-4 border-rose-300"
        // style={{ "--value": 20 }}
        ></div>
      </div>
    </>
  );
}

export default Overview;
