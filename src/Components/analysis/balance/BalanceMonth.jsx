import { useNavigate } from "react-router-dom";
import * as V from "victory";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "victory";
import expenseData from "../expenseSeed";
import { getMonth, getYear } from "date-fns";
import { useState } from "react";
import { addMonths, format, subMonths } from "date-fns/esm";

const allCategories = [
  "food",
  "shopping",
  "transport",
  "medical",
  "personal care",
  "gifts",
  "house",
  "others",
];
//* Reorganised the data by categories (as the key)
const fullData = {};
allCategories.map((category) => {
  fullData[category] = expenseData.filter(
    (entry) => entry.category === category
  );
});
// console.log("fullData:", fullData);

/*===============================================================
BALANCE | Deficit or Surplus across the DAYS for THAT MONTH
===============================================================*/

//* Only interested in ONE MONTH, e.g. September
const balanceByDay = (month) => {
  let count = 0;
  let monthData = {};

  expenseData
    .filter((entry) => entry.date.split("-")[1] === month)
    .map((entry) => {
      const date = entry.date.split("-")[2];
      if (Number(date) === count) {
        monthData[entry.date] += entry.amount;
      } else {
        monthData[entry.date] = entry.amount;
        count = Number(date);
      }
    });
  // return monthData;

  const budget = 20;

  const plotData = [];
  for (const key in monthData) {
    plotData.push({ x: key, y: budget - monthData[key] });
  }
  return plotData;
};
// console.log(balanceByDay());

function BalanceMonth() {
  const navigate = useNavigate();
  const currentYear = getYear(new Date());
  const currentMonth = getMonth(new Date());

  const monthsSpeltOut = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November", 
    "December"
  ];

  const handleMonth = () => {
    navigate(`/personal/analysis/balance/month`);
  };

  const handleYear = () => {
    navigate(`/personal/analysis/balance/year`);
  };


    //* Create state to store which month is clicked 
    const [month, setMonth] = useState(new Date())
    // const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy",

    const handleAdd = () => {
      setMonth(addMonths(month, 1)); 
    }; 

    const handleSub = () => {
      setMonth(subMonths(month, 1)); 
    }; 

    const dayOfWk = monthsSpeltOut[getMonth(month)]; 
    const monthDBsearch = format(month, "yyyy-MM-dd").split("-")[1]; 
//     // console.log(monthDBsearch);

// //* Just to plot out the x-axis values: 
    const filteredData = expenseData.filter(entry => entry.date.split("-")[1] === monthDBsearch); 
    const entriesDates = []; 
    filteredData.map(entry => entriesDates.push(entry.date)); 

// //! Wanted to check which type of x-axis values I should display: (full date or just the day number)
  // const xaxisDates = Array.from(new Set(entriesDates)); 
  const xaxisDates = new Set(entriesDates); 

  return (
    <>
      <div>
        <button onClick={handleMonth}>Month</button>
        <button onClick={handleYear}>Year</button>
      </div>
      <div className="test">
        <button onClick={handleSub}>Previous Month</button>
        <h3>{dayOfWk}</h3>
        <button onClick={handleAdd}>Next Month</button>
      </div>
      <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
        <VictoryAxis tickFormat={xaxisDates} />
        <VictoryAxis dependentAxis tickFormat={(x) => `$${x}`} />

        <VictoryBar data={balanceByDay(monthDBsearch)} />
      </VictoryChart>
    </>
  );
}

export default BalanceMonth;
