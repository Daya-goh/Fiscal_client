import { useNavigate } from "react-router-dom";
import * as V from "victory";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip,
} from "victory";
import { getMonth, getYear } from "date-fns";
import { useEffect, useState } from "react";
import { addMonths, format, getDate, getDaysInMonth, subMonths } from "date-fns/esm";


/*===============================================================
BALANCE | Deficit or Surplus across the DAYS for THAT MONTH
===============================================================*/

//* Only interested in ONE MONTH, e.g. September
const balanceByDay = (data, dailyBudget, numOfDays) => {
  
  let monthData = {};
  for (let i=1; i < numOfDays + 1; i++){
    monthData[i] = 0; 
  }

  data.forEach(entry => monthData[getDate(Date.parse(entry.date))] += entry.amount); 

  const plotData = [];
  for (const key in monthData) {
    plotData.push({ x: key, y: Number((dailyBudget - monthData[key]).toFixed(2)) });
  }
  return plotData;
};

/*===============================================================*/
/*===============================================================*/

function BalanceMonth({ token }) {
  const navigate = useNavigate();

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
    const currentYear = getYear(month); 


    //* FETCHING data from server
        const SERVER = import.meta.env.VITE_SERVER; 
        const DBfilter = format(month, "yyyy-MM-dd"); 
        const [monthDataForBalance, setMonthDataForBalance] = useState([]); 
        const [dailyBudget, setDailyBudget] = useState(0); 

        useEffect(() => {

          //* Fetching EXPENSES data
            const analysisURL = `${SERVER}analysis/month/${DBfilter}`; 
            fetch(analysisURL, {
              headers: {
                "Content-Type": "application/json", 
                Authorization: `Bearer ${token}`
              }
            }).then(response => response.json()).then(data => setMonthDataForBalance(data))

          //* Fetching BUDGET data
            const numOfDays = getDaysInMonth(month); 
            const budgetURL = `${SERVER}rebudget/active`;
            fetch(budgetURL, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
              .then((response) => response.json())
              .then((budgetData) => {
                setDailyBudget(budgetData[0].allowance / numOfDays);
              });

        }, [month]); 

    //* Plotting out the x-axis values: 
        let monthData = {};
        const numOfDays = getDaysInMonth(month); 
        for (let i=1; i < numOfDays + 1; i++){
          monthData[i] = 0; 
        }
        const xAxisDates = Object.keys(monthData); 

  return (
    <>
      <div>
        <button onClick={handleMonth}>Month</button>
        <button onClick={handleYear}>Year</button>
      </div>
      <div className="test">
        <button onClick={handleSub}>Previous Month</button>
        <h3>{dayOfWk} {currentYear}</h3>
        <button onClick={handleAdd}>Next Month</button>
      </div>
      <h2>Balance across the month of {dayOfWk} {currentYear}</h2>

      <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
        <VictoryAxis 
        // tickFormat={xAxisDates} 
        label="Days" style={{
          axisLabel: {fontSize:7, padding:18}, 
          tickLabels: {fontSize: 4, padding: 3}
        }} />
        <VictoryAxis dependentAxis tickFormat={(x) => `$${x}`} label="Balance ($)" style={{
          axisLabel: {fontSize:7, padding:30}, 
          tickLabels: {fontSize: 4, padding: 3}
        }} />

        <VictoryBar 
        data={balanceByDay(monthDataForBalance, dailyBudget, numOfDays)} 
        barWidth={7.5}
        labelComponent={<VictoryTooltip 
          dy={0} 
        />}
        style={
          { data: 
            { 
              fill: ({datum}) => datum.y <0 ? "#FE4A49" : "#2AB7CA", 
            stroke: "black", 
            strokeWidth: 0.8
          }, 
          labels: {
            fontSize: 4, 
            // fill: ({ index }) => +index % 2 === 0  ? "#000000" : "#c43a31", 
            fill: ({ datum }) => datum.y < 0 ? "#FE4A49" : "#000000"
          }
        }
        }
        labels={({datum}) => datum.y}
        />
      </VictoryChart>
    </>
  );
}

export default BalanceMonth;
