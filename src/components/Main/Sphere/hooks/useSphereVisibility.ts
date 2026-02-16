import { RefObject, useEffect } from 'react';

import { createTimeline } from 'animejs';
import { Group } from 'three';

import { TRANSITION_IN, TRANSITION_OUT } from '../../settings';

interface IProps {
  groupRef: RefObject<Group | null>;
  isVisible: boolean;
}

export function useSphereVisibility({ groupRef, isVisible }: IProps) {
  useEffect(() => {
    const group = groupRef.current;
    if (!group) {
      return undefined;
    }

    const tm = createTimeline({
      defaults: {
        duration: isVisible ? TRANSITION_IN : TRANSITION_OUT,
        ease: 'inOutCubic',
      },
    });

    tm.add(group.scale, {
      delay: isVisible ? TRANSITION_IN * 0.2 : 0,
      x: isVisible ? [0.75, 1] : 0.5,
      y: isVisible ? [0.75, 1] : 0.5,
      z: isVisible ? [0.75, 1] : 0.5,
      onBegin: () => {
        if (isVisible) {
          group.visible = true;
        }
      },
      onComplete: () => {
        group.visible = isVisible;
      },
    });

    return () => {
      tm.cancel();
    };
  }, [groupRef, isVisible]);
}
