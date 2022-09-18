import React from "react";
import BudgetForm from "../Components/BudgetForm";

function BudgetPage() {
  return (
    <>
      <div className="bg-white dark:bg-slate-900 py-6 sm:py-8 lg:py-12">
        <div className="flex justify-between items-end gap-4 mb-6">
          <BudgetForm />
          <BudgetForm />
          <BudgetForm />
        </div>
      </div>
    </>
  );
}

export default BudgetPage;
