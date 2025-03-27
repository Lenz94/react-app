import { useEffect, useState } from "react";
import { API_URL } from "../utils/config";
import { Match } from "../types";

interface Props {
  teamId: number;
  name: string;
}

interface Filters {
  competitions: string;
}

interface ResultSet {
  count: number;
  competitions: string;
  first: string;
  last: string;
}

interface FixturesResponse {
  filters: Filters;
  resultSet: ResultSet;
  matches: Match[];
}

const Fixtures = ({ teamId, name }: Props) => {
  const [fixtures, setFixtures] = useState<FixturesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fixturesUrl = "team-fixtures";

  useEffect(() => {
    let isMounted = true;

    const fetchFixtures = async (teamId: number) => {
      setLoading(true); // Reset loading before fetching
      setError(null);
      try {
        const response = await fetch(
          API_URL + "/" + fixturesUrl + "?id=" + teamId
        );

        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (isMounted) setFixtures(data);
      } catch (error) {
        if (isMounted)
          setError(
            error instanceof Error ? error.message : "An unknown error occurred"
          );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFixtures(teamId);

    return () => {
      isMounted = false;
    };
  }, [teamId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-4">
      <h3 className="mb-4">{name} - Upcoming matches</h3>

      <div className="row">
        {fixtures?.matches.map((match) => (
          <div key={match.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card mb-4">
              <div className="card-header text-bg-dark text-center">
                <strong>{match.competition.name}</strong>
              </div>
              <div className="card-body">
                <div className="card-text match-fixture">
                  <div className="match-fixture-teams">
                    <div className="team-flex">
                      <img
                        src={match.homeTeam.crest}
                        alt={match.homeTeam.name}
                        height="30"
                      ></img>
                      {match.homeTeam.name}
                    </div>
                    <div className="team-flex">
                      <img
                        src={match.awayTeam.crest}
                        alt={match.awayTeam.name}
                        height="30"
                      ></img>
                      {match.awayTeam.name}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer match-fixture-date-time text-center">
                {new Date(match.utcDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/*<ul>
        {fixtures?.matches.map((match) => (
          <li key={match.id}>
            {match.homeTeam.name} vs {match.awayTeam.name} on{" "}
            {new Date(match.utcDate).toLocaleDateString()}
          </li>
        ))} 
      </ul>*/}
    </div>
  );
};

export default Fixtures;
