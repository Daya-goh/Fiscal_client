import { useState, useEffect } from "react";
const SERVER = import.meta.env.VITE_SERVER;

function UserBudgetLog() {
  const [budget, setBudget] = useState([]);
  //* fetch budget data
  useEffect(() => {
    const urlBudget = `${SERVER}budget/`;
    fetch(urlBudget)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <>
      <div></div>
    </>
  );
}

export default UserBudgetLog;
