/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { format, getDaysInMonth, getMonth } from "date-fns";
const SERVER = import.meta.env.VITE_SERVER;

function Overview({ userName, token }) {
  const budgetOverviewURL = `${SERVER}rebudget/active`;
  const expenseOverviewURL = `${SERVER}transactions/today/`;
  const userDataURL = `${SERVER}user/:id`;
  const [allowance, setAllowance] = useState();
  const [expensesToday, setExpensesToday] = useState([]);
  const [date, setDate] = useState(new Date());
  // const [userData, setUserData] = useState([]);

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
        // console.log(data);
        setExpensesToday(data);
      });

    // //* Fetch user data
    // fetch(userDataURL, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     // setUserData(data);
    //   });
  }, [userName, token, budgetOverviewURL, expenseOverviewURL, userDataURL]);

  //* Using the fetched transaction data (expense amount) for today and sum
  let totalExpenseSum = 0;
  expensesToday.map((entry) => (totalExpenseSum += entry.amount));
  // console.log(totalExpenseSum);

  //* Get the number of days in a month of a given date
  const currentMonth = getMonth(date);
  const numberOfDays = getDaysInMonth(date);
  // console.log(currentMonth);
  // console.log(numberOfDays);

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
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex items-center justify-center h-32 bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="umbrella"
              src="https://images.unsplash.com/photo-1531012451721-432c0ae74527?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              className="absolute inset-0 object-cover w-full h-full opacity-80"
            />

            <div className="hidden lg:block lg:relative lg:p-12 bg-white bg-opacity-20 rounded-sm">
              <h1 className="mt-3 text-4xl font-bold text-white sm:text-3xl md:text-4xl text-center">
                FI$CAL
              </h1>

              <p className="mt-4 leading-relaxed text-white/90 text-3xl sm:text-xl md:text-2xl text-center">
                Have you logged your expenses for today?
              </p>
            </div>
          </section>

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
                  FI$CAL
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Have you logged your expenses for today?
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex flex-row gap-8 items-center">
                  <div
                    className={`radial-progress text-primary-content border-4 items-center ${
                      allowanceForTheDay > 0 ? `bg-teal-600` : `bg-red-600`
                    }`}
                    style={{
                      "--value": "70",
                      "--size": "12rem",
                      "--thickness": "1rem",
                    }}
                  >
                    <p>Left</p>${allowanceForTheDay}
                  </div>

                  <div className=" flex flex-col">
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow mb-4 w-56 h-28">
                      <div className="bg-white p-5">
                        <div className="sm:flex sm:items-start">
                          <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                            <h3 className="text-sm leading-6 font-medium text-gray-400">
                              Allowance:
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

                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow mb-4 w-56 h-28">
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
                  </div>
                </div>

                <div className="max-w-full mx-12 py-6 sm:mx-auto sm:px-6 lg:px-8">
                  <table className=" text-sm text-left text-gray-500 dark:text-gray-400 rounded-xl">
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
                              {expense?.category.category}
                            </th>
                            <td className="py-4 px-6">${expense?.amount}</td>
                            <td className="py-4 px-6">{expense?.name}</td>
                            <td className="py-4 px-6">{currentDate}</td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}

export default Overview;
