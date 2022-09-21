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
expenseData;
import { getMonth, getYear } from "date-fns";
import { add, format, sub } from "date-fns/esm";
import { useEffect, useState } from "react";

const allCategories = ["Food","Shopping","Transport","Medical","Personal care","Gifts","House","Others",];

/*===============================================================
EXPENSES | Comparing across the categories FOR THAT MONTH
===============================================================*/

//* Ultimate function to churn out the category data to be plotted (inside it contains the months)
const countCatCost = (data, cat) => {
  
  // Reorganised the data by categories (as the key)
    const fullData = {};
    allCategories.map((category) => {
      fullData[category] = data.filter(
        (entry) => entry.category.category === category
      );
    });

  // Function to calculate cost
    const plotData = [];
    const calculateCatCostPerMth = (month, num, category) => {
      let totalCost = 0;
      fullData[category]
        .filter((entry) => entry.date.split("-")[1] === num)
        .map((entry) => (totalCost += entry.amount));
      // console.log(`Total cost of ${cat} in ${month}`, totalCost);

      const monthData = {};
      monthData.x = month;
      monthData.y = totalCost;
      plotData.push(monthData);
    };

  //TODO Might need to automate the months array as well??
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
  months.map((month) => calculateCatCostPerMth(month[0], month[1], cat));
  return plotData;
};
// console.log("Food cost:", countCatCost("food"));

/*===============================================================*/
/*===============================================================*/

function ExpensesYear({ token }) {
  const navigate = useNavigate();

  const handleMonth = () => {
    navigate(`/personal/analysis/expenses/month/`);
  };

  const handleYear = () => {
    navigate(`/personal/analysis/expenses/year`);
  };


//* Create state to store which year is clicked 
    const [year, setYear] = useState(new Date())
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
    const [yearDataRetrieved, setYearDataRetrieved] = useState([]); 
    useEffect(() => {
      const analysisURL = `${SERVER}analysis/year/${yearDBsearch}`; 
      fetch(analysisURL, {
        headers: {
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}`
        }
      }).then(response => response.json()).then(data => setYearDataRetrieved(data))
    }, [year]); 
    // console.log("Year Data retrieved from server:", yearDataRetrieved);

  //* Putting here so that x-axis values can be plotted:
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

        <VictoryStack>
          {allCategories.map((cat) => (
            <VictoryBar data={countCatCost(yearDataRetrieved, cat)} style={{labels: {fontSize: 4}}} />
          ))}
        </VictoryStack>
      </VictoryChart>
    </>
  );
}

export default ExpensesYear;
