import React from "react";

export default function LightsMine({ sunPosition }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={sunPosition}
        intensity={1}
        castShadow
        shadow-bias={-0.001}
        shadow-normalBias={0.05}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
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
