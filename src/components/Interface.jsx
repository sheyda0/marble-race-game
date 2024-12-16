import { useKeyboardControls } from "@react-three/drei";
import { useKeyboard } from "../context/keyboardContext";
import { useEffect, useRef, useState } from "react";
import useGame from "../stores/useGame";
import { addEffect } from "@react-three/fiber";

export default function Interface() {
  const time = useRef();

  const clickKeyboard = useGame((state) => state.clickKeyboard);
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  const clickButtonStart = (value) => {
    clickKeyboard(value); // Start the movement
  };

  const clickButtonStop = () => {
    clickKeyboard(null);
  };

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
    </div>
  );
}
