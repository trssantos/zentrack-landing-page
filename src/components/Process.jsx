import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';

const ProcessSection = styled.section`
  background-color: ${props => props.theme.colors.dark};
  position: relative;
  padding-top: 150px;
  padding-bottom: 150px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-top: 100px;
    padding-bottom: 100px;
  }
`;

const ProcessContainer = styled.div`
  position: relative;
`;

const ProcessFlowline = styled(motion.div)`
  position: absolute;
  top: 120px;
  left: 50%;
  width: 4px;
  height: 0;
  background: linear-gradient(180deg, ${props => props.theme.colors.primaryLight} 0%, ${props => props.theme.colors.accent} 100%);
  transform: translateX(-50%);
  z-index: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }
`;

const ProcessSteps = styled.div`
  position: relative;
  z-index: 1;
`;

const ProcessStep = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
  margin-bottom: 100px;
  position: relative;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:nth-child(even) {
    grid-template-columns: 1fr 1fr;
    direction: rtl;
    
    @media (max-width: ${props => props.theme.breakpoints.lg}) {
      direction: ltr;
    }
  }
  
  &:nth-child(even) .process-step-content {
    direction: ltr;
  }
  
  &:nth-child(even) .process-step-animation {
    direction: ltr;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ProcessStepContent = styled.div`
  padding: 40px;
  position: relative;
`;

const StepNumber = styled(motion.div)`
  font-size: 6rem;
  font-weight: 800;
  background: ${props => props.theme.gradients.accent};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0.8;
  line-height: 1;
  margin-bottom: 20px;
  display: inline-block;
`;

const ProcessStepTitle = styled(motion.h3)`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const ProcessStepDescription = styled(motion.p)`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
`;

const ProcessStepAnimation = styled(motion.div)`
  height: 400px;
  border-radius: ${props => props.theme.borderRadius};
  overflow: hidden;
  position: relative;
  box-shadow: ${props => props.theme.shadows.strong};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 350px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    height: 300px;
  }
`;

const StepAnimationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.colors.surface};
  overflow: hidden;
`;

