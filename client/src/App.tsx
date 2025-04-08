import { useState } from "react";
import Leagues from "./components/Leagues";
import TextScramble from "./components/TextScramble";
import LeagueDetails from "./components/LeagueDetails";
import LeaguePlaceholder from "./components/ui/LeaguePlaceholder";
import BallScroll from "./components/ui/BallScroll";

import { League } from "./types";
import "./App.css";

function App() {
  const [league, setLeague] = useState<League | null>(null);
  const [view, setView] = useState<"standings" | "scorers" | "matches">(
    "standings"
  );

  const handleSelectLeague = (selectedLeague: League) => {
    setLeague(selectedLeague);
  };

  return (
    <>
      {/* SECTION 1: INTRO */}
      <section className="section full-height d-flex">
        <div className="container-fluid my-auto">
          <div className="row h-100">
            <div className="col-md-6 mb-4 mb-md-0 d-flex align-items-center justify-content-center text-center">
              <div className="content-box light">
                <h1 className="visually-hidden">Enzo Marcani</h1>
                <h2 className="visually-hidden">Web Developer</h2>
                <TextScramble />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center text-center">
              <div className="content-box light">
                <h3>Hi, I'm Enzo 👋</h3>
                <div className="profile-picture mb-4">
                  <img
                    src="/profile.jpg"
                    alt="Enzo Marcani"
                    height={70}
                    width={70}
                  />
                </div>
                <p>
                  Web Developer with 9 years' experience delivering custom
                  full-stack solutions — highly skilled in JavaScript,
                  TypeScript, and modern frameworks like React, Angular, and
                  Vue. I combine technical expertise with a designer’s eye to
                  build fast, user-friendly, and scalable web apps. Experienced
                  across the stack with Node.js, Go and PHP. As a big football
                  fan, I enjoy creating projects that bring my passion for
                  sports and technology together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BallScroll />

      {/* SECTION 2: FOOTBALL APP */}
      <section className="section full-height d-flex">
        <div className="container-fluid my-auto">
          <div className="row h-100">
            <div className="col-md-6 mb-4 mb-md-0 d-flex align-items-center justify-content-center">
              <div className="content-box text-start w-100 px-4">
                <h3>⚽ Football Data App</h3>
                <p>
                  Built with React, TypeScript, Express, and Node.js. This is a
                  full-stack football stats app that fetches real-time data from
                  the{" "}
                  <a
                    href="https://www.football-data.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Football-Data.org
                  </a>{" "}
                  API.
                </p>
                <p>
                  Users can explore league tables, fixtures, and stats from top
                  European competitions.
                </p>
                <Leagues onSelectLeague={handleSelectLeague} />
              </div>
            </div>

            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <div className="content-box w-100 league-data">
                {league ? (
                  <LeagueDetails
                    league={league}
                    view={view}
                    setView={setView}
                  />
                ) : (
                  <LeaguePlaceholder />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
