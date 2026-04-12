// ⚠ CRITICAL: Dynamic import with ssr:false prevents hydration errors
// "Data read, but end of buffer not reached" is caused by SSR + WebGL

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Spline = dynamic(() => import('@splinetool/react-spline/next'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#050505]">
      {/* Skeleton shimmer while 3D loads */}
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-transparent via-[rgba(0,194,255,0.03)] to-transparent" />
    </div>
  ),
})

export function SplineBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Suspense fallback={null}>
        <Spline
          scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
          className="w-full h-full opacity-60"
          // Recommended: a dark abstract particle/orb scene
          // from spline.design marketplace tagged "dark ambient"
        />
      </Suspense>
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/70 via-transparent to-[#050505]/70" />
    </div>
  )
}