import { CameraControlsPanelProps } from '../types/camera';

export default function CameraControlsPanel({ x, y, z, fov, onChange }: CameraControlsPanelProps) {
  return (
    <div style={{ marginTop: '1rem' }}>
      <label>
        X:{' '}
        <input
          type="range"
          min={-10}
          max={10}
          step={0.1}
          value={x}
          onChange={e => onChange({ x: parseFloat(e.target.value) })}
        />{' '}
        {x.toFixed(1)}
      </label>
      <br />
      <label>
        Y:{' '}
        <input
          type="range"
          min={-10}
          max={10}
          step={0.1}
          value={y}
          onChange={e => onChange({ y: parseFloat(e.target.value) })}
        />{' '}
        {y.toFixed(1)}
      </label>
      <br />
      <label>
        Z:{' '}
        <input
          type="range"
          min={-10}
          max={20}
          step={0.1}
          value={z}
          onChange={e => onChange({ z: parseFloat(e.target.value) })}
        />{' '}
        {z.toFixed(1)}
      </label>
      <br />
      <label>
        FOV:{' '}
        <input
          type="range"
          min={10}
          max={120}
          step={1}
          value={fov}
          onChange={e => onChange({ fov: parseFloat(e.target.value) })}
        />{' '}
        {fov.toFixed(0)}°
      </label>
    </div>
  );
}
