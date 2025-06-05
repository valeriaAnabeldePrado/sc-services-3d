// src/components/Entorno.jsx
import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { enableShadows } from "../../lib/utils2";

export default function ModelEntorno(props) {
  const { scene } = useGLTF("/entorno-v1.glb");

  useEffect(() => {
    enableShadows(scene);
  }, [scene]);

  return <primitive object={scene} {...props} />;
}
