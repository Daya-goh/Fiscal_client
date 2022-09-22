import { useNavigate } from "react-router-dom";
import * as V from "victory";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLegend,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip,
} from "victory";
import expenseData from "../expenseSeed";
expenseData;
import { getMonth, getYear } from "date-fns";
import { add, format, sub } from "date-fns/esm";
import { useEffect, useState } from "react";

const allCategories = [
  "Food",
  "Shopping",
  "Transport",
  "Medical",
  "Personal care",
  "Gifts",
  "House",
  "Others",
];

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
  const [year, setYear] = useState(new Date());
  const handleAdd = () => {
    setYear(add(year, { years: 1 }));
  };
  const handleSub = () => {
    setYear(sub(year, { years: 1 }));
  };

  //TODO MongoDB find() before sending to client!
  const yearDBsearch = format(year, "yyyy-MM-dd").split("-")[0];

  //* FETCHING data from server
  const SERVER = import.meta.env.VITE_SERVER;
  const [yearDataRetrieved, setYearDataRetrieved] = useState([]);
  useEffect(() => {
    const analysisURL = `${SERVER}analysis/year/${yearDBsearch}`;
    fetch(analysisURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setYearDataRetrieved(data));
  }, [year]);

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
    <div className="flex flex-col items-center h-100% gap-4">
      <div className="flex flex-row gap-4 mt-10">
        <button
          onClick={handleMonth}
          className="btn btn-active btn-link hover:text-blue-900"
        >
          Month
        </button>
        <button
          onClick={handleYear}
          className="btn btn-active btn-link hover:text-blue-900"
        >
          Year
        </button>
      </div>
      <div className="test flex flex-row gap-3 items-center">
        <button onClick={handleSub}>
          <span className="text-4xl">&#8606;</span>
        </button>
        <h3 className="text-3xl font-bold">{yearDBsearch}</h3>
        <button onClick={handleAdd}>
          {" "}
          <span className="text-4xl">&#8608;</span>
        </button>
      </div>

      <h2 className="text-xl">Expenditure across the year of {yearDBsearch}</h2>

      <div className="w-3/5">
        <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
          <VictoryAxis
            tickFormat={months.map((row) => row[0])}
            label="Months"
            style={{
              axisLabel: { fontSize: 7, padding: 18 },
              tickLabels: { fontSize: 4, padding: 3 },
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => `$${x}`}
            label="Expenses ($)"
            style={{
              axisLabel: { fontSize: 7, padding: 30 },
              tickLabels: { fontSize: 4, padding: 3 },
            }}
          />

          <VictoryLegend
            x={120}
            y={10}
            title="Legend"
            centerTitle
            orientation="horizontal"
            itemsPerRow={4}
            gutter={8}
            symbolSpacer={2}
            borderPadding={{ top: 0, bottom: 3, left: 5, right: 0 }}
            style={{
              border: { stroke: "black" },
              title: { fontSize: 7 },
              labels: { fontSize: 4 },
            }}
            data={[
              { name: "Food", symbol: { fill: "#FE4A49" } },
              { name: "Transport", symbol: { fill: "#FED766" } },
              { name: "Medical", symbol: { fill: "#6874E8" } },
              { name: "Shopping", symbol: { fill: "#2AB7CA" } },
              { name: "Personal Care", symbol: { fill: "#262626" } },
              { name: "Gifts", symbol: { fill: "#EADAA2" } },
              { name: "House", symbol: { fill: "#CEE397" } },
              { name: "Others", symbol: { fill: "#CC998D" } },
            ]}
          />

          <VictoryStack
            colorScale={[
              "#FE4A49",
              "#2AB7CA",
              "#FED766",
              "#6874E8",
              "#262626",
              "#EADAA2",
              "#CEE397",
              "#CC998D",
            ]}
            style={{ data: { stroke: "black", strokeWidth: 0.8 } }}
          >
            {allCategories.map((cat, index) => (
              <VictoryBar
                key={index}
                horizontal
                data={countCatCost(yearDataRetrieved, cat)}
                labels={({ datum }) => (datum.y !== 0 ? datum.y : "")}
                labelComponent={<VictoryTooltip dy={0} />}
                barWidth={19}
                style={{ labels: { fontSize: 4 } }}
              />
            ))}
          </VictoryStack>
        </VictoryChart>
      </div>
    </div>
  );
}

export default ExpensesYear;
