import React, { useState } from "react";
import MonthRanking from "./MonthRanking";
import SeasonRanking from "./SeasonRanking";

export default function TravelRanking() {
  const [activeTab, setActiveTab] = useState("By Month");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-white mt-8 ml-4">
      <div className="flex justify-start mt-4 ml-4 mb-4">
        <button
          className={`ml-4 mr-4 ${
            activeTab === "By Month"
              ? "font-bold border-t-4 border-blue-500"
              : "font-bold"
          }`}
          onClick={() => handleTabChange("By Month")}
        >
          월 별
        </button>
        <h2>|</h2>
        <button
          className={`ml-4 ${
            activeTab === "By Season"
              ? "font-bold border-t-4 border-blue-500"
              : "font-bold"
          }`}
          onClick={() => handleTabChange("By Season")}
        >
          계절 별
        </button>
      </div>

      {activeTab === "By Month" && <MonthRanking />}
      {activeTab === "By Season" && <SeasonRanking />}
    </div>
  );
}
