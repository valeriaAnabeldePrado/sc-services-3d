// src/components/Probe.jsx
import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { enableShadows } from "../../lib/utils2";

export default function ModelEdificio(props) {
  const { scene } = useGLTF("/mine-v1.glb");

  useEffect(() => {
    enableShadows(scene);
  }, [scene]);

  return <primitive object={scene} {...props} />;
}
