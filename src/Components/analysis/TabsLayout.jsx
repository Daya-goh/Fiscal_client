import { Link } from "react-router-dom";


function TabsLayout(){
    return(
        <>
            <Link to={`/personal/analysis/expenses/month/`} className="tabsLayout">EXPENSES</Link>
            <Link to={`/personal/analysis/savings/year`} className="tabsLayout">SAVINGS</Link>
            <Link to={`/personal/analysis/balance/month`} className="tabsLayout">BALANCE</Link>
        </>
    )
}
export default TabsLayout; 