export interface DiceProps {
  radius: number;
  smoothness: number;
  bevelSegments: number;
  creaseAngle: number;
  materialType: 'solid' | 'glass' | 'resin' | 'toon';
  color: string;
  normalScale: number;
}
