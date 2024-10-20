"use client"

import React, { useEffect, useRef } from 'react'

export default function EcoBackground() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const animateLeaves = () => {
      const leaves = svg.querySelectorAll('.leaf')
      leaves.forEach((leaf) => {
        const randomDelay = Math.random() * 5
        const randomDuration = 3 + Math.random() * 2
        leaf.animate(
          [
            { transform: 'translateY(0) rotate(0deg)' },
            { transform: 'translateY(-10px) rotate(5deg)' },
            { transform: 'translateY(0) rotate(0deg)' },
          ],
          {
            duration: randomDuration * 1000,
            delay: randomDelay * 1000,
            iterations: Infinity,
            easing: 'ease-in-out',
          }
        )
      })
    }

    animateLeaves()
  }, [])

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-gradient-to-b from-[#E8F5E9] to-[#C8E6C9]">
      <svg
        ref={svgRef}
        className="h-full w-full"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="leaf-group" fill="#4CAF50" opacity="0.2">
          {[...Array(20)].map((_, i) => (
            <path
              key={i}
              className="leaf"
              d="M0,50 Q50,0 100,50 Q50,100 0,50 Z"
              transform={`translate(${Math.random() * 1000}, ${
                Math.random() * 1000
              }) scale(${0.5 + Math.random() * 0.5}) rotate(${
                Math.random() * 360
              })`}
            />
          ))}
        </g>
        <circle cx="900" cy="100" r="60" fill="#FFF59D" opacity="0.6" />
        <path
          d="M50,950 Q250,900 450,950 T850,950"
          fill="none"
          stroke="#81C784"
          strokeWidth="5"
        />
      </svg>
    </div>
  )
}