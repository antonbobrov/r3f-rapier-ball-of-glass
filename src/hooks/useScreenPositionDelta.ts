import { useEffect, useRef } from 'react';

import { useFrame } from '@react-three/fiber';
import { Vector2 } from 'three';
import { addEventListener } from 'vevet';

export function useScreenPositionDelta(onUpdateProp: (delta: Vector2) => void) {
  const prevScreenRef = useRef<Vector2>(new Vector2(NaN, NaN));
  const isResizedRef = useRef(false);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useFrame(() => {
    const prev = prevScreenRef.current;

    const x = window.screenX / (window.screen.width / 2);
    const y = window.screenY / (window.screen.height / 2);

    if (Number.isNaN(prev.x) || Number.isNaN(prev.y)) {
      prev.x = x;
      prev.y = y;
    }

    const dx = x - prev.x;
    const dy = y - prev.y;

    prev.x = x;
    prev.y = y;

    if (!isResizedRef.current) {
      onUpdateProp(new Vector2(dx, dy));
    }
  });

  useEffect(
    () =>
      addEventListener(window, 'resize', () => {
        isResizedRef.current = true;

        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current);
        }

        resizeTimeoutRef.current = setTimeout(() => {
          isResizedRef.current = false;
        }, 100);
      }),
    [],
  );
}
