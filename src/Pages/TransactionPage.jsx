import { getDate, getDaysInMonth, getMonth, getYear } from "date-fns";
import { useContext, useState } from "react";
import { useEffect } from "react";
import sub from "date-fns/sub";
import { add } from "date-fns";
import DayTransaction from "../Components/DayTransaction";
import { PersonContext } from "../App";

const SERVER = import.meta.env.VITE_SERVER;

const TransactionPage = ({ setTargetExpense, token }) => {
  const [transaction, setTransaction] = useState([]);
  const [date, setDate] = useState(new Date());
  const userID = useContext(PersonContext);
  const [budget, setBudget] = useState([]);

  useEffect(() => {
    //* fetch budget data
    const budgetURL = `${SERVER}rebudget/active`;
    fetch(budgetURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((budgetData) => {
        setBudget(budgetData[0].allowance);
      });

    const month = getMonth(date) + 1;

    const transactionUrl = `${SERVER}transactions/${month}`;
    fetch(transactionUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const x = renderArray(data, date);
        setTransaction(x);
      });
  }, [date, userID, budget]);

  //* function to handle logic
  const renderArray = (data, date) => {
    const currentMonth = getMonth(date); //index
    const currentYear = getYear(date);
    const numberOfDays = getDaysInMonth(date);

    let array = []; //to store containers for transactions per day
    //creates container for each day of the month
    for (let i = 1; i <= numberOfDays; i++) {
      //container to hold data
      const dayContainer = {
        date: `${i}-${currentMonth + 1}-${currentYear}`,
        budget: (budget / numberOfDays).toFixed(2),
        logArray: [],
        remainder: (budget / numberOfDays).toFixed(2),
      };
      array.push(dayContainer);
    }

    //for each day container -> push the expenses of that day into it
    data.forEach((log) => {
      // -1 due to index positioning of array

      array[getDate(Date.parse(log.date)) - 1]?.logArray.push(log);
    });

    //Number(log.date.split("T")[0].split("-")[2]

    //calculating the leftover
    for (const day of array) {
      for (const expense of day.logArray) {
        day.remainder = (day.remainder - expense.amount).toFixed(2);
      }
    }

    return array;
  };
  //-1 due to array position

  const handlePrevious = () => {
    const newDate = sub(date, { months: 1 });
    setDate(newDate);
  };

  const handleNext = () => {
    const newDate = add(date, { months: 1 });
    setDate(newDate);
  };

  return (
    <div
      className="w-screen h-100% bg-fill bg-repeat"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1569959661415-5106de399f49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")`,
      }}
    >
      <div className="bg-white bg-opacity-60">
        <div className="flex justify-center items-center">
          <button
            className="btn btn-circle btn-outline border-0"
            onClick={handlePrevious}
          >
            <span className="text-4xl">&#8606;</span>
          </button>
          <h1 className="font-bold text-4xl m-6">Transaction Page</h1>
          <button
            className="btn btn-circle btn-outline border-0"
            onClick={handleNext}
          >
            <span className="text-4xl">&#8608;</span>
          </button>
        </div>
        <div className="flex flex-row items-center justify-center w-screen">
          <div className="flex flex-row flex-wrap justify-around w-1/2">
            {transaction.map((dailyOverview, index) => (
              <DayTransaction
                dailyOverview={dailyOverview}
                key={index}
                setTargetExpense={setTargetExpense}
                token={token}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;

// import TransactionPage from "./Pages/TransactionPage";
// <TransactionPage setRemainder={setRemainder} />
