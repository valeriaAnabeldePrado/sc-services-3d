import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  useGLTF,
  Preload,
  OrbitControls,
  Loader,
  // Stats,
  Sky,
} from "@react-three/drei";
import { ScrollWaypointCamera } from "./scroll4";

function Probe({ ...props }) {
  const { scene } = useGLTF("/room2.glb");
  return <primitive object={scene} {...props} />;
}

// Este componente ajusta la cámara al pasar a modo libre
function FreeCameraSetup({ active }) {
  const { camera } = useThree();

  useEffect(() => {
    if (active) {
      camera.position.set(35, 15, -10); // Tu posición original del canvas
      camera.lookAt(0, 15, 0); // A donde quieras mirar, altura 15 como tu escena
    }
  }, [active, camera]);

  return null;
}

export default function Departamento() {
  const [freeCamera, setFreeCamera] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const canvasRef = useRef();

  useEffect(() => {
    // Al montar: bloquea el scroll
    document.body.style.overflow = "hidden";
    return () => {
      // Al desmontar: restaura el scroll
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const preventDefault = (e) => {
      if (canvasRef.current && canvasRef.current.contains(e.target)) {
        if (e.touches.length === 1) e.preventDefault();
      }
    };
    window.addEventListener("touchmove", preventDefault, { passive: false });
    return () => {
      window.removeEventListener("touchmove", preventDefault);
    };
  }, []);

  useEffect(() => {
    setIsTouch(
      "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(30,32,40,0.85)",
          color: "#fff",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: "1rem",
          padding: "8px 20px",
          borderRadius: "12px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
          zIndex: 2000,
          pointerEvents: "none",
        }}
      >
        {isTouch ? "↕️ para avanzar" : "Usá el scroll del mouse para avanzar"}
      </div>
      <Canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1, // debajo de los overlays
        }}
        shadows
        gl={{ antialias: true }}
        camera={{
          position: [35, 0, -10],
          fov: 90,
          near: 0.01,
        }}
        toneMapped={true}
      >
        <Suspense fallback={null}>
          <Sky />
          <Probe position={[0, 0, 0]} />
        </Suspense>

        <Preload all />

        {!freeCamera && (
          <ScrollWaypointCamera onEnd={() => setFreeCamera(true)} />
        )}

        {freeCamera && (
          <>
            <FreeCameraSetup active={freeCamera} />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate={true}
              minPolarAngle={Math.PI / 2 - 0.7}
              maxPolarAngle={Math.PI / 2 - 0.4}
              minAzimuthAngle={Math.PI / 15}
              maxAzimuthAngle={Math.PI / 4 - 5}
            />
          </>
        )}
      </Canvas>

      {/* <Stats /> */}

      <button
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1001,
          padding: "12px 24px",
          background: "#6366f1",
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          fontWeight: 600,
          fontSize: "1rem",
          cursor: "pointer",
          boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
        }}
        onClick={() => setFreeCamera((prev) => !prev)}
      >
        {freeCamera ? "Volver al recorrido" : "Liberar cámara"}
      </button>

      <Loader
        containerStyles={{
          
          background: "rgba(20, 22, 30, 0.9)",
          backdropFilter: "blur(6px)",
          borderRadius: "20px",
          boxShadow: "0 6px 32px rgba(0,0,0,0.2)",
          padding: "32px",
          color: "#fff",
          width: "90%",
          maxWidth: "400px",
          height: "auto",
          minHeight: "140px",
          fontFamily: "'Inter', sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          transition: "all 0.3s ease-in-out",
        }}
        innerStyles={{
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "16px",
          padding: "24px 20px",
          boxShadow: "inset 0 0 10px rgba(255,255,255,0.05)",
          width: "100%",
          height: "100px",
          maxWidth: "350px",
          textAlign: "center",
          backdropFilter: "blur(2px)",
        }}
        barStyles={{
          height: "10px",
          width: "100%",
          borderRadius: "10px",
          background: "linear-gradient(90deg, #22d3ee, #6366f1)",
          animation: "loaderBar 2s linear infinite",
        }}
        dataStyles={{
          color: "#e0e7ff",
          fontSize: "1.2rem",
          fontWeight: 600,
          letterSpacing: "0.02em",
          fontFamily: "'Inter', sans-serif",
          marginTop: "4px",
        }}
        dataInterpolation={(p) => `Cargando escena... ${p.toFixed(0)}%`}
      />
    </>
  );
}
