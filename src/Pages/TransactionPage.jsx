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

  useEffect(() => {
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
  }, [date, userID]);

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
        budget: 50,
        logArray: [],
        remainder: 50,
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
        day.remainder = day.remainder - expense.amount;
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
    <div>
      <div>
        <h1>Transaction Page</h1>
      </div>
      <button className="btn" onClick={handlePrevious}>
        previous
      </button>
      <button className="btn" onClick={handleNext}>
        Next
      </button>

      <div>
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
  );
};

export default TransactionPage;

// import TransactionPage from "./Pages/TransactionPage";
// <TransactionPage setRemainder={setRemainder} />
