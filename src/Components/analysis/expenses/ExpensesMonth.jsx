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
import { addMonths, format, getDay, subMonths } from "date-fns/esm";



/*===============================================================
EXPENSES | Comparing across the categories FOR THAT DAY
===============================================================*/
const allCategories = ["Food","Shopping","Transport","Medical","Personal care","Gifts","House","Others",];


//* E.g. Just interested in ONE MONTH, e.g. September
const calculateCatCostPerDay = (expenseData, category) => {

    //* Reorganised the data by categories (as the key)
        const fullData = {};
        allCategories.map((category) => {
        fullData[category] = expenseData.filter(
            (entry) => entry.category.category === category
        );
        });
        console.log("fullData:", fullData);

    let count = 0;
    let monthData = {};

    fullData[category]
        .map((entry) => {
        const date = format((Date.parse(entry.date)), "yyyy-MM-dd").split("-")[2];
        if (Number(date) === count) {
            monthData[format((Date.parse(entry.date)), "yyyy-MM-dd")] += entry.amount;
        } else {
            monthData[format((Date.parse(entry.date)), "yyyy-MM-dd")] = entry.amount;
            count = Number(date);
        }
        });

    const plotData = [];
    for (const key in monthData) {
        plotData.push({ x: key, y: monthData[key] });
    }
    return plotData;
};

/*===============================================================*/
/*===============================================================*/

function ExpensesMonth({ token }) {

// Month / Year toggle buttons 
    const navigate = useNavigate();
    const handleMonth = () => {
      navigate(`/personal/analysis/expenses/month`);
    };
    const handleYear = () => {
      navigate(`/personal/analysis/expenses/year`);
    };

//* Create state to store which month is clicked 
    const [month, setMonth] = useState(new Date())
    const handleAdd = () => {
      setMonth(addMonths(month, 1)); 
    }; 
    const handleSub = () => {
      setMonth(subMonths(month, 1)); 
    }; 

    const monthsSpeltOut = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct",];
    const dayOfWk = monthsSpeltOut[getMonth(month)]; 
    const monthDBsearch = format(month, "yyyy-MM-dd").split("-")[1]; 

//* FETCHING the data from server
    const SERVER = import.meta.env.VITE_SERVER; 
    const DBfilter = format(month, "yyyy-MM-dd"); 
    const [data, setData] = useState([]); 
    useEffect(() => {
        const analysisURL = `${SERVER}analysis/month/${DBfilter}`; 
        fetch(analysisURL, {
            headers: {
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}`
            }
        }).then(response => response.json()).then(data => setData(data))
    }, [month]); 
    console.log("Data retrieved from server:", data);

//* Plotting out the x-axis values: 
    const entriesDates = []; 
    data.map(entry => entriesDates.push(format((Date.parse(entry.date)), "yyyy-MM-dd").split("-")[2]));
    const xaxisDates = Array.from(new Set(entriesDates)); 

//* Labelling of data
    const arr = []; 
    let count=0;
    let monthData = {}
    data.filter(entry =>entry.date.split("-")[1] === monthDBsearch).map((entry) => {
    const date = entry.date.split("-")[2];
    if (Number(date) === count) {
        monthData[entry.date] += entry.amount;
    } else {
        monthData[entry.date] = entry.amount;
        count = Number(date);
    }
    }); 
    for (const key in monthData){
    arr.push(monthData[key])
    }


  return (
    <>
      <div>
        <button onClick={handleMonth}>Month</button>
        <button onClick={handleYear}>Year</button>
      </div>
      <div className="test flex flex-row">
        <button onClick={handleSub}>Previous Month</button>
        <h3>{dayOfWk}</h3>
        <button onClick={handleAdd}>Next Month</button>
      </div>

      <h2> This is the Charts analysis page.</h2>
      <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
        <VictoryAxis tickFormat={xaxisDates} label="Days" style={{
          axisLabel: {fontSize:7, padding:18}, 
          tickLabels: {fontSize: 4, padding: 3}
        }} />
        <VictoryAxis dependentAxis tickFormat={(x) => `$${x}`} label="Expenses($)" style={{
          axisLabel: {fontSize:7, padding:30}, 
          tickLabels: {fontSize: 4, padding: 3}
        }} />

        <VictoryStack colorScale={"warm"}>
          {allCategories.map((cat) => (
            <VictoryBar labels={arr} data={calculateCatCostPerDay(data, cat)} style={{labels: {fontSize: 4}}} />
          ))}
        </VictoryStack>
      </VictoryChart>
    </>
  );
}

export default ExpensesMonth;
