import { Text } from '@react-three/drei';

export default function DiceTextFaces() {
  return (
    <>
      {/* 윗면 1 */}
      <Text position={[0, 0.51, 0]} fontSize={0.3} rotation={[-Math.PI / 2, 0, 0]} color="white">
        1
      </Text>

      {/* 아랫면 6 */}
      <Text position={[0, -0.51, 0]} fontSize={0.3} rotation={[Math.PI / 2, 0, 0]} color="white">
        6
      </Text>

      {/* 오른쪽 3 */}
      <Text
        position={[0.51, 0, 0]}
        fontSize={0.3}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        scale={[-1, 1, 1]}
        color="white"
      >
        3
      </Text>

      {/* 왼쪽 4 */}
      <Text
        position={[-0.51, 0, 0]}
        fontSize={0.3}
        rotation={[0, Math.PI / 2, -Math.PI / 2]}
        scale={[-1, 1, 1]}
        color="white"
      >
        4
      </Text>

      {/* 앞면 5 */}
      <Text position={[0, 0, 0.51]} fontSize={0.3} rotation={[0, 0, 0]} color="white">
        5
      </Text>

      {/* 뒷면 2 */}
      <Text position={[0, 0, -0.51]} fontSize={0.3} rotation={[0, Math.PI, 0]} color="white">
        2
      </Text>
    </>
  );
}
