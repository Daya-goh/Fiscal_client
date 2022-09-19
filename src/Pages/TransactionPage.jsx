import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SERVER = import.meta.env.VITE_SERVER;

const TransactionPage = ({ setRemainder }) => {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    const month = new Date().getMonth() + 1;

    const transactionUrl = `${SERVER}transactions/${month}`;
    fetch(transactionUrl)
      .then((response) => response.json())
      .then((data) => {
        setTransaction(data);
      });
  }, []);

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
      day.remainder = day.remainder - expense.amount;
    }
  }

  //-1 due to array position
  setRemainder(array[new Date().getDate() - 1].remainder);

  const handleClick = (event) => {
    console.log(event.target.id);
    const navigate = useNavigate();
    // navigate(`/expenses/${id}`);
  };

  return (
    <div>
      <div>
        <h1>Transaction Page</h1>
      </div>

      {array.map((dailyOverview) => (
        <div className="card w-96 bg-base-100 shadow-xl border-2 border-yellow-300 rounded-md m-2 gap-2">
          <div className="flex flex-row w-96 justify-center">
            <div>{dailyOverview.date}</div>
          </div>

          <div className="flex justify-between px-3">
            <div className="flex items-center ">Budget</div>
            <div>${dailyOverview.budget}</div>
          </div>

          {dailyOverview.logArray.map((expenses) => (
            <div
              className="flex flex-row justify-between px-3 hover:bg-yellow-200"
              id={expenses._id}
              onClick={() => handleClick(event)}
            >
              <div className="flex items-center w-32" id={expenses._id}>
                {expenses.category.category}
              </div>
              <div
                className="flex items-center justify-center text-xs w-32"
                id={expenses._id}
              >
                {expenses.name}
              </div>
              <div
                className="flex items-center justify-end w-32"
                id={expenses._id}
              >
                -${expenses.amount}
              </div>
            </div>
          ))}

          <div className="flex justify-end border-t-2 p-3">
            ${dailyOverview.remainder}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionPage;

// import TransactionPage from "./Pages/TransactionPage";
// <TransactionPage setRemainder={setRemainder} />
