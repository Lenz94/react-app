import { useState } from "react";
import Standings from "./components/Standings";
import Leagues from "./components/Leagues";
import Scorers from "./components/Scorers";
import Fixtures from "./components/Fixtures";
import TextScramble from "./components/TextScramble";
import { IoFootball } from "react-icons/io5";
import { GiBabyfootPlayers, GiSoccerField } from "react-icons/gi";
import { League } from "./types";

import "./App.css";

function App() {
  const [league, setLeague] = useState<League | null>(null);

  const handleSelectLeague = (selectedLeague: League) => {
    setLeague(selectedLeague);
  };

  const LeagueDetails = ({ league }: { league: League }) => {
    const [view, setView] = useState<"standings" | "scorers" | "matches">(
      "standings"
    );

    return (
      <div className="col-12 col-md-6 bg-light text-center overflow-scroll">
        <div className="m-auto mt-4 mb-4">
          <div
            className="btn-group fit-content"
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              className={`btn btn-outline-dark btn-sm ${
                view === "standings" ? "active" : ""
              }`}
              onClick={() => setView("standings")}
            >
              <GiBabyfootPlayers size={40} />
            </button>
            <button
              type="button"
              className={`btn btn-outline-dark btn-sm ${
                view === "scorers" ? "active" : ""
              }`}
              onClick={() => setView("scorers")}
            >
              <IoFootball size={40} />
            </button>

            <button
              type="button"
              className={`btn btn-outline-dark btn-sm ${
                view === "matches" ? "active" : ""
              }`}
              onClick={() => setView("matches")}
            >
              <GiSoccerField size={40} />
            </button>
          </div>
        </div>
        <div className="league-container">
          <img src={league.emblem} alt={league.name} height="100" />
          <p className="mt-2">
            <strong>Season:</strong>{" "}
            {new Date(league.currentSeason.startDate).getFullYear()} /{" "}
            {new Date(league.currentSeason.endDate).getFullYear()}
          </p>
          {view === "standings" ? (
            <Standings key={league.id} leagueId={league.code} />
          ) : view === "scorers" ? (
            <Scorers key={league.code} leagueId={league.code} />
          ) : view === "matches" ? (
            <Fixtures key={league.code} id={league.code} matchDay={30} />
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="row">
        <div
          className={`intro-container ${league?.id ? "col-md-6" : "col-12"}`}
        >
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

              <div>
                <Leagues onSelectLeague={handleSelectLeague} />
              </div>
            </div>
          </div>
        </div>

        {league && <LeagueDetails league={league} />}
      </div>
    </>
  );
}

export default App;
