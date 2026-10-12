export function mulberry32(a: number) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

export class RNG {
  private randomFn: () => number;

  constructor(seed: number) {
    this.randomFn = mulberry32(seed);
  }

  random(): number {
    return this.randomFn();
  }

  randomInRange(min: number, max: number): number {
    return this.randomFn() * (max - min) + min;
  }

  randomInt(min: number, max: number): number {
    return Math.floor(this.randomInRange(min, max));
  }
}
