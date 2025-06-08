import { useMemo } from "react";

// src/utils.js
export function lerpVec3(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

export function enableShadows(scene) {
  scene.traverse((child) => {
    if (child.isMesh && child.geometry) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
}

export const targets = {
  amanecer: {
    sun: [-20, 20, -10],
    sky: [0, 1, 0],
    env: "city",
    skyParams: {
      rayleigh: 2,
      mieCoefficient: 0.01,
      mieDirectionalG: 0.9,
      inclination: 0.6,
      azimuth: 0.25,
    },
    hour: 6,
  },
  atardecer: {
    sun: [20, 10, 20],
    sky: [10, 1, 0],
    env: "sunset",
    skyParams: {
      turbidity: 12,
      rayleigh: 0.5,
      mieCoefficient: 0.03,
      mieDirectionalG: 0.99,
      inclination: 0.7,
      azimuth: 0.75,
    },
    hour: 18,
  },
};

export function useSkyTargets() {
  return useMemo(
    () => ({
      amanecer: {
        sun: [-20, 20, -10],
        sky: [0, 1, 0],
        env: "city",
        skyParams: {
          rayleigh: 2,
          mieCoefficient: 0.01,
          mieDirectionalG: 0.9,
          inclination: 0.6,
          azimuth: 0.25,
        },
        hour: 6,
      },
      atardecer: {
        sun: [20, 10, 20],
        sky: [10, 1, 0],
        env: "sunset",
        skyParams: {
          turbidity: 12,
          rayleigh: 0.5,
          mieCoefficient: 0.03,
          mieDirectionalG: 0.99,
          inclination: 0.7,
          azimuth: 0.75,
        },
        hour: 18,
      },
    }),
    []
  );
}
