import { useRef } from 'react';

import { useDeviceMotionDelta } from './useDeviceMotionDelta';

const SHAKE_THRESHOLD = 1.25;
const SHAKE_TIMES = 3;
const SHAKE_DEBOUNCE = 2000;
const SHAKE_LIFETIME = 1500;

export function useShake(onShake: () => void) {
  const prevTimeRef = useRef(+new Date());
  const shakeTimesRef = useRef(0);
  const prevShakeTimeRef = useRef(+new Date());

  useDeviceMotionDelta(({ x, y, z }) => {
    if (
      Math.abs(x) < SHAKE_THRESHOLD ||
      Math.abs(y) < SHAKE_THRESHOLD ||
      Math.abs(z) < SHAKE_THRESHOLD
    ) {
      return;
    }
    const now = +new Date();
    const prevTime = prevTimeRef.current;

    if (
      now - prevTime > SHAKE_LIFETIME ||
      now - prevShakeTimeRef.current < SHAKE_DEBOUNCE
    ) {
      prevTimeRef.current = now;
      shakeTimesRef.current = 0;

      return;
    }

    shakeTimesRef.current += 1;
    prevTimeRef.current = now;

    if (shakeTimesRef.current >= SHAKE_TIMES) {
      shakeTimesRef.current = 0;
      prevShakeTimeRef.current = now;

      onShake();
    }
  });
}
