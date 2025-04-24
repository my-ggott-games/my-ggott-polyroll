import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useRef, useState } from 'react';
import { RoundedBox } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import DiceTextFaces from './DiceTextFaces';
import { DiceProps } from '../types/diceProps.ts';

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
  const rotation = body.rotation(); // Quaternion
  const q = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);

  const up = new THREE.Vector3(0, 1, 0);

  const scores = faceNormals.map(({ value, normal }) => {
    const worldNormal = normal.clone().applyQuaternion(q);
    const dot = worldNormal.dot(up);
    return { value, dot };
  });

  scores.sort((a, b) => b.dot - a.dot); // 가장 Y 방향과 가까운 normal 을 윗면으로

  return scores[0].value;
}

export default function Dice({
                               radius,
                               smoothness,
                               bevelSegments,
                               creaseAngle,
                               materialType,
                               color,
                               roughness,
                               normalScale
                             }: DiceProps) {
  const diceRef = useRef<RapierRigidBody>(null);
  const [canClick, setCanClick] = useState(true);

  const noiseTexture = useLoader(THREE.TextureLoader, '/grey-felt-texture.jpg');
  noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping;


  const handleClick = () => {
    if (!canClick) return;

    const body = diceRef.current;
    if (!body) return;

    body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    body.setAngvel({ x: 0, y: 0, z: 0 }, true);

    const minY = 6;
    const extraY = Math.random() * 2;
    const yImpulse = minY + extraY;
    body.applyImpulse({ x: 0, y: yImpulse, z: -2 }, true);

    const torque = getRandomTorque(4);
    body.applyTorqueImpulse(torque, true);
  };

  const getRandomTorque = (range: number = 1) => ({
    x: Math.random() * range * 2 - range,
    y: Math.random() * range * 2 - range,
    z: Math.random() * range * 2 - range,
  });

  const getMaterialProps = () => {
    switch (materialType) {
      case 'glass':
        return {
          transmission: 1,
          thickness: 0.6,
          roughness: 0,
          ior: 1.5,
          reflectivity: 1,
          metalness: 0,
          clearcoat: 1,
          clearcoatRoughness: 0.05,
          specularIntensity: 1,
          specularColor: new THREE.Color('#ffffff'),
          attenuationDistance: 0.3,
          attenuationColor: new THREE.Color('#ffffff'),
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
          specularIntensity: 0.8,
          specularColor: new THREE.Color('#ffeeee'),
          attenuationDistance: 0.2,
          attenuationColor: new THREE.Color('#ffcccc'),
        };
      case 'fuzzy':
        return {
          roughness: roughness,
          metalness: 0,
          clearcoat: 0,
          normalMap: noiseTexture,
          roughnessMap: noiseTexture,
          normalScale: new THREE.Vector2(normalScale, normalScale),
        };
      case 'solid':
      default:
        return {
          roughness: 0.4,
          metalness: 0.2,
          specularIntensity: 0.5,
          specularColor: new THREE.Color('#ffffff'),
        };
      case 'toon':
        return {
          metalness: 0,
          roughness: 1,
          transparent: false,
          opacity: 1,
          gradientMap: null,
        };
    }
  };


  return (
    <RigidBody
      ref={diceRef}
      onCollisionEnter={() => {
        setCanClick(false); // 즉시 클릭 비활성화
      }}
      onSleep={() => {
        const body = diceRef.current;
        if (body) {
          const top = getTopFace(body);
          console.log('🎲 윗면:', top); // 결과 출력
        }
        setCanClick(true);
      }}
      colliders="cuboid"
      restitution={0.5}
      friction={0.8}
      position={[0, 1.1, 0]}
    >
      <mesh onClick={handleClick} castShadow={true}>
        <RoundedBox
          args={[1, 1, 1]}
          radius={radius}
          smoothness={smoothness}
          bevelSegments={bevelSegments}
          creaseAngle={creaseAngle}
          castShadow={true}
          receiveShadow={true}
        >
          {materialType === 'toon' ? (
            <meshToonMaterial
              color={color}
              {...getMaterialProps()}
              transparent={false}
              opacity={1}
            />
          ) : materialType === 'glass' || materialType === 'resin' ? (
            <meshPhysicalMaterial color={color} {...getMaterialProps()} />
          ) : (
            <meshStandardMaterial color={color} {...getMaterialProps()} />
          )}
          <DiceTextFaces />
        </RoundedBox>

        {materialType === 'toon' && (
          <lineSegments geometry={outlineGeometry}>
            <lineBasicMaterial color="black" depthTest={true} depthWrite={true} />
          </lineSegments>
        )}
      </mesh>
    </RigidBody>
  );
}
