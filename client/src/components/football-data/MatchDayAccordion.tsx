import { useState, useEffect, useRef } from "react";
import Fixtures from "./Fixtures";

interface Props {
  leagueCode: string;
  currentMatchday: number;
  totalMatchdays: number;
}

const MatchDayAccordion = ({
  leagueCode,
  currentMatchday,
  totalMatchdays,
}: Props) => {
  const [openMatchDay, setOpenMatchDay] = useState<number | null>(
    currentMatchday
  );
  const matchDayRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const toggleMatchDay = (matchDay: number) => {
    setOpenMatchDay((prev) => {
      const newOpenMatchDay = prev === matchDay ? null : matchDay;
      if (newOpenMatchDay !== null) {
        setTimeout(() => {
          matchDayRefs.current[newOpenMatchDay]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
      return newOpenMatchDay;
    });
  };

  useEffect(() => {
    if (openMatchDay !== null && matchDayRefs.current[openMatchDay]) {
      matchDayRefs.current[openMatchDay]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [openMatchDay]);

  return (
    <div className="league-fixtures pb-4">
      <div className="accordion">
        {[...Array(totalMatchdays)].map((_, index) => {
          const matchDay = index + 1;
          return (
            <div
              className="accordion-item"
              key={matchDay}
              ref={(el) => {
                if (el) matchDayRefs.current[matchDay] = el;
              }}
            >
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${
                    openMatchDay === matchDay ? "" : "collapsed"
                  }`}
                  type="button"
                  onClick={() => toggleMatchDay(matchDay)}
                  aria-expanded={openMatchDay === matchDay}
                >
                  <strong>Match Day: {matchDay}</strong>
                </button>
              </h2>
              <div
                id={`collapse-${matchDay}`}
                className={`accordion-collapse collapse ${
                  openMatchDay === matchDay ? "show" : ""
                }`}
                data-bs-parent="#customAccordion"
                style={{ transition: "height 0.3s ease" }} // Added transition for smooth accordion opening/closing
              >
                <div className="accordion-body">
                  {openMatchDay === matchDay && (
                    <Fixtures
                      key={`${leagueCode}-${matchDay}`}
                      id={leagueCode}
                      matchDay={matchDay}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchDayAccordion;
