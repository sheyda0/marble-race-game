import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function Bounds({
  geometry,
  wallMaterial,
  floorMaterial,
  length = 1,
}) {
  return (
    <RigidBody type="fixed" restitution={0.2} friction={0}>
      <mesh
        geometry={geometry}
        material={wallMaterial}
        position={[2.15, 0.75, -(length * 2) + 2]}
        scale={[0.3, 1.5, 4 * length]}
        castShadow
      />

      <mesh
        geometry={geometry}
        material={wallMaterial}
        position={[-2.15, 0.75, -(length * 2) + 2]}
        scale={[0.3, 1.5, 4 * length]}
        receiveShadow
      />

      <mesh
        geometry={geometry}
        material={wallMaterial}
        position={[0, 0.75, -(length * 4) + 2]}
        scale={[4, 1.5, 0.3]}
        receiveShadow
      />

      <mesh
        geometry={geometry}
        material={floorMaterial}
        position={[0, -0.1, -(length * 2) + 2]}
        scale={[4, 0.2, 4 * length - 8]}
        receiveShadow
      />

      <CuboidCollider
        args={[2, 0.1, 2 * length]}
        position={[0, -0.1, -(length * 2) + 2]}
        restitution={0.2}
        friction={1}
      />
    </RigidBody>
  );
}
