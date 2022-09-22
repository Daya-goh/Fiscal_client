import { useState } from "react";
import { Link } from "react-router-dom";

function TabsLayout() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabs = [
    { link: `/personal/analysis/expenses/month/`, name: "EXPENSES" },
    { link: `/personal/analysis/balance/month`, name: "BALANCE" },
  ];

  return (
    <div className="flex justify-center">
      {tabs.map((tab, index) => (
        <Link
          to={tab.link}
          className={`tab tab-lifted ${
            index === activeTabIndex ? `tab-active` : ""
          } `}
          key={index}
          onClick={() => setActiveTabIndex(index)}
        >
          {tab.name}
        </Link>
      ))}
    </div>
  );
}
export default TabsLayout;
