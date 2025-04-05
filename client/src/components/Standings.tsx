import { useEffect, useState } from "react";
import { API_URL } from "../utils/config";
import Fixtures from "./Fixtures";
import { Area, Competition, Season, Standing } from "../types";

interface Props {
  leagueId: string;
}

interface LeagueResponse {
  area: Area;
  competition: Competition;
  season: Season;
  standings: Standing[];
}

const Standings = ({ leagueId }: Props) => {
  const [league, setLeague] = useState<LeagueResponse | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleTeamSelection = (id: number, name: string) => {
    setSelectedTeam((prev) => (prev?.id === id ? prev : { id, name }));
  };

  const closeTeamSelection = () => {
    setSelectedTeam(null);
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchStandingsData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL + "/standings?id=" + leagueId);
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }

        const data: LeagueResponse = await response.json();

        if (isMounted) {
          if (data.standings.length > 0) {
            setLeague(data);
          } else {
            throw new Error("Standings data is empty");
          }
        }
      } catch (error) {
        if (isMounted) {
          setError(
            error instanceof Error ? error.message : "An unknown error occurred"
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchStandingsData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading)
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  if (!league) return <p>No data available</p>;

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover w-auto m-auto align-middle text-center">
          <thead className="table-dark sticky-top">
            <tr>
              <th className="sticky-column border-top-left-radius" scope="col">
                Pos.
              </th>
              <th className="min-w-200 sticky-column" scope="col">
                Club
              </th>
              <th scope="col">MP</th>
              <th scope="col">W</th>
              <th scope="col">D</th>
              <th scope="col">L</th>
              <th scope="col">GF</th>
              <th scope="col">GA</th>
              <th scope="col">GD</th>
              <th
                className="sticky-column right border-top-right-radius"
                scope="col"
              >
                Pts
              </th>
            </tr>
          </thead>
          <tbody>
            {league.standings &&
              league.standings[0].table.map((team) => (
                <tr
                  key={team.team.id}
                  onClick={() =>
                    handleTeamSelection(team.team.id, team.team.shortName)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <th className="sticky-column" scope="row">
                    {team.position}
                  </th>
                  <th className="sticky-column" scope="row">
                    <div className="team-flex">
                      <img
                        src={team.team.crest}
                        alt={team.team.name}
                        width="40"
                        height="40"
                      />
                      {team.team.shortName}
                    </div>
                  </th>
                  <td>{team.playedGames}</td>
                  <td>{team.won}</td>
                  <td>{team.draw}</td>
                  <td>{team.lost}</td>
                  <td>{team.goalsFor}</td>
                  <td>{team.goalsAgainst}</td>
                  <td>{team.goalDifference}</td>
                  <th className="sticky-column right">{team.points}</th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {selectedTeam && (
        <div
          className="offcanvas offcanvas-end show"
          tabIndex={-1}
          id="offcanvas"
          aria-labelledby="offcanvasLabel"
        >
          <div className="offcanvas-header text-center">
            <h4 className="offcanvas-title" id="offcanvasLabel">
              {selectedTeam.name} - Fixture
            </h4>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={closeTeamSelection}
            ></button>
          </div>
          <div className="offcanvas-body">
            <Fixtures key={selectedTeam.id} id={selectedTeam.id} />
          </div>
        </div>
      )}
    </>
  );
};

export default Standings;
