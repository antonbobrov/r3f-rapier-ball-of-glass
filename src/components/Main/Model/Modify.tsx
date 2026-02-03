import { cloneElement, FC, ReactElement } from 'react';

import { material } from './material';
import { ModelRigidBody } from './RigidBody';

interface IProps {
  children: ReactElement[];
}

export const Modify: FC<IProps> = ({ children }) =>
  children.map((child, i) => (
    <ModelRigidBody key={child.key || i}>
      {cloneElement(child, { material: material } as any)}
    </ModelRigidBody>
  ));
