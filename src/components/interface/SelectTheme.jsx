import { useEffect, useRef } from "react";
import useTheme from "../../stores/useTheme";
import useGame from "../../stores/useGame";

const themes = [
  {
    ballColor: "#604CC3",
    floorColor: "#FF7F3E",
    abstacleColor: "#FFF6E9",
    wallColor: "#80C4E9",
  },
  {
    ballColor: "#A19AD3",
    floorColor: "#FFF574",
    abstacleColor: "#FF8383",
    wallColor: "#A1D6CB",
  },
  {
    ballColor: "#FF9874",
    floorColor: "#FFD7C4",
    abstacleColor: "#7695FF",
    wallColor: "#9DBDFF",
  },

  {
    ballColor: "#E68369",
    floorColor: "#FBF6E2",
    abstacleColor: "#131842",
    wallColor: "#ECCEAE",
  },
  {
    ballColor: "#33372C",
    floorColor: "#557C56",
    abstacleColor: "#FF885B",
    wallColor: "#FFE5CF",
  },
  {
    ballColor: "#EC8305",
    floorColor: "#DBD3D3",
    abstacleColor: "#091057",
    wallColor: "#024CAA",
  },
  {
    ballColor: "#C8ACD6",
    floorColor: "#433D8B",
    abstacleColor: "#17153B",
    wallColor: "#2E236C",
  },
  {
    ballColor: "#FF6500",
    floorColor: "#1E3E62",
    abstacleColor: "#000000",
    wallColor: "#0B192C",
  },
];

export default function SelectTheme({ onThemeClick }) {
  const themeContainer = useRef();

  const selectTheme = useTheme((state) => state.selectTheme);

  const handleSelectTheme = (theme) => {
    // themeContainer.current.remove();
    selectTheme(theme);
  };

  return (
    <div className="themes-container" ref={themeContainer}>
      <h2>Pick your favorite theme and start rolling!</h2>

      <div className="themes">
        {themes.map((theme, index) => (
          <div
            className="theme-box"
            onClick={() => {
              handleSelectTheme(theme);
              onThemeClick();
            }}
            key={index}
          >
            <div style={{ background: theme.ballColor }}></div>
            <div style={{ background: theme.floorColor }}></div>
            <div style={{ background: theme.abstacleColor }}></div>
            <div style={{ background: theme.wallColor }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
