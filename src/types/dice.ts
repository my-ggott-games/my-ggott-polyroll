export type DiceType = 'd6' | 'd8' | 'd10' | 'd12' | 'd20';

export type MaterialType = 'solid' | 'glass' | 'resin' | 'toon';

export interface DiceConfig {
  /** 어떤 주사위 컴포넌트를 렌더할지 결정 (현재는 d6만) */
  type: DiceType;
  /** 주사위의 베이스 컬러 */
  color: string;
  /** 재질 유형 */
  materialType: MaterialType;
}
