import { useEffect, useState } from "react";

const messages = [
  "Pick a league, any league...",
  "Waiting for kickoff…",
  "Let’s get this match started!",
];

const LeaguePlaceholder = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="placeholder d-flex flex-column align-items-center justify-content-center h-100 text-muted">
      <div className="ball mb-3" />
      <p className="typewriter">{messages[index]}</p>
    </div>
  );
};

export default LeaguePlaceholder;
