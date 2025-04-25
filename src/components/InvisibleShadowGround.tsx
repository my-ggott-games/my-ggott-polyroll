import { CuboidCollider, RigidBody } from '@react-three/rapier';

export default function InvisibleShadowGround() {
  return (
    <>
      {/* 💥 물리 충돌 전용 바닥 */}
      <RigidBody type="fixed">
        <CuboidCollider args={[5, 0, 5]} position={[0, -0.5, 0]} />
      </RigidBody>

      {/* 🌫️ 그림자만 받는 투명 바닥 */}
      <mesh receiveShadow={true} position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial transparent={true} opacity={0.25} />
      </mesh>
    </>
  );
}
