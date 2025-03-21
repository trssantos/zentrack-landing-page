// Testimonials.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TestimonialsSection = styled.section`
  background-color: ${props => props.theme.colors.surface};
  position: relative;
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
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-top: 100px;
    padding-bottom: 100px;
  }
`;

const TestimonialSlider = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
`;

const TestimonialCard = styled(motion.div)`
  background: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius};
  padding: 40px;
  margin: 20px;
  box-shadow: ${props => props.theme.shadows.soft};
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
`;

const TestimonialContent = styled.div`
  position: relative;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
  font-style: italic;
  line-height: 1.8;
  
  &::before {
    content: '"';
    font-size: 5rem;
    color: ${props => props.theme.colors.primaryLight};
    opacity: 0.2;
    position: absolute;
    top: -40px;
    left: -20px;
    font-family: Georgia, serif;
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const AuthorAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${props => props.theme.colors.primaryLight};
`;

const AuthorImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.light};
`;

const AuthorPosition = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;

function Testimonials() {
  return (
    <TestimonialsSection id="testimonials">
      <div className="container">
      <motion.h2
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: "easeOut" }} // FIXED
>
          What Our Users Say
        </motion.h2>
        
        <TestimonialSlider
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: "easeOut" }} // FIXED
>
  <TestimonialCard
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} // FIXED
  >
            <TestimonialContent>
              Since I started using Zenflow, my sleep quality has improved dramatically. The mood tracking helped me realize how much my evening routine was affecting my rest. The animated visualizations make the whole experience engaging and I look forward to my daily check-ins.
            </TestimonialContent>
            <TestimonialAuthor>
              <AuthorAvatar>
                <AuthorImage src="/api/placeholder/60/60" alt="Jessica Davis" />
              </AuthorAvatar>
              <AuthorInfo>
                <AuthorName>Jessica Davis</AuthorName>
                <AuthorPosition>Creative Director</AuthorPosition>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
        </TestimonialSlider>
      </div>
    </TestimonialsSection>
  );
}

export default Testimonials;
