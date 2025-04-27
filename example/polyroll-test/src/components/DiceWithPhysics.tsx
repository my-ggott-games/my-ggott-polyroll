import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, RapierRigidBody } from '@react-three/rapier';
import Dice from './Dice';
import InvisibleShadowGround from './InvisibleShadowGround';
import Walls from './Walls';
import * as dat from 'dat.gui';
import { DiceProps } from '../types/diceProps';
import FollowCamera from './FollowCamera.tsx';
import { OrbitControls, Sky } from '@react-three/drei';

export default function DiceWithPhysics() {
  const [diceConfig, setDiceConfig] = useState<DiceProps>({
    radius: 0.05,
    smoothness: 3,
    bevelSegments: 1,
    creaseAngle: 0.4,
    materialType: 'solid',
    color: '#ccccff',
    roughness: 1,
    normalScale: 1,
  });

  const guiContainerRef = useRef<HTMLDivElement | null>(null);
  const [isCssReady, setIsCssReady] = useState(false);
  const diceRef = useRef<RapierRigidBody | null>(null);

  useEffect(() => {
    const checkCSSLoaded = () => {
      const dummy = document.createElement('div');
      dummy.className = 'property-name';
      dummy.style.display = 'none';
      document.body.appendChild(dummy);
      const isStyled = getComputedStyle(dummy).color !== 'rgb(0, 0, 0)';
      document.body.removeChild(dummy);
      return isStyled;
    };

    if (checkCSSLoaded()) {
      setIsCssReady(true);
    } else {
      const retry = setTimeout(() => setIsCssReady(checkCSSLoaded()), 50);
      return () => clearTimeout(retry);
    }
  }, []);

  useEffect(() => {
    if (!isCssReady) return;

    const gui = new dat.GUI({ autoPlace: false });
    gui.domElement.id = 'gui';

    if (guiContainerRef.current) {
      guiContainerRef.current!.innerHTML = '';
      guiContainerRef.current!.appendChild(gui.domElement);
    }

    gui
      .add(diceConfig, 'radius', 0, 0.5, 0.01)
      .onChange((v) => setDiceConfig((prev) => ({ ...prev, radius: v })));
    gui
      .add(diceConfig, 'smoothness', 1, 10, 1)
      .onChange((v) => setDiceConfig((prev) => ({ ...prev, smoothness: v })));
    gui
      .add(diceConfig, 'bevelSegments', 0, 10, 1)
      .onChange((v) => setDiceConfig((prev) => ({ ...prev, bevelSegments: v })));
    gui
      .add(diceConfig, 'creaseAngle', 0, 1.57, 0.01)
      .onChange((v) => setDiceConfig((prev) => ({ ...prev, creaseAngle: v })));
    gui
      .add(diceConfig, 'roughness', 0, 1, 0.01)
      .onChange((v) => setDiceConfig((prev) => ({ ...prev, roughness: v })));
    gui
      .add(diceConfig, 'normalScale', 0, 2, 0.1)
      .onChange((v) => setDiceConfig((prev) => ({ ...prev, normalScale: v })));
    gui
      .addColor(diceConfig, 'color')
      .onChange((v) => setDiceConfig((prev) => ({ ...prev, color: v })));

    return () => gui.destroy(); // cleanup
  }, [isCssReady]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 20,
        backgroundColor: '#ffffff',
        padding: '1rem',
      }}
    >
      <div>
        <Canvas
          shadows
          camera={{ position: [0, 10, 5], fov: 45 }}
          style={{ width: 500, height: 500, backgroundColor: 'transparent' }}
          gl={{ alpha: true }}
        >
          <Sky />

          <ambientLight intensity={1} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={2}
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
          <directionalLight
            position={[-5, 5, -5]} // 반대방향에서 비추기
            intensity={0.9}
            castShadow={false}
            color="#ffffff"
          />
          {/*<OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />*/}

          <Physics gravity={[0, -9.81, 0]}>
            <Dice ref={diceRef} {...diceConfig} />
            <InvisibleShadowGround />
            <Walls />
          </Physics>
          <FollowCamera targetRef={diceRef} />
        </Canvas>
      </div>
      <div ref={(el) => (guiContainerRef.current = el)} />
    </div>
  );
}
