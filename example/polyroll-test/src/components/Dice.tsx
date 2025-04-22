import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useRef, useState } from 'react';
import DiceTextFaces from './DiceTextFaces';

export default function Dice() {
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
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
        <DiceTextFaces />
      </mesh>
    </RigidBody>
  );
}
