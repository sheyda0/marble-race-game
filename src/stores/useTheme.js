import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => {
    return {
      ballColor: "#604CC3",
      floorColor: "#FF7F3E",
      abstacleColor: "#FFF6E9",
      wallColor: "#80C4E9",
      selectTheme: (theme) => {
        set((state) => {
          return {
            ballColor: theme.ballColor,
            floorColor: theme.floorColor,
            abstacleColor: theme.abstacleColor,
            wallColor: theme.wallColor,
          };
        });
      },
    };
  })
);
