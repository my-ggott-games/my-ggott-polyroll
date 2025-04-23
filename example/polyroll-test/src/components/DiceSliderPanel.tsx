import { DiceProps } from '../types/diceProps';

interface Props {
  config: DiceProps;
  onChange: (config: DiceProps) => void;
}

export default function DiceSliderPanel({ config, onChange }: Props) {
  const update = <T extends keyof DiceProps>(key: T, value: DiceProps[T]) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
      {/* 🎛️ 슬라이더들 */}
      <label>
        Radius: {config.radius.toFixed(2)}
        <input type="range" min={0} max={0.5} step={0.01}
               value={config.radius}
               onChange={(e) => update('radius', parseFloat(e.target.value))} />
      </label>
      <label>
        Smoothness: {config.smoothness}
        <input type="range" min={1} max={10} step={1}
               value={config.smoothness}
               onChange={(e) => update('smoothness', parseInt(e.target.value))} />
      </label>
      <label>
        Bevel Segments: {config.bevelSegments}
        <input type="range" min={0} max={10} step={1}
               value={config.bevelSegments}
               onChange={(e) => update('bevelSegments', parseInt(e.target.value))} />
      </label>
      <label>
        Crease Angle: {config.creaseAngle.toFixed(2)}
        <input type="range" min={0} max={1.57} step={0.01}
               value={config.creaseAngle}
               onChange={(e) => update('creaseAngle', parseFloat(e.target.value))} />
      </label>

      {/* 🧊 재질 선택 */}
      <label>
        Material Type:
        <select
          value={config.materialType}
          onChange={(e) =>
            update('materialType', e.target.value as DiceProps['materialType'])
          }
        >
          <option value="solid">불투명</option>
          <option value="glass">유리</option>
          <option value="resin">레진</option>
        </select>
      </label>
    </div>
  );
}
