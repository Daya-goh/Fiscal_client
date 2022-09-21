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
import { useEffect, useState } from "react";
import { add, format, sub } from "date-fns/esm";


/*===============================================================
BALANCE | Deficit or Surplus across the MONTHS
===============================================================*/

//* Only calculated the expenses, yet to factored in the budget per month
const monthExpenses = (data, month) => {
  let cost = 0;
  data
    .filter((entry) => entry.date.split("-")[1] === month)
    .map((expense) => (cost += expense.amount));
  // return cost;

  const budget = 2000;

  return { x: month, y: budget - cost };
};

const balanceByMths = (data) => {
  const plotData = [];
  const months = {Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"};

  for (const month in months) {
    plotData.push(monthExpenses(data, months[month]));
  }
  return plotData;
};
// console.log("Balance - by Months", monthCostPlot());

/*===============================================================*/
/*===============================================================*/

function BalanceYear({ token }) {
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

  // Toggle Month/Year Tab:
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

    //* FETCHING data from server
    const SERVER = import.meta.env.VITE_SERVER; 
    const [yearDataForBalance, setYearDataForBalance] = useState([]); 
    useEffect(() => {
        const analysisURL = `${SERVER}analysis/year/${yearDBsearch}`;
        fetch(analysisURL, {
            headers: {
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}`
            }
        }).then(response => response.json()).then(data => setYearDataForBalance(data))
    }, [year])


  //* Putting here so that x-axis values can be plotted:
    //* Working but they will pre-populate the other months without expenses with some random data. 
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
        <VictoryAxis tickFormat={months.map(row => row[0])} label="Months" style={{
          axisLabel: {fontSize:7, padding:18}, 
          tickLabels: {fontSize: 4, padding: 3}
        }} />
        <VictoryAxis dependentAxis tickFormat={(x) => `$${x}`} label="Expenses($)" style={{
          axisLabel: {fontSize:7, padding:30}, 
          tickLabels: {fontSize: 4, padding: 3}
        }} />

        <VictoryBar data={balanceByMths(yearDataForBalance)} style={{labels: {fontSize: 4}}} />
      </VictoryChart>
    </>
  );
}

export default BalanceYear;
