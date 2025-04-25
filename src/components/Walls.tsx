import { CuboidCollider, RigidBody } from '@react-three/rapier';

export default function Walls() {
  return (
    <>
      {/* 좌우 벽 */}
      <RigidBody type="fixed">
        <CuboidCollider args={[0.1, 12, 5]} position={[-5, 6, 0]} />
        <CuboidCollider args={[0.1, 12, 5]} position={[5, 6, 0]} />
      </RigidBody>
      {/* 앞뒤 벽 */}
      <RigidBody type="fixed">
        <CuboidCollider args={[5, 12, 0.1]} position={[0, 6, -5]} />
        <CuboidCollider args={[5, 12, 0.1]} position={[0, 6, 5]} />
      </RigidBody>
      {/* 뚜껑 */}
      <RigidBody type="fixed">
        <CuboidCollider args={[5, 0.1, 5]} position={[0, 12.1, 0]} />
      </RigidBody>
    </>
  );
}
