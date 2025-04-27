import { useThree, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { RapierRigidBody } from '@react-three/rapier';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface CameraFollowerProps {
  targetRef: React.RefObject<RapierRigidBody | null>;
}

export default function FollowCamera({ targetRef }: CameraFollowerProps) {
  const { scene } = useThree();
  const controlsRef = useRef<OrbitControls | null>(null);
  const goal = useRef<THREE.Object3D>(new THREE.Object3D());

  useEffect(() => {
    scene.add(goal.current);
    return () => {
      scene.remove(goal.current);
    };
  }, [scene]);

  useFrame(() => {
    const target = targetRef.current;
    if (!target) return;

    const pos = target.translation();
    const targetVec = new THREE.Vector3(pos.x, pos.y, pos.z);

    // goal을 부드럽게 target으로 이동시킴
    goal.current.position.lerp(targetVec, 0.1);

    if (controlsRef.current) {
      controlsRef.current.target.copy(goal.current.position);
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      enableRotate={true}
      minDistance={5}
      maxDistance={10}
    />
  );
}
