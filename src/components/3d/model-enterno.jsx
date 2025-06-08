import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { enableShadows } from "../../lib/utils2";

export function ModelEntorno(props) {
  const { scene } = useGLTF("/entorno-cont.glb");

  const cloned = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    enableShadows(cloned);
  }, [cloned]);

  return <primitive object={cloned} {...props} />;
}

export function ModelEntorno2(props) {
  const { scene } = useGLTF("/entorno-2.glb");

  const cloned = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    enableShadows(cloned);
  }, [cloned]);

  return <primitive object={cloned} {...props} />;
}
