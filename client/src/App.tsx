import { useState } from "react";
import Standings from "./components/Standings";
import Leagues from "./components/Leagues";

import "./App.css";

function App() {
  const [leagueId, setLeagueId] = useState<string | null>(null);

  const handleSelectLeague = (id: string) => {
    setLeagueId(id);
  };

  return (
    <div className="container">
      <h1 className="mt-4">Marcani - Football Data</h1>
      <Leagues onSelectLeague={handleSelectLeague} />
      {leagueId && <Standings key={leagueId} leagueId={leagueId} />}
    </div>
  );
}

export default App;
