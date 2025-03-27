import { useEffect, useState } from "react";
import { API_URL } from "../utils/config";
import Fixtures from "./Fixtures";
import { Area, Competition, Season, Standing } from "../types";

interface LeagueResponse {
  area: Area;
  competition: Competition;
  season: Season;
  standings: Standing[];
}

const Standings = () => {
  const [league, setLeague] = useState<LeagueResponse | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const standingsUrl = "la-liga-standings";

  useEffect(() => {
    const fetchStandingsData = async () => {
      try {
        const response = await fetch(API_URL + "/" + standingsUrl);
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }

        const data: LeagueResponse = await response.json();

        if (data.standings.length > 0) {
          setLeague(data);
        } else {
          throw new Error("standings data is empty");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error ocurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStandingsData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!league) return <p>No data available</p>;

  return (
    <>
      <img
        src={league.competition.emblem}
        alt={league.competition.name}
        height="100"
      ></img>
      <p>
        <strong>Season:</strong> {league.season.startDate} /{" "}
        {league.season.endDate}
      </p>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">Position</th>
              <th scope="col">Team</th>
              <th scope="col">Played</th>
              <th scope="col">Won</th>
              <th scope="col">Draw</th>
              <th scope="col">Lost</th>
              <th scope="col">Points</th>
            </tr>
          </thead>
          <tbody>
            {league.standings[0].table.map((team) => (
              <tr
                key={team.team.id}
                onClick={() =>
                  setSelectedTeam({ id: team.team.id, name: team.team.name })
                }
                style={{ cursor: "pointer" }}
              >
                <th scope="row">{team.position}</th>
                <td className="team-flex">
                  <img
                    src={team.team.crest}
                    alt={team.team.name}
                    width="40"
                    height="40"
                  />
                  {team.team.name}
                </td>
                <td>{team.playedGames}</td>
                <td>{team.won}</td>
                <td>{team.draw}</td>
                <td>{team.lost}</td>
                <td>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTeam && (
        <Fixtures
          key={selectedTeam.id}
          teamId={selectedTeam.id}
          name={selectedTeam.name}
        />
      )}
    </>
  );
};

export default Standings;
