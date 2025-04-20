import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';
import { CameraProps } from '../types/camera';

export default function CameraSliderScene({ x, y, z, fov }: CameraProps) {
  return (
    <Canvas
      style={{ width: 400, height: 400, backgroundColor: '#eef' }}
      camera={{ position: [x, y, z], fov }}
    >
      <SceneContent x={x} y={y} z={z} fov={fov} />
    </Canvas>
  );
}

function SceneContent({ x, y, z, fov }: CameraProps) {
  const { camera } = useThree();
  const perspectiveCamera = camera as THREE.PerspectiveCamera;

  useEffect(() => {
    perspectiveCamera.position.set(x, y, z);
    perspectiveCamera.fov = fov;
    perspectiveCamera.lookAt(0, 0, 0);
    perspectiveCamera.updateProjectionMatrix();
  }, [x, y, z, fov, perspectiveCamera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} />
      <axesHelper args={[3]} />
      <OrbitControls />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
}
