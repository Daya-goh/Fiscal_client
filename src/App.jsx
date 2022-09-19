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

import { useEffect, useState } from "react";

function App() {
  const [remainder, setRemainder] = useState("");
  useEffect(() => {
    console.log(remainder);
  }, [remainder]);

  return (
    <div className="App">
      <h1>Fi$cal</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/personal" element={<Layout />}>
            <Route index element={<Overview />} />
            <Route
              path="/personal/expenselog"
              element={<ExpenseForm remainder={remainder} />}
            />
            <Route
              path="/personal/transactions"
              element={<TransactionPage setRemainder={setRemainder} />}
            />
            <Route path="/personal/budget" element={<BudgetPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
