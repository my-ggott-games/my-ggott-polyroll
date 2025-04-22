import * as THREE from 'three';

export function getTopFaceIndex(mesh: THREE.Mesh): number {
  const faceNormals = [
    new THREE.Vector3(0, 0, 1),   // front → 1
    new THREE.Vector3(0, 0, -1),  // back  → 6
    new THREE.Vector3(1, 0, 0),   // right → 3
    new THREE.Vector3(-1, 0, 0),  // left  → 4
    new THREE.Vector3(0, 1, 0),   // top   → 5
    new THREE.Vector3(0, -1, 0),  // bottom→ 2
  ];

  const worldUp = new THREE.Vector3(0, 1, 0);
  let maxDot = -Infinity;
  let topFaceIndex = -1;

  const normalWorld = new THREE.Vector3();
  for (let i = 0; i < faceNormals.length; i++) {
    normalWorld.copy(faceNormals[i]).applyEuler(mesh.rotation);
    const dot = normalWorld.dot(worldUp);
    if (dot > maxDot) {
      maxDot = dot;
      topFaceIndex = i;
    }
  }

  const faceToValueMap = [1, 6, 3, 4, 5, 2];
  return faceToValueMap[topFaceIndex];
}
