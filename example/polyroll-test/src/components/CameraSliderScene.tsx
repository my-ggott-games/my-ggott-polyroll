import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CameraProps } from '../types/camera';
import { getTopFaceIndex } from '../utils/dice';

export default function CameraSliderScene({ x, y, z, fov }: CameraProps) {
  const [topFace, setTopFace] = useState<number | null>(null);

  return (
    <div style={{ position: 'relative', width: 400, height: 400 }}>
      <Canvas
        style={{ width: '100%', height: '100%', backgroundColor: '#eef' }}
        camera={{ position: [x, y, z], fov }}
      >
        <SceneContent x={x} y={y} z={z} fov={fov} setTopFace={setTopFace} />
      </Canvas>

      {/* 🎲 주사위 윗면 숫자 */}
      {topFace !== null && (
        <div
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            fontSize: '2rem',
            background: 'white',
            padding: '0.2em 0.5em',
            borderRadius: '0.5em',
            boxShadow: '0 0 5px rgba(0,0,0,0.2)',
          }}
        >
          🎯 {topFace}
        </div>
      )}
    </div>
  );
}


function SceneContent({
                        x,
                        y,
                        z,
                        fov,
                        setTopFace,
                      }: CameraProps & { setTopFace: (face: number) => void }) {
  const { camera } = useThree();
  const perspectiveCamera = camera as THREE.PerspectiveCamera;

  const meshRef = useRef<THREE.Mesh>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [targetRotation, setTargetRotation] = useState<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    perspectiveCamera.position.set(x, y, z);
    perspectiveCamera.fov = fov;
    perspectiveCamera.lookAt(0, 0, 0);
    perspectiveCamera.updateProjectionMatrix();
  }, [x, y, z, fov, perspectiveCamera]);

  // 🎲 주사위 회전 애니메이션
  useFrame(() => {
    if (!meshRef.current) return;

    if (isRolling) {
      meshRef.current.rotation.x += 0.3;
      meshRef.current.rotation.y += 0.3;
    } else {
      const [tx, ty, tz] = targetRotation;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, tx, 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, ty, 0.1);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, tz, 0.1);
    }
  });

  const handleRollDice = () => {
    setIsRolling(true);
    const randX = Math.PI * (Math.floor(Math.random() * 4) + 1);
    const randY = Math.PI * (Math.floor(Math.random() * 4) + 1);
    const randZ = Math.PI * (Math.floor(Math.random() * 4)); // z는 안 굴려도 무방

    setTargetRotation([randX, randY, randZ]);

    // 2초 후 굴림 종료
    setTimeout(() => {
      setIsRolling(false);
      if (meshRef.current) {
        const top = getTopFaceIndex(meshRef.current);
        setTopFace(top);
      }
    }, 2000);
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} />
      <axesHelper args={[3]} />
      <OrbitControls />

      <mesh ref={meshRef} onClick={handleRollDice}>
        <boxGeometry />
        <meshStandardMaterial color="white" />
      </mesh>
    </>
  );
}
