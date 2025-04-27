import { useThree, useFrame } from '@react-three/fiber';
import React, { useRef, useEffect } from 'react';
import { RapierRigidBody } from '@react-three/rapier';
import { OrbitControls as DreiOrbitControls } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

interface CameraFollowerProps {
  targetRef: React.RefObject<RapierRigidBody | null>;
}

export default function FollowCamera({ targetRef }: CameraFollowerProps) {
  const { scene } = useThree();
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const goal = useRef<THREE.Object3D>(new THREE.Object3D());

  useEffect(() => {
    scene.add(goal.current);
    return () => {
      scene.remove(goal.current);
    };
  }, [scene]);

  useFrame(() => {
    const body = targetRef.current;
    if (!body) return;
    const { x, y, z } = body.translation();
    goal.current.position.lerp(new THREE.Vector3(x, y, z), 0.1);
    controlsRef.current?.target.copy(goal.current.position);
  });

  return (
    <DreiOrbitControls
      ref={(instance: OrbitControlsImpl | null) => {
        controlsRef.current = instance;
      }}
      enablePan={false}
      enableZoom
      enableRotate
      minDistance={5}
      maxDistance={10}
    />
  );
}
