import React from "react";

function AllowanceBudgetPage() {
  // useEffect(() => {
  //   const fetchHolidays = async () => {
  //     const url = urlcat(SERVER, "/holidays");
  //     const request = await fetch(url);
  //     const data = await request.json();
  //     setHolidays(data);
  //   };
  //   fetchHolidays();
  // }, []);

  return (
    <>
      <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        {/* <h1 className="font-bold">ALLOWANCE</h1> */}

        <div className="stats stats-vertical w-full shadow-blue-600 shadow-2xl">
          <div className="stat">
            <div className="stat-title">Total Income</div>
            <div className="stat-value">10K</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-title">Total Deductibles</div>
            <div className="stat-value">4,200</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat">
            <div className="stat-title">Total Allowance</div>
            <div className="stat-value">5,800</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllowanceBudgetPage;
