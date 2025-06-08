// src/Edificio.jsx
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Preload,
  OrbitControls,
  Loader,
  Stats,
  Environment,
  Sky,
} from "@react-three/drei";

import ModelEdificio from "./model-edificio";
import LightsMine from "./lights";
import { lerpVec3, useSkyTargets } from "../../lib/utils2";
import { Ground1, Ground2 } from "./ground";
import { ModelEntorno2 } from "./model-enterno";
import { useGLTF } from "@react-three/drei";

export default function Edificio() {
  useGLTF.preload("/entorno-cont.glb");
  useGLTF.preload("/entorno-2.glb");
  useGLTF.preload("/edificio.glb");
  const targets = useSkyTargets();
  const [sunPosition, setSunPosition] = useState(targets.amanecer.sun);
  const [skySunPosition, setSkySunPosition] = useState(targets.amanecer.sky);
  const [moment, setMoment] = useState("amanecer");

  const [transitioning, setTransitioning] = useState(false);
  const [simHour, setSimHour] = useState(targets.amanecer.hour);
  const [showEntorno, setShowEntorno] = useState(true);
  const [showEntorno2, setShowEntorno2] = useState(true);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(
      "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );
  }, []);

  const handleToggleLight = () => {
    if (transitioning) return;
    setTransitioning(true);

    const from = targets[moment];
    const to = moment === "amanecer" ? targets.atardecer : targets.amanecer;
    const duration = 1500;
    const startTime = performance.now();

    const step = (now) => {
      const t = Math.min((now - startTime) / duration, 1);

      setSunPosition(lerpVec3(from.sun, to.sun, t));
      setSkySunPosition(lerpVec3(from.sky, to.sky, t));
      setSimHour(Math.round(from.hour + (to.hour - from.hour) * t));

      if (t < 1) requestAnimationFrame(step);
      else {
        setMoment(moment === "amanecer" ? "atardecer" : "amanecer");
        setTransitioning(false);
        setSimHour(to.hour);
      }
    };

    requestAnimationFrame(step);
  };

  const skyParams = targets[moment].skyParams;

  return (
    <>
      {!isTouch && (
        <div
          style={{
            position: "fixed",
            top: 120,
            right: 24,
            zIndex: 1001,
            background: "rgba(30,32,40,0.85)",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: "1.2rem",
            padding: "12px 24px",
            borderRadius: "12px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
            letterSpacing: "0.04em",
            minWidth: "90px",
            textAlign: "center",
          }}
        >
          🕒 {simHour.toString().padStart(2, "0")}:00
        </div>
      )}

      {!isTouch && (
        <button
          style={{
            position: "fixed",
            bottom: 82,
            right: 24,
            zIndex: 1001,
            padding: "12px 24px",
            background: "#22d3ee",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
          }}
          onClick={() => setShowEntorno((v) => !v)}
        >
          {showEntorno ? "Ocultar entorno" : "Mostrar entorno"}
        </button>
      )}
      {!isTouch && (
        <button
          style={{
            position: "fixed",
            bottom: 140,
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
          onClick={() => setShowEntorno2((v) => !v)}
        >
          {showEntorno2 ? "Ocultar entorno2" : "Mostrar entorno2"}
        </button>
      )}

      {!isTouch && (
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
            cursor: transitioning ? "wait" : "pointer",
            boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
            opacity: transitioning ? 0.7 : 1,
          }}
          onClick={handleToggleLight}
          disabled={transitioning}
        >
          Cambiar a {moment === "amanecer" ? "atardecer" : "amanecer"}
        </button>
      )}

      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1,
        }}
        // shadows={!isTouch}
        gl={{ antialias: true }}
        camera={{ position: [10, 11, 12], fov: 60, near: 0.01 }}
        toneMapped={true}
        dpr={Math.min(window.devicePixelRatio || 1, 2)}
      >
        <Suspense fallback={null}>
          <Sky sunPosition={skySunPosition} {...skyParams} />
          <LightsMine sunPosition={sunPosition} />
          <ModelEdificio position={[0, 0, 0]} />
          <Ground1 />
          <Ground2 />

          {showEntorno2 && <ModelEntorno2 position={[0, 0.5, 0]} />}
          <Environment
            preset="city"
            backgroundIntensity={0.2}
            environmentIntensity={0.2}
          />
        </Suspense>
        <Preload all />
        <OrbitControls
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2 - 0.1}
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={false}
          autoRotateSpeed={1.0}
          minDistance={10}
          maxDistance={30}
        />
      </Canvas>
      <Stats />
      <Loader
        containerStyles={{
          position: "absolute",
          top: "50%",
          left: "10%",
          right: "10%",
          background: "rgba(20, 22, 30, 0.9)",
          backdropFilter: "blur(6px)",
          borderRadius: "20px",
          boxShadow: "0 6px 32px rgba(0,0,0,0.2)",
          padding: "32px",
          color: "#fff",
          width: "90%",
          maxWidth: "400px",
          height: "auto",
          minHeight: "100px",
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
          height: "70px",
          maxWidth: "320px",
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
