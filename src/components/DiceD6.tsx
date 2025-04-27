import React, { forwardRef, useRef, useState } from 'react';
import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import DiceTextFaces from './DiceTextFaces';
import { DiceProps } from '../types/diceProps';

const outlineGeometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1), 15);

const faceNormals = [
  { value: 1, normal: new THREE.Vector3(0, 1, 0) },
  { value: 6, normal: new THREE.Vector3(0, -1, 0) },
  { value: 3, normal: new THREE.Vector3(1, 0, 0) },
  { value: 4, normal: new THREE.Vector3(-1, 0, 0) },
  { value: 5, normal: new THREE.Vector3(0, 0, 1) },
  { value: 2, normal: new THREE.Vector3(0, 0, -1) },
];

function getTopFace(body: RapierRigidBody): number {
  const { x, y, z, w } = body.rotation();
  const q = new THREE.Quaternion(x, y, z, w);
  const up = new THREE.Vector3(0, 1, 0);

  const scores = faceNormals.map(({ value, normal }) => {
    const worldNormal = normal.clone().applyQuaternion(q);
    return { value, dot: worldNormal.dot(up) };
  });
  scores.sort((a, b) => b.dot - a.dot);
  return scores[0].value;
}

const DiceD6 = forwardRef<RapierRigidBody, DiceProps>(function DiceD6(
  props: DiceProps,
  ref: React.ForwardedRef<RapierRigidBody>
) {
  const { radius, smoothness, bevelSegments, creaseAngle, materialType, color } = props;

  const [canClick, setCanClick] = useState(true);
  const localRef = useRef<RapierRigidBody | null>(null);
  const diceBody = (ref as React.MutableRefObject<RapierRigidBody | null>) ?? localRef;

  const handleClick = () => {
    if (!canClick) return;
    const body = diceBody.current!;
    body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    body.setAngvel({ x: 0, y: 0, z: 0 }, true);
    body.applyImpulse({ x: 0, y: 6 + Math.random() * 2, z: -2 }, true);
    body.applyTorqueImpulse(
      {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        z: Math.random() * 2 - 1,
      },
      true
    );
  };

  const getMaterialProps = () => {
    switch (materialType) {
      case 'glass':
        return {
          transmission: 1,
          thickness: 0.6,
          roughness: 0,
          metalness: 0,
          ior: 1.5,
          reflectivity: 1,
          clearcoat: 1,
          clearcoatRoughness: 0.05,
        };
      case 'resin':
        return {
          transmission: 0.9,
          thickness: 0.5,
          roughness: 0.15,
          metalness: 0.1,
          clearcoat: 0.7,
          reflectivity: 0.4,
          clearcoatRoughness: 0.2,
        };
      case 'toon':
        return {
          metalness: 0,
          roughness: 1,
          gradientMap: null,
        };
      case 'solid':
      default:
        return {
          roughness: 0.4,
          metalness: 0.2,
        };
    }
  };

  return (
    <RigidBody
      ref={diceBody}
      colliders="cuboid"
      restitution={0.5}
      friction={0.8}
      position={[0, 1.1, 0]}
      onCollisionEnter={() => setCanClick(false)}
      onSleep={() => {
        console.log('🎲 Top Face:', getTopFace(diceBody.current!));
        setCanClick(true);
      }}
    >
      <mesh castShadow onClick={handleClick}>
        <RoundedBox
          args={[1, 1, 1]}
          radius={radius}
          smoothness={smoothness}
          bevelSegments={bevelSegments}
          creaseAngle={creaseAngle}
          receiveShadow
        >
          {materialType === 'toon' ? (
            <meshToonMaterial color={color} {...getMaterialProps()} />
          ) : materialType === 'glass' || materialType === 'resin' ? (
            <meshPhysicalMaterial color={color} {...getMaterialProps()} />
          ) : (
            <meshStandardMaterial color={color} {...getMaterialProps()} />
          )}
          <DiceTextFaces />
        </RoundedBox>

        {materialType === 'toon' && (
          <lineSegments geometry={outlineGeometry}>
            <lineBasicMaterial color="black" />
          </lineSegments>
        )}
      </mesh>
    </RigidBody>
  );
});

export default DiceD6;
