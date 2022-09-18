import "./App.css";
import ExpenseForm from "./Pages/ExpenseForm";
import TransactionPage from "./Pages/TransactionPage";

function App() {
  return (
    <div className="App">
      <h1>Fi$cal</h1>
      <ExpenseForm />
      <TransactionPage />
    </div>
  );
}

export default App;
