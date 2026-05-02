import React, { useRef } from 'react';
import '../style/MatrixText.css';

const MatrixText = () => {
  const textRef = useRef(null);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@&*%";
  const originalText = "Ingeniero en Informática.";
  let interval = null;

  const handleMouseOver = () => {
    let iteration = 0;
    clearInterval(interval);
    interval = setInterval(() => {
      if (!textRef.current) return;
      textRef.current.innerText = originalText
        .split("")
        .map((letter, index) => {
          if (index < iteration) return originalText[index];
          return letters[Math.floor(Math.random() * 42)];
        })
        .join("");
      if (iteration >= originalText.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <h2 ref={textRef} onMouseOver={handleMouseOver} className="job-title matrix-effect">
      {originalText}
    </h2>
  );
};

export default MatrixText;