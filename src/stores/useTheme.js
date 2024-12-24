import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => {
    return {
      ballColor: "#FF6500",
      floorColor: "#1E3E62",
      abstacleColor: "#000000",
      wallColor: "#0B192C",
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
