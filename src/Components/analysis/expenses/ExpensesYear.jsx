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
import { useState } from "react";

const allCategories = ["Food","Shopping","Transport","Medical","Personal care","Gifts","House","Others",];

/*===============================================================
EXPENSES | Comparing across the categories FOR THAT MONTH
===============================================================*/
//* Reorganised the data by categories (as the key)
const fullData = {};
allCategories.map((category) => {
  fullData[category] = expenseData.filter(
    (entry) => entry.category === category
  );
});
// console.log("fullData:", fullData);

//* Ultimate function to churn out the category data to be plotted (inside it contains the months)
const countCatCost = (cat) => {
  const plotData = [];

  // Function to calculate cost
  const calculateCatCostPerMth = (month, num, category) => {
    let totalCost = 0;
    fullData[category]
      .filter((entry) => entry.date.split("-")[1] === num)
      .map((entry) => (totalCost += entry.amount));
    // console.log(`Total cost of ${cat} in ${month}`, totalCost);

    const data = {};
    data.x = month;
    data.y = totalCost;
    plotData.push(data);
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

function ExpensesYear() {
  const navigate = useNavigate();
  const currentYear = getYear(new Date());
  const currentMonth = getMonth(new Date());

  const monthsSpeltOut = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct",];

  const handleMonth = () => {
    // navigate(`/expenses/month/${monthsSpeltOut[currentMonth]}`);
    navigate(`/personal/analysis/expenses/month/`);
  };

  const handleYear = () => {
    // navigate(`/expenses/year/${currentYear}`);
    navigate(`/personal/analysis/expenses/year`);
  };


//* Create state to store which month is clicked 
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
    const [data, setData] = useState([]); 
    


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
        <VictoryAxis tickFormat={months.map(row => row[0])} />
        <VictoryAxis dependentAxis tickFormat={(x) => `$${x}`} />

        <VictoryStack colorScale={"warm"}>
          {allCategories.map((cat) => (
            <VictoryBar data={countCatCost(cat)} />
          ))}
        </VictoryStack>
      </VictoryChart>
    </>
  );
}

export default ExpensesYear;
