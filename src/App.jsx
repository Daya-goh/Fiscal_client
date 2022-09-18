import { useState } from "react";
import "./App.css";
import ExpenseForm from "./Pages/ExpenseForm";
import TransactionPage from "./Pages/TransactionPage";

function App() {
  const [remainder, setRemainder] = useState("");
  return (
    <div className="App">
      <h1>Fi$cal</h1>
      <ExpenseForm remainder={remainder} />
      <TransactionPage setRemainder={setRemainder} />
    </div>
  );
}

export default App;
