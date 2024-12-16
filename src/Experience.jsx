import Lights from "./Lights.jsx";
import { Physics } from "@react-three/rapier";
import Level from "./components/levels/Level.jsx";
import useGame from "./stores/useGame.js";
import Player from "./components/Player.jsx";

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  return (
    <>
      <color args={["#bdedfc"]} attach="background" />

      <Physics>
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
    </>
  );
}
