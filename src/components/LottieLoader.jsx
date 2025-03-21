import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoaderWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.dark};
  z-index: 9999;
`;

const SpinnerWrapper = styled(motion.div)`
  width: 80px;
  height: 80px;
  position: relative;
`;

const Spinner = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 8px solid rgba(255, 255, 255, 0.1);
  border-top: 8px solid ${props => props.theme.colors.accent};
`;

const LoaderText = styled(motion.h2)`
  font-size: 2rem;
  margin-top: 20px;
  background: ${props => props.theme.gradients.accent};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

function LottieLoader() {
  return (
    <LoaderWrapper
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.5, ease: "easeOut" } // FIXED: Using named easing
      }}
    >
      <SpinnerWrapper
        initial={{ scale: 0.8 }}
        animate={{ 
          scale: [0.8, 1.2, 0.9, 1],
          transition: { 
            duration: 2,
            times: [0, 0.3, 0.6, 1],
            repeat: Infinity,
            ease: "easeInOut" // FIXED: Using named easing
          }
        }}
      >
        <Spinner
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </SpinnerWrapper>
      <LoaderText
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { delay: 0.5, ease: "easeOut" } // FIXED: Using named easing
        }}
      >
        Zenflow
      </LoaderText>
    </LoaderWrapper>
  );
}

export default LottieLoader;