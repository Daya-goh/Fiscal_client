import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const SERVER = import.meta.env.VITE_SERVER; 

function BudgetHistoryPage({ token, newBudget, setNewBudget }){
    const budgetHistoryURL = `${SERVER}rebudget`; 
    const [budgetData, setBudgetData] = useState([]); 
    const navigate = useNavigate(); 

    console.log("newBudget from PROPS:", newBudget);

    useEffect(() => {
        fetch(budgetHistoryURL, {
            headers: {
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}`
            }, 
        })
        .then(response => response.json())
        .then(data => setBudgetData(data))
    }, [newBudget]); 
    console.log("Budget data retrieved from server:", budgetData);

    const setOldBudgetToInactive = () => {
        if (newBudget === true){
            const toUpdate = budgetData.slice(0, budgetData.length-1); 
            const updated = []; 
            toUpdate.map(budgetEntry => {
                budgetEntry.active = false; 
                fetch(`${SERVER}rebudget/${budgetEntry._id}`, {
                    method: "PUT", 
                    headers: {
                        "Content-Type": "application/json", 
                        "Authorization": `Bearer ${token}`
                    }, 
                    body: JSON.stringify(budgetEntry)
                })
                .then(response => response.json())
                .then(data => updated.push(data))
            }); 
            // console.log("Updated the active state for older budget entries:", updated);
            console.log("toUpdate:", toUpdate);
    
            // updated.push(budgetData[budgetData.length-1]); 
            setBudgetData(updated); 
            setNewBudget(false); 
        }
    }


    const budgetMap = budgetData.map((budget, index) => (
        <div key={index} className="card w-96 bg-base-100 shadow-xl border-2 border-yellow-300 rounded-md m-2 gap-2">
            <h4>Income: {budget.income}</h4>
            <h4>Fixed Expenditure: {budget.fixedExpenditure}</h4>
            <h4>Savings: {budget.savings}</h4>
            <h4>Allowance: {budget.allowance}</h4>
            <h4>Active: {budget.active === true ? "Yes" : "No"}</h4>
        </div>
    )); 

    return(
        <>
            <h1>BUDGET HISTORY</h1>
            {budgetMap}
            <button onClick={() => navigate("/personal/budget")}>Create new budget</button>
        </>
    )
}

export default BudgetHistoryPage; 