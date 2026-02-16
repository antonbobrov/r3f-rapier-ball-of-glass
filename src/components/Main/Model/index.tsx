import { FC, useRef } from 'react';

import { useGLTF } from '@react-three/drei';
import { Group, Mesh } from 'three';

import { useCopyParentPosition } from '@/hooks/useCopyParentPosition';

import { useModelMaterial } from './hooks/useModelMaterial';
import { useModelVisibility } from './hooks/useModelVisibility';
import { ModifyChildren } from './ModifyChildren';
import { IProps } from './types';

export const Model: FC<IProps> = ({ pointerRef, isVisible }) => {
  const gltf = useGLTF('/models/model.glb');
  const nodes = gltf.nodes as any;

  const scaleRef = useRef<Group>(null);
  const ballRef = useRef<Mesh>(null);

  const material = useModelMaterial();

  useModelVisibility({
    scaleRef,
    ballRef,
    isVisible,
    material,
  });

  useCopyParentPosition(ballRef, pointerRef);

  return (
    <group>
      <mesh ref={ballRef}>
        <sphereGeometry args={[0.5, 32, 32]} />

        <meshStandardMaterial
          color={0x999999}
          emissive={0x555555}
          metalness={0.0}
          roughness={0.5}
        />
      </mesh>

      <group ref={scaleRef}>
        <ModifyChildren material={material}>
          <mesh
            geometry={nodes.Icosphere001.geometry}
            material={nodes.Icosphere001.material}
          />

          <mesh
            geometry={nodes.Icosphere003.geometry}
            material={nodes.Icosphere003.material}
          />

          <mesh
            geometry={nodes.Icosphere004.geometry}
            material={nodes.Icosphere004.material}
          />

          <mesh
            geometry={nodes.Icosphere007.geometry}
            material={nodes.Icosphere007.material}
          />

          <mesh
            geometry={nodes.Icosphere008.geometry}
            material={nodes.Icosphere008.material}
          />

          <mesh
            geometry={nodes.Icosphere009.geometry}
            material={nodes.Icosphere009.material}
          />

          <mesh
            geometry={nodes.Icosphere010.geometry}
            material={nodes.Icosphere010.material}
          />

          <mesh
            geometry={nodes.Icosphere012.geometry}
            material={nodes.Icosphere012.material}
          />

          <mesh
            geometry={nodes.Icosphere014.geometry}
            material={nodes.Icosphere014.material}
          />

          <mesh
            geometry={nodes.Icosphere015.geometry}
            material={nodes.Icosphere015.material}
          />

          <mesh
            geometry={nodes.Icosphere017.geometry}
            material={nodes.Icosphere017.material}
          />

          <mesh
            geometry={nodes.Icosphere018.geometry}
            material={nodes.Icosphere018.material}
          />

          <mesh
            geometry={nodes.Icosphere020.geometry}
            material={nodes.Icosphere020.material}
          />

          <mesh
            geometry={nodes.Icosphere023.geometry}
            material={nodes.Icosphere023.material}
          />

          <mesh
            geometry={nodes.Icosphere024.geometry}
            material={nodes.Icosphere024.material}
          />

          <mesh
            geometry={nodes.Icosphere025.geometry}
            material={nodes.Icosphere025.material}
          />

          <mesh
            geometry={nodes.Icosphere026.geometry}
            material={nodes.Icosphere026.material}
          />

          <mesh
            geometry={nodes.Icosphere028.geometry}
            material={nodes.Icosphere028.material}
          />

          <mesh
            geometry={nodes.Icosphere029.geometry}
            material={nodes.Icosphere029.material}
          />

          <mesh
            geometry={nodes.Icosphere030.geometry}
            material={nodes.Icosphere030.material}
          />

          <mesh
            geometry={nodes.Icosphere002.geometry}
            material={nodes.Icosphere002.material}
          />

          <mesh
            geometry={nodes.Icosphere005.geometry}
            material={nodes.Icosphere005.material}
          />

          <mesh
            geometry={nodes.Icosphere006.geometry}
            material={nodes.Icosphere006.material}
          />

          <mesh
            geometry={nodes.Icosphere011.geometry}
            material={nodes.Icosphere011.material}
          />

          <mesh
            geometry={nodes.Icosphere013.geometry}
            material={nodes.Icosphere013.material}
          />

          <mesh
            geometry={nodes.Icosphere016.geometry}
            material={nodes.Icosphere016.material}
          />

          <mesh
            geometry={nodes.Icosphere019.geometry}
            material={nodes.Icosphere019.material}
          />

          <mesh
            geometry={nodes.Icosphere021.geometry}
            material={nodes.Icosphere021.material}
          />

          <mesh
            geometry={nodes.Icosphere022.geometry}
            material={nodes.Icosphere022.material}
          />

          <mesh
            geometry={nodes.Icosphere027.geometry}
            material={nodes.Icosphere027.material}
          />

          <mesh
            geometry={nodes.Icosphere031.geometry}
            material={nodes.Icosphere031.material}
          />

          <mesh
            geometry={nodes.Icosphere032.geometry}
            material={nodes.Icosphere032.material}
          />
        </ModifyChildren>
      </group>
    </group>
  );
};
