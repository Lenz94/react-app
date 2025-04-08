import { useState } from "react";
import { IoFootballOutline } from "react-icons/io5"; // Ball icon
import { TbPlayFootball } from "react-icons/tb"; // Foot icon
import "./BallScroll.css";

const BallScroll = () => {
  const [isKicked, setIsKicked] = useState(false);

  const handleScroll = () => {
    setIsKicked(true);

    // Wait for the animation to finish, then scroll
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
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
        {/* Ball Icon */}
        <IoFootballOutline className="ball-icon" size={40} color="#000000" />

        {/* Foot icon that appears on hover */}
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
