import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import React, { Suspense } from 'react'
import { Scene } from './Scene'

export const Hero = () => {
    return (
        <Canvas>
          <ambientLight />
          <directionalLight color="red" intensity={10} />
          <Suspense fallback={null}>
            <Scene />
            <EffectComposer>
              <Bloom intensity={5} luminanceThreshold={0} luminanceSmoothing={0} height={1000} />
            </EffectComposer>
          </Suspense>
        </Canvas>
    )
}