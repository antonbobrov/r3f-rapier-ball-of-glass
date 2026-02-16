import { FC, useRef } from 'react';

import { useStripes } from './stripes/useStripes';
import { mergeStripeSettings } from './stripes/utils/mergeStripeSettings';
import { IProps } from './types';

export const Particles: FC<IProps> = ({ settings }) => {
  const settingsRef = useRef({ ...mergeStripeSettings(settings) });

  const points = useStripes(settingsRef.current);

  if (!points) {
    return null;
  }

  return <primitive object={points} />;
};
