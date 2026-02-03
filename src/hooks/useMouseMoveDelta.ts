import { useEffect, useRef } from 'react';

import { Vector2 } from 'three';
import { addEventListener, scoped, vevet } from 'vevet';

export function useMouseMoveDelta(onUpdateProp: (delta: Vector2) => void) {
  const prevMouseRef = useRef<Vector2>(new Vector2(NaN, NaN));

  useEffect(
    () =>
      addEventListener(window, 'mousemove', (evt) => {
        const prev = prevMouseRef.current;

        const x = scoped(evt.clientX, vevet.width / 2, vevet.width);
        const y = scoped(evt.clientY, vevet.height / 2, vevet.height);

        if (Number.isNaN(prev.x) || Number.isNaN(prev.y)) {
          prev.x = x;
          prev.y = y;
        }

        const dx = x - prev.x;
        const dy = y - prev.y;

        prev.x = x;
        prev.y = y;

        onUpdateProp(new Vector2(dx, dy));
      }),
    [onUpdateProp],
  );
}
