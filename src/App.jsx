import React from "react";
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

function App() {
  const [targetExpense, setTargetExpense] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/personal" element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="/personal/expenselog" element={<ExpenseForm />} />
            <Route
              path="/personal/expenselog/:id"
              element={<UpdateExpense targetExpense={targetExpense} />}
            />
            <Route
              path="/personal/transactions"
              element={<TransactionPage setTargetExpense={setTargetExpense} />}
            />
            <Route path="/personal/budget" element={<BudgetPage />} />
            <Route path="/personal/settings" element={<SettingsPage />} />
            <Route path="/personal/analysis" element={<AnalysisPage />}>
              <Route index element={<ExpensesMonth />} />
              <Route path="/personal/analysis/expenses/month" element={<ExpensesMonth />} />
              <Route path="/personal/analysis/expenses/year" element={<ExpensesYear />} />
              <Route path="/personal/analysis/savings/year" element={<SavingsYear />} />
              <Route path="/personal/analysis/balance/month" element={<BalanceMonth />} />
              <Route path="/personal/analysis/balance/year" element={<BalanceYear />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
