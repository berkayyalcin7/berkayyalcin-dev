"use client";

import dynamic from "next/dynamic";

// Sadece dekoratif olduğu için ilk yüklemeyi bloklamaması adına
// ana içerik render olduktan sonra, istemci tarafında yükleniyor.
const AnimatedBackground = dynamic(() => import("./AnimatedBackground"), {
  ssr: false,
});

export default function BackgroundLoader() {
  return <AnimatedBackground />;
}
