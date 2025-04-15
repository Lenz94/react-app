import { useEffect, useState } from "react";
import { API_URL, formatMatchDate } from "../../utils/config";
import LoadingOverlay from "../ui/LoadingOverlay";
import { Match } from "../../types";

interface Props {
  id: number | string;
  matchDay?: number | undefined;
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
  matches: Match[] | [];
}

const Fixtures = ({ id, matchDay }: Props) => {
  const [fixtures, setFixtures] = useState<FixturesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getFixtureUrl = (
    teamId: number | string,
    matchDay: number | undefined
  ) => {
    let url: string = "";
    if (typeof teamId === "number") {
      url = `team-fixtures?teamId=${teamId}`;
    } else {
      url = `league-fixtures?leagueCode=${teamId}&matchDay=${matchDay}`;
    }
    return url;
  };

  useEffect(() => {
    let isMounted = true;

    const fetchFixtures = async (
      teamId: number | string,
      matchDay?: number | undefined
    ) => {
      setLoading(true); // Reset loading before fetching
      setError(null);

      try {
        const response = await fetch(
          API_URL + "/" + getFixtureUrl(teamId, matchDay)
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

    fetchFixtures(id, matchDay);

    return () => {
      isMounted = false;
    };
  }, [id, matchDay]);

  return (
    <div className="row">
      <LoadingOverlay isLoading={loading} delay={100} minDisplayTime={1000} />

      {error && (
        <div className="text-center">
          <p>Error: {error}. Please try again later.</p>
        </div>
      )}

      {fixtures && fixtures.matches.length === 0 && (
        <p className="text-center">No fixtures available for this matchday.</p>
      )}

      {fixtures?.matches?.map((match) => (
        <div
          key={match.id}
          className={`col-12 ${matchDay ? "col-md-6" : "col-md-12"}`}
        >
          <div className="card flex-row mb-4 shadow-sm">
            <div className="card-header flex-shrink-0">
              <div className="competition-logo">
                <img
                  src={match.competition.emblem}
                  alt={match.competition.name}
                  width="40"
                  height="40"
                />
              </div>
            </div>
            <div className="d-flex flex-column flex-grow-1">
              <div className="card-body fixture-card-body">
                <div className="card-text match-fixture">
                  <div className="match-fixture-teams">
                    <div className="team-flex">
                      <img
                        src={match.homeTeam.crest}
                        alt={match.homeTeam.name}
                        height="30"
                      />
                      {match.homeTeam.shortName}
                    </div>
                    <div className="team-flex">
                      <img
                        src={match.awayTeam.crest}
                        alt={match.awayTeam.name}
                        height="30"
                      />
                      {match.awayTeam.shortName}
                    </div>
                  </div>
                  {match.score.fullTime.home !== null && (
                    <div className="match-fixture-score">
                      <div className="score">{match.score.fullTime.home}</div>
                      <div className="score">{match.score.fullTime.away}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="card-footer match-fixture-date-time text-center">
                <div className="match-day">
                  <strong>Match #{match.matchday}</strong>
                </div>
                <div>{formatMatchDate(match.utcDate)}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Fixtures;
