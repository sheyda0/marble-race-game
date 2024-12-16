import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => {
    return {
      keyboard: null,
      blocksCount: 6,
      blocksSeed: 0,
      /**
       * Time
       */
      startTime: 0,
      endTime: 0,

      /**
       * Phase
       */
      phase: "ready",
      clickKeyboard: (value) => {
        set((state) => {
          if (value === null) {
            return { keyboard: null };
          }

          if (state.phase === "ready") {
            return { keyboard: value, phase: "playing", startTime: Date.now() };
          }

          return { keyboard: value };
        });
      },

      start: () => {
        set((state) => {
          if (state.phase === "ready")
            return { phase: "playing", startTime: Date.now() };
          return {};
        });
      },
      restart: () => {
        set((state) => {
          if (state.phase === "playing" || state.phase === "ended")
            return { phase: "ready", blocksSeed: Math.random() };
          return {};
        });
      },
      end: () => {
        set((state) => {
          if (state.phase === "playing")
            return { phase: "ended", endTime: Date.now() };
          return {};
        });
      },
    };
  })
);
