import { RefObject, useEffect } from 'react';

import { createTimeline, stagger } from 'animejs';
import { Group, Mesh, MeshPhysicalMaterial } from 'three';

import { TRANSITION_IN, TRANSITION_OUT } from '../../settings';
import { OPACITY } from '../settings';

interface IProps {
  scaleRef: RefObject<Group | null>;
  ballRef: RefObject<Mesh | null>;
  isVisible: boolean;
  material: MeshPhysicalMaterial;
}

export function useModelVisibility({
  scaleRef,
  ballRef,
  isVisible,
  material,
}: IProps) {
  useEffect(() => {
    const group = scaleRef.current;
    const ball = ballRef.current;

    if (!group || !ball) {
      return undefined;
    }

    const scales = group.children.map((child) => child.scale);

    const tm = createTimeline({
      defaults: {
        duration: isVisible ? TRANSITION_OUT : TRANSITION_IN,
        ease: 'inOutCubic',
      },
    });

    tm.add(scales, {
      ease: isVisible ? 'outBack' : 'inOutCubic',
      delay: stagger(20),
      x: isVisible ? 1 : 0.8,
      y: isVisible ? 1 : 0.8,
      z: isVisible ? 1 : 0.8,
      onBegin: () => {
        group.visible = true;
      },
      onComplete: () => {
        if (!isVisible) {
          group.visible = false;
        }
      },
    });

    tm.add(
      ball.scale,
      {
        ease: isVisible ? 'outBack' : 'inOutCubic',
        delay: stagger(20),
        x: isVisible ? 1 : 0,
        y: isVisible ? 1 : 0,
        z: isVisible ? 1 : 0,
      },
      0,
    );

    tm.add(material, { opacity: isVisible ? OPACITY : 0 }, 0);

    return () => {
      tm.cancel();
    };
  }, [ballRef, isVisible, material, scaleRef]);
}
