import { useCallback, useEffect, useRef } from 'react';

import { Vector3 } from 'three';
import { lerp, Raf } from 'vevet';

export function useAnimatableVec3(
  onUpdateProp: (vec3: Vector3) => void,
  easeProp = 0.1,
  frictionProp = easeProp * 2.5,
) {
  const targetRef = useRef<Vector3>(new Vector3(0, 0, 0));
  const currentRef = useRef<Vector3>(new Vector3(0, 0, 0));

  const onUpdate = useRef(onUpdateProp);

  useEffect(() => {
    const raf = new Raf();
    raf.play();

    raf.on('frame', () => {
      const target = targetRef.current;
      const { current } = currentRef;

      const ease = raf.lerpFactor(easeProp);
      const friction = raf.lerpFactor(frictionProp);

      target.x = lerp(target.x, 0, friction);
      target.y = lerp(target.y, 0, friction);
      target.z = lerp(target.z, 0, friction);

      current.x = lerp(current.x, target.x, ease);
      current.y = lerp(current.y, target.y, ease);
      current.z = lerp(current.z, target.z, ease);

      onUpdate.current(current);
    });

    return () => raf.destroy();
  }, [easeProp, frictionProp]);

  const iterateTarget = useCallback((vec3: Vector3) => {
    targetRef.current.x += vec3.x;
    targetRef.current.y += vec3.y;
    targetRef.current.z += vec3.z;
  }, []);

  return { iterateTarget };
}
