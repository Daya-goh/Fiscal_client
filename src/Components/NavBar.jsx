import { Link } from "react-router-dom";
function NavBar() {
  return (
    <>
      <Link to="/login">Login</Link>
      <Link to="/personal/expenselog">Log your Expense</Link>
      <Link to="/personal/transactions">Transaction History</Link>
    </>
  );
}

export default NavBar;
