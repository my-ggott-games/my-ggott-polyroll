import { CuboidCollider, RigidBody } from '@react-three/rapier';

export default function InvisibleGround() {
  return (
    <RigidBody type="fixed">
      <CuboidCollider args={[5, 0, 5]} position={[0, -0.5, 0]} />
    </RigidBody>
  );
}
