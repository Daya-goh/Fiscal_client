import { Outlet } from "react-router-dom";
import TabsLayout from "../Components/analysis/TabsLayout";


function AnalysisPage(){
    return(
        <>
            <TabsLayout />
            <Outlet />
        </>
    )
}

export default AnalysisPage; 