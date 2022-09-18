import { useState } from "react";
import { useEffect } from "react";
import { render } from "react-dom";

const SERVER = import.meta.env.VITE_SERVER;

const TransactionPage = () => {
  useEffect(() => {
    const month = new Date().getMonth() + 1;
    // console.log(month);
    const transactionUrl = `${SERVER}transactions/${month}`;
    fetch(transactionUrl)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setTransaction(data);
      });
  }, []);
  const [transaction, setTransaction] = useState([]);

  const calendarArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const currentMonth = new Date().getMonth(); //index
  const currentYear = new Date().getFullYear();
  const numberOfDays = calendarArray[currentMonth];

  let array = [];

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
  transaction.forEach((log) => {
    // -1 due to index positioning of array
    array[Number(log.date.split("T")[0].split("-")[2]) - 1].logArray.push(log);
  });

  //calculating the leftover
  for (const day of array) {
    for (const expense of day.logArray) {
      day.remainder = day.budget - expense.amount;
    }
  }

  console.log("--------");
  console.log(array);

  return (
    <div>
      <div>
        <h1>Transaction Page</h1>
      </div>
      {/* <div className="card w-60 bg-base-100 shadow-xl border-2 rounded-md">
        <div className="flex flex-row w-52 justify-evenly">
          <div>Allowance</div>
          <div>50</div>
        </div>

        <div className="flex flex-row w-52 justify-around">
          <div>Food</div>
          <div>5</div>
        </div>
      </div> */}

      {array.map((dailyOverview) => (
        <div className="card w-80 bg-base-100 shadow-xl border-2 rounded-md">
          <div className="flex flex-row w-52 justify-evenly">
            <div>{dailyOverview.date}</div>
          </div>
          <div>{dailyOverview.budget}</div>

          {dailyOverview.logArray.map((expenses) => (
            <div className="flex flex-row justify-evenly">
              <div>{expenses.category.category}</div>
              <div>{expenses.amount}</div>
            </div>
          ))}

          <div>{dailyOverview.remainder}</div>
        </div>
      ))}
    </div>
  );
};

export default TransactionPage;
