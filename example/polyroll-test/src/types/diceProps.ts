export interface DiceProps {
  radius: number;
  smoothness: number;
  bevelSegments: number;
  creaseAngle: number;
  materialType: 'solid' | 'glass' | 'fuzzy' | 'resin' | 'toon';
  color: string;
  roughness: number;
  normalScale: number;
}
