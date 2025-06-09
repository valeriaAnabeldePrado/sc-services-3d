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
import { ModelEntorno, ModelEntorno2 } from "./model-enterno";
import { useGLTF } from "@react-three/drei";
import { Controles3D } from "./controles";
import CameraZoomTrigger from "./camera-zoom";

export default function Edificio() {
  useGLTF.preload("/entorno-2.glb");
  useGLTF.preload("/mine-v1.glb");
  useGLTF.preload("/edif-cont.glb");
  const targets = useSkyTargets();
  const [sunPosition, setSunPosition] = useState(targets.amanecer.sun);
  const [skySunPosition, setSkySunPosition] = useState(targets.amanecer.sky);
  const [moment, setMoment] = useState("amanecer");

  const [transitioning, setTransitioning] = useState(false);
  const [showGround1, setShowGround1] = useState(true);
  const [showGround2, setShowGround2] = useState(true);
  const [showEntorno, setShowEntorno] = useState(true);
  const [showEntorno2, setShowEntorno2] = useState(true);
  const [isTouch, setIsTouch] = useState(false);

  const [zoomPared, setZoomPared] = useState(false);

  useEffect(() => {
    setIsTouch(
      "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );
  }, []);

  const handleLight = (to) => {
    if (transitioning) return;
    setTransitioning(true);

    const from = targets[moment];
    const toTarget = to === "amanecer" ? targets.amanecer : targets.atardecer;
    const duration = 1500;
    const startTime = performance.now();

    const step = (now) => {
      const t = Math.min((now - startTime) / duration, 1);

      setSunPosition(lerpVec3(from.sun, toTarget.sun, t));
      setSkySunPosition(lerpVec3(from.sky, toTarget.sky, t));

      if (t < 1) requestAnimationFrame(step);
      else {
        setMoment(to);
        setTransitioning(false);
      }
    };

    requestAnimationFrame(step);
  };

  const skyParams = targets[moment].skyParams;

  return (
    <>
      {!isTouch && (
        <Controles3D
          transitioning={transitioning}
          onLightFrom={() => handleLight("amanecer")}
          onLightTo={() => handleLight("atardecer")}
          showGround1={showGround1}
          setShowGround1={setShowGround1}
          showGround2={showGround2}
          setShowGround2={setShowGround2}
          showEntorno={showEntorno}
          setShowEntorno={setShowEntorno}
          showEntorno2={showEntorno2}
          setShowEntorno2={setShowEntorno2}
          zoomPared={zoomPared}
          setZoomPared={setZoomPared}
        />
      )}

      {zoomPared && (
        <div
          style={{
            position: "fixed",
            top: 120,
            left: 40,
            zIndex: 2000,
            background: "rgba(30,32,40,0.96)",
            color: "#fff",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
            padding: "24px 32px",
            maxWidth: 340,
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.1rem",
            lineHeight: 1.6,
          }}
        >
          <strong>¿De qué está compuesta la pared?</strong>
          <ul style={{ margin: "16px 0 0 0", padding: 0, listStyle: "none" }}>
            <li>• Ladrillo hueco portante 18cm</li>
            <li>• Aislación hidrófuga y térmica</li>
            <li>• Revoque grueso y fino</li>
            <li>• Pintura interior/exterior</li>
            <li>• Terminación con revestimiento plástico</li>
          </ul>
        </div>
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
        shadows={!isTouch}
        gl={{ antialias: true }}
        camera={{
          position: [10, 11, 12],
          fov: 60,
          near: 0.01,
        }}
        toneMapped={true}
        dpr={isTouch ? 1 : 1.5}
      >
        <CameraZoomTrigger
          trigger={zoomPared}
          target={[-1.5, 9, 6]}
          lookAt={[0, 9, 4]} // Cambiá el X o el Z para que no esté alineado
          original={[10, 11, 12]}
          originalLookAt={[0, 8, 0]}
        />

        <Suspense fallback={null}>
          <Sky sunPosition={skySunPosition} {...skyParams} />
          <LightsMine sunPosition={sunPosition} />
          <ModelEdificio position={[0, 0, 0]} />
          {showGround1 && <Ground1 />}
          {showGround2 && <Ground2 />}
          {showEntorno && <ModelEntorno2 position={[0, 0.5, 0]} />}
          {showEntorno2 && <ModelEntorno position={[0, 0.5, 0]} />}
          <Environment
            preset="city"
            backgroundIntensity={0.2}
            environmentIntensity={0.2}
          />
        </Suspense>
        <Preload all />
        <OrbitControls
          enabled={!zoomPared}
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