function Process() {
  const flowlineControls = useAnimation();
  const [flowlineRef, flowlineInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  // Step animation refs
  const step1AnimationRef = useRef(null);
  const step2AnimationRef = useRef(null);
  const step3AnimationRef = useRef(null);
  
  // Step content refs for each step
  const step1ContentRefs = [useRef(null), useRef(null), useRef(null)];
  const step2ContentRefs = [useRef(null), useRef(null), useRef(null)];
  const step3ContentRefs = [useRef(null), useRef(null), useRef(null)];
  
  // Step animation controls
  const [step1Ref, step1InView] = useInView({ threshold: 0.5, triggerOnce: true });
  const [step2Ref, step2InView] = useInView({ threshold: 0.5, triggerOnce: true });
  const [step3Ref, step3InView] = useInView({ threshold: 0.5, triggerOnce: true });
  
  // Animate flowline when in view
  useEffect(() => {
    if (flowlineInView) {
      flowlineControls.start({
        height: 'calc(100% - 240px)',
        transition: { duration: 1.5, ease: 'easeInOut' }
      });
    }
  }, [flowlineControls, flowlineInView]);
  
  // Step 1 Animation - Goal Setting
  useEffect(() => {
    if (step1InView && step1AnimationRef.current) {
      // Set up goal circles animation
      gsap.to(step1AnimationRef.current.querySelectorAll('.goal-progress'), {
        duration: 1.5,
        backgroundImage: (i) => {
          const percentages = [75, 60, 45];
          return `conic-gradient(var(--accent) 0%, var(--accent) ${percentages[i]}%, transparent ${percentages[i]}%)`;
        },
        stagger: 0.2,
        ease: "power2.inOut"
      });
      
      // Animate slider
      gsap.to(step1AnimationRef.current.querySelector('.goal-slider-handle'), {
        left: "70%",
        duration: 1.5,
        ease: "power2.inOut"
      });
      
      gsap.to(step1AnimationRef.current.querySelector('.goal-slider-progress'), {
        width: "70%",
        duration: 1.5,
        ease: "power2.inOut"
      });
    }
  }, [step1InView]);
  
  // Step 2 Animation - Tracking
  useEffect(() => {
    if (step2InView && step2AnimationRef.current) {
      // Animate calendar days
      gsap.from(step2AnimationRef.current.querySelectorAll('.tracking-day'), {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: {
          grid: [4, 7],
          from: "start",
          amount: 1
        },
        ease: "back.out(1.7)"
      });
      
      gsap.to(step2AnimationRef.current.querySelectorAll('.tracking-day.tracked .tracking-day-indicator'), {
        backgroundColor: "#F72585",
        duration: 0.3,
        stagger: {
          grid: [4, 7],
          from: "random",
          amount: 0.8
        },
        delay: 0.5
      });
    }
  }, [step2InView]);
  
  // Step 3 Animation - Insights
  useEffect(() => {
    if (step3InView && step3AnimationRef.current) {
      // Animate chart bars
      gsap.to(step3AnimationRef.current.querySelectorAll('.chart-bar'), {
        height: function(index) {
          const heights = [70, 45, 90, 60, 85, 50, 75];
          return `${heights[index]}%`;
        },
        duration: 1.5,
        stagger: 0.1,
        ease: "elastic.out(1, 0.3)"
      });
      
      // Animate insights summary
      gsap.from(step3AnimationRef.current.querySelector('.insights-summary'), {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "back.out(1.7)"
      });
    }
  }, [step3InView]);
  
  // Content animation variants
  const contentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" // FIXED: Using named easing
      }
    }
  };
  
  const reverseContentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" // FIXED: Using named easing
      }
    }
  };
  
  const animationVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut" // FIXED: Using named easing
      }
    }
  };
  
  return (
    <ProcessSection id="process">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }} // FIXED: Using named easing
        >
          Your Wellness Journey
        </motion.h2>
        
        <ProcessContainer>
          <ProcessFlowline
            ref={flowlineRef}
            initial={{ height: 0 }}
            animate={flowlineControls}
          />
          
          <ProcessSteps>
            {/* Step 1 */}
            <ProcessStep ref={step1Ref}>
              <ProcessStepContent className="process-step-content">
                <StepNumber
                  ref={step1ContentRefs[0]}
                  initial="hidden"
                  animate={step1InView ? "visible" : "hidden"}
                  variants={contentVariants}
                >
                  01
                </StepNumber>
                <ProcessStepTitle
                  ref={step1ContentRefs[1]}
                  initial="hidden"
                  animate={step1InView ? "visible" : "hidden"}
                  variants={contentVariants}
                >
                  Set Your Intentions
                </ProcessStepTitle>
                <ProcessStepDescription
                  ref={step1ContentRefs[2]}
                  initial="hidden"
                  animate={step1InView ? "visible" : "hidden"}
                  variants={contentVariants}
                >
                  Define what matters to you. Whether it's improving sleep, managing stress, or building new habits, Zenflow helps you set achievable goals tailored to your lifestyle and aspirations.
                </ProcessStepDescription>
              </ProcessStepContent>
              
              <ProcessStepAnimation
                className="process-step-animation"
                initial="hidden"
                animate={step1InView ? "visible" : "hidden"}
                variants={animationVariants}
              >
                <StepAnimationContainer ref={step1AnimationRef}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '40px',
                    height: '100%'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '30px',
                      marginBottom: '40px'
                    }}>
                      {[
                        { icon: 'fas fa-running', text: 'Fitness' },
                        { icon: 'fas fa-book', text: 'Learning' },
                        { icon: 'fas fa-heart', text: 'Mental' }
                      ].map((goal, index) => (
                        <div key={index} style={{
                          width: '100px',
                          height: '100px',
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.1)',
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column'
                        }}>
                          <div className="goal-progress" style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            opacity: 0.8
                          }}></div>
                          <i className={goal.icon} style={{
                            fontSize: '2rem',
                            marginBottom: '10px',
                            zIndex: 1
                          }}></i>
                          <span style={{
                            fontSize: '0.9rem',
                            color: 'rgba(255, 255, 255, 0.8)',
                            zIndex: 1
                          }}>{goal.text}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="goal-slider" style={{
                      width: '100%',
                      height: '10px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '5px',
                      marginBottom: '20px',
                      position: 'relative'
                    }}>
                      <div className="goal-slider-progress" style={{
                        height: '100%',
                        width: '0%',
                        background: 'linear-gradient(to right, #F72585, #9D4EDD)',
                        borderRadius: '5px'
                      }}></div>
                      <div className="goal-slider-handle" style={{
                        position: 'absolute',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: '#F72585',
                        top: '50%',
                        left: '0%',
                        transform: 'translate(-50%, -50%)',
                        cursor: 'pointer'
                      }}></div>
                    </div>
                  </div>
                </StepAnimationContainer>
              </ProcessStepAnimation>
            </ProcessStep>
            
            {/* Step 2 */}
            <ProcessStep ref={step2Ref}>
              <ProcessStepContent className="process-step-content">
                <StepNumber
                  ref={step2ContentRefs[0]}
                  initial="hidden"
                  animate={step2InView ? "visible" : "hidden"}
                  variants={reverseContentVariants}
                >
                  02
                </StepNumber>
                <ProcessStepTitle
                  ref={step2ContentRefs[1]}
                  initial="hidden"
                  animate={step2InView ? "visible" : "hidden"}
                  variants={reverseContentVariants}
                >
                  Track With Ease
                </ProcessStepTitle>
                <ProcessStepDescription
                  ref={step2ContentRefs[2]}
                  initial="hidden"
                  animate={step2InView ? "visible" : "hidden"}
                  variants={reverseContentVariants}
                >
                  Our intuitive, beautifully designed tracking tools make monitoring tasks, habits, mood, and sleep effortless. Simple check-ins take seconds but provide powerful insights over time.
                </ProcessStepDescription>
              </ProcessStepContent>
              
              <ProcessStepAnimation
                className="process-step-animation"
                initial="hidden"
                animate={step2InView ? "visible" : "hidden"}
                variants={animationVariants}
              >
                <StepAnimationContainer ref={step2AnimationRef}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    padding: '20px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '20px'
                    }}>
                      <div style={{
                        fontSize: '1.5rem',
                        fontWeight: 600
                      }}>March 2025</div>
                      <div style={{
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}>Daily Tracking</div>
                    </div>
                    
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(7, 1fr)',
                      gap: '10px'
                    }}>
                      {Array(28).fill().map((_, i) => {
                        const isTracked = Math.random() > 0.3;
                        return (
                          <div key={i} className={`tracking-day ${isTracked ? 'tracked' : ''}`} style={{
                            aspectRatio: '1',
                            borderRadius: '10px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '5px'
                          }}>
                            <div style={{
                              fontWeight: 600,
                              fontSize: '1.2rem'
                            }}>{i + 1}</div>
                            <div className="tracking-day-indicator" style={{
                              width: '10px',
                              height: '10px',
                              borderRadius: '50%',
                              marginTop: '5px'
                            }}></div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '15px',
                      marginTop: '30px'
                    }}>
                      {[
                        { title: 'Sleep Avg', value: '7.8h' },
                        { title: 'Mood Avg', value: '8.2/10' },
                        { title: 'Tasks', value: '87%' },
                        { title: 'Consistency', value: '92%' }
                      ].map((metric, index) => (
                        <div key={index} style={{
                          flex: 1,
                          minWidth: '150px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '15px',
                          padding: '15px'
                        }}>
                          <div style={{
                            fontSize: '0.9rem',
                            color: 'rgba(255, 255, 255, 0.7)',
                            marginBottom: '5px'
                          }}>{metric.title}</div>
                          <div style={{
                            fontSize: '1.5rem',
                            fontWeight: 600
                          }}>{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </StepAnimationContainer>
              </ProcessStepAnimation>
            </ProcessStep>
            
            {/* Step 3 */}
            <ProcessStep ref={step3Ref}>
              <ProcessStepContent className="process-step-content">
                <StepNumber
                  ref={step3ContentRefs[0]}
                  initial="hidden"
                  animate={step3InView ? "visible" : "hidden"}
                  variants={contentVariants}
                >
                  03
                </StepNumber>
                <ProcessStepTitle
                  ref={step3ContentRefs[1]}
                  initial="hidden"
                  animate={step3InView ? "visible" : "hidden"}
                  variants={contentVariants}
                >
                  Discover Patterns
                </ProcessStepTitle>
                <ProcessStepDescription
                  ref={step3ContentRefs[2]}
                  initial="hidden"
                  animate={step3InView ? "visible" : "hidden"}
                  variants={contentVariants}
                >
                  Our AI-powered analytics dashboard reveals the connections between your activities, habits, mood, and sleep quality, helping you make informed decisions about your wellness routine.
                </ProcessStepDescription>
              </ProcessStepContent>
              
              <ProcessStepAnimation
                className="process-step-animation"
                initial="hidden"
                animate={step3InView ? "visible" : "hidden"}
                variants={animationVariants}
              >
                <StepAnimationContainer ref={step3AnimationRef}>
                  <div style={{
                    padding: '30px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{ marginBottom: '30px' }}>
                      <div style={{
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        marginBottom: '5px'
                      }}>Sleep and Mood Correlation</div>
                      <div style={{
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}>Last 30 days analysis</div>
                    </div>
                    
                    <div style={{
                      height: '250px',
                      position: 'relative',
                      marginBottom: '20px'
                    }}>
                      {['top', 'middle', 'bottom'].map(pos => (
                        <div key={pos} style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          height: '1px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          top: pos === 'top' ? 0 : pos === 'middle' ? '50%' : 'auto',
                          bottom: pos === 'bottom' ? 0 : 'auto'
                        }}></div>
                      ))}
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        height: '100%',
                        position: 'relative',
                        zIndex: 1,
                        paddingTop: '10px',
                        paddingBottom: '30px'
                      }}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                          <div key={index} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            height: '100%',
                            width: '40px'
                          }}>
                            <div className="chart-bar" style={{
                              width: '100%',
                              height: '0%',
                              borderRadius: '8px 8px 0 0',
                              background: 'linear-gradient(to top, #F72585, #9D4EDD)'
                            }}></div>
                            <div style={{
                              marginTop: '10px',
                              fontSize: '0.8rem',
                              color: 'rgba(255, 255, 255, 0.7)'
                            }}>{day}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="insights-summary" style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '15px',
                      padding: '20px'
                    }}>
                      <div style={{
                        fontWeight: 600,
                        marginBottom: '10px'
                      }}>AI Insights</div>
                      <div style={{
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.8)'
                      }}>Your mood tends to be 27% higher on days following 8+ hours of sleep. We recommend maintaining a consistent sleep schedule between 10:30 PM and 6:30 AM for optimal wellbeing.</div>
                    </div>
                  </div>
                </StepAnimationContainer>
              </ProcessStepAnimation>
            </ProcessStep>
          </ProcessSteps>
        </ProcessContainer>
      </div>
    </ProcessSection>
  );
}

export default Process;