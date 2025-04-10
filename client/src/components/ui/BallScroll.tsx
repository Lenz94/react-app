import { useState } from "react";
import { IoFootballSharp } from "react-icons/io5"; // Ball icon
import { TbPlayFootball } from "react-icons/tb"; // Foot icon

const BallScroll = () => {
  const [isKicked, setIsKicked] = useState(false);

  const handleScroll = () => {
    setIsKicked(true);

    // Wait for the animation to finish, then scroll
    setTimeout(() => {
      const footballDataApp = document.getElementById("football-data-app");

      if (footballDataApp) {
        footballDataApp.scrollIntoView({ behavior: "smooth", block: "end" });
      }
      /*
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });*/
      setIsKicked(false); // Reset kick state
    }, 200); // Duration of the animation
  };

  return (
    <>
      {/* Scroll Ball */}
      <div
        className={`scroll-ball ${isKicked ? "kick" : ""}`}
        onClick={handleScroll}
      >
        <IoFootballSharp className="ball-icon" size={40} color="#000000" />

        <TbPlayFootball
          className={`foot-icon ${isKicked ? "kicked" : ""}`}
          size={40}
          color="#ffffff"
        />
      </div>
      <p className="scroll-text"></p>
    </>
  );
};

export default BallScroll;
