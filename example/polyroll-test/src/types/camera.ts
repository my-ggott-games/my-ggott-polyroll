export interface CameraProps {
  x: number;
  y: number;
  z: number;
  fov: number;
}

export interface CameraControlsPanelProps extends CameraProps {
  onChange: (updates: Partial<CameraProps>) => void;
}
