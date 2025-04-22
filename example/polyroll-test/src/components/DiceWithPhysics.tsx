import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Dice from './Dice';
import Ground from './Ground';
import Walls from './Walls';

export default function DiceWithPhysics() {
  return (
    <Canvas shadows style={{ width: 500, height: 500, backgroundColor: '#eef' }}>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[3, 5, 3]}
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
      <OrbitControls />
      <Physics gravity={[0, -9.81, 0]}>
        <Dice />
        <Ground />
        <Walls />
      </Physics>
    </Canvas>
  );
}
