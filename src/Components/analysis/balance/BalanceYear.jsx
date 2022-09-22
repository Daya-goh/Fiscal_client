import { useNavigate } from "react-router-dom";
import * as V from "victory";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip,
} from "victory";
import { getMonth, getYear } from "date-fns";
import { useEffect, useState } from "react";
import { add, format, sub } from "date-fns/esm";

/*===============================================================
BALANCE | Deficit or Surplus across the MONTHS
===============================================================*/

//* Only calculated the expenses, yet to factored in the budget per month
const monthExpenses = (data, month, monthlyBudget) => {
  let cost = 0;
  data
    .filter((entry) => entry.date.split("-")[1] === month)
    .map((expense) => (cost += expense.amount));

  return { x: month, y: monthlyBudget - cost };
};

const balanceByMths = (data, monthlyBudget) => {
  const plotData = [];
  const months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  for (const month in months) {
    plotData.push(monthExpenses(data, months[month], monthlyBudget));
  }
  return plotData;
};

/*===============================================================*/
/*===============================================================*/

function BalanceYear({ token }) {
  const navigate = useNavigate();

  // Toggle Month/Year Tab:
  const handleMonth = () => {
    navigate(`/personal/analysis/balance/month`);
  };
  const handleYear = () => {
    navigate(`/personal/analysis/balance/year`);
  };

  //* Create state to store which month is clicked
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
  const [yearDataForBalance, setYearDataForBalance] = useState([]);
  const [monthlyBudget, setMonthlyBudget] = useState(0);

  useEffect(() => {
    //* Fetching EXPENSES data
    const analysisURL = `${SERVER}analysis/year/${yearDBsearch}`;
    fetch(analysisURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setYearDataForBalance(data));

    //* Fetching BUDGET data
    const budgetURL = `${SERVER}rebudget/active`;
    fetch(budgetURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((budgetData) => {
        setMonthlyBudget(budgetData[0].allowance);
      });
  }, [year]);

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

  const mths = [];
  months.forEach((mth) => mths.push(mth[0]));

  return (
    <div className="flex flex-col items-center h-100% gap-4">
      <div>
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
        <h3 className="text-3xl font-bold">{yearDBsearch}</h3>
        <button onClick={handleAdd}>
          {" "}
          <span className="text-4xl">&#8608;</span>
        </button>
      </div>
      <h2 className="text-xl">Balance across the year of {yearDBsearch}</h2>

      <div className="w-3/5">
        <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
          <VictoryAxis
            // tickFormat={months.map(row => row[0])}
            label="Months"
            style={{
              axisLabel: { fontSize: 7, padding: 18 },
              tickLabels: { fontSize: 4, padding: 3 },
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => `$${x}`}
            label="Expenses($)"
            style={{
              axisLabel: { fontSize: 7, padding: 30 },
              tickLabels: { fontSize: 4, padding: 3 },
            }}
          />

          <VictoryBar
            data={balanceByMths(yearDataForBalance, monthlyBudget)}
            style={{ labels: { fontSize: 4 } }}
            barWidth={19}
            labelComponent={<VictoryTooltip dy={0} />}
            style={{
              data: {
                fill: ({ datum }) => (datum.y < 0 ? "#FE4A49" : "#2AB7CA"),
                stroke: "black",
                strokeWidth: 0.8,
              },
              labels: {
                fontSize: 4,
                // fill: ({ index }) => +index % 2 === 0  ? "#000000" : "#c43a31",
                fill: ({ datum }) => (datum.y < 0 ? "#FE4A49" : "#000000"),
              },
            }}
            labels={({ datum }) => datum.y}
          />
        </VictoryChart>
      </div>
    </div>
  );
}

export default BalanceYear;
