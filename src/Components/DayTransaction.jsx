import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SERVER = import.meta.env.VITE_SERVER;

const DayTransaction = ({ dailyOverview, index, setTargetExpense, token }) => {
  const navigate = useNavigate();
  const handleClick = (event) => {
    const id = event.target.id;
    const url = `${SERVER}expense/${id}/`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setTargetExpense(data);
      });
    navigate(`/personal/expenselog/${id}`);
  };
  return (
    <div>
      <div
        className="card w-72 bg-base-100 shadow-xl border-2 border-yellow-300 rounded-md m-2 gap-2"
        key={index}
      >
        <div className="flex flex-row w-72 justify-center">
          <div className="font-medium">{dailyOverview.date}</div>
        </div>

        <div className="flex justify-between px-3">
          <div className="flex items-center ">Budget</div>
          <div>${dailyOverview.budget}</div>
        </div>

        {dailyOverview.logArray.map((expenses, index) => (
          <div
            className="flex flex-row justify-between px-3 hover:bg-yellow-200"
            id={expenses._id}
            key={index}
            onClick={(event) => handleClick(event)}
          >
            <div className="flex items-center w-24" id={expenses._id}>
              {expenses.category.category}
            </div>
            <div
              className="flex items-center justify-center text-center text-xs w-24"
              id={expenses._id}
            >
              {expenses.name}
            </div>
            <div
              className="flex items-center justify-end w-24"
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
    </div>
  );
};
export default DayTransaction;
