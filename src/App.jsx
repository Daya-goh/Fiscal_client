import React, { createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import ExpenseForm from "./Pages/ExpenseForm";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import TransactionPage from "./Pages/TransactionPage";
import Overview from "./Pages/Overview";
import BudgetPage from "./Pages/BudgetPage";
import SettingsPage from "./Pages/SettingsPage";
import { useEffect, useState } from "react";

import UpdateExpense from "./Components/UpdateExpense";
import AnalysisPage from "./Pages/AnalysisPage";
import ExpensesMonth from "./Components/analysis/expenses/ExpensesMonth";
import ExpensesYear from "./Components/analysis/expenses/ExpensesYear";
import BalanceMonth from "./Components/analysis/balance/BalanceMonth";
import BalanceYear from "./Components/analysis/balance/BalanceYear";
import SavingsYear from "./Components/analysis/savings/SavingsYear";
import RebudgetPage from "./Pages/RebudgetPage";
import BudgetHistoryPage from "./Pages/BudgetHistoryPage";
export const PersonContext = createContext();

function App() {
  const [targetExpense, setTargetExpense] = useState({});
  const [userName, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [newBudget, setNewBudget] = useState(false);

  return (
    <div className="App">
      <PersonContext.Provider value={userName}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                <LoginPage setUsername={setUsername} setToken={setToken} />
              }
            />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/personal" element={<Layout />}>
              <Route index element={<Overview token={token} />} />

              <Route
                path="/personal/expenselog"
                element={<ExpenseForm token={token} />}
              />
              <Route
                path="/personal/expenselog/:id"
                element={
                  <UpdateExpense targetExpense={targetExpense} token={token} />
                }
              />
              <Route
                path="/personal/transactions"
                element={
                  <TransactionPage
                    setTargetExpense={setTargetExpense}
                    token={token}
                  />
                }
              />

              {/* <Route path="/personal/budget" element={<BudgetPage />} /> */}
              <Route
                path="/personal/budget"
                element={
                  <RebudgetPage setNewBudget={setNewBudget} token={token} />
                }
              />
              <Route
                path="/personal/budget/history"
                element={
                  <BudgetHistoryPage
                    token={token}
                    newBudget={newBudget}
                    setNewBudget={setNewBudget}
                  />
                }
              />
              <Route path="/personal/settings" element={<SettingsPage />} />
              <Route path="/personal/analysis" element={<AnalysisPage />}>
                <Route index element={<ExpensesMonth />} />
                <Route
                  path="/personal/analysis/expenses/month"
                  element={<ExpensesMonth token={token} />}
                />
                <Route
                  path="/personal/analysis/expenses/year"
                  element={<ExpensesYear token={token} />}
                />
                <Route
                  path="/personal/analysis/savings/year"
                  element={<SavingsYear />}
                />
                <Route
                  path="/personal/analysis/balance/month"
                  element={<BalanceMonth token={token} />}
                />
                <Route
                  path="/personal/analysis/balance/year"
                  element={<BalanceYear token={token} />}
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </PersonContext.Provider>
    </div>
  );
}

export default App;
