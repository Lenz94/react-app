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
      className="content-box text-center w-100 overflow-auto"
    >
      <div className="mb-4">
        <div className="btn-group" role="group">
          <button
            type="button"
            className={`btn btn-outline-dark btn-sm ${
              view === "standings" ? "active" : ""
            }`}
            onClick={() => setView("standings")}
            title="Standings"
          >
            <GiBabyfootPlayers size={28} />
          </button>
          <button
            type="button"
            className={`btn btn-outline-dark btn-sm ${
              view === "scorers" ? "active" : ""
            }`}
            onClick={() => setView("scorers")}
            title="Top Scorers"
          >
            <IoFootball size={28} />
          </button>
          {league.code !== "CL" && (
            <button
              type="button"
              className={`btn btn-outline-dark btn-sm ${
                view === "matches" ? "active" : ""
              }`}
              onClick={() => setView("matches")}
              title="Fixtures"
            >
              <GiSoccerField size={28} />
            </button>
          )}
        </div>
      </div>

      <div className="league-container px-2">
        <img src={league.emblem} alt={league.name} height="80" />
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
