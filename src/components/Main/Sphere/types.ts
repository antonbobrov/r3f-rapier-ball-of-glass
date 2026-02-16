import { RefObject } from 'react';

import { Mesh } from 'three';

export interface IProps {
  pointerRef: RefObject<Mesh | null>;
  isVisible: boolean;
  scale: number;
}
