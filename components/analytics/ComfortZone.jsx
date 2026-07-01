"use client";

import { useState } from "react";
import LeetCodePieChart from "./LeetCodePieChart";
import CodeforcesPieChart from "./CodeforcesPieChart";

export default function ComfortZone({
  lcPieData,
  cfPieData,
  lcStats,
  cfStats,
}) {
  const [tab, setTab] = useState("LeetCode");

  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="flex gap-2 mb-4">
        <button onClick={() => setTab("LeetCode")}>LC</button>
        <button onClick={() => setTab("Codeforces")}>CF</button>
      </div>

      {tab === "LeetCode" ? (
        <LeetCodePieChart data={lcPieData} />
      ) : (
        <CodeforcesPieChart data={cfPieData} />
      )}
    </div>
  );
}