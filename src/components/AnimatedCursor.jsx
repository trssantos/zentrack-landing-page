import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Cursor = styled(motion.div)`
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.colors.accent};
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`;

const CursorDot = styled(motion.div)`
  position: fixed;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.accent};
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`;

function AnimatedCursor({ position }) {
  return (
    <>
      <Cursor
        animate={{
          x: position.x - 20,
          y: position.y - 20,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          mass: 0.5,
          stiffness: 200,
        }}
      />
      <CursorDot
        animate={{
          x: position.x - 4,
          y: position.y - 4,
        }}
        transition={{
          type: 'spring',
          damping: 10,
          mass: 0.2,
          stiffness: 300,
        }}
      />
    </>
  );
}

export default AnimatedCursor;
