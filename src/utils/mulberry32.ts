export function mulberry32(seed: number) {
  let t = seed >>> 0;

  t += 0x6d2b79f5;
  let r = Math.imul(t ^ (t >>> 15), t | 1);
  r ^= r + Math.imul(r ^ (r >>> 7), r | 61);

  return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
}

export function mulberryRand(min = 0, max = 1, seed: number) {
  return mulberry32(seed) * (max - min) + min;
}
