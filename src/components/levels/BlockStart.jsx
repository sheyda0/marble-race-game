import { Float, Text } from "@react-three/drei";
import { isMobile } from "react-device-detect";

export default function BlockStart({
  position = [0, 0, 0],
  geometry,
  floorMaterial,
}) {
  return (
    <group position={position}>
      {!isMobile && (
        <Float floatIntensity={0.25} rotationIntensity={0.25}>
          <Text
            font="./bebas-neue-v9-latin-regular.woff"
            scale={0.4}
            maxWidth={0.25}
            lineHeight={0.75}
            textAlign="right"
            position={[0.75, 0.65, 0]}
            rotation-y={-0.25}
          >
            MARBLE RACE
            <meshBasicMaterial toneMapped={false} />
          </Text>
        </Float>
      )}

      <mesh
        geometry={geometry}
        material={floorMaterial}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
    </group>
  );
}
