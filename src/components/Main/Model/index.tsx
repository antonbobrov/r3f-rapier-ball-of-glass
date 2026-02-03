import { useGLTF } from '@react-three/drei';

import { Modify } from './Modify';

export const Model = () => {
  const gltf = useGLTF('/models/model.glb');
  const nodes = gltf.nodes as any;

  return (
    <Modify>
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
    </Modify>
  );
};
