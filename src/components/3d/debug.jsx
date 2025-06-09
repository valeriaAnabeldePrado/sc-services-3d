// src/CameraDebugger.jsx
import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function CameraDebugger() {
  const { camera } = useThree();
  const [info, setInfo] = useState("");
  const raf = useRef(0);

  useFrame(() => {
    // actualiza una vez cada 10 frames
    if (++raf.current % 10 === 0) {
      const pos = camera.position;
      const target = new THREE.Vector3();
      camera.getWorldDirection(target); // dirección "forward"

      setInfo(
        `📍 Cam pos: [${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(
          2
        )}] \n👀 Look dir: [${target.x.toFixed(2)}, ${target.y.toFixed(
          2
        )}, ${target.z.toFixed(2)}]`
      );
    }
  });
  console.log(info);

  return null;
}
