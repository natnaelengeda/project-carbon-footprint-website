import React, { useState } from "react";
import CarbonFootprintProgress from "./questions/components/page-22/components/CarbonFootprintProgress";

export default function CarbonFootprintProgressTestPage() {
  const [yourValue, setYourValue] = useState(1200);
  const [globalValue, setGlobalValue] = useState(4700);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl text-white mb-6">Test CarbonFootprintProgress</h1>
      <div className="flex gap-8 mb-8">
        <div>
          <label className="block text-white mb-1">Your Value</label>
          <input
            type="number"
            value={yourValue}
            onChange={e => setYourValue(Number(e.target.value))}
            className="p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-white mb-1">Global Value</label>
          <input
            type="number"
            value={globalValue}
            onChange={e => setGlobalValue(Number(e.target.value))}
            className="p-2 rounded"
          />
        </div>
      </div>
      <div className="w-full max-w-3xl">
        <CarbonFootprintProgress
          value={yourValue}
          secondValue={globalValue}
          firstText="You"
          secondText="Global Average"
          firstColror="bg-green-400"
          secondColor="bg-blue-500"
        />
      </div>
    </div>
  );
}