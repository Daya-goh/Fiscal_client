import { Link, useNavigate } from "react-router-dom";

function NavBar({ setToken }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("logout");
    setToken(0);
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 opacity-70">
        {/* START - to relook into this again -- */}
        {/* <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button> */}
        {/* END - to relook into this again -- */}

        <div className="navbar bg-base-100">
          <div className="flex-1">
            <img src="/logored.png" className="mr-3 h-6 sm:h-12" alt="logo" />

            <Link
              to="/personal"
              className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
            >
              Fi$CAL{" "}
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal p-0">
              <li>
                <Link to="/personal/expenselog">Log Expenses </Link>
              </li>
              <li tabIndex={0}>
                <a>
                  Transactions
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </a>
                <ul className="p-2 bg-base-100">
                  <li>
                    <Link to="/personal/transactions">Transaction History</Link>
                  </li>
                </ul>
              </li>

              <li tabIndex={0}>
                <span>
                  Analysis
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </span>
                <ul className="p-2 bg-base-100">
                  <li>
                    <Link to="/personal/analysis/expenses/month">
                      Expenses Analysis
                    </Link>
                  </li>
                  <li>
                    <Link to="/personal/analysis/balance/month">
                      Balance Analysis
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/personal/budget/history">Budget</Link>
              </li>
              <li className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
