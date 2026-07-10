"use client";

import dynamic from "next/dynamic";

// Sadece dekoratif olduğu için ilk yüklemeyi bloklamaması adına
// ana içerik render olduktan sonra, istemci tarafında yükleniyor.
const NetworkCanvas = dynamic(() => import("./NetworkCanvas"), { ssr: false });

export default function NetworkCanvasLoader() {
  return <NetworkCanvas />;
}
