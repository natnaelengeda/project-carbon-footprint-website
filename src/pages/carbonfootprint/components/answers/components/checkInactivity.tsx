import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import isEqual from "lodash.isequal";

type CarbonState = any; // Replace this with your actual CarbonState type

export const useCarbonInactivity = (onInactivity: () => void, timeout = 180000) => {
  const carbon = useSelector((state: { carbon: CarbonState }) => state.carbon);
  const prevCarbonRef = useRef<CarbonState>(carbon);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isEqual(prevCarbonRef.current, carbon)) {
      console.log("Carbon state changed. Resetting timer...");
      prevCarbonRef.current = carbon;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        console.log("No carbon change for `{$timeout}` seconds. Triggering action.");
        onInactivity();
      }, timeout);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [carbon]);
};

export default useCarbonInactivity;