import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const ParticlesContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
`;

function ParticleSystem() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const colors = [
      'rgba(123, 44, 191, 0.5)',
      'rgba(247, 37, 133, 0.5)',
      'rgba(58, 12, 163, 0.5)',
      'rgba(76, 201, 240, 0.5)'
    ];
    
    // Create particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      
      // Random properties
      const size = Math.random() * 10 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const duration = Math.random() * 40 + 10;
      const delay = Math.random() * 5;
      
      // Apply styles
      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.borderRadius = '50%';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.opacity = '0.5';
      
      // Animate with GSAP
      gsap.to(particle, {
        y: `${Math.random() * 100 - 50}%`,
        x: `${Math.random() * 100 - 50}%`,
        duration: duration,
        delay: delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      containerRef.current.appendChild(particle);
    }
    
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);
  
  return <ParticlesContainer ref={containerRef} />;
}

export default ParticleSystem;
