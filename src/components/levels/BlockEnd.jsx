import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

export default function BlockEnd({
  position = [0, 0, 0],
  geometry,
  floorMaterial,
}) {
  const hamburger = useGLTF("./scene.gltf");

  hamburger.scene.traverse((child) => {
    child.castShadow = true;
    if (child.isMesh) {
      child.material.color = new THREE.Color(0xf5da0a);
    }
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
        <primitive scale={0.008} position-y={-0.15} object={hamburger.scene} />
      </RigidBody>
    </group>
  );
}
