import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: rgba(10, 10, 19, 0.8);
  transition: all 0.3s ease;
  
  &.scrolled {
    background: rgba(10, 10, 19, 0.95);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(motion.a)`
  font-size: 2rem;
  font-weight: 800;
  background: ${props => props.theme.gradients.accent};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-decoration: none;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
`;

const LogoIcon = styled(motion.div)`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.accent};
  background: rgba(247, 37, 133, 0.1);
  border-radius: 10px;
`;

const Nav = styled.nav`
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(10, 10, 19, 0.95);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 0 0 ${props => props.theme.borderRadius} ${props => props.theme.borderRadius};
    clip-path: ${props => props.isOpen ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)'};
    transition: clip-path 0.4s ease;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const NavItem = styled(motion.li)`
  margin-left: 35px;
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin: 15px 0;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: ${props => props.theme.colors.light};
  font-weight: 500;
  position: relative;
  padding: 5px 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.gradients.accent};
    transition: ${props => props.theme.transitions.fast};
    border-radius: 5px;
  }
  
  &:hover {
    color: ${props => props.theme.colors.primaryLight};
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const NavButton = styled(motion.a)`
  display: inline-block;
  padding: 12px 24px;
  background: ${props => props.theme.gradients.button};
  color: white;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius};
  font-weight: 600;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.soft};
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.6s;
    z-index: -1;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.light};
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }
`;

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const controls = useAnimation();
  const logoIconRef = useRef(null);
  
  // Logo animation with GSAP
  useEffect(() => {
    gsap.to(logoIconRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });
  }, []);
  
  // Check scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
        controls.start({ backgroundColor: 'rgba(10, 10, 19, 0.95)' });
      } else {
        setIsScrolled(false);
        controls.start({ backgroundColor: 'rgba(10, 10, 19, 0.8)' });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);
  
  // Navbar items animation
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: i => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut" // FIXED: Using named easing
      }
    })
  };
  
  // Button animation
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: '0 0 20px rgba(123, 44, 191, 0.4)',
      transition: { 
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };
  
  return (
    <HeaderContainer 
      className={isScrolled ? 'scrolled' : ''}
      animate={controls}
      initial={{ y: -100 }}
      transition={{ duration: 0.5, ease: "easeOut" }} // FIXED: Using named easing
    >
      <NavContainer>
        <Logo 
          href="#"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        >
          <LogoIcon ref={logoIconRef}>
            <i className="fas fa-leaf"></i>
          </LogoIcon>
          Zen<span>flow</span>
        </Logo>
        
        <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </MobileMenuButton>
        
        <Nav isOpen={isMenuOpen}>
          <NavList>
            <NavItem
              custom={0}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
            >
              <NavLink href="#features">Features</NavLink>
            </NavItem>
            <NavItem
              custom={1}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
            >
              <NavLink href="#process">How It Works</NavLink>
            </NavItem>
            <NavItem
              custom={2}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
            >
              <NavLink href="#showcase">App Showcase</NavLink>
            </NavItem>
            <NavItem
              custom={3}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
            >
              <NavLink href="#pricing">Pricing</NavLink>
            </NavItem>
            <NavItem
              custom={4}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
            >
              <NavButton
                href="#cta"
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                Get Started
              </NavButton>
            </NavItem>
          </NavList>
        </Nav>
      </NavContainer>
    </HeaderContainer>
  );
}

export default Header;
