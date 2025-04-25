import { useThree, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { RapierRigidBody } from '@react-three/rapier';
import * as THREE from 'three';

interface CameraFollowerProps {
  targetRef: React.RefObject<RapierRigidBody | null>;
}

export default function FollowCamera({ targetRef }: CameraFollowerProps) {
  const { camera } = useThree();
  const goal = useRef<THREE.Object3D>(new THREE.Object3D());

  useFrame(() => {
    const target = targetRef.current;
    if (!target) return;

    const pos = target.translation();
    const targetVec = new THREE.Vector3(pos.x, pos.y, pos.z);

    // goal 위치 부드럽게 추적
    goal.current.position.lerp(targetVec, 0.1);

    // 카메라 위치를 goal 기준으로 offset 적용
    const offset = new THREE.Vector3(0, 6, 8);
    const desiredPos = goal.current.position.clone().add(offset);

    camera.position.lerp(desiredPos, 0.1);

    // 💡 lookAt도 정확하게 목표를 향하게 설정
    camera.lookAt(goal.current.position); // ← targetVec도 괜찮음
  });

  return null;
}
