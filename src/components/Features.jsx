import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';

const FeaturesSection = styled.section`
  position: relative;
  background-color: ${props => props.theme.colors.surface};
  padding-top: 150px;
  padding-bottom: 150px;
  
  &::before {
    content: '';
    position: absolute;
    top: -100px;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to bottom right, ${props => props.theme.colors.dark} 0%, ${props => props.theme.colors.dark} 50%, ${props => props.theme.colors.surface} 50%, ${props => props.theme.colors.surface} 100%);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -100px;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to top left, ${props => props.theme.colors.dark} 0%, ${props => props.theme.colors.dark} 50%, ${props => props.theme.colors.surface} 50%, ${props => props.theme.colors.surface} 100%);
    z-index: 1;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-top: 100px;
    padding-bottom: 100px;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
`;

const FeatureCard = styled(motion.div)`
  background: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius};
  padding: 40px 30px;
  transition: ${props => props.theme.transitions.fast};
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: ${props => props.theme.shadows.soft};
  position: relative;
  overflow: hidden;
  z-index: 1;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
    opacity: 0;
    transition: ${props => props.theme.transitions.fast};
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.glow};
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 25px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: ${props => props.theme.colors.accent};
  background: rgba(247, 37, 133, 0.1);
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: ${props => props.theme.colors.light};
  text-align: center;
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 0;
`;

function Features() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  
  const featureIconsRef = useRef([]);
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  // Animate feature icons
  useEffect(() => {
    if (inView && featureIconsRef.current.length > 0) {
      gsap.to(featureIconsRef.current, {
        scale: 1.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: "sine.inOut"
      });
    }
  }, [inView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  };
  
  const features = [
    {
      icon: 'fas fa-tasks',
      title: 'Intelligent Tasks',
      description: 'AI-powered todo lists that adapt to your habits and prioritize tasks based on your energy levels and daily patterns.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Habit Builder',
      description: 'Create lasting positive routines with visual habit tracking, streak rewards, and personalized encouragement.'
    },
    {
      icon: 'fas fa-smile',
      title: 'Mood Insights',
      description: 'Track your emotional wellbeing with beautiful visualizations and discover patterns to improve mental health awareness.'
    },
    {
      icon: 'fas fa-moon',
      title: 'Sleep Optimization',
      description: 'Analyze your sleep patterns and receive personalized recommendations for better rest and more energetic days.'
    }
  ];
  
  return (
    <FeaturesSection id="features">
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }} // FIXED: Using named easing
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }} // FIXED: Using named easing
        >
          Unlock Your Wellness Potential
        </motion.h2>
        
        <FeaturesGrid
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <FeatureIcon ref={el => featureIconsRef.current[index] = el}>
                <i className={feature.icon}></i>
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </motion.div>
    </FeaturesSection>
  );
}

export default Features;