import { useEffect, useRef, useState } from 'react';

import { Object3D } from 'three';

import { useEvent } from '@/hooks/useEvent';

import { ISettings } from '../types';

import { createPoints } from './utils/createPoints';

export function useStripes(settings: ISettings) {
  const dataRef = useRef<ReturnType<typeof createPoints> | null>(null);

  const [points, setPoints] = useState<Object3D | null>(null);

  const create = useEvent(() => {
    dataRef.current?.destruct();

    const data = createPoints(settings);
    dataRef.current = data;

    setPoints(data.points);

    return data;
  });

  useEffect(() => {
    const data = create();

    return () => {
      data.destruct();
    };
  }, [create]);

  return points;
}
