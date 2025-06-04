import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Preload,
  OrbitControls,
  Loader,
  // Stats,
  Environment,
  Sky,
} from "@react-three/drei";

// Luces principales
function Lights({ sunPosition }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={sunPosition}
        intensity={2}
        castShadow
        shadow-bias={-0.001}
        shadow-normalBias={0.05}
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
        shadow-camera-near={1}
        shadow-camera-far={100}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
    </>
  );
}

// Modelo GLB
function Probe({ ...props }) {
  const { scene } = useGLTF("/edificio-v1.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}
function Entorno({ ...props }) {
  const { scene } = useGLTF("/entorno-v1.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

// Interpolación de vectores
function lerpVec3(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

export default function Edificio() {
  // Estados principales
  const [sunPosition, setSunPosition] = useState([-20, 20, -10]);
  const [skySunPosition, setSkySunPosition] = useState([0, 1, 0]);
  const [moment, setMoment] = useState("amanecer");
  const [envPreset, setEnvPreset] = useState("city");
  const [transitioning, setTransitioning] = useState(false);
  const [simHour, setSimHour] = useState(6); // 6am o 18pm
  const [showEntorno, setShowEntorno] = useState(true);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(
      "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );
  }, []);

  // Targets para transición
  const targets = {
    amanecer: {
      sun: [-20, 20, -10],
      sky: [0, 1, 0],
      env: "city",
      skyParams: {
        rayleigh: 2,
        mieCoefficient: 0.01,
        mieDirectionalG: 0.9,
        inclination: 0.6,
        azimuth: 0.25,
      },
      hour: 6,
    },
    atardecer: {
      sun: [20, 10, 20],
      sky: [10, 1, 0],
      env: "sunset",
      skyParams: {
        turbidity: 12,
        rayleigh: 0.5,
        mieCoefficient: 0.03,
        mieDirectionalG: 0.99,
        inclination: 0.7,
        azimuth: 0.75,
      },
      hour: 18,
    },
  };

  // Transición gradual de luz, cielo y environment
  const handleToggleLight = () => {
    if (transitioning) return;
    setTransitioning(true);

    const from = moment === "amanecer" ? targets.amanecer : targets.atardecer;
    const to = moment === "amanecer" ? targets.atardecer : targets.amanecer;
    let t = 0;
    const duration = 1500; // ms
    const steps = 30;
    const interval = duration / steps;
    const startHour = from.hour;
    const endHour = to.hour;

    const animate = () => {
      t += 1 / steps;
      if (t >= 1) t = 1;

      setSunPosition(lerpVec3(from.sun, to.sun, t));
      setSkySunPosition(lerpVec3(from.sky, to.sky, t));
      // Interpola la hora
      let hour = Math.round(startHour + (endHour - startHour) * t);
      if (hour < 0) hour += 24;
      setSimHour(hour);

      // Cambia el environment a mitad de la transición
      if (t > 0.5) setEnvPreset(to.env);

      if (t < 1) {
        setTimeout(animate, interval);
      } else {
        setMoment(moment === "amanecer" ? "atardecer" : "amanecer");
        setTransitioning(false);
        setSimHour(endHour);
      }
    };
    animate();
  };

  // Selecciona los parámetros del cielo según el momento
  const skyParams =
    moment === "amanecer"
      ? targets.amanecer.skyParams
      : targets.atardecer.skyParams;

  return (
    <>
      {/* Reloj visual */}
      {!isTouch ? (
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
          🕒 {simHour.toString().padStart(2, "0")}:00{" "}
        </div>
      ) : (
        ""
      )}

      {isTouch ? (
        ""
      ) : (
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

      {/* Botón de transición */}
      {isTouch ? (
        ""
      ) : (
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
          zIndex: 1, // debajo de los overlays
        }}
        shadows={isTouch ? false : true}
        gl={{ antialias: true }}
        camera={{ position: [10, 11, 12], fov: 60, near: 0.01 }}
        toneMapped={true}
        dpr={isTouch ? 1 : window.devicePixelRatio}
      >
        <Suspense fallback={null}>
          <Sky sunPosition={skySunPosition} {...skyParams} />
          <Lights sunPosition={sunPosition} />
          <Probe position={[0, 0, 0]} />
          {showEntorno && <Entorno position={[0, 0, 0]} />}
          <Environment
            preset={envPreset}
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
          minDistance={1}
        />
      </Canvas>
      {/* <Stats /> */}
      <Loader
        containerStyles={{
          background: "rgba(20, 22, 30, 0.9)",
          backdropFilter: "blur(6px)",
          borderRadius: "20px",
          boxShadow: "0 6px 32px rgba(0,0,0,0.2)",
          padding: "32px",
          color: "#fff",
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
