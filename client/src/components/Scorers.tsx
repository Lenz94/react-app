import { useEffect, useState } from "react";
import { API_URL } from "../utils/config";
import { Scorer } from "../types";

interface Props {
  leagueId: string;
}

const Scorers = ({ leagueId }: Props) => {
  const [leagueScorer, setLeagueScorers] = useState<Scorer[] | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchTopScorers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL + "/scorers?id=" + leagueId);
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }

        const data: any = await response.json();

        if (isMounted) {
          if (data.scorers.length > 0) {
            setLeagueScorers(data.scorers);
          } else {
            throw new Error("Top scorers data is empty");
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
    fetchTopScorers();
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

  if (!leagueScorer) return <p>No data available</p>;

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover w-auto m-auto align-middle text-center">
          <thead className="table-dark sticky-top">
            <tr>
              <th className="sticky-column" scope="col">
                Pos.
              </th>
              <th className="min-w-200 sticky-column left-45" scope="col">
                Name
              </th>
              <th scope="col">Club</th>
              <th scope="col">Goals</th>
            </tr>
          </thead>
          <tbody>
            {leagueScorer.map((scorer, index) => (
              <tr key={scorer.player.id}>
                <th className="sticky-column" scope="row">
                  {index + 1}
                </th>
                <th className="sticky-column left-45">{scorer.player.name}</th>
                <td>
                  <div className="team-flex">
                    <img
                      src={scorer.team.crest}
                      alt={scorer.team.name}
                      width="40"
                      height="40"
                    />
                    {scorer.team.shortName}
                  </div>
                </td>
                <td>{scorer.goals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Scorers;
