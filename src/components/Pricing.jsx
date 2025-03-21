import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PricingSection = styled.section`
  background-color: ${props => props.theme.colors.dark};
  position: relative;
  padding-top: 150px;
  padding-bottom: 150px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-top: 100px;
    padding-bottom: 100px;
  }
`;

const PricingToggleContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
  gap: 20px;
`;

const ToggleLabel = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
  transition: ${props => props.theme.transitions.fast};
  color: ${props => props.active ? props.theme.colors.light : 'rgba(255, 255, 255, 0.6)'};
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 60px;
  height: 30px;
  background: ${props => props.theme.gradients.button};
  border-radius: 30px;
  cursor: pointer;
  padding: 4px;
`;

const ToggleSlider = styled.div`
  position: absolute;
  top: 3px;
  left: ${props => props.checked ? '33px' : '3px'};
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 50%;
  transition: ${props => props.theme.transitions.fast};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const PricingSave = styled.span`
  background: ${props => props.theme.colors.accent};
  color: white;
  font-size: 0.8rem;
  padding: 5px 10px;
  border-radius: 30px;
  font-weight: 600;
  margin-left: 10px;
`;

const PricingGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  position: relative;
  z-index: 1;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const PricingCard = styled(motion.div)`
  background: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius};
  padding: 40px;
  transition: ${props => props.theme.transitions.fast};
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.soft};
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  
  &.featured {
    transform: scale(1.05);
    border-color: ${props => props.theme.colors.primaryLight};
    box-shadow: 0 0 20px rgba(123, 44, 191, 0.3);
    
    @media (max-width: ${props => props.theme.breakpoints.lg}) {
      transform: scale(1);
    }
    
    &:hover {
      @media (max-width: ${props => props.theme.breakpoints.lg}) {
        transform: translateY(-10px);
      }
      
      @media (min-width: ${props => props.theme.breakpoints.lg}) {
        transform: scale(1.05) translateY(-10px);
      }
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 6px;
      background: ${props => props.theme.gradients.accent};
    }
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.glow};
  }
`;

const PricingBadge = styled.div`
  position: absolute;
  top: 25px;
  right: -35px;
  background: ${props => props.theme.colors.accent};
  color: white;
  padding: 5px 40px;
  font-size: 0.9rem;
  font-weight: 600;
  transform: rotate(45deg);
  z-index: 1;
`;

const PricingType = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: ${props => props.theme.colors.light};
`;

const PricingCost = styled.div`
  margin-bottom: 30px;
`;

const PricingAmount = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primaryLight};
  line-height: 1;
  
  .currency {
    font-size: 1.5rem;
    vertical-align: super;
    margin-right: 5px;
    font-weight: 500;
  }
`;

const PricingPeriod = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  margin-left: 5px;
`;

const PricingFeatures = styled.ul`
  list-style: none;
  margin-bottom: 30px;
`;

const PricingFeature = styled.li`
  padding: 10px 0;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  i {
    color: ${props => props.theme.colors.accent};
    margin-right: 10px;
    font-size: 1.1rem;
  }
`;

const PricingButton = styled(motion.a)`
  display: inline-block;
  width: 100%;
  text-align: center;
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
  }
`;

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  
  const toggleBilling = () => {
    setIsAnnual(!isAnnual);
  };
  
  const plans = [
    {
      type: 'Starter',
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        'Basic Task Management',
        'Limited Habit Tracking',
        'Basic Mood Tracking',
        '7-Day History',
        'Web Access Only'
      ],
      primary: false,
      featured: false
    },
    {
      type: 'Premium',
      monthlyPrice: 9.99,
      annualPrice: 95.90,
      features: [
        'Advanced Task Organization',
        'Unlimited Habit Tracking',
        'Advanced Mood Analytics',
        'Sleep Pattern Analysis',
        'Unlimited History',
        'All Device Access',
        'Priority Support'
      ],
      primary: true,
      featured: true,
      badge: 'Popular'
    },
    {
      type: 'Family',
      monthlyPrice: 19.99,
      annualPrice: 191.90,
      features: [
        'All Premium Features',
        'Up to 6 Family Members',
        'Family Goal Setting',
        'Shared Family Calendar',
        'Family Analytics Dashboard',
        'Premium Support'
      ],
      primary: false,
      featured: false
    }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  };
  
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      y: -5,
      transition: { 
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    }
  };
  
  return (
    <PricingSection id="pricing">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8,ease: "easeOut" }}
        >
          Choose Your Wellness Plan
        </motion.h2>
        
        <PricingToggleContainer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2,ease: "easeOut" }}
        >
          <ToggleLabel active={!isAnnual}>Monthly</ToggleLabel>
          <ToggleSwitch onClick={toggleBilling}>
            <ToggleSlider checked={isAnnual} />
          </ToggleSwitch>
          <ToggleLabel active={isAnnual}>Annually</ToggleLabel>
          <PricingSave>Save 20%</PricingSave>
        </PricingToggleContainer>
        
        <PricingGrid
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              className={plan.featured ? 'featured' : ''}
              variants={itemVariants}
            >
              {plan.featured && plan.badge && (
                <PricingBadge>{plan.badge}</PricingBadge>
              )}
              
              <PricingType>{plan.type}</PricingType>
              <PricingCost>
                <PricingAmount>
                  <span className="currency">$</span>
                  {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                </PricingAmount>
                <PricingPeriod>/{isAnnual ? 'year' : 'month'}</PricingPeriod>
              </PricingCost>
              
              <PricingFeatures>
                {plan.features.map((feature, i) => (
                  <PricingFeature key={i}>
                    <i className="fas fa-check"></i>
                    {feature}
                  </PricingFeature>
                ))}
              </PricingFeatures>
              
              <PricingButton
                href="#"
                primary={plan.primary}
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
              >
                {plan.type === 'Starter' ? 'Start Free' : `Get ${plan.type}`}
              </PricingButton>
            </PricingCard>
          ))}
        </PricingGrid>
      </div>
    </PricingSection>
  );
}

export default Pricing;