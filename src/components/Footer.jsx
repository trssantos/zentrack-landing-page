// Footer.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterSection = styled.footer`
  background-color: ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.light};
  padding: 80px 0 40px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 60px 0 30px;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-bottom: 60px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    gap: 30px;
    margin-bottom: 40px;
  }
`;

const FooterCol = styled(motion.div)`
  &:first-child {
    grid-column: span 2;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      grid-column: span 1;
    }
  }
`;

const FooterLogo = styled.a`
  font-size: 2rem;
  font-weight: 700;
  background: ${props => props.theme.gradients.accent};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 20px;
  display: inline-block;
  text-decoration: none;
`;

const FooterDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 25px;
  max-width: 400px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: ${props => props.theme.colors.light};
  transition: ${props => props.theme.transitions.fast};
  text-decoration: none;
  
  &:hover {
    background: ${props => props.theme.gradients.button};
    transform: translateY(-5px);
  }
`;

const FooterHeading = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 25px;
  color: ${props => props.theme.colors.light};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 30px;
    height: 3px;
    background: ${props => props.theme.gradients.accent};
    border-radius: 3px;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
`;

const FooterLink = styled(motion.li)`
  margin-bottom: 12px;
  
  a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: ${props => props.theme.transitions.fast};
    display: inline-block;
    
    &:hover {
      color: ${props => props.theme.colors.primaryLight};
      transform: translateX(5px);
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
`;

function Footer() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
  
  
  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: i => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15,
        delay: 0.5 + (i * 0.1)
      }
    })
  };
  
  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: i => ({
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        delay: 0.2 + (i * 0.05)
      }
    })
  };
  
  const socialLinks = [
    { icon: 'fab fa-facebook-f', url: '#' },
    { icon: 'fab fa-twitter', url: '#' },
    { icon: 'fab fa-instagram', url: '#' },
    { icon: 'fab fa-linkedin-in', url: '#' }
  ];
  
  const footerLinks = {
    'Product': ['Features', 'Pricing', 'Download', 'Updates'],
    'Support': ['Help Center', 'FAQ', 'Contact Us', 'Community'],
    'Company': ['About Us', 'Careers', 'Blog', 'Press']
  };
  
  return (
    <FooterSection>
      <div className="container">
        <FooterGrid
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <FooterCol variants={itemVariants}>
            <FooterLogo href="#">Zenflow</FooterLogo>
            <FooterDescription>
              Your daily companion for a balanced, mindful, and productive life. We're passionate about helping you achieve your wellness goals through beautiful design and intelligent tracking.
            </FooterDescription>
            <SocialLinks>
              {socialLinks.map((link, i) => (
                <SocialLink 
                  key={i}
                  href={link.url}
                  custom={i}
                  variants={socialVariants}
                >
                  <i className={link.icon}></i>
                </SocialLink>
              ))}
            </SocialLinks>
          </FooterCol>
          
          {Object.entries(footerLinks).map(([category, links], catIndex) => (
            <FooterCol key={catIndex} variants={itemVariants}>
              <FooterHeading>{category}</FooterHeading>
              <FooterLinks>
                {links.map((link, i) => (
                  <FooterLink
                    key={i}
                    custom={i}
                    variants={linkVariants}
                  >
                    <a href="#">{link}</a>
                  </FooterLink>
                ))}
              </FooterLinks>
            </FooterCol>
          ))}
        </FooterGrid>
        
        <FooterBottom>
          <motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ delay: 1, duration: 0.5, ease: "easeOut" }} // FIXED
>
            <Copyright>&copy; 2025 Zenflow Wellness App. All rights reserved.</Copyright>
          </motion.div>
        </FooterBottom>
      </div>
    </FooterSection>
  );
}

export default Footer;