import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SERVER = import.meta.env.VITE_SERVER;

function BudgetHistoryPage({ token, newBudget, setNewBudget }) {
  const budgetHistoryURL = `${SERVER}rebudget`;
  const [budgetData, setBudgetData] = useState([]);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     fetch(budgetHistoryURL, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // setBudgetData(data)
  //         setOldBudgetToInactive(data);

  //         // setBudgetData();
  //       });
  //   }, [budgetData, newBudget]);
  //   console.log("Budget data retrieved from server:", budgetData);

  //   const setOldBudgetToInactive = (data) => {
  //     // if (newBudget === true) {
  //     //   const toUpdate = data.slice(0, data.length - 1);
  //     //   const updated = [];
  //     //   toUpdate.map((budgetEntry) => {
  //     //     budgetEntry.active = false;
  //     //     fetch(`${SERVER}rebudget/${budgetEntry._id}`, {
  //     //       method: "PUT",
  //     //       headers: {
  //     //         "Content-Type": "application/json",
  //     //         Authorization: `Bearer ${token}`,
  //     //       },
  //     //       body: JSON.stringify(budgetEntry),
  //     //     })
  //     //       .then((response) => response.json())
  //     //       .then((dataFinal) => {
  //     //         updated.push(dataFinal);
  //     //         updated.push(data[data.length - 1]);
  //     //         setBudgetData(updated);
  //     //         // return updated;
  //     //       });
  //     //   });

  //     //   // console.log("Updated the active state for older budget entries:", updated);
  //     //   console.log("toUpdate:", toUpdate);
  //     //   console.log("data:", data);
  //     //   //   updated.push(data[data.length - 1]);
  //     //   //   setBudgetData(updated);
  //     //   console.log("updated:", updated);
  //     //   setNewBudget(false);
  //     // }
  //     if (newBudget === true) {
  //       data[data.length - 2].active = false;
  //       console.log(data[data.length - 2]);
  //       fetch(`${SERVER}rebudget/${data[data.length - 2]._id}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(data[data.length - 2]),
  //       })
  //         .then((response) => response.JSON())
  //         .then((dataFinal) => {
  //           console.log(dataFinal);
  //           //   setBudgetData(dataFinal);
  //           setNewBudget(false);
  //         });
  //     }
  //   };

  useEffect(() => {
    fetch(budgetHistoryURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const reversedData = data.reverse();
        setBudgetData(reversedData);
      });
  }, []);

  //   return budgetMap;

  return (
    <div
      className="w-screen h-screen bg-cover"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80)`,
      }}
    >
      <div className="overflow-x-auto flex flex-col items-center gap-6 bg-white bg-opacity-25 h-screen">
        <h1 className="font-bold text-3xl mt-6">BUDGET HISTORY</h1>

        <table className="table w-2/3">
          <thead>
            <tr>
              <th className=" flex justify-center ">
                <button
                  onClick={() => navigate("/personal/budget")}
                  className="btn btn-ghost text-xl"
                >
                  +
                </button>
              </th>
              <th className="text-center">Income</th>
              <th className="text-center">Fixed Expenditures</th>
              <th className="text-center">Savings</th>
              <th className="text-center">Allowance</th>
              <th className="text-center">Active</th>
            </tr>
          </thead>

          {budgetData?.map((budget, index) => (
            <tbody key={index}>
              <tr className="hover">
                <th
                  className="text-center
                "
                >
                  {index + 1}
                </th>
                <td className="text-center">$ {budget.income}</td>
                <td className="text-center">$ {budget.fixedExpenditure}</td>
                <td className="text-center">$ {budget.savings}</td>
                <td className="text-center">$ {budget.allowance}</td>
                <td
                  className={`text-center ${
                    budget.active === true ? `text-bold text-red-700` : ``
                  }`}
                >
                  {budget.active === true ? "Yes" : "No"}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export default BudgetHistoryPage;
