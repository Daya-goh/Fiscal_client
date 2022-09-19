import React from "react";
import IncomeForm from "../Components/IncomeForm";

function BudgetPage() {
  return (
    <>
      <div className="bg-white dark:bg-slate-900 py-6 sm:py-8 lg:py-12">
        <div className="flex justify-evenly items-end gap-4 mb-6">
          <IncomeForm />
          <IncomeForm />
          <IncomeForm />
        </div>
      </div>
    </>
  );
}

export default BudgetPage;
