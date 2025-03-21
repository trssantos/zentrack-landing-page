
// CTA.jsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const CTASection = styled.section`
  background: linear-gradient(to right, ${props => props.theme.colors.primaryDark}, ${props => props.theme.colors.secondary});
  position: relative;
  overflow: hidden;
  padding: 120px 0;
  text-align: center;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239D4EDD' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 100px 0;
  }
`;

const CTAGlow = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  
  &.glow-1 {
    width: 300px;
    height: 300px;
    background-color: ${props => props.theme.colors.accent};
    opacity: 0.3;
    top: -50px;
    left: -50px;
  }
  
  &.glow-2 {
    width: 400px;
    height: 400px;
    background-color: ${props => props.theme.colors.tertiary};
    opacity: 0.2;
    bottom: -100px;
    right: -100px;
  }
`;

const CTAContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
`;

const CTATitle = styled(motion.h2)`
  font-size: 3rem;
  color: white;
  margin-bottom: 20px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const CTADescription = styled(motion.p)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
`;

const CTAButton = styled(motion.a)`
  display: inline-block;
  padding: 15px 40px;
  background: white;
  color: ${props => props.theme.colors.primaryDark};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius};
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: all 0.6s;
    z-index: -1;
  }
  
  &:hover {
    color: ${props => props.theme.colors.accent};
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
  
  &:hover::before {
    left: 100%;
  }
`;

function CTA() {
  const glow1Ref = useRef(null);
  const glow2Ref = useRef(null);
  
  useEffect(() => {
    // Animate glowing blobs
    gsap.to(glow1Ref.current, {
      x: 100,
      y: 50,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    gsap.to(glow2Ref.current, {
      x: -100,
      y: -50,
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);
  
  return (
    <CTASection id="cta">
      <CTAGlow className="glow-1" ref={glow1Ref} />
      <CTAGlow className="glow-2" ref={glow2Ref} />
      
      <CTAContent>
      <CTATitle
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: "easeOut" }} // FIXED
>
          Start Your Wellness Journey Today
        </CTATitle>
        
        <CTADescription
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} // FIXED
>
          Join thousands of users who have transformed their daily habits and improved their quality of life with our comprehensive wellness tracking tools.
        </CTADescription>
        
        <CTAButton
  href="#"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }} // FIXED
  whileHover={{ 
    y: -5,
    transition: { 
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  }}
>
          Download Now
        </CTAButton>
      </CTAContent>
    </CTASection>
  );
}

export default CTA;

