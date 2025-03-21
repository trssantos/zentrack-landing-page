import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';

const ShowcaseSection = styled.section`
  background-color: ${props => props.theme.colors.surface};
  position: relative;
  overflow: hidden;
  padding-top: 150px;
  padding-bottom: 150px;
  
  &::before {
    content: '';
    position: absolute;
    top: -100px;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to bottom left, ${props => props.theme.colors.dark} 0%, ${props => props.theme.colors.dark} 50%, ${props => props.theme.colors.surface} 50%, ${props => props.theme.colors.surface} 100%);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -100px;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to top right, ${props => props.theme.colors.dark} 0%, ${props => props.theme.colors.dark} 50%, ${props => props.theme.colors.surface} 50%, ${props => props.theme.colors.surface} 100%);
    z-index: 1;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-top: 100px;
    padding-bottom: 100px;
  }
`;

const ShowcaseContainer = styled.div`
  position: relative;
`;

const ShowcaseIntro = styled(motion.div)`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 60px;
`;

const ShowcaseDescription = styled(motion.p)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
  text-align: center;
`;

const Showcase3D = styled.div`
  height: 600px;
  position: relative;
  perspective: 1500px;
  overflow: visible;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    height: 500px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 400px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    height: 350px;
  }
`;

const ShowcaseCarousel = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: translateZ(-50px);
  left: 0;
  top: 0;
`;

const ShowcasePhone = styled(motion.div)`
  position: absolute;
  width: 250px;
  height: 500px;
  left: 50%;
  top: 50%;
  transform-style: preserve-3d;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 200px;
    height: 400px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 160px;
    height: 320px;
  }
`;

const PhoneShowcase = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.theme.colors.dark};
  border-radius: 30px;
  border: 8px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.strong};
  position: relative;
  transform-style: preserve-3d;
`;

const PhoneHeader = styled.div`
  height: 60px;
  background: ${props => props.theme.colors.primaryDark};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  font-size: 0.9em;
`;

const PhoneTitle = styled.div`
  color: white;
  font-weight: 600;
`;

const PhoneBody = styled.div`
  flex: 1;
  background: ${props => props.theme.colors.surface};
  height: calc(100% - 60px);
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PhoneCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const PhoneShadow = styled.div`
  position: absolute;
  bottom: -20px;
  left: 10%;
  width: 80%;
  height: 20px;
  background: rgba(0, 0, 0, 0.3);
  filter: blur(15px);
  border-radius: 50%;
  z-index: -1;
`;

const ShowcaseControls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 20px;
`;

const ShowcaseDot = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: ${props => props.active ? props.theme.colors.accent : 'rgba(255, 255, 255, 0.2)'};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
`;

// Dashboard specific components
const DashboardMetric = styled.div`
  margin-top: 5px;
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  overflow: hidden;
`;

const DashboardMetricValue = styled.div`
  height: 100%;
  background: ${props => props.theme.colors.primaryLight};
  width: ${props => props.value || '0%'};
`;

const DashboardCircle = styled.div`
  width: 80px;
  height: 80px;
  margin: 10px auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DashboardCircleBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
`;

const DashboardCircleValue = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    ${props => props.theme.colors.accent} 0%, 
    ${props => props.theme.colors.primaryLight} ${props => props.value || '0%'},
    transparent ${props => props.value || '0%'}
  );
`;

const DashboardCircleCenter = styled.div`
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
  font-size: 1.2rem;
`;

// Habit tracking specific components
const HabitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
`;

const HabitRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const HabitName = styled.div`
  font-weight: 500;
`;

const HabitStreak = styled.div`
  display: flex;
  gap: 5px;
`;

const HabitDay = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.completed ? props.theme.colors.accent : 'rgba(255, 255, 255, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  color: ${props => props.completed ? 'white' : 'rgba(255, 255, 255, 0.5)'};
`;

const StreakCount = styled.div`
  background: ${props => props.theme.gradients.accent};
  color: white;
  padding: 0px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: bold;
  margin-left: 5px;
`;

// Mood tracking specific components
const MoodContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const MoodHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MoodDate = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;

const MoodGraph = styled.div`
  height: 150px;
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

const MoodBar = styled.div`
  flex: 1;
  height: ${props => props.height || '20%'};
  background: linear-gradient(to top, ${props => props.theme.colors.accent}, ${props => props.theme.colors.primaryLight});
  border-radius: 5px 5px 0 0;
  transition: height 0.5s ease;
`;

const MoodLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
`;

const EmotionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 15px;
`;

const EmotionTag = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 5px 10px;
  border-radius: 15px;
  text-align: center;
  font-size: 0.8rem;
  
  &.active {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

// Sleep analysis specific components
const SleepGraph = styled.div`
  height: 150px;
  position: relative;
  margin: 20px 0;
`;

const SleepLine = styled.svg`
  width: 100%;
  height: 100%;
  overflow: visible;
`;

const SleepPath = styled.path`
  fill: none;
  stroke: url(#sleepGradient);
  stroke-width: 3;
  stroke-linecap: round;
`;

const SleepPoint = styled.circle`
  fill: ${props => props.theme.colors.accent};
`;

const SleepStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const SleepStat = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 10px;
  text-align: center;
`;

const SleepStatValue = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: ${props => props.theme.colors.primaryLight};
`;

const SleepStatLabel = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
`;

// Todo list specific components
const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  gap: 12px;
`;

const TodoCheckbox = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid ${props => props.completed ? props.theme.colors.accent : 'rgba(255, 255, 255, 0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.completed ? props.theme.colors.accent : 'transparent'};
  
  i {
    color: white;
    font-size: 0.7rem;
  }
`;

const TodoContent = styled.div`
  flex: 1;
`;

const TodoTitle = styled.div`
  font-weight: 500;
  color: ${props => props.completed ? 'rgba(255, 255, 255, 0.5)' : 'white'};
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`;

const TodoTime = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
`;

const TodoCategory = styled.div`
  font-size: 0.7rem;
  padding: 3px 8px;
  border-radius: 10px;
  background: ${props => {
    switch(props.type) {
      case 'health': return 'rgba(247, 37, 133, 0.2)';
      case 'work': return 'rgba(76, 201, 240, 0.2)';
      case 'personal': return 'rgba(123, 44, 191, 0.2)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'health': return props.theme.colors.accent;
      case 'work': return props.theme.colors.tertiary;
      case 'personal': return props.theme.colors.primaryLight;
      default: return 'rgba(255, 255, 255, 0.7)';
    }
  }};
`;

const TodoPriority = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => {
    switch(props.level) {
      case 'high': return '#F72585';
      case 'medium': return '#FFB86C';
      case 'low': return '#4CC9F0';
      default: return 'rgba(255, 255, 255, 0.3)';
    }
  }};
`;

function AppShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const showcaseRef = useRef(null);
  const carouselRef = useRef(null);
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  
  const phoneScreens = [
    { name: 'Dashboard', component: DashboardScreen },
    { name: 'Habits', component: HabitsScreen },
    { name: 'Mood', component: MoodScreen },
    { name: 'Sleep', component: SleepScreen },
    { name: 'Tasks', component: TodoScreen }
  ];
  
  // Initialize showcase
  useEffect(() => {
    if (showcaseRef.current && carouselRef.current && inView) {
      updateCarousel(currentIndex);
    }
  }, [inView, currentIndex]);
  
  // Rotate showcase on interval
  useEffect(() => {
    let interval;
    
    if (inView) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phoneScreens.length);
      }, 4000);
    }
    
    return () => clearInterval(interval);
  }, [inView, phoneScreens.length]);
  
  // Update carousel rotation to show current index
  const updateCarousel = (index) => {
    if (!carouselRef.current) return;
    
    const phones = carouselRef.current.querySelectorAll('.showcase-phone');
    
    phones.forEach((phone, i) => {
      const angleOffset = ((i - index) * (360 / phones.length));
      const angle = angleOffset;
      const z = 380; // radius of the circle
      
      // Calculate x and z position on the circle
      const radians = (angle * Math.PI) / 180;
      const x = Math.sin(radians) * z;
      const zPos = Math.cos(radians) * z;
      
      gsap.to(phone, {
        duration: 1.2,
        x,
        z: zPos,
        rotationY: -angle,
        ease: "power2.inOut",
        opacity: i === index ? 1 : 0.6,
        scale: i === index ? 1.1 : 0.9
      });
    });
  };
  
  // Handle dot click
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };
  
  return (
    <ShowcaseSection id="showcase">
      <div className="container">
        <ShowcaseIntro
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Experience Zenflow
          </motion.h2>
          <ShowcaseDescription
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Our beautifully crafted app interfaces combine functionality with elegant design to make your wellness journey a visual delight.
          </ShowcaseDescription>
        </ShowcaseIntro>
        
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Showcase3D ref={showcaseRef}>
            <ShowcaseCarousel ref={carouselRef}>
              {phoneScreens.map((screen, i) => (
                <ShowcasePhone
                  key={i}
                  className="showcase-phone"
                  data-index={i}
                  // Initial position is set by the updateCarousel function
                >
                  <PhoneShowcase>
                    <screen.component />
                  </PhoneShowcase>
                  <PhoneShadow />
                </ShowcasePhone>
              ))}
            </ShowcaseCarousel>
            
            <ShowcaseControls>
              {phoneScreens.map((_, i) => (
                <ShowcaseDot
                  key={i}
                  active={i === currentIndex}
                  onClick={() => handleDotClick(i)}
                />
              ))}
            </ShowcaseControls>
          </Showcase3D>
        </motion.div>
      </div>
    </ShowcaseSection>
  );
}

// Dashboard Screen
function DashboardScreen() {
  return (
    <>
      <PhoneHeader>
        <i className="fas fa-bars"></i>
        <PhoneTitle>Dashboard</PhoneTitle>
        <i className="fas fa-bell"></i>
      </PhoneHeader>
      <PhoneBody>
        <PhoneCard>
          <h4>Wellness Score</h4>
          <DashboardCircle>
            <DashboardCircleBg />
            <DashboardCircleValue value="87%" />
            <DashboardCircleCenter>87%</DashboardCircleCenter>
          </DashboardCircle>
        </PhoneCard>
        
        <PhoneCard>
          <h4>Daily Progress</h4>
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>Habits</span>
              <span>75%</span>
            </div>
            <DashboardMetric>
              <DashboardMetricValue value="75%" />
            </DashboardMetric>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>Tasks</span>
              <span>60%</span>
            </div>
            <DashboardMetric>
              <DashboardMetricValue value="60%" />
            </DashboardMetric>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>Sleep</span>
              <span>89%</span>
            </div>
            <DashboardMetric>
              <DashboardMetricValue value="89%" />
            </DashboardMetric>
          </div>
        </PhoneCard>
        
        <PhoneCard>
          <h4>Today's Focus</h4>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: 'rgba(76, 201, 240, 0.2)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginRight: '15px'
            }}>
              <i className="fas fa-heart" style={{ color: '#4CC9F0' }}></i>
            </div>
            <div>
              <div style={{ fontWeight: '600' }}>Mindfulness</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>15 min meditation</div>
            </div>
          </div>
        </PhoneCard>
        
        <PhoneCard>
          <h4>Upcoming</h4>
          <div style={{ fontSize: '0.9rem', marginTop: '5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Yoga session</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>5:30 PM</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Evening walk</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>7:00 PM</span>
            </div>
          </div>
        </PhoneCard>
      </PhoneBody>
    </>
  );
}

// Habits Screen
function HabitsScreen() {
  return (
    <>
      <PhoneHeader>
        <i className="fas fa-arrow-left"></i>
        <PhoneTitle>Habit Tracker</PhoneTitle>
        <i className="fas fa-plus"></i>
      </PhoneHeader>
      <PhoneBody>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h4>My Habits</h4>
          <div style={{ 
            padding: '5px 10px', 
            background: 'rgba(255, 255, 255, 0.1)', 
            borderRadius: '15px', 
            fontSize: '0.8rem' 
          }}>
            March 2025
          </div>
        </div>
        
        <HabitGrid>
          <HabitRow>
            <HabitName>Morning Meditation</HabitName>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <HabitStreak>
                {[1, 2, 3, 4, 5].map(day => (
                  <HabitDay key={day} completed={day < 5}>
                    {day < 5 && <i className="fas fa-check" style={{ fontSize: '0.6rem' }}></i>}
                  </HabitDay>
                ))}
              </HabitStreak>
              <StreakCount>18</StreakCount>
            </div>
          </HabitRow>
          
          <HabitRow>
            <HabitName>Drink 2L Water</HabitName>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <HabitStreak>
                {[1, 2, 3, 4, 5].map(day => (
                  <HabitDay key={day} completed={day !== 3}>
                    {day !== 3 && <i className="fas fa-check" style={{ fontSize: '0.6rem' }}></i>}
                  </HabitDay>
                ))}
              </HabitStreak>
              <StreakCount>7</StreakCount>
            </div>
          </HabitRow>
          
          <HabitRow>
            <HabitName>Reading</HabitName>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <HabitStreak>
                {[1, 2, 3, 4, 5].map(day => (
                  <HabitDay key={day} completed={day < 3}>
                    {day < 3 && <i className="fas fa-check" style={{ fontSize: '0.6rem' }}></i>}
                  </HabitDay>
                ))}
              </HabitStreak>
              <StreakCount>12</StreakCount>
            </div>
          </HabitRow>
          
          <HabitRow>
            <HabitName>Exercise</HabitName>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <HabitStreak>
                {[1, 2, 3, 4, 5].map(day => (
                  <HabitDay key={day} completed={day % 2 === 1}>
                    {day % 2 === 1 && <i className="fas fa-check" style={{ fontSize: '0.6rem' }}></i>}
                  </HabitDay>
                ))}
              </HabitStreak>
              <StreakCount>5</StreakCount>
            </div>
          </HabitRow>
          
          <HabitRow>
            <HabitName>Journaling</HabitName>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <HabitStreak>
                {[1, 2, 3, 4, 5].map(day => (
                  <HabitDay key={day} completed={day < 4}>
                    {day < 4 && <i className="fas fa-check" style={{ fontSize: '0.6rem' }}></i>}
                  </HabitDay>
                ))}
              </HabitStreak>
              <StreakCount>21</StreakCount>
            </div>
          </HabitRow>
        </HabitGrid>
        
        <PhoneCard style={{ marginTop: '20px' }}>
          <h4>Habit Stats</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#9D4EDD' }}>86%</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>Completion</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#4CC9F0' }}>5</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>Active</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#F72585' }}>21</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>Longest</div>
            </div>
          </div>
        </PhoneCard>
      </PhoneBody>
    </>
  );
}

// Mood Screen
function MoodScreen() {
  return (
    <>
      <PhoneHeader>
        <i className="fas fa-arrow-left"></i>
        <PhoneTitle>Mood Tracker</PhoneTitle>
        <i className="fas fa-sliders-h"></i>
      </PhoneHeader>
      <PhoneBody>
        <MoodContainer>
          <MoodHeader>
            <h4>Weekly Overview</h4>
            <MoodDate>Mar 15-21</MoodDate>
          </MoodHeader>
          
          <MoodGraph>
            <MoodBar height="65%" />
            <MoodBar height="75%" />
            <MoodBar height="50%" />
            <MoodBar height="85%" />
            <MoodBar height="70%" />
            <MoodBar height="90%" />
            <MoodBar height="80%" />
          </MoodGraph>
          
          <MoodLabels>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </MoodLabels>
        </MoodContainer>
        
        <PhoneCard style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4>Today's Mood</h4>
            <div style={{ 
              color: '#4CC9F0', 
              fontWeight: '600',
              fontSize: '1.1rem'
            }}>8.2/10</div>
          </div>
          
          <div style={{ fontSize: '0.9rem', marginBottom: '15px' }}>
            How are you feeling today?
          </div>
          
          <EmotionGrid>
            <EmotionTag className="active">Happy</EmotionTag>
            <EmotionTag>Tired</EmotionTag>
            <EmotionTag className="active">Calm</EmotionTag>
            <EmotionTag>Stressed</EmotionTag>
            <EmotionTag>Anxious</EmotionTag>
            <EmotionTag className="active">Grateful</EmotionTag>
            <EmotionTag>Sad</EmotionTag>
            <EmotionTag>Excited</EmotionTag>
          </EmotionGrid>
        </PhoneCard>
        
        <PhoneCard>
          <h4>Mood Insights</h4>
          <div style={{ 
            fontSize: '0.9rem', 
            color: 'rgba(255,255,255,0.8)', 
            lineHeight: '1.4',
            marginTop: '10px'
          }}>
            Your mood tends to be 27% higher on days when you complete your morning meditation. Keep up this positive habit!
          </div>
        </PhoneCard>
      </PhoneBody>
    </>
  );
}

// Sleep Screen
function SleepScreen() {
  return (
    <>
      <PhoneHeader>
        <i className="fas fa-arrow-left"></i>
        <PhoneTitle>Sleep Analysis</PhoneTitle>
        <i className="fas fa-moon"></i>
      </PhoneHeader>
      <PhoneBody>
        <h4>Sleep Quality</h4>
        
        <SleepGraph>
          <SleepLine>
            <defs>
              <linearGradient id="sleepGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F72585" />
                <stop offset="100%" stopColor="#4CC9F0" />
              </linearGradient>
            </defs>
            <path 
              d="M0,75 C40,45 80,100 120,65 C160,30 200,60 240,50" 
              fill="none" 
              stroke="url(#sleepGradient)" 
              strokeWidth="3" 
              strokeLinecap="round"
            />
            <circle cx="0" cy="75" r="5" fill="#F72585" />
            <circle cx="40" cy="45" r="5" fill="#F72585" />
            <circle cx="80" cy="100" r="5" fill="#F72585" />
            <circle cx="120" cy="65" r="5" fill="#F72585" />
            <circle cx="160" cy="30" r="5" fill="#4CC9F0" />
            <circle cx="200" cy="60" r="5" fill="#4CC9F0" />
            <circle cx="240" cy="50" r="5" fill="#4CC9F0" />
          </SleepLine>
          
          <div style={{ 
            position: 'absolute', 
            bottom: '-25px', 
            left: 0, 
            right: 0, 
            display: 'flex', 
            justifyContent: 'space-between',
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.6)'
          }}>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </SleepGraph>
        
        <SleepStats>
          <SleepStat>
            <SleepStatValue>7.8h</SleepStatValue>
            <SleepStatLabel>Avg. Duration</SleepStatLabel>
          </SleepStat>
          <SleepStat>
            <SleepStatValue>11:23 PM</SleepStatValue>
            <SleepStatLabel>Avg. Bedtime</SleepStatLabel>
          </SleepStat>
          <SleepStat>
            <SleepStatValue>6:42 AM</SleepStatValue>
            <SleepStatLabel>Avg. Wake Up</SleepStatLabel>
          </SleepStat>
          <SleepStat>
            <SleepStatValue>94%</SleepStatValue>
            <SleepStatLabel>Sleep Quality</SleepStatLabel>
          </SleepStat>
        </SleepStats>
        
        <PhoneCard style={{ marginTop: '20px' }}>
          <h4>Last Night's Sleep</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '5px' }}>Sleep Duration</div>
              <div style={{ fontWeight: '600' }}>8h 12m</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '5px' }}>Bedtime</div>
              <div style={{ fontWeight: '600' }}>10:48 PM</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '5px' }}>Wake Up</div>
              <div style={{ fontWeight: '600' }}>7:00 AM</div>
            </div>
          </div>
        </PhoneCard>
      </PhoneBody>
    </>
  );
}

// Todo Screen
function TodoScreen() {
  return (
    <>
      <PhoneHeader>
        <i className="fas fa-arrow-left"></i>
        <PhoneTitle>Task Manager</PhoneTitle>
        <i className="fas fa-plus"></i>
      </PhoneHeader>
      <PhoneBody>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h4>Today's Tasks</h4>
          <div style={{ 
            padding: '3px 10px', 
            background: 'rgba(255, 255, 255, 0.1)', 
            borderRadius: '15px', 
            fontSize: '0.8rem' 
          }}>
            7 tasks
          </div>
        </div>
        
        <TodoList>
          <TodoItem>
            <TodoCheckbox completed={true}>
              <i className="fas fa-check"></i>
            </TodoCheckbox>
            <TodoContent>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TodoTitle completed={true}>Morning Meditation</TodoTitle>
                <TodoPriority level="high" />
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
                <TodoTime>8:00 AM</TodoTime>
                <TodoCategory type="health">Health</TodoCategory>
              </div>
            </TodoContent>
          </TodoItem>
          
          <TodoItem>
            <TodoCheckbox completed={true}>
              <i className="fas fa-check"></i>
            </TodoCheckbox>
            <TodoContent>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TodoTitle completed={true}>Team Meeting</TodoTitle>
                <TodoPriority level="high" />
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
                <TodoTime>10:30 AM</TodoTime>
                <TodoCategory type="work">Work</TodoCategory>
              </div>
            </TodoContent>
          </TodoItem>
          
          <TodoItem>
            <TodoCheckbox />
            <TodoContent>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TodoTitle>Weekly Planning</TodoTitle>
                <TodoPriority level="medium" />
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
                <TodoTime>2:00 PM</TodoTime>
                <TodoCategory type="work">Work</TodoCategory>
              </div>
            </TodoContent>
          </TodoItem>
          
          <TodoItem>
            <TodoCheckbox />
            <TodoContent>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TodoTitle>Evening Workout</TodoTitle>
                <TodoPriority level="medium" />
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
                <TodoTime>6:30 PM</TodoTime>
                <TodoCategory type="health">Health</TodoCategory>
              </div>
            </TodoContent>
          </TodoItem>
          
          <TodoItem>
            <TodoCheckbox />
            <TodoContent>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TodoTitle>Read 30 Minutes</TodoTitle>
                <TodoPriority level="low" />
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
                <TodoTime>8:30 PM</TodoTime>
                <TodoCategory type="personal">Personal</TodoCategory>
              </div>
            </TodoContent>
          </TodoItem>
        </TodoList>
      </PhoneBody>
    </>
  );
}

export default AppShowcase;