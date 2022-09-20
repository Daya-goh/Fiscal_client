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
import { add, format, sub } from "date-fns/esm";

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
BALANCE | Deficit or Surplus across the MONTHS
===============================================================*/

//* Only calculated the expenses, yet to factored in the budget per month
const monthExpenses = (month) => {
  let cost = 0;
  expenseData
    .filter((entry) => entry.date.split("-")[1] === month)
    .map((expense) => (cost += expense.amount));
  // return cost;

  const budget = 2000;

  return { x: month, y: budget - cost };
};

const balanceByMths = () => {
  const plotData = [];
  const months = {
    Jul: "07",
    Aug: "08",
    Sep: "09",
  };

  for (const month in months) {
    plotData.push(monthExpenses(months[month]));
  }
  return plotData;
};
// console.log("Balance - by Months", monthCostPlot());

function BalanceYear() {
  const navigate = useNavigate();
  const currentYear = getYear(new Date());
  const currentMonth = getMonth(new Date());

  const monthsSpeltOut = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
  ];

  const handleMonth = () => {
    navigate(`/personal/analysis/balance/month`);
  };

  const handleYear = () => {
    navigate(`/personal/analysis/balance/year`);
  };


  //* Create state to store which month is clicked 
    const [year, setYear] = useState(new Date())
    // const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy",

  const handleAdd = () => {
    setYear(add(year, { years: 1 })); 
  }; 

  const handleSub = () => {
    setYear(sub(year, { years: 1 })); 
  }; 


  //TODO MongoDB find() before sending to client!
    const yearDBsearch = format(year, "yyyy-MM-dd").split("-")[0]; 
    // console.log(yearDBsearch);


  //* Putting here so that x-axis values can be plotted:
    //* Seems like not working
      const months = [
        ["Jan", "01"],
        ["Feb", "02"],
        ["Mar", "03"],
        ["Apr", "04"],
        ["May", "05"],
        ["Jun", "06"],
        ["Jul", "07"],
        ["Aug", "08"],
        ["Sep", "09"],
        ["Oct", "10"],
        ["Nov", "11"],
        ["Dec", "12"],
      ];



  return (
    <>
      <div>
        <button onClick={handleMonth}>Month</button>
        <button onClick={handleYear}>Year</button>
      </div>
      <div className="test">
        <button onClick={handleSub}>Previous Year</button>
        <h3>{yearDBsearch}</h3>
        <button onClick={handleAdd}>Next Year</button>
      </div>
      <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
        {/* <VictoryAxis tickFormat={months.map(row => row[0])} /> */}
        <VictoryAxis dependentAxis tickFormat={(x) => `$${x}`} />

        <VictoryBar data={balanceByMths()} />
      </VictoryChart>
    </>
  );
}

export default BalanceYear;
