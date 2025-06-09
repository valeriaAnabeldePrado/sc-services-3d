import {
  Sun,
  Moon,
  Layers,
  Layers2,
  Globe,
  Globe2,
  Square,
} from "lucide-react";
import { memo } from "react";

export const Controles3D = memo(function Controles3D({
  transitioning,
  onLightFrom,
  onLightTo,
  showGround1,
  setShowGround1,
  showGround2,
  setShowGround2,
  showEntorno,
  setShowEntorno,
  showEntorno2,
  setShowEntorno2,
  zoomPared,
  setZoomPared,
}) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 40,
        right: 40,
        zIndex: 1001,
        display: "flex",
        flexDirection: "row",
        gap: 18,
        background: "rgba(30,32,40,0.92)",
        borderRadius: "18px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
        padding: "18px 24px",
        alignItems: "center",
        border: "1.5px solid #23263a",
      }}
    >
      <button
        title="Luz: Desde"
        style={{
          background: transitioning ? "#f9e37c" : "#f9e37c",
          border: "none",
          borderRadius: "50%",
          padding: "10px",
          cursor: transitioning ? "wait" : "pointer",
          opacity: transitioning ? 0.7 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s",
        }}
        onClick={onLightFrom}
        disabled={transitioning}
      >
        <Sun size={26} color="#fff" />
      </button>
      <button
        title="Luz: Hasta"
        style={{
          background: transitioning ? "#f9e37c" : "#f9e37c",
          border: "none",
          borderRadius: "50%",
          padding: "10px",
          cursor: transitioning ? "wait" : "pointer",
          opacity: transitioning ? 0.7 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s",
        }}
        onClick={onLightTo}
        disabled={transitioning}
      >
        <Moon size={26} color="#fff" />
      </button>
      <button
        title="Ground 1"
        style={{
          background: showGround1 ? "#8d4922" : "#23263a",
          border: "none",
          borderRadius: "50%",
          padding: "10px",
          cursor: "pointer",
          opacity: showGround1 ? 1 : 0.6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s, opacity 0.2s",
        }}
        onClick={() => setShowGround1((v) => !v)}
      >
        <Layers size={26} color="#fff" />
      </button>
      <button
        title="Ground 2"
        style={{
          background: showGround2 ? "#8d4922" : "#23263a",
          border: "none",
          borderRadius: "50%",
          padding: "10px",
          cursor: "pointer",
          opacity: showGround2 ? 1 : 0.6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s, opacity 0.2s",
        }}
        onClick={() => setShowGround2((v) => !v)}
      >
        <Layers2 size={26} color="#fff" />
      </button>
      <button
        title="Entorno 2"
        style={{
          background: showEntorno2 ? "#b5bac9" : "#23263a",
          border: "none",
          borderRadius: "50%",
          padding: "10px",
          cursor: "pointer",
          opacity: showEntorno2 ? 1 : 0.6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s, opacity 0.2s",
        }}
        onClick={() => setShowEntorno2((v) => !v)}
      >
        <Globe size={26} color="#fff" />
      </button>
      <button
        title="Entorno"
        style={{
          background: showEntorno ? "#b5bac9" : "#23263a",
          border: "none",
          borderRadius: "50%",
          padding: "10px",
          cursor: "pointer",
          opacity: showEntorno ? 1 : 0.6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s, opacity 0.2s",
        }}
        onClick={() => setShowEntorno((v) => !v)}
      >
        <Globe2 size={26} color="#fff" />
      </button>

      <button
        title="Ver materiales pared"
        style={{
          background: zoomPared ? "#f59e42" : "#23263a",
          border: "none",
          borderRadius: "50%",
          padding: "10px",
          cursor: "pointer",
          opacity: zoomPared ? 1 : 0.6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s, opacity 0.2s",
        }}
        onClick={() => setZoomPared((v) => !v)}
      >
        <Square size={26} color="#fff" />
      </button>
    </div>
  );
});
