import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function BlockEnd({
  position = [0, 0, 0],
  geometry,
  floorMaterial,
}) {
  const hamburger = useGLTF("./hamburger.glb");

  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  return (
    <group position={position}>
      <mesh
        geometry={geometry}
        material={floorMaterial}
        position={[0, 0, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />

      <RigidBody
        type="fixed"
        colliders="hull"
        position={[0, 0.25, 0]}
        restitution={0.2}
        friction={0}
      >
        <primitive scale={0.2} object={hamburger.scene} />
      </RigidBody>
    </group>
  );
}
