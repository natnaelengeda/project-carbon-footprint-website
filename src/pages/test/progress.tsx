import React, { useState } from "react";
import CarbonFootprintProgress from "../carbonfootprint/components/questions/components/page-22/components/CarbonFootprintProgress";

const globalAverage = 4700;
const ethiopianAverage = 170;

export default function CarbonFootprintProgressTestPage() {
  const [yourValue, setYourValue] = useState(1200);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start ">
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
      </div>
      <div className="gap-5 w-full flex flex-col items-center justify-center ">
        {/* Global Average Comparison */}
        <div className="w-5/6 flex flex-col items-center justify-center space-y-8">
          <span className="text-white">
            <p className="text-lg">
              Global average carbon footprint per person is per year {globalAverage} KG CO₂-e
            </p>
          </span>
          {yourValue < globalAverage ? (
            <CarbonFootprintProgress
              value={yourValue}
              secondValue={globalAverage}
              firstText="You"
              secondText="Global Average"
              firstColror="bg-green-400"
              secondColor="bg-blue-500"
            />
          ) : (
            <CarbonFootprintProgress
              value={globalAverage}
              secondValue={yourValue}
              firstText="Global Average"
              secondText="You"
              firstColror="bg-blue-500"
              secondColor="bg-green-400"
            />
          )}
        </div>
        {/* Ethiopian Average Comparison */}
        <div className="w-5/6 flex flex-col items-center justify-center space-y-8">
          <span className="text-white">
            <p className="text-lg">
              Ethiopian average carbon footprint per person is per year {ethiopianAverage} KG CO₂-e
            </p>
          </span>
          {yourValue < ethiopianAverage ? (
            <CarbonFootprintProgress
              value={yourValue}
              secondValue={ethiopianAverage}
              firstText="You"
              secondText="Ethiopian Average"
              firstColror="bg-green-400"
              secondColor="bg-blue-500"
            />
          ) : (
            <CarbonFootprintProgress
              value={ethiopianAverage}
              secondValue={yourValue}
              firstText="Ethiopian Average"
              secondText="You"
              firstColror="bg-blue-500"
              secondColor="bg-green-400"
            />
          )}
        </div>
      </div>
    </div>
  );
}