import { useEffect, useState } from "react";
import { Area, Season } from "../types";
import { API_URL } from "../utils/config";

type LeaguesProps = {
  onSelectLeague: (id: string) => void;
};

interface League {
  id: number;
  name: string;
  area: Area;
  code: string;
  type: string;
  emblem: string;
  currentSeason: Season;
}

const Leagues = ({ onSelectLeague }: LeaguesProps) => {
  const [competitions, setCompetitions] = useState<League[] | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const ignoredLeagues = ["BSA", "EC", "CLI", "WC"];

  useEffect(() => {
    let isMounted = true;

    const fetchLeagues = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL + "/competitions");
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (isMounted) {
          if (data.competitions.length > 0) {
            setCompetitions(data.competitions);
          } else {
            throw new Error("League Data is empty");
          }
        }
      } catch (error) {
        if (isMounted) {
          setError(
            error instanceof Error ? error.message : "An unknown error ocurred"
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchLeagues();

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

  if (!competitions) return <p>No data available</p>;

  return (
    <div className="competitions">
      {competitions
        ?.filter((competition) => !ignoredLeagues.includes(competition.code))
        .map((competition) => (
          <div key={competition.id} className="competition-logo">
            <img
              onClick={() => onSelectLeague(competition.code)}
              src={competition.emblem}
              alt={competition.name}
              height={50}
              className="pointer"
            />
          </div>
        ))}
    </div>
  );
};

export default Leagues;
