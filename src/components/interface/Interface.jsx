import { Float, useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { addEffect } from "@react-three/fiber";
import useGame from "../../stores/useGame";
import { isMobile } from "react-device-detect";
import SelectTheme from "./SelectTheme";
import Preloader from "./Preloader";
import SoundButton from "./SoundButton";
import Settings from "./Settings";

export default function Interface() {
  const [showThemes, setShowThemes] = useState();

  const time = useRef();
  const selectThemeBtn = useRef();
  const audioRef = useRef(null);

  const clickKeyboard = useGame((state) => state.clickKeyboard);
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);
  const { play, reset, toggleMute, setAudioElement, isPlaying, isMuted } =
    useGame();

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  const clickButtonStart = (value) => {
    clickKeyboard(value);
  };

  const clickButtonStop = () => {
    clickKeyboard(null);
  };

  const handleShowThemes = (value) => {
    setShowThemes(value);
  };

  // useEffect(() => {
  //   if (phase !== "ready") {
  //     selectThemeBtn.current.remove();
  //     handleShowThemes(false);
  //     audioRef.current.src =
  //       "/action-intro-trailer-210365-[AudioTrimmer.com] (1).mp3";
  //   }
  // }, [phase]);

  useEffect(() => {
    if (audioRef.current) {
      if (phase === "ready") {
        audioRef.current.pause(); // Stop playback for "ready"
      } else if (phase !== "ready") {
        audioRef.current.pause(); // Pause the current playback
        audioRef.current.src = "/happyrock.mp3"; // Assign the new source
        audioRef.current.loop = true;
        audioRef.current.load(); // Reload the audio
        audioRef.current.play().catch((err) => {
          console.error("Audio playback failed:", err);
        });
      }

      if (phase === "ended") {
        audioRef.current.pause();
        audioRef.current.src = "/252114605-supportive-applause-charity-ru.m4a";
        audioRef.current.loop = false;
        audioRef.current.load();
        audioRef.current.play().catch((err) => {
          console.error("Audio playback failed on ended phase:", err);
        });
      }
    }
  }, [phase]);

  useEffect(() => {
    if (audioRef.current) {
      setAudioElement(audioRef.current);
    }
  }, [setAudioElement]);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime = 0;

      if (state.phase === "playing") {
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === "ended") {
        elapsedTime = state.endTime - state.startTime;
      }

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      time.current.textContent = elapsedTime;
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <>
      <Preloader />
      <audio ref={audioRef} src="" loop={true}></audio>
      {/* {phase === "ready" && ( */}
      <Settings onThemeBtnClick={() => handleShowThemes(true)} />
      {/* )} */}

      {/* <button
        ref={selectThemeBtn}
        className="change-theme-btn"
        onClick={() => handleShowThemes(true)}
      >
        <img src="./palette (2).png" alt="" />
      </button> */}
      {/* <SoundButton /> */}
      {showThemes && (
        <SelectTheme onThemeClick={() => handleShowThemes(false)} />
      )}
      <div className="interface">
        {/* Time */}
        <div className="time" ref={time}>
          0.00
        </div>

        {/* Restart */}
        {phase === "ended" && (
          <div className="restart" onClick={restart}>
            Restart
          </div>
        )}

        {/* Controls */}
        {isMobile && (
          <div className="controls">
            <div className="raw">
              <div
                className={`key ${forward ? "active" : ""}`}
                onMouseDown={() => clickButtonStart("forward")}
                onMouseUp={() => clickButtonStop()}
                onTouchStart={() => clickButtonStart("forward")}
                onTouchEnd={() => clickButtonStop()}
              ></div>
            </div>
            <div className="raw">
              <div
                className={`key ${leftward ? "active" : ""}`}
                onMouseDown={() => clickButtonStart("leftward")}
                onMouseUp={() => clickButtonStop()}
                onTouchStart={() => clickButtonStart("leftward")}
                onTouchEnd={() => clickButtonStop()}
              ></div>
              <div
                className={`key ${backward ? "active" : ""}`}
                onMouseDown={() => clickButtonStart("backward")}
                onMouseUp={() => clickButtonStop()}
                onTouchStart={() => clickButtonStart("backward")}
                onTouchEnd={() => clickButtonStop()}
              ></div>
              <div
                className={`key ${rightward ? "active" : ""}`}
                onMouseDown={() => clickButtonStart("rightward")}
                onMouseUp={() => clickButtonStop()}
                onTouchStart={() => clickButtonStart("rightward")}
                onTouchEnd={() => clickButtonStop()}
              ></div>
            </div>
            <div className="raw">
              <div
                className={`key large ${jump ? "active" : ""}`}
                onMouseDown={() => clickButtonStart("jump")}
                onMouseUp={() => clickButtonStop()}
                onTouchStart={() => clickButtonStart("jump")}
                onTouchEnd={() => clickButtonStop()}
              ></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
