import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import useGame from "../stores/useGame";
import { useKeyboard } from "../context/keyboardContext";
import { isMobile } from "react-device-detect";

export default function Player() {
  const body = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());
  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const restart = useGame((state) => state.restart);
  const blocksCount = useGame((state) => state.blocksCount);
  const { keyboard } = useKeyboard();

  const jump = (y) => {
    const origin = body.current.translation();

    if (origin.y < 0.5) body.current.applyImpulse({ x: 0, y: y, z: 0 });
  };

  const reset = () => {
    body.current.setTranslation({ x: 0, y: 1, z: 0 });
    body.current.setLinvel({ x: 0, y: 0, z: 0 });
    body.current.setAngvel({ x: 0, y: 0, z: 0 });
  };

  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ready") reset();
      }
    );

    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) jump(0.4);
      }
    );

    const unsubscribeAny = subscribeKeys(() => {
      start();
    });

    return () => {
      unsubscribeReset();
      unsubscribeJump();
      unsubscribeAny();
    };
  }, []);

  useFrame((state, delta) => {
    /**
     * Controls
     */
    const { forward, backward, leftward, rightward } = getKeys();

    let impulse = { x: 0, y: 0, z: 0 };
    let torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward || keyboard === "forward") {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (backward || keyboard === "backward") {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (leftward || keyboard === "leftward") {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }
    if (rightward || keyboard === "rightward") {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }
    if (keyboard === "jump") {
      jump(0.1);
    }

    body.current.applyImpulse(impulse);
    body.current.applyTorqueImpulse(torque);

    /**
     * Camera
     */
    const bodyPosition = body.current.translation();

    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += isMobile ? 3.5 : 2.25;
    cameraPosition.y += isMobile ? 1 : 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);

    /**
     * Phases
     */
    if (bodyPosition.z < -(blocksCount * 4 + 2)) end();
    if (bodyPosition.y < -4) restart();
  });

  return (
    <RigidBody
      ref={body}
      canSleep={false}
      colliders="ball"
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
      position={[0, 1, 0]}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color="mediumpurple" />
      </mesh>
    </RigidBody>
  );
}
