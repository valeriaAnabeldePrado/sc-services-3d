import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";

export default function CameraZoomTrigger({
  trigger,
  target = [1, 8, 5],
  lookAt = [5, 8, 1],
  original = [10, 11, 12],
  originalLookAt = [0, 8, 0],
  duration = 1.2,
}) {
  const { camera, controls } = useThree();
  const prevTrigger = useRef(trigger);

  useEffect(() => {
    if (prevTrigger.current === trigger) return;
    prevTrigger.current = trigger;

    camera.up.set(0, 1, 0);

    const fromPos = camera.position.clone();
    const toPos = new Vector3(...(trigger ? target : original));
    const lookTarget = new Vector3(...(trigger ? lookAt : originalLookAt));
    const start = performance.now();

    const animate = (now) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      camera.position.lerpVectors(fromPos, toPos, t);
      if (controls) controls.target.lerp(lookTarget, 0.1);
      camera.lookAt(lookTarget);
      camera.updateProjectionMatrix();
      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        if (controls) {
          controls.target.copy(lookTarget);
          controls.update();
        }
        camera.lookAt(lookTarget);
      }
    };

    requestAnimationFrame(animate);
  }, [
    trigger,
    target,
    lookAt,
    original,
    originalLookAt,
    duration,
    camera,
    controls,
  ]);

  return null;
}
