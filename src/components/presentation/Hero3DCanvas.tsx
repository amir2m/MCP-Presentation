'use client';

import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { HeroNetworkScene } from './HeroNetworkScene';

interface Hero3DCanvasProps {
  onWebGLError?: () => void;
  reducedMotion?: boolean;
}

export default function Hero3DCanvas({
  onWebGLError,
  reducedMotion = false,
}: Hero3DCanvasProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-full pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'low-power',
          stencil: false,
          depth: true,
        }}
        onCreated={({ gl }) => {
          const handleContextLost = (event: Event) => {
            event.preventDefault();
            console.warn('WebGL Context Lost in Hero3DCanvas');
            if (onWebGLError) onWebGLError();
          };
          gl.domElement.addEventListener('webglcontextlost', handleContextLost, false);
        }}
        onError={() => {
          if (onWebGLError) onWebGLError();
        }}
      >
        <HeroNetworkScene reducedMotion={reducedMotion} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}

