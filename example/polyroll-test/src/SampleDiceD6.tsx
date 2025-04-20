import { useState } from 'react';
import CameraSliderScene from './components/CameraSliderScene';
import CameraControlsPanel from './components/CameraControlsPanel';

export default function SampleDiceD6() {
  const [cameraPos, setCameraPos] = useState({ x: 2, y: 2, z: 5 });
  const [fov, setFov] = useState(50);

  const handleCameraChange = (updates: { x?: number; y?: number; z?: number; fov?: number }) => {
    const { fov: newFov, ...positionUpdates } = updates;

    setCameraPos(prev => ({ ...prev, ...positionUpdates }));

    if (newFov !== undefined) setFov(newFov);
  };


  return (
    <div>
      {/* 🎲 3D 주사위 씬 */}
      <CameraSliderScene x={cameraPos.x} y={cameraPos.y} z={cameraPos.z} fov={fov} />

      {/* 🎚️ 카메라 조절 슬라이더 */}
      <CameraControlsPanel
        x={cameraPos.x}
        y={cameraPos.y}
        z={cameraPos.z}
        fov={fov}
        onChange={handleCameraChange}
      />
    </div>
  );
}
