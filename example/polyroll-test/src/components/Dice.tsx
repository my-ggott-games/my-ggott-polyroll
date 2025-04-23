import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useRef, useState } from 'react';
import { RoundedBox } from '@react-three/drei';
import DiceTextFaces from './DiceTextFaces';
import { DiceProps } from '../types/diceProps.ts';

export default function Dice({
                               radius,
                               smoothness,
                               bevelSegments,
                               creaseAngle,
                               materialType
                             }: DiceProps) {
  const diceRef = useRef<RapierRigidBody>(null);
  const [canClick, setCanClick] = useState(true);

  const handleClick = () => {
    if (!canClick) return;

    const body = diceRef.current;
    if (!body) return;

    body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    body.setAngvel({ x: 0, y: 0, z: 0 }, true);

    const minY = 6;
    const extraY = Math.random() * 2;
    const yImpulse = minY + extraY;
    body.applyImpulse({ x: 0, y: yImpulse, z: -2 }, true);

    const torque = getRandomTorque(4);
    body.applyTorqueImpulse(torque, true);
  };

  const getRandomTorque = (range: number = 1) => ({
    x: Math.random() * range * 2 - range,
    y: Math.random() * range * 2 - range,
    z: Math.random() * range * 2 - range,
  });

  const getMaterialProps = () => {
    switch (materialType) {
      case 'glass':
        return {
          transmission: 1,
          thickness: 0.6,
          roughness: 0,
          ior: 1.5,
          reflectivity: 1,
          metalness: 0,
          clearcoat: 1,
        };
      case 'resin':
        return {
          transmission: 0.9,
          thickness: 0.5,
          roughness: 0.1,
          metalness: 0.1,
          clearcoat: 0.7,
          reflectivity: 0.4,
        };
      case 'solid':
      default:
        return {
          roughness: 0.4,
          metalness: 0.2,
        };
    }
  };

  return (
    <RigidBody
      ref={diceRef}
      onCollisionEnter={() => {
        setCanClick(false); // 즉시 클릭 비활성화
      }}
      onSleep={() => {
        // 완전히 멈췄을 때 다시 클릭 가능
        setCanClick(true);
      }}
      colliders="cuboid"
      restitution={0.5}
      friction={0.8}
      position={[0, 1, 0]}
    >
      <mesh onClick={handleClick} castShadow={true}>
        <RoundedBox
          args={[1, 1, 1]}
          radius={radius}
          smoothness={smoothness}
          bevelSegments={bevelSegments}
          creaseAngle={creaseAngle}
          castShadow={true}
          receiveShadow={true}
        >
          <meshPhysicalMaterial
            key={materialType} // 재질 변경
            color="#ffbb55"
            {...getMaterialProps()}
          />
          <DiceTextFaces />
        </RoundedBox>
      </mesh>
    </RigidBody>
  );
}
