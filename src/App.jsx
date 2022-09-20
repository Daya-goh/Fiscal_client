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
// import UpdateExpense from "./Components/UpdateExpense";
// import UpdateExpensePage from "./Pages/UpdateExpensePage";
import UpdateExpense from "./Components/UpdateExpense";

function App() {
  // const [remainder, setRemainder] = useState("");
  // const [transaction, setTransaction] = useState([]);
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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
