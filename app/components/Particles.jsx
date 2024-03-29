import { Point, Points } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import React from 'react'

const particleColors = ['#d879a6', '#5b66a3', 'cfcb6c',]

export const Particles = ({ size=500 }) => {
    const { width, height } = useThree((state) => state.viewport)

    return (
      <Points limit={size}>
        <pointsMaterial size={0.05} vertexColors />
        {Array.from({ length: size }).map((_, i) => (
          <Point
            key={i}
            position={[(0.5 - Math.random()) * width * 2, 0.5 * height + Math.random() ** 0.25 * height * -3, (0.5 - Math.random()) * 25]}
            color={particleColors[Math.floor(Math.random() * (particleColors.length - 1))]}
          />
        ))}
      </Points>
    ) 
}