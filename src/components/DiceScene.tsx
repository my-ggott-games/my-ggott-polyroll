import { Canvas } from '@react-three/fiber';
import { Physics, RapierRigidBody } from '@react-three/rapier';
import { OrbitControls, Sky } from '@react-three/drei';
import { useRef, useState } from 'react';

import DiceD6 from './DiceD6';
import InvisibleShadowGround from './InvisibleShadowGround';
import Walls from './Walls';
// import FollowCamera from './FollowCamera';

import { DiceConfig } from '../types/dice';
import { DiceProps } from '../../example/polyroll-test/src/types/diceProps';

export default function DiceScene() {
  const diceRef = useRef<RapierRigidBody | null>(null);

  // color / materialType 만 상태로 관리
  const [config] = useState<DiceConfig>({
    type: 'd6', // 나중에 다른 타입 고려할 수 있도록 남겨두자
    color: '#ccccff',
    materialType: 'solid',
  });

  // 나머지 geometry·물성 기본값
  const defaultGeometry: Omit<DiceProps, 'materialType' | 'color'> = {
    radius: 0.05,
    smoothness: 3,
    bevelSegments: 1,
    creaseAngle: 0.4,
    roughness: 1,
    normalScale: 1,
  };

  // DiceD6 에 실제 넘길 props
  const diceProps: DiceProps = {
    ...defaultGeometry,
    materialType: config.materialType,
    color: config.color,
  };

  return (
    <Canvas
      shadows
      camera={{ position: [0, 10, 5], fov: 45 }}
      style={{ width: 500, height: 500, backgroundColor: 'transparent' }}
      gl={{ alpha: true }}
    >
      <Sky />
      <ambientLight intensity={1} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={2}
        castShadow={true}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.9} castShadow={false} color="#ffffff" />

      <OrbitControls enablePan enableZoom enableRotate />

      <Physics gravity={[0, -9.81, 0]}>
        <DiceD6 ref={diceRef} {...diceProps} />
        <InvisibleShadowGround />
        <Walls />
      </Physics>

      {/*
      <FollowCamera targetRef={diceRef} />
*/}
    </Canvas>
  );
}
