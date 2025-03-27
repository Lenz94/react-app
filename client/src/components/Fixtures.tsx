import { useEffect, useState } from "react";
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
    const fetchFixtures = async (teamId: number) => {
      try {
        const response = await fetch(
          "http://localhost:8080/" + fixturesUrl + "?id=" + teamId
        );

        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFixtures(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    /*fetchAPI();*/
    fetchFixtures(teamId);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{name} Fixtures</h1>
      <ul>
        {fixtures?.matches.map((match) => (
          <li key={match.id}>
            {match.homeTeam.name} vs {match.awayTeam.name} on{" "}
            {new Date(match.utcDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Fixtures;
