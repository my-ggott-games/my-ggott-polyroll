import { Canvas } from '@react-three/fiber';
import { Physics, RapierRigidBody } from '@react-three/rapier';
import { Sky } from '@react-three/drei';
import { useRef } from 'react';

import DiceD6 from './DiceD6';
// import DiceD8 from './DiceD8'; // 미래 확장을 위한 placeholder
import InvisibleShadowGround from './InvisibleShadowGround';
import Walls from './Walls';
import FollowCamera from './FollowCamera';

type DiceType = 'd6' | 'd8' | 'd10' | 'd12' | 'd20';

export interface DiceConfig {
  type: DiceType;
  color: string;
  materialType: 'solid' | 'glass' | 'resin' | 'fuzzy' | 'toon';
}

interface DiceSceneProps {
  diceList: DiceConfig[];
  showSky?: boolean;
}

export default function DiceScene({ diceList, showSky = false }: DiceSceneProps) {
  const diceRefs = useRef<RapierRigidBody[]>([]);

  const renderDice = (dice: DiceConfig, index: number) => {
    const startPosition: [number, number, number] = [index * 2, 1.1, 0];

    const commonProps = {
      ref: (el: RapierRigidBody | null) => {
        diceRefs.current[index] = el!;
      },
      color: dice.color,
      materialType: dice.materialType,
      startPosition,
    };

    switch (dice.type) {
      case 'd6':
        return <DiceD6 key={index} {...commonProps} />;
      /*case 'd8':
        return <DiceD8 key={index} {...commonProps} />;*/
      // 추후 d10, d12 등 확장 가능
      default:
        return null;
    }
  };

  return (
    <Canvas
      shadows
      camera={{ position: [0, 10, 5], fov: 45 }}
      style={{ width: 500, height: 500, backgroundColor: 'transparent' }}
      gl={{ alpha: true }}
    >
      {showSky && <Sky sunPosition={[10, 20, 10]} inclination={0.45} azimuth={0.25} />}
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

      <Physics gravity={[0, -9.81, 0]}>
        {diceList.map((dice, i) => renderDice(dice, i))}
        <InvisibleShadowGround />
        <Walls />
      </Physics>

      {/* 대표 주사위만 카메라가 추적 (첫 번째) */}
      {diceRefs.current[0] && <FollowCamera targetRef={{ current: diceRefs.current[0] }} />}
    </Canvas>
  );
}
