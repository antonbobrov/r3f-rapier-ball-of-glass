import { ReactElement, RefObject } from 'react';

import { Material, Mesh } from 'three';

export interface IProps {
  pointerRef: RefObject<Mesh | null>;
  isVisible: boolean;
}

export interface IModifyChildrenProps {
  material: Material;
  children: ReactElement[];
}
