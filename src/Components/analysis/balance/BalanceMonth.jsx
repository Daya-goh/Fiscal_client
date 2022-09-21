import { useNavigate } from "react-router-dom";
import * as V from "victory";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from "victory";
// import expenseData from "../expenseSeed";
import { getMonth, getYear } from "date-fns";
import { useEffect, useState } from "react";
import { addMonths, format, subMonths } from "date-fns/esm";


/*===============================================================
BALANCE | Deficit or Surplus across the DAYS for THAT MONTH
===============================================================*/

//* Only interested in ONE MONTH, e.g. September
const balanceByDay = (data, month) => {
  let count = 0;
  let monthData = {};

  data
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

  //! To wait for Qian Yi's budget update
    const budget = 20;

  const plotData = [];
  for (const key in monthData) {
    plotData.push({ x: key, y: budget - monthData[key] });
  }
  return plotData;
};
// console.log(balanceByDay());

/*===============================================================*/
/*===============================================================*/

function BalanceMonth({ token }) {
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

    // Toggle Month/Year Tab:
        const handleMonth = () => {
            navigate(`/personal/analysis/balance/month`);
        };
        const handleYear = () => {
            navigate(`/personal/analysis/balance/year`);
        };


    //* Create state to store which month is clicked 
        const [month, setMonth] = useState(new Date())
        const handleAdd = () => {
        setMonth(addMonths(month, 1)); 
        }; 
        const handleSub = () => {
        setMonth(subMonths(month, 1)); 
        }; 

    const dayOfWk = monthsSpeltOut[getMonth(month)]; 
    const monthDBsearch = format(month, "yyyy-MM-dd").split("-")[1]; 


    //* FETCHING data from server
        const SERVER = import.meta.env.VITE_SERVER; 
        const DBfilter = format(month, "yyyy-MM-dd"); 
        const [monthDataForBalance, setMonthDataForBalance] = useState([]); 
        useEffect(() => {
            const analysisURL = `${SERVER}analysis/month/${DBfilter}`; 
            fetch(analysisURL, {
              headers: {
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}`
              }
            }).then(response => response.json()).then(data => setMonthDataForBalance(data))
        }, [month]); 
        console.log("Data retrieved from server:", monthDataForBalance);


    //* Plotting out the x-axis values: 
        // const filteredData = expenseData.filter(entry => entry.date.split("-")[1] === monthDBsearch); 
        // const entriesDates = []; 
        // filteredData.map(entry => entriesDates.push(entry.date)); 
        const entriesDates = []; 
        monthDataForBalance.map(entry => entriesDates.push(format((Date.parse(entry.date)), "yyyy-MM-dd").split("-")[2]));
        const xAxisDates = Array.from(new Set(entriesDates)); 


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
        <VictoryAxis tickFormat={xAxisDates} label="Days" style={{
          axisLabel: {fontSize:7, padding:18}, 
          tickLabels: {fontSize: 4, padding: 3}
        }} />
        <VictoryAxis dependentAxis tickFormat={(x) => `$${x}`} label="Expenses($)" style={{
          axisLabel: {fontSize:7, padding:30}, 
          tickLabels: {fontSize: 4, padding: 3}
        }} />

        <VictoryBar data={balanceByDay(monthDataForBalance, monthDBsearch)} />
      </VictoryChart>
    </>
  );
}

export default BalanceMonth;
