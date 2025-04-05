import Standings from "./Standings";
import Scorers from "./Scorers";
import MatchDayAccordion from "./MatchDayAccordion";
import { IoFootball } from "react-icons/io5";
import { GiBabyfootPlayers, GiSoccerField } from "react-icons/gi";
import { League } from "../types";

interface LeagueDetailsProps {
  league: League;
  view: "standings" | "scorers" | "matches";
  setView: (view: "standings" | "scorers" | "matches") => void;
}

const LeagueDetails = ({ league, view, setView }: LeagueDetailsProps) => {
  const leagueMatchdays: Record<string, number> = {
    PL: 38,
    PD: 38,
    BL1: 34,
    SA: 38,
    FL1: 34,
    ELC: 46,
    DED: 34,
    PPL: 34,
    UCL: 2,
  };

  return (
    <div
      id={`leagueContent_${league.code}`}
      className="col-12 col-md-6 bg-light text-center overflow-scroll"
    >
      <div className="m-auto mt-4 mb-4">
        <div className="btn-group fit-content" role="group">
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
          {league.code !== "CL" && (
            <button
              type="button"
              className={`btn btn-outline-dark btn-sm ${
                view === "matches" ? "active" : ""
              }`}
              onClick={() => setView("matches")}
            >
              <GiSoccerField size={40} />
            </button>
          )}
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
          <MatchDayAccordion
            leagueCode={league.code}
            currentMatchday={league.currentSeason.currentMatchday}
            totalMatchdays={leagueMatchdays[league.code]}
          />
        ) : null}
      </div>
    </div>
  );
};

export default LeagueDetails;
