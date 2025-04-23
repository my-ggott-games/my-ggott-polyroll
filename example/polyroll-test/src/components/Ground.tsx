import { CuboidCollider, RigidBody } from '@react-three/rapier';

export default function Ground() {
  return (
    <RigidBody type="fixed" colliders={false}>
      <mesh position={[0, -0.5, 0]} receiveShadow={true}>
        <boxGeometry args={[10, 1, 10]} />
        <meshStandardMaterial color="transparent" />
      </mesh>
      <CuboidCollider args={[5, 0, 5]} />
    </RigidBody>
  );
}

