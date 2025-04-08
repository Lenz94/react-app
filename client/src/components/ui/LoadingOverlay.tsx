import { useState, useEffect } from "react";
import "./LoadingOverlay.css";

interface Props {
  isLoading: boolean;
  delay?: number;
  minDisplayTime?: number; // Minimum display time before hiding the loader
  debug?: boolean; // New debug flag to keep the loader visible forever
}

const LoadingOverlay = ({
  isLoading,
  delay = 300,
  minDisplayTime = 500,
  debug = false,
}: Props) => {
  const [show, setShow] = useState(false);
  const [startLoadingTime, setStartLoadingTime] = useState<number | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (debug) {
      setShow(true); // Keep the loader visible indefinitely if in debug mode
      return;
    }

    if (isLoading) {
      setStartLoadingTime(Date.now());
      timeout = setTimeout(() => setShow(true), delay); // Delay before showing loader
    } else {
      // Make sure the loader stays visible for the minDisplayTime
      if (startLoadingTime && Date.now() - startLoadingTime < minDisplayTime) {
        timeout = setTimeout(
          () => setShow(false),
          minDisplayTime - (Date.now() - startLoadingTime)
        );
      } else {
        setShow(false); // Hide immediately if the minimum display time is already passed
      }
    }

    return () => clearTimeout(timeout); // Cleanup timeout on unmount or state change
  }, [isLoading, delay, minDisplayTime, startLoadingTime, debug]);

  if (!show) return null;

  return (
    <div className="loading-overlay">
      <img src="/football.svg" alt="Loading..." className="loading-icon" />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingOverlay;
