import { useRef } from "react";
import useTheme from "../../stores/useTheme";

const themes = [
  {
    ballColor: "mediumpurple",
    floorColor: "limegreen",
    abstacleColor: "orangered",
    wallColor: "slategrey",
  },
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
      <button className="close-theme-btn" onClick={onThemeClick}>
        <svg
          width="36px"
          height="36px"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
          />
        </svg>
      </button>

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
