import { useEffect, useState } from "react";
import IncomeForm from "../Components/IncomeForm";
import FixedExpenditureForm from "../Components/FixedExpenditureForm";
import SavingsForm from "../Components/SavingsForm";
import AllowanceBudgetPage from "../Components/AllowanceBudgetPage";
import UserBudgetLog from "../Components/UserBudgetLog";

function BudgetPage() {
  return (
    <>
      <div className="bg-white dark:bg-slate-900 py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          {/* <div className="flex justify-evenly items-end gap-4 mb-6"> */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8">
            <IncomeForm />
            <FixedExpenditureForm />
            <SavingsForm />
            <AllowanceBudgetPage />
          </div>
          <div className="bg-white dark:bg-slate-900 py-6 sm:py-8 lg:py-12">
            <UserBudgetLog />
          </div>
        </div>
      </div>
    </>
  );
}

export default BudgetPage;
