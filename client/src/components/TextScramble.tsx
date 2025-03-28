import { useEffect, useRef, useState } from "react";

const phrases = ["Enzo Marcani", "Web Developer"];

const TextScramble = () => {
  // Ref to the element where text will be rendered
  const elRef = useRef<HTMLSpanElement | null>(null);

  const [isMounted, setIsMounted] = useState<boolean>(true);

  // Characters for the scramble effect
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false); // When component unmounts, mark as not mounted
    };
  }, []);

  // Scrambling effect function
  const scrambleText = (newText: string) => {
    const oldText = elRef.current?.innerText || ""; // Get the old text
    const length = Math.max(oldText.length, newText.length);

    const queue: {
      from: string;
      to: string;
      start: number;
      end: number;
      char: string;
    }[] = [];

    // Generate the scramble effect parameters for each character
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.push({ from, to, start, end, char: "" });
    }

    let frame = 0;

    // Update the text frame-by-frame to create the scrambling effect
    const update = () => {
      if (!isMounted) return;
      let output = "";
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        let { from, to, start, end, char } = queue[i];

        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          // Generate a random character for the scrambling effect
          if (!char || Math.random() < 0.28) {
            char = chars[Math.floor(Math.random() * chars.length)];
            queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }

      if (elRef.current) {
        elRef.current.innerHTML = output;
      }

      if (complete === queue.length) return;

      frame++;
      requestAnimationFrame(update);
    };

    update();
  };

  // Change text every 3 seconds
  useEffect(() => {
    let counter = 0;

    const nextPhrase = () => {
      scrambleText(phrases[counter]);
      counter = (counter + 1) % phrases.length;
    };

    nextPhrase(); // Initial scramble
    const intervalId = setInterval(nextPhrase, 3000); // Change text every 3s

    // Cleanup the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs once on mount

  return <span ref={elRef} className="scramble-text"></span>;
};

export default TextScramble;
