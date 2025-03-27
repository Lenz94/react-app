import { useEffect, useState } from "react";

interface Player {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
}

interface Coach {
  firstName: string;
  lastName: string;
}
interface Team {
  id: number;
  shortName: string;
  founded: number;
  crest: string;
  clubColors: string;
  venue: string;
  coach: Coach;
  squad: Player[];
}

const RealMadrid = () => {
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const madridDataEndPoint = "real-madrid-data";

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/" + madridDataEndPoint
        );

        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTeam(data);
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

    fetchTeamData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{team?.shortName}</h1>
      <p>Founded: {team?.founded}</p>
      <img src={team?.crest}></img>
      <div className="container">
        <ul className="list-group">
          {team?.squad.map((player) => (
            <li className="list-group-item">
              {player.name} - {player.position}
            </li>
          ))}
        </ul>

        <div className="row align-items-start">
          {team?.squad.map((player) => (
            <div key={player.id} className="col">
              <div className="card" style={{ width: "14rem" }}>
                <div className="card-body">
                  <h5 className="card-title">{player.name}</h5>
                  <p className="card-text">
                    <strong>Position: - </strong> {player.position}
                    <br />
                    DOB: {new Date(
                      player.dateOfBirth
                    ).toLocaleDateString()}{" "}
                    <br />
                    Nationality: {player.nationality}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealMadrid;
