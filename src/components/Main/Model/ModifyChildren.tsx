import { cloneElement, FC } from 'react';

import { ModelRigidBody } from './RigidBody';
import { IModifyChildrenProps } from './types';

export const ModifyChildren: FC<IModifyChildrenProps> = ({
  material,
  children,
}) =>
  children.map((child, i) => (
    <ModelRigidBody key={child.key || i}>
      {cloneElement(child, { material: material } as any)}
    </ModelRigidBody>
  ));
