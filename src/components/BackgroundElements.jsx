import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
`;

const BackgroundGradient = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    ${props => props.angle}deg,
    ${props => props.theme.colors.dark} 0%,
    ${props => props.theme.colors.primaryDark} 50%,
    ${props => props.theme.colors.dark} 100%
  );
  opacity: 0.5;
`;

const Blob = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.4;
  background: ${props => props.color};
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

const Grid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.4;
`;

function BackgroundElements() {
  const backgroundRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);
  
  // Initialize animations with GSAP
  useEffect(() => {
    // Animate background gradient
    gsap.to(backgroundRef.current, {
      '--angle': 360,
      duration: 60,
      repeat: -1,
      ease: 'none',
    });
    
    // Animate blobs
    gsap.to(blob1Ref.current, {
      x: 100,
      y: 100,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    gsap.to(blob2Ref.current, {
      x: -100, 
      y: -50,
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    gsap.to(blob3Ref.current, {
      x: 50,
      y: -80,
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);
  
  return (
    <Background ref={backgroundRef}>
      <BackgroundGradient
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.5, ease: "easeOut" }} // FIXED: Using named easing
        style={{ '--angle': 0 }}
      />
      <Blob 
        ref={blob1Ref}
        color="#7B2CBF" 
        size={500} 
        initial={{ x: -250, y: -250, opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, ease: "easeOut" }} // FIXED: Using named easing
      />
      <Blob 
        ref={blob2Ref}
        color="#F72585" 
        size={600}
        initial={{ x: window.innerWidth - 300, y: window.innerHeight - 300, opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, delay: 0.3, ease: "easeOut" }} // FIXED: Using named easing
      />
      <Blob 
        ref={blob3Ref}
        color="#4CC9F0" 
        size={300}
        initial={{ x: window.innerWidth / 2, y: window.innerHeight / 2, opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, delay: 0.6, ease: "easeOut" }} // FIXED: Using named easing
      />
      <Grid />
    </Background>
  );
}

export default BackgroundElements;
