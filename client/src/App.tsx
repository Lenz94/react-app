import { useState } from "react";
import Leagues from "./components/Leagues";
import TextScramble from "./components/TextScramble";
import LeagueDetails from "./components/LeagueDetails";

import { League } from "./types";
import "./App.css";

function App() {
  const [league, setLeague] = useState<League | null>(null);
  const [view, setView] = useState<"standings" | "scorers" | "matches">(
    "standings"
  );

  const handleSelectLeague = (selectedLeague: League) => {
    setLeague(selectedLeague);
  };

  return (
    <div className="row">
      <div className={`intro-container ${league?.id ? "col-md-6" : "col-12"}`}>
        <div className="row">
          <div
            className={`col-12 intro ${
              league?.id ? "col-md-12 league-selected" : "col-md-6"
            }`}
          >
            <h1 className="visually-hidden">Enzo Marcani</h1>
            <h2 className="visually-hidden">Web Developer</h2>
            <TextScramble />
          </div>

          <div
            className={`col-12 ${
              league?.id ? "col-md-12 league-selected" : "col-md-6"
            } football-data text-center`}
          >
            <h3 className="mt-4">Leagues</h3>
            <p className="desc m-auto mt-4 mb-4">
              Full-stack app with Node.js, Express, React, TypeScript, and
              Football Data API integration.
            </p>
            <Leagues onSelectLeague={handleSelectLeague} />
          </div>
        </div>
      </div>

      {league && (
        <LeagueDetails league={league} view={view} setView={setView} />
      )}
    </div>
  );
}

export default App;
