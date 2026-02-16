import { useEffect, useRef } from 'react';

import { useDeviceOrientationGranted } from './useDeviceOrientationGranted';
import { useEvent } from './useEvent';

interface ICoords {
  x: number;
  y: number;
  z: number;
}

export function useDeviceMotionDelta(onUpdate: (coords: ICoords) => void) {
  const { granted } = useDeviceOrientationGranted();

  const prevRef = useRef<ICoords>({ x: 0, y: 0, z: 0 });

  const handle = useEvent((evt: DeviceMotionEvent) => {
    const x = evt.accelerationIncludingGravity?.x || 0;
    const y = evt.accelerationIncludingGravity?.y || 0;
    const z = evt.accelerationIncludingGravity?.z || 0;

    const xDiff = x - prevRef.current.x;
    const yDiff = y - prevRef.current.y;
    const zDiff = z - prevRef.current.z;

    prevRef.current = { x, y, z };

    onUpdate({ x: xDiff, y: yDiff, z: zDiff });
  });

  useEffect(() => {
    if (!granted) {
      return undefined;
    }

    window.addEventListener('devicemotion', handle);

    return () => {
      window.removeEventListener('devicemotion', handle);
    };
  }, [granted, handle]);
}
