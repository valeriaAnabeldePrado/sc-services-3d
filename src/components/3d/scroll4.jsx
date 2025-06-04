import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export function ScrollWaypointCamera() {
  const { camera } = useThree();
  const scrollOffset = useRef(0);
  const currentOffset = useRef(0);

  // 🔧 Define tus puntos de forma sencilla (Y fijo en 15)
  const rawWaypoints = [
    { position: [35, 0, -10], lookAt: [0, 0, 90] },
    { position: [35, 0, 0], lookAt: [0, 0, 340] },
    { position: [35, 0, 10], lookAt: [0, 0, 50] },
    { position: [35, 0, 15], lookAt: [0, 0, 20] },
    { position: [35, 0, 30], lookAt: [0, 0, 0] },
    { position: [25, 0, 30], lookAt: [0, 0, -10] },
    { position: [25, 0, 30], lookAt: [0, 0, 20] },
    { position: [25, 0, 30], lookAt: [10, 0, 30] },
    { position: [25, 0, 20], lookAt: [10, 0, 20] },
    { position: [25, 0, 10], lookAt: [10, 0, 10] },
    { position: [25, 0, 0], lookAt: [10, 0, 0] },
  ];

  const waypoints = rawWaypoints.map(({ position, lookAt }) => ({
    position: [position[0], 15, position[2]],
    lookAt: [lookAt[0], 15, lookAt[2]],
  }));

  const totalSections = waypoints.length - 1;

  useEffect(() => {
    let lastY = null;

    const handleScroll = (e) => {
      scrollOffset.current += e.deltaY * 0.0001;
      scrollOffset.current = THREE.MathUtils.clamp(scrollOffset.current, 0, 1);
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        lastY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 1 && lastY !== null) {
        const deltaY = lastY - e.touches[0].clientY;
        scrollOffset.current += deltaY * 0.001; // Ajusta sensibilidad
        scrollOffset.current = THREE.MathUtils.clamp(
          scrollOffset.current,
          0,
          1
        );
        lastY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      lastY = null;
    };

    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useFrame(() => {
    if (totalSections < 1) return;

    currentOffset.current = THREE.MathUtils.lerp(
      currentOffset.current,
      scrollOffset.current,
      0.05
    );

    const t = currentOffset.current * totalSections;
    const index = Math.floor(t);
    const lerpT = t - index;

    const current = waypoints[index];
    const next = waypoints[Math.min(index + 1, totalSections)];

    const pos = new THREE.Vector3()
      .fromArray(current.position)
      .lerp(new THREE.Vector3().fromArray(next.position), lerpT);
    const target = new THREE.Vector3()
      .fromArray(current.lookAt)
      .lerp(new THREE.Vector3().fromArray(next.lookAt), lerpT);

    camera.position.copy(pos);
    camera.lookAt(target);
  });

  return null;
}
