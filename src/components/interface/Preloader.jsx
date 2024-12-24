import React, { useEffect, useState } from "react";
import useModel from "../../stores/useModel";
import useGame from "../../stores/useGame";
import { isMobile } from "react-device-detect";

const Preloader = () => {
  const { model } = useModel(); // Access the model from Zustand
  const [loadingComplete, setLoadingComplete] = useState(false);

  const { play, reset, toggleMute, setAudioElement, isPlaying, isMuted } =
    useGame();

  useEffect(() => {
    // Check if the model is loaded
    if (model) {
      const timeout = setTimeout(() => {
        setLoadingComplete(true); // Hide the loader after a short delay
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [model]);

  const handleStart = () => {
    const overlay = document.querySelector(".overlay");
    const startButton = document.querySelector(".start");

    overlay.classList.add("fade");
    startButton.classList.add("fadeOut");

    // audio = new Audio("./time-to-win-271426.mp3");
    // audio.play();
    play();

    setTimeout(() => {
      startButton.remove();
      overlay.remove();
    }, 1500);
  };

  return (
    <>
      <div className="overlay"></div>
      {!loadingComplete && (
        <>
          <div className="loading">
            <h1>
              Loading Experience...{" "}
              <span id="progressPercentage">{model ? "100" : "0"}</span>%
            </h1>
          </div>
        </>
      )}
      {loadingComplete && (
        <div className="start">
          <button onClick={handleStart} type="button">
            START
          </button>
          {!isMobile && <div>Move: WASD</div>}
        </div>
      )}
    </>
  );
};

export default Preloader;
