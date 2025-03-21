import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Process from './components/Process';
import AppShowcase from './components/AppShowcase';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import BackgroundElements from './components/BackgroundElements';
import ParticleSystem from './components/ParticleSystem';
import AnimatedCursor from './components/AnimatedCursor';
import LottieLoader from './components/LottieLoader';

gsap.registerPlugin(ScrollTrigger);

// Theme
const theme = {
  colors: {
    primary: '#7B2CBF',
    primaryLight: '#9D4EDD',
    primaryDark: '#5A189A',
    secondary: '#3A0CA3',
    tertiary: '#4CC9F0',
    accent: '#F72585',
    accentLight: '#FF70A8',
    light: '#F8F9FA',
    dark: '#0A0A13',
    surface: '#121222',
    card: 'rgba(30, 30, 60, 0.8)',
  },
  gradients: {
    main: 'linear-gradient(135deg, #7B2CBF, #3A0CA3)',
    accent: 'linear-gradient(135deg, #F72585, #9D4EDD)',
    button: 'linear-gradient(45deg, #F72585, #9D4EDD)',
  },
  shadows: {
    soft: '0 10px 30px rgba(0, 0, 0, 0.15)',
    strong: '0 15px 40px rgba(0, 0, 0, 0.25)',
    glow: '0 0 20px rgba(123, 44, 191, 0.4)',
  },
  borderRadius: '16px',
  transitions: {
    fast: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    bounce: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  fonts: {
    primary: "'Outfit', sans-serif",
    secondary: "'Poppins', sans-serif",
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  }
};

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${props => props.theme.fonts.primary};
  }
  
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px;
  }
  
  body {
    background-color: ${props => props.theme.colors.dark};
    color: ${props => props.theme.colors.light};
    line-height: 1.6;
    overflow-x: hidden;
    position: relative;
  }

  h1, h2, h3, h4 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 20px;
  }
  
  h1 {
    font-size: 4rem;
    background: ${props => props.theme.gradients.accent};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 30px;
    font-weight: 800;
    letter-spacing: -1px;
    
    @media (max-width: ${props => props.theme.breakpoints.lg}) {
      font-size: 3rem;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: 2.5rem;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 2rem;
    }
  }
  
  h2 {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 50px;
    position: relative;
    background: ${props => props.theme.gradients.main};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: 700;
    
    &::after {
      content: '';
      display: block;
      width: 80px;
      height: 4px;
      background: ${props => props.theme.gradients.accent};
      margin: 15px auto 0;
      border-radius: 2px;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.lg}) {
      font-size: 2.5rem;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: 2rem;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 1.8rem;
    }
  }
  
  h3 {
    font-size: 1.75rem;
    margin-bottom: 20px;
    color: ${props => props.theme.colors.light};
  }
  
  p {
    margin-bottom: 20px;
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.8;
  }
  
  section {
    padding: 120px 0;
    position: relative;
    overflow: hidden;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      padding: 80px 0;
    }
  }
  
  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }
`;

const StyledApp = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
`;

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const appRef = useRef(null);
  
  // Handle cursor movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AnimatePresence>
        {isLoading ? (
          <LottieLoader />
        ) : (
          <StyledApp ref={appRef}>
            <BackgroundElements />
            <ParticleSystem />
            <AnimatedCursor position={cursorPosition} />
            
            <Header />
            <Hero />
            <Features />
            <Process />
            <AppShowcase />
            <Pricing />
            <Testimonials />
            <CTA />
            <Footer />
          </StyledApp>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;