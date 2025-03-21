import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const HeroSection = styled.section`
  padding-top: 180px;
  padding-bottom: 100px;
  overflow: hidden;
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239D4EDD' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    z-index: -1;
    opacity: 0.5;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-top: 130px;
  }
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const HeroText = styled.div`
  position: relative;
  z-index: 1;
`;

const HeroTagline = styled(motion.div)`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.light};
  padding: 8px 16px;
  border-radius: 30px;
  display: inline-block;
  margin-bottom: 25px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.85rem;
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
    animation: shimmer 3s infinite;
  }
  
  @keyframes shimmer {
    100% {
      left: 100%;
    }
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 20px;
  line-height: 1.1;
  
  span {
    display: block;
    color: ${props => props.theme.colors.light};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 3rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
  max-width: 500px;
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 20px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const HeroButton = styled(motion.a)`
  display: inline-block;
  padding: 16px 32px;
  background: ${props => props.primary ? props.theme.gradients.button : 'transparent'};
  color: white;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius};
  font-weight: 600;
  transition: ${props => props.theme.transitions.bounce};
  border: ${props => props.primary ? 'none' : `2px solid ${props.theme.colors.primaryLight}`};
  cursor: pointer;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.primary ? props.theme.shadows.soft : 'none'};
  text-transform: uppercase;
  letter-spacing: 1px;
  z-index: 1;
  
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
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.primary ? props.theme.shadows.glow : '0 0 15px rgba(123, 44, 191, 0.3)'};
    background: ${props => props.primary ? props.theme.gradients.button : 'rgba(123, 44, 191, 0.1)'};
    color: ${props => props.primary ? 'white' : props.theme.colors.primaryLight};
  }
`;

const HeroAnimationContainer = styled.div`
  position: relative;
  z-index: 1;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    order: -1;
  }
`;

const HeroAnimation = styled.div`
  width: 100%;
  height: 500px;
  border-radius: ${props => props.theme.borderRadius};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.strong};
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(123, 44, 191, 0.2), rgba(76, 201, 240, 0.1));
    z-index: 1;
    pointer-events: none;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    height: 400px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 350px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    height: 300px;
  }
`;

const HeroPhone = styled.div`
  position: absolute;
  width: 300px;
  height: 600px;
  background: ${props => props.theme.colors.dark};
  border-radius: 40px;
  border: 8px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.strong};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 250px;
    height: 500px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 200px;
    height: 400px;
  }
`;

const PhoneScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PhoneContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PhoneHeader = styled.div`
  height: 60px;
  background: ${props => props.theme.colors.primaryDark};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const PhoneTitle = styled.div`
  color: white;
  font-weight: 600;
`;

const PhoneBody = styled.div`
  flex: 1;
  padding: 20px;
  background: ${props => props.theme.colors.surface};
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow: hidden;
`;

const PhoneCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const PhoneMetric = styled.div`
  margin-top: 5px;
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  overflow: hidden;
`;

const PhoneMetricValue = styled.div`
  height: 100%;
  background: ${props => props.theme.colors.primaryLight};
  width: 0%;
`;

const PhoneCircleGraph = styled.div`
  width: 100px;
  height: 100px;
  margin: 10px auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PhoneCircleBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
`;

const PhoneCircleValue = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  clip: rect(0px, 100px, 100px, 50px);
  background: conic-gradient(
    ${props => props.theme.colors.accent} 0%, 
    ${props => props.theme.colors.primaryLight} 100%
  );
  transform: rotate(0deg);
`;

const PhoneCircleCenter = styled.div`
  position: absolute;
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background: ${props => props.theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.5rem;
`;

const PhoneTaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PhoneTask = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PhoneTaskCheckbox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PhoneTaskText = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 15px;
  color: white;
`;

const FloatingElement1 = styled(FloatingElement)`
  top: 20%;
  left: -50px;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  .icon {
    font-size: 2rem;
    margin-bottom: 10px;
    color: ${props => props.theme.colors.accent};
  }
`;

const FloatingElement2 = styled(FloatingElement)`
  bottom: 15%;
  right: -30px;
  width: 150px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  .bar {
    height: 8px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    margin-bottom: 8px;
    overflow: hidden;
  }
  
  .bar-fill {
    height: 100%;
    width: 0;
    background: ${props => props.theme.colors.primaryLight};
  }
`;

function Hero() {
  const heroAnimationRef = useRef(null);
  const circleValueRef = useRef(null);
  const circleCenterRef = useRef(null);
  const sleepMetricRef = useRef(null);
  const habitDaysRef = useRef(null);
  const floatingElement1Ref = useRef(null);
  const floatingElement2Ref = useRef(null);
  const moodBar1Ref = useRef(null);
  const moodBar2Ref = useRef(null);
  const moodBar3Ref = useRef(null);
  
  // Hero section animations
  useEffect(() => {
    // Hero phone animation
    const tlHero = gsap.timeline({ repeat: -1 });
    
    // First animate the circle
    tlHero.to(circleValueRef.current, {
      duration: 2,
      rotation: 360,
      ease: "power2.inOut"
    });
    
    // Then animate the percentage
    tlHero.to(circleCenterRef.current, {
      duration: 1.5,
      innerHTML: "87%",
      snap: { innerHTML: 1 },
      ease: "power2.out"
    }, "<");
    
    // Animate sleep metric
    tlHero.to(sleepMetricRef.current, {
      duration: 2,
      width: "78%",
      backgroundColor: "var(--primary-light)",
      ease: "elastic.out(1, 0.3)"
    }, "<0.5");
    
    // Animate habit days
    tlHero.to(habitDaysRef.current.querySelectorAll('.phone-habit-day'), {
      duration: 0.4,
      backgroundColor: "#9D4EDD",
      color: "white",
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "<0.2");
    
    // Animate floating elements
    gsap.to(floatingElement1Ref.current, {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    gsap.to(floatingElement2Ref.current, {
      y: 20,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    // Animate mood bars
    tlHero.to(moodBar1Ref.current, {
      width: "70%",
      duration: 1,
      ease: "power2.out"
    }, "<0.2");
    
    tlHero.to(moodBar2Ref.current, {
      width: "85%",
      duration: 1,
      ease: "power2.out"
    }, "<0.1");
    
    tlHero.to(moodBar3Ref.current, {
      width: "60%",
      duration: 1,
      ease: "power2.out"
    }, "<0.1");
    
    // 3D tilt effect on hero phone
    if (heroAnimationRef.current) {
      const handleMouseMove = (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        gsap.to(heroAnimationRef.current.querySelector('.hero-phone'), {
          rotationY: xAxis,
          rotationX: yAxis,
          ease: "power2.out",
          duration: 0.3
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(heroAnimationRef.current.querySelector('.hero-phone'), {
          rotationY: 0,
          rotationX: 0,
          ease: "power2.out",
          duration: 0.5
        });
      };
      
      heroAnimationRef.current.addEventListener('mousemove', handleMouseMove);
      heroAnimationRef.current.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        if (heroAnimationRef.current) {
          heroAnimationRef.current.removeEventListener('mousemove', handleMouseMove);
          heroAnimationRef.current.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }
  }, []);
  
  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut" // FIXED: Using named easing instead of cubic-bezier
      }
    }
  };
  
  // Button animation variants
  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut" // FIXED: Using named easing
      }
    },
    hover: { 
      y: -5,
      boxShadow: '0 0 20px rgba(123, 44, 191, 0.4)',
      transition: { 
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    }
  };
  
  // Animation container variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 1.2,
        ease: "easeOut", // FIXED: Using named easing
        delay: 0.2
      }
    }
  };
  
  // Floating elements variants
  const floatingVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut" // FIXED: Using named easing
      }
    }
  };
  
  return (
    <HeroSection id="home">
      <div className="container">
        <HeroContent>
          <HeroText>
            <HeroTagline
              initial={{ opacity: 0, x: -30 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  duration: 0.8,
                  ease: "easeOut" // FIXED: Using named easing
                }
              }}
            >
              AI-Powered Wellness Companion
            </HeroTagline>
            
            <HeroTitle
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              Transform Your <span>Daily Wellness</span> Journey
            </HeroTitle>
            
            <HeroDescription
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              Track habits, manage tasks, monitor mood and sleep patterns all in one beautiful app designed for mindful living and personal growth.
            </HeroDescription>
            
            <HeroButtons
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              <HeroButton 
                href="#"
                primary
                variants={buttonVariants}
                whileHover="hover"
              >
                Start Your Journey
              </HeroButton>
              <HeroButton 
                href="#"
                variants={buttonVariants}
                whileHover="hover"
              >
                Watch Demo
              </HeroButton>
            </HeroButtons>
          </HeroText>
          
          <HeroAnimationContainer>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <HeroAnimation ref={heroAnimationRef}>
                <HeroPhone className="hero-phone">
                  <PhoneScreen>
                    <PhoneContent>
                      <PhoneHeader>
                        <i className="fas fa-bars"></i>
                        <PhoneTitle>Dashboard</PhoneTitle>
                        <i className="fas fa-bell"></i>
                      </PhoneHeader>
                      <PhoneBody>
                        <PhoneCard>
                          <h4>Wellness Score</h4>
                          <PhoneCircleGraph>
                            <PhoneCircleBg></PhoneCircleBg>
                            <PhoneCircleValue ref={circleValueRef}></PhoneCircleValue>
                            <PhoneCircleCenter ref={circleCenterRef}>0%</PhoneCircleCenter>
                          </PhoneCircleGraph>
                        </PhoneCard>
                        <PhoneCard>
                          <h4>Today's Tasks</h4>
                          <PhoneTaskList>
                            <PhoneTask>
                              <PhoneTaskCheckbox></PhoneTaskCheckbox>
                              <PhoneTaskText>Morning Meditation</PhoneTaskText>
                            </PhoneTask>
                            <PhoneTask>
                              <PhoneTaskCheckbox></PhoneTaskCheckbox>
                              <PhoneTaskText>Drink 2L water</PhoneTaskText>
                            </PhoneTask>
                            <PhoneTask>
                              <PhoneTaskCheckbox></PhoneTaskCheckbox>
                              <PhoneTaskText>Evening walk</PhoneTaskText>
                            </PhoneTask>
                          </PhoneTaskList>
                        </PhoneCard>
                        <PhoneCard>
                          <h4>Sleep Quality</h4>
                          <PhoneMetric>
                            <PhoneMetricValue ref={sleepMetricRef}></PhoneMetricValue>
                          </PhoneMetric>
                        </PhoneCard>
                        <PhoneCard>
                          <h4>Habit Streak: Running</h4>
                          <div ref={habitDaysRef} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                              <div 
                                key={index} 
                                className="phone-habit-day"
                                style={{
                                  width: '30px',
                                  height: '30px',
                                  borderRadius: '50%',
                                  background: 'rgba(255, 255, 255, 0.1)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  color: 'rgba(255, 255, 255, 0.8)'
                                }}
                              >
                                {day}
                              </div>
                            ))}
                          </div>
                        </PhoneCard>
                      </PhoneBody>
                    </PhoneContent>
                  </PhoneScreen>
                </HeroPhone>
                <FloatingElements>
                  <FloatingElement1 
                    ref={floatingElement1Ref}
                    variants={floatingVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <i className="fas fa-moon icon"></i>
                    <span>8.2h</span>
                  </FloatingElement1>
                  <FloatingElement2 
                    ref={floatingElement2Ref}
                    variants={floatingVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <div className="bar">
                      <div className="bar-fill" ref={moodBar1Ref}></div>
                    </div>
                    <div className="bar">
                      <div className="bar-fill" ref={moodBar2Ref}></div>
                    </div>
                    <div className="bar">
                      <div className="bar-fill" ref={moodBar3Ref}></div>
                    </div>
                  </FloatingElement2>
                </FloatingElements>
              </HeroAnimation>
            </motion.div>
          </HeroAnimationContainer>
        </HeroContent>
      </div>
    </HeroSection>
  );
}

export default Hero;
