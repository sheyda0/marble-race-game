import * as THREE from "three";
import BlockStart from "./BlockStart";
import BlockEnd from "./BlockEnd";
import BlockSpinner from "./BlockSpinner";
import BlockLimbo from "./BlockLimbo";
import BlockAxe from "./BlockAxe";
import { useMemo } from "react";
import Bounds from "./Bounds";
import useTheme from "../../stores/useTheme";

export default function Level({
  count = 5,
  types = [BlockSpinner, BlockAxe, BlockLimbo],
  seed = 0,
}) {
  const wallColor = useTheme((state) => state.wallColor);
  const floorColor = useTheme((state) => state.floorColor);
  const abstacleColor = useTheme((state) => state.abstacleColor);

  // Geometry
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

  // Materials
  const floor1Material = new THREE.MeshStandardMaterial({ color: floorColor });
  const floor2Material = new THREE.MeshStandardMaterial({
    color: floorColor,
    transparent: true,
    opacity: 0.7,
  });
  const obstacleMaterial = new THREE.MeshStandardMaterial({
    color: abstacleColor,
  });
  const wallMaterial = new THREE.MeshStandardMaterial({ color: wallColor });

  const blocks = useMemo(() => {
    const blocks = [];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }

    return blocks;
  }, [count, types, seed]);

  return (
    <>
      <BlockStart
        position={[0, 0, 0]}
        geometry={boxGeometry}
        floorMaterial={floor1Material}
      />

      {blocks.map((Block, index) => (
        <Block
          key={index}
          position={[0, 0, -(index + 1) * 4]}
          geometry={boxGeometry}
          floorMaterial={floor2Material}
          obstacleMaterial={obstacleMaterial}
        />
      ))}

      <BlockEnd
        position={[0, 0, -(count + 1) * 4]}
        geometry={boxGeometry}
        floorMaterial={floor1Material}
      />

      <Bounds
        geometry={boxGeometry}
        wallMaterial={wallMaterial}
        floorMaterial={floor2Material}
        length={count + 2}
      />
    </>
  );
}
