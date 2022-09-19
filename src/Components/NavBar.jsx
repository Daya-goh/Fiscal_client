import { Link } from "react-router-dom";
function NavBar() {
  return (
    <>
      <Link to="/login">Login </Link>
      <Link to="/personal">Overview </Link>
      <Link to="/personal/expenselog">Log your Expense </Link>
      <Link to="/personal/transactions">Transaction History </Link>
      <Link to="/personal/budget">Budget</Link>
      <Link to="/personal/settings">Settings</Link>
    </>
  );
}

export default NavBar;
