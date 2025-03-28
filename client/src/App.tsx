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
      <div className="intro-container row vh-100">
        <div className="col-12 col-md-6 intro">
          <TextScramble></TextScramble>
        </div>
        <div className="col-12 col-md-6 football-data">
          <h3 className="mt-4 mb-4 text-center">Leagues</h3>
          <div>
            <Leagues onSelectLeague={handleSelectLeague} />
          </div>
        </div>
      </div>
      <div className="container">
        {leagueId && <Standings key={leagueId} leagueId={leagueId} />}
      </div>
    </>
  );
}

export default App;
