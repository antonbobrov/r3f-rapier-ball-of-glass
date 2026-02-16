import { RefObject, useEffect, useRef } from 'react';

import { createTimeline } from 'animejs';
import { Group } from 'three';

import { TRANSITION_IN } from '../settings';

export function useRotationOnState(
  groupRef: RefObject<Group | null>,
  state: boolean,
) {
  const prevState = useRef(state);

  useEffect(() => {
    const group = groupRef.current;

    if (!group) {
      return undefined;
    }

    if (prevState.current === state) {
      return;
    }

    prevState.current = state;

    const Pi2 = Math.PI * -2;
    const roundsX = Math.ceil(group.rotation.x / Pi2);
    const roundsY = Math.ceil(group.rotation.y / Pi2);

    const tm = createTimeline({
      defaults: {
        duration: TRANSITION_IN * 1.5,
        ease: 'outCirc',
      },
    });

    tm.add(group.rotation, {
      x: (roundsX + 1) * Pi2,
      y: (roundsY + 1) * Pi2,
    });

    return () => {
      tm.cancel();
    };
  }, [groupRef, state]);
}
