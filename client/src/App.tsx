import { useState } from "react";
import Standings from "./components/Standings";
import Leagues from "./components/Leagues";
import TextScramble from "./components/TextScramble";

import "./App.css";

function App() {
  const [leagueId, setLeagueId] = useState<string | null>(null);

  const handleSelectLeague = (id: string) => {
    setLeagueId(id);
  };

  return (
    <>
      <div className="row">
        <div className={`intro-container ${leagueId ? "col-md-6" : "col-12"}`}>
          <div className="row">
            <div
              className={`col-12 intro ${
                leagueId ? "col-md-12 league-selected" : "col-md-6"
              }`}
            >
              <h1 className="visually-hidden">Enzo Marcani</h1>
              <TextScramble />
            </div>

            <div
              className={`col-12 ${
                leagueId ? "col-md-12 league-selected" : "col-md-6"
              } football-data text-center`}
            >
              <h3 className="mt-4">Leagues</h3>
              <p className="desc m-auto mt-4 mb-4">
                Full-stack app with Node.js, Express, React, TypeScript, and
                Football Data API integration.
              </p>
              <div>
                <Leagues onSelectLeague={handleSelectLeague} />
              </div>
            </div>
          </div>
        </div>

        {leagueId && (
          <div className="col-12 col-md-6 d-flex bg-light text-center overflow-scroll">
            <Standings key={leagueId} leagueId={leagueId} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
