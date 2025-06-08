import { useGLTF } from "@react-three/drei";

/**
 * Ground component
 * @param {string} url - Ruta al modelo GLTF/GLB exportado de Blender
 * @param {Array} position - Posición [x, y, z] (default: [0, 0, 0])
 * @param {Array|number} scale - Escala (default: 1)
 * @param {Array} rotation - Rotación [x, y, z] en radianes (default: [0, 0, 0])
 * @param {boolean} castShadow - Si el ground proyecta sombra (default: false)
 * @param {boolean} receiveShadow - Si el ground recibe sombra (default: true)
 * @param {object} props - Otros props para el primitive
 */
export function Ground1({
  url = "/ground.glb",
  position = [0, 0, 0],
  scale = 2,
  rotation = [0, 0, 0],
  castShadow = false,
  receiveShadow = true,
  ...props
}) {
  const { scene } = useGLTF(url);

  // Aplica las props de sombra a todos los meshes hijos del modelo
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = castShadow;
      child.receiveShadow = receiveShadow;
    }
  });

  return (
    <primitive
      object={scene}
      position={position}
      scale={scale}
      rotation={rotation}
      {...props}
    />
  );
}
export function Ground2({
  url = "/ground2.glb",
  position = [0, 0.5, 0],
  scale = 1,
  rotation = [0, 0, 0],
  castShadow = false,
  receiveShadow = true,
  ...props
}) {
  const { scene } = useGLTF(url);

  // Aplica las props de sombra a todos los meshes hijos del modelo
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = castShadow;
      child.receiveShadow = receiveShadow;
    }
  });

  return (
    <primitive
      object={scene}
      position={position}
      scale={scale}
      rotation={rotation}
      {...props}
    />
  );
}
