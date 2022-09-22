import { useNavigate } from "react-router-dom";
import * as V from "victory";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
  VictoryLabel,
  VictoryTooltip,
  VictoryLegend,
  Border,
} from "victory";
import { getMonth, getYear } from "date-fns";
import { useEffect, useState } from "react";
import {
  addMonths,
  format,
  getDate,
  getDay,
  getDaysInMonth,
  subMonths,
} from "date-fns/esm";

/*===============================================================
EXPENSES | Comparing across the categories FOR THAT DAY
===============================================================*/
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

//* E.g. Just interested in ONE MONTH, e.g. September
const calculateCatCostPerDay = (expenseData, category, numOfDays) => {
  //* Reorganised the data by categories (as the key)
  const fullData = {};
  allCategories.forEach((category) => {
    fullData[category] = expenseData.filter(
      (entry) => entry.category.category === category
    );
  });

  let monthData = {};

  for (let i = 1; i < numOfDays + 1; i++) {
    monthData[i] = 0;
  }

  fullData[category].forEach(
    (entry) => (monthData[getDate(Date.parse(entry.date))] += entry.amount)
  );

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
  const [month, setMonth] = useState(new Date());
  const numOfDays = getDaysInMonth(month);
  const currentYear = getYear(month);
  const handleAdd = () => {
    setMonth(addMonths(month, 1));
  };
  const handleSub = () => {
    setMonth(subMonths(month, 1));
  };

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
    "December",
  ];
  const dayOfWk = monthsSpeltOut[getMonth(month)];

  //* FETCHING the data from server
  const SERVER = import.meta.env.VITE_SERVER;
  const DBfilter = format(month, "yyyy-MM-dd");

  const [data, setData] = useState([]);
  useEffect(() => {
    const analysisURL = `${SERVER}analysis/month/${DBfilter}`;

    fetch(analysisURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [month]);

  //* Plotting out the x-axis values:
  let daysInMth = {};
  for (let i = 1; i < numOfDays + 1; i++) {
    daysInMth[i] = 0;
  }
  const xaxisDates = Object.keys(daysInMth);

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
          {" "}
          <span className="text-4xl">&#8606;</span>
        </button>
        <h3 className="text-3xl font-bold">
          {dayOfWk} {currentYear}
        </h3>
        <button onClick={handleAdd}>
          {" "}
          <span className="text-4xl">&#8608;</span>
        </button>
      </div>

      <h2 className="text-xl">
        Expenditure in the month of {dayOfWk} {currentYear}
      </h2>

      <div className="w-3/5">
        <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
          <VictoryAxis
            tickFormat={xaxisDates}
            label="Days"
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
                labels={({ datum }) => datum.y}
                labelComponent={<VictoryTooltip dy={0} />}
                barWidth={8}
                data={calculateCatCostPerDay(data, cat, numOfDays)}
                style={{ labels: { fontSize: 4, fill: "black" } }}
              />
            ))}
          </VictoryStack>

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
        </VictoryChart>
      </div>
    </div>
  );
}

export default ExpensesMonth;
