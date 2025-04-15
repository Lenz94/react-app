import { useState, useRef } from "react";
import Leagues from "./Leagues";
import LeagueDetails from "./LeagueDetails";
import LeaguePlaceholder from "../ui/LeaguePlaceholder";
import { League } from "../../types";

const FootBallData = () => {
  const [league, setLeague] = useState<League | null>(null);
  const [view, setView] = useState<"standings" | "scorers" | "matches">(
    "standings"
  );

  const leagueDetailsRef = useRef<HTMLDivElement | null>(null);

  const handleSelectLeague = (selectedLeague: League) => {
    setLeague(selectedLeague);
    if (window.innerWidth <= 768) {
      // Only scroll if on mobile
      if (window.innerWidth <= 768 && leagueDetailsRef.current) {
        leagueDetailsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="section full-height d-flex">
      <div className="container-fluid my-auto">
        <div className="row h-100">
          <div
            id="football-data-app"
            className="col-md-6 mb-4 mb-md-0 d-flex align-items-center justify-content-center"
          >
            <div className="content-box text-start w-100 px-4">
              <h3>⚽ Football Data App</h3>
              <p>
                Built with React, TypeScript, Express, and Node.js. This is a
                full-stack football stats app that fetches real-time data from
                the{" "}
                <a
                  href="https://www.football-data.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Football-Data.org
                </a>{" "}
                API.
              </p>
              <p>
                Select a league below to explore standings, fixtures, and stats
                from top European competitions.
              </p>
              <Leagues onSelectLeague={handleSelectLeague} />
            </div>
          </div>

          <div
            ref={leagueDetailsRef}
            className="col-md-6 d-flex align-items-center justify-content-center"
          >
            <div className="content-box w-100 league-data">
              {league ? (
                <LeagueDetails league={league} view={view} setView={setView} />
              ) : (
                <LeaguePlaceholder />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FootBallData;
