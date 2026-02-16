/* eslint-disable @typescript-eslint/ban-ts-comment */
import { float, Fn, mx_noise_float, vec3 } from 'three/tsl';

/** Vector potential F = (n(p), n(p+o1), n(p+o2)) for curl */
// @ts-ignore
const snoiseVec3 = Fn(([x_immutable]) => {
  const x = vec3(x_immutable).toVar();
  const s = mx_noise_float(x);
  const s1 = mx_noise_float(vec3(x.y.sub(19.1), x.z.add(33.4), x.x.add(47.2)));
  const s2 = mx_noise_float(vec3(x.z.add(74.2), x.x.sub(124.5), x.y.add(99.4)));

  return vec3(s, s1, s2);
}) as any;

/**
 * Curl noise via forward difference (4 samples vs 6 for central diff).
 * curl(F) = (dFz/dy - dFy/dz, dFx/dz - dFz/dx, dFy/dx - dFx/dy)
 */
// @ts-ignore
export const curlNoise = Fn(([p_immutable]) => {
  const p = vec3(p_immutable).toVar();
  const e = float(0.1);

  const f0 = snoiseVec3(p);
  const fx = snoiseVec3(p.add(vec3(e, 0, 0)));
  const fy = snoiseVec3(p.add(vec3(0, e, 0)));
  const fz = snoiseVec3(p.add(vec3(0, 0, e)));

  const invE = float(1).div(e);
  const x = fy.z.sub(f0.z).sub(fz.y).add(f0.y);
  const y = fz.x.sub(f0.x).sub(fx.z).add(f0.z);
  const z = fx.y.sub(f0.y).sub(fy.x).add(f0.x);

  return vec3(x, y, z).mul(invE).normalize();
});
