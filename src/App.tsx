import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Zap, Gamepad2, Sparkles, Rocket, Palette, 
  Code2, Brain, Globe, Terminal, Music, Video,
  Heart, Coffee, Cat, Pizza, Ghost, Dumbbell,
  MessageSquare, Send, MousePointerClick, Wifi,
  Cloud, Database, Server, Smartphone, Camera,
  TrendingUp, Users, Shield, Lock, Unlock,
  Volume2, VolumeX, Play, Pause, SkipForward
} from 'lucide-react';
import './App.css';
import { Header } from './components/Header';

// Define types
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  color: string;
  icon: React.ReactNode;
  funFact: string;
}

interface Skill {
  name: string;
  level: number;
  emoji: string;
  color: string;
  funDescription: string;
}

interface FunFact {
  icon: React.ReactNode;
  text: string;
  color: string;
}

const App = () => {
  // State
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [themeColor, setThemeColor] = useState('#ff00ff');
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [terminalActive, setTerminalActive] = useState(false);
  
  // Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Scroll animations
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const heroRotate = useTransform(scrollYProgress, [0, 0.5], [0, 5]);
  
  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Projects data with fun elements
  const projects: Project[] = [
    {
      id: 1,
      title: 'SynthWave Music Visualizer',
      description: 'Real-time audio visualization with customizable neon wave patterns and rhythm detection.',
      technologies: ['WebAudio API', 'Three.js', 'Canvas API', 'TypeScript'],
      color: '#ff00ff',
      icon: <Music />,
      funFact: 'Generates unique visuals for every song!'
    },
    {
      id: 2,
      title: 'AI Pixel Art Generator',
      description: 'Transform photos into retro pixel art using neural networks with style customization.',
      technologies: ['TensorFlow.js', 'React', 'P5.js', 'WebGL'],
      color: '#00ffaa',
      icon: <Palette />,
      funFact: 'Can make your selfie look like a 90s video game character!'
    },
    {
      id: 3,
      title: 'Virtual Reality Code Editor',
      description: 'Code in 3D space with hand tracking and immersive programming environment.',
      technologies: ['WebXR', 'A-Frame', 'Monaco', 'WebSockets'],
      color: '#ffaa00',
      icon: <Code2 />,
      funFact: 'You can literally grab and throw your bugs away!'
    },
    {
      id: 4,
      title: 'Blockchain Pet Game',
      description: 'Adopt and train digital pets on the blockchain with multiplayer battles.',
      technologies: ['Solidity', 'Web3.js', 'Phaser', 'IPFS'],
      color: '#aa00ff',
      icon: <Cat />,
      funFact: 'My cat Fluffy inspired this project!'
    },
  ];
  
  // Skills with personality
  const skills: Skill[] = [
    { name: 'React', level: 95, emoji: '⚛️', color: '#61DAFB', funDescription: 'Making components dance since 2018' },
    { name: 'TypeScript', level: 90, emoji: '📘', color: '#3178C6', funDescription: 'Because "any" is a bad word' },
    { name: 'Three.js', level: 80, emoji: '🎮', color: '#049EF4', funDescription: 'Bringing 3D to the browser' },
    { name: 'Node.js', level: 85, emoji: '🟢', color: '#339933', funDescription: 'Making servers go brrr' },
    { name: 'WebGL', level: 75, emoji: '🎨', color: '#990000', funDescription: 'Pushing pixels to the limit' },
    { name: 'UI/UX', level: 88, emoji: '✨', color: '#FF6B6B', funDescription: 'Making things pretty and usable' },
    { name: 'Game Dev', level: 70, emoji: '🎯', color: '#FFD93D', funDescription: 'Because everything is a game' },
    { name: 'AI/ML', level: 65, emoji: '🧠', color: '#6BCEFF', funDescription: 'Teaching computers to think' },
  ];
  
  // Fun facts about me
  const funFacts: FunFact[] = [
    { icon: <Coffee />, text: 'Consumes dangerous amounts of coffee', color: '#6F4E37' },
    { icon: <Gamepad2 />, text: 'Beat Dark Souls with a dance pad', color: '#FF6B6B' },
    { icon: <Pizza />, text: 'Can code for 12 hours straight with pizza breaks', color: '#FFA500' },
    { icon: <Dumbbell />, text: 'Lifts weights while debugging', color: '#00AAFF' },
    { icon: <Cat />, text: 'Has a cat named "Null"', color: '#FF69B4' },
    { icon: <Ghost />, text: 'Believes in friendly coding ghosts', color: '#9370DB' },
  ];
  
  // Color themes to cycle through
  const themeColors = ['#ff00ff', '#00ffaa', '#ffaa00', '#aa00ff', '#00aaff'];
  
  // Handle audio
  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setAudioPlaying(!audioPlaying);
    }
  };
  
  // Change theme color
  const cycleThemeColor = () => {
    const currentIndex = themeColors.indexOf(themeColor);
    const nextIndex = (currentIndex + 1) % themeColors.length;
    setThemeColor(themeColors[nextIndex]);
  };
  
  // Terminal commands
  const terminalCommands = [
    { cmd: 'whoami', response: '>> Creative Developer & Digital Wizard' },
    { cmd: 'skills --show', response: '>> React, TypeScript, Three.js, Game Dev, UI/UX' },
    { cmd: 'projects --fun', response: '>> SynthWave Visualizer, AI Pixel Art, VR Code Editor' },
    { cmd: 'hobbies', response: '>> Gaming, Weightlifting, Cat Petting, Coffee Drinking' },
    { cmd: 'contact --now', response: '>> Ready to build something awesome together!' },
  ];
  
  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    const sectionMap: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
      'hero': heroRef,
      'about': aboutRef,
      'skills': skillsRef,
      'projects': projectsRef,
      'contact': contactRef,
    };
    
    const section = sectionMap[sectionId];
    if (section?.current) {
      section.current.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };
  
  // Generate floating particles
  const generateParticles = () => {
    if (!particlesEnabled) return null;
    return Array.from({ length: 30 }).map((_, i) => {
      const size = Math.random() * 20 + 5;
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;
      const colorIndex = Math.floor(Math.random() * themeColors.length);
      
      return (
        <motion.div
          key={i}
          className="particle"
          style={{
            width: size,
            height: size,
            background: themeColors[colorIndex],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, -200, -300],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            rotate: [0, 180, 360, 540],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      );
    });
  };
  
  return (
    <div className="portfolio-app" style={{ '--theme-color': themeColor } as React.CSSProperties}>
      {/* Background elements */}
      <div className="background-grid"></div>
      <div className="mouse-trail" style={{ left: mousePosition.x, top: mousePosition.y }}></div>
      <div className="particles-container">
        {generateParticles()}
      </div>
      
      {/* Custom audio element */}
      <audio ref={audioRef} loop>
        <source src="https://assets.codepen.io/1468070/synthwave-background.mp3" type="audio/mpeg" />
      </audio>
      
      {/* Control Panel */}
      <div className="control-panel">
        <motion.button 
          className="control-btn audio-btn"
          onClick={toggleAudio}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {audioPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          <span className="tooltip">{audioPlaying ? 'Pause Synthwave' : 'Play Synthwave'}</span>
        </motion.button>
        
        <motion.button 
          className="control-btn theme-btn"
          onClick={cycleThemeColor}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Sparkles size={20} />
          <span className="tooltip">Change Theme ({themeColor})</span>
        </motion.button>
        
        <motion.button 
          className="control-btn particle-btn"
          onClick={() => setParticlesEnabled(!particlesEnabled)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {particlesEnabled ? <Cloud size={20} /> : <Cloud size={20} />}
          <span className="tooltip">{particlesEnabled ? 'Hide Particles' : 'Show Particles'}</span>
        </motion.button>
        
        <motion.button 
          className="control-btn terminal-btn"
          onClick={() => setTerminalActive(!terminalActive)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Terminal size={20} />
          <span className="tooltip">{terminalActive ? 'Close Terminal' : 'Open Terminal'}</span>
        </motion.button>
      </div>
      
      {/* Terminal Popup */}
      <AnimatePresence>
        {terminalActive && (
          <motion.div 
            className="terminal-popup"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
          >
            <div className="terminal-header">
              <div className="terminal-title">dev_terminal.exe</div>
              <button className="terminal-close" onClick={() => setTerminalActive(false)}>×</button>
            </div>
            <div className="terminal-content">
              <div className="terminal-welcome">
                <div>Welcome to dev_terminal v2.0</div>
                <div>Type "help" for available commands</div>
              </div>
              {terminalCommands.map((cmd, i) => (
                <div key={i} className="terminal-line">
                  <span className="terminal-prompt">$</span>
                  <span className="terminal-command">{cmd.cmd}</span>
                  <div className="terminal-response">{cmd.response}</div>
                </div>
              ))}
              <div className="terminal-line">
                <span className="terminal-prompt">$</span>
                <span className="terminal-input">
                  <span className="cursor">█</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Navigation */}
      <Header scrollToSection={scrollToSection} activeSection={activeSection} themeColor={themeColor}></Header>
      
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="section hero"
        style={{ scale: heroScale, rotate: heroRotate }}
      >
        <div className="hero-content">
          <div className="hero-text">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="hero-badge">
                <Rocket size={16} />
                <span>Full Stack Developer</span>
                <span className="pulse-dot"></span>
              </div>
              
              <h1 className="hero-title">
                <span className="hero-line">I build</span>
                <span className="hero-line">
                  <span className="typing-text">
                    <span>digital experiences</span>
                    <span>fun interfaces</span>
                    <span>creative solutions</span>
                    <span>awesome websites</span>
                  </span>
                </span>
                <span className="hero-line">that make people smile</span>
                <span className="hero-emoji">😄</span>
              </h1>
              
              <p className="hero-subtitle">
                Transforming caffeine into code since 2018. 
                Specializing in creative frontend experiences, 
                interactive animations, and making the web more fun.
              </p>
              
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-number">200+</div>
                  <div className="stat-label">Cups of Coffee</div>
                </div>
                <div className="stat">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Projects Shipped</div>
                </div>
                <div className="stat">
                  <div className="stat-number">∞</div>
                  <div className="stat-label">Creative Ideas</div>
                </div>
              </div>
              
              <div className="hero-buttons">
                <motion.button 
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('projects')}
                >
                  <Gamepad2 size={18} />
                  Play My Projects
                </motion.button>
                
                <motion.button 
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTerminalActive(true)}
                >
                  <Terminal size={18} />
                  Open Terminal
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="floating-shapes">
              <motion.div 
                className="shape shape-1"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              ></motion.div>
              <motion.div 
                className="shape shape-2"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              ></motion.div>
              <motion.div 
                className="shape shape-3"
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              ></motion.div>
            </div>
            
            <div className="avatar-container">
              <div className="avatar">
                <div className="avatar-face">👨‍💻</div>
                <div className="avatar-glasses"></div>
              </div>
              <div className="avatar-ring"></div>
              <div className="avatar-ring ring-2"></div>
            </div>
            
            <div className="tech-icons">
              <motion.div 
                className="tech-icon"
                whileHover={{ scale: 1.2, rotate: 360 }}
              >
                <Code2 size={24} />
              </motion.div>
              <motion.div 
                className="tech-icon"
                whileHover={{ scale: 1.2, rotate: 360 }}
              >
                <Brain size={24} />
              </motion.div>
              <motion.div 
                className="tech-icon"
                whileHover={{ scale: 1.2, rotate: 360 }}
              >
                <Globe size={24} />
              </motion.div>
              <motion.div 
                className="tech-icon"
                whileHover={{ scale: 1.2, rotate: 360 }}
              >
                <Gamepad2 size={24} />
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          onClick={() => scrollToSection('about')}
        >
          <MousePointerClick size={20} />
          <span>Scroll to explore</span>
        </motion.div>
      </motion.section>
      
      {/* About Section */}
      <section ref={aboutRef} className="section about">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">
              <Sparkles size={20} />
              <span>About This Wizard</span>
            </div>
            <h2 className="section-title">
              Code by Day, 
              <span className="highlight"> Game Dev </span>
              by Night
            </h2>
            <p className="section-description">
              I believe coding should be as fun as playing a video game. 
              That's why I specialize in creating interactive, playful 
              experiences that engage users in unexpected ways.
            </p>
          </motion.div>
          
          <div className="about-content">
            <div className="about-funfacts">
              <h3>Fun Facts About Me</h3>
              <div className="funfacts-grid">
                {funFacts.map((fact, index) => (
                  <motion.div
                    key={index}
                    className="funfact-card"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    style={{ borderColor: fact.color }}
                  >
                    <div className="funfact-icon" style={{ color: fact.color }}>
                      {fact.icon}
                    </div>
                    <p>{fact.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div 
              className="about-philosophy"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="philosophy-card">
                <h3>My Development Philosophy</h3>
                <div className="philosophy-points">
                  <div className="point">
                    <div className="point-icon">🎮</div>
                    <div>
                      <h4>Make It Playful</h4>
                      <p>Every interaction should bring a moment of joy</p>
                    </div>
                  </div>
                  <div className="point">
                    <div className="point-icon">🎨</div>
                    <div>
                      <h4>Design with Personality</h4>
                      <p>Stand out from generic corporate designs</p>
                    </div>
                  </div>
                  <div className="point">
                    <div className="point-icon">⚡</div>
                    <div>
                      <h4>Performance Matters</h4>
                      <p>Fast experiences are more enjoyable experiences</p>
                    </div>
                  </div>
                  <div className="point">
                    <div className="point-icon">🤝</div>
                    <div>
                      <h4>User First, Always</h4>
                      <p>Accessibility and usability are non-negotiable</p>
                    </div>
                  </div>
                </div>
                
                <div className="quote">
                  <div className="quote-mark">"</div>
                  <p>If it's not fun, why build it?</p>
                  <div className="quote-author">— My coding mantra</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section ref={skillsRef} className="section skills">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">
              <Brain size={20} />
              <span>My Digital Arsenal</span>
            </div>
            <h2 className="section-title">
              Skills That <span className="highlight">Spark Joy</span>
            </h2>
            <p className="section-description">
              From frontend magic to backend wizardry, here's what I bring to the table.
              Hover over each skill to see my personal take on it!
            </p>
          </motion.div>
          
          <div className="skills-container">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, rotate: Math.random() * 4 - 2 }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="skill-header">
                  <div className="skill-emoji">{skill.emoji}</div>
                  <div className="skill-name">{skill.name}</div>
                  <div className="skill-level">{skill.level}%</div>
                </div>
                
                <div className="skill-progress">
                  <motion.div 
                    className="skill-progress-bar"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
                    style={{ backgroundColor: skill.color }}
                  />
                </div>
                
                <AnimatePresence>
                  {hoveredSkill === skill.name && (
                    <motion.div
                      className="skill-fun-description"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {skill.funDescription}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section ref={projectsRef} className="section projects">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">
              <Gamepad2 size={20} />
              <span>Playful Projects</span>
            </div>
            <h2 className="section-title">
              Things I Built <span className="highlight">For Fun</span>
            </h2>
            <p className="section-description">
              Each project is a playground where I experiment with new ideas
              and push the boundaries of what's possible on the web.
            </p>
          </motion.div>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
              >
                <div className="project-color-bar" style={{ backgroundColor: project.color }}></div>
                
                <div className="project-header">
                  <div className="project-icon" style={{ color: project.color }}>
                    {project.icon}
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-badge" style={{ backgroundColor: project.color }}>
                    Interactive
                  </div>
                </div>
                
                <p className="project-description">{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <div className="project-funfact">
                  <Sparkles size={14} />
                  {project.funFact}
                </div>
                
                <AnimatePresence>
                  {selectedProject === project.id && (
                    <motion.div
                      className="project-details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <h4>Why I Built This:</h4>
                      <p>
                        This project started as a weekend experiment and turned into 
                        a full-blown passion project. I wanted to combine my love for 
                        {index === 0 ? ' music and visuals' : index === 1 ? ' art and AI' : index === 2 ? ' VR and coding' : ' gaming and blockchain'} 
                        into something unique and entertaining.
                      </p>
                      <div className="project-actions">
                        <button className="project-action-btn">View Demo</button>
                        <button className="project-action-btn">View Code</button>
                        <button className="project-action-btn">Play Now</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section ref={contactRef} className="section contact">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">
              <MessageSquare size={20} />
              <span>Let's Chat!</span>
            </div>
            <h2 className="section-title">
              Ready to Build <span className="highlight">Something Fun?</span>
            </h2>
            <p className="section-description">
              Whether you need a creative website, an interactive experience,
              or just want to talk about cool tech, I'm your person.
            </p>
          </motion.div>
          
          <div className="contact-content">
            <motion.div 
              className="contact-form"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="form-header">
                <h3>Send a Digital Message</h3>
                <p>I typically respond within 24 hours. Emojis encouraged! 😄</p>
              </div>
              
              <form>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" placeholder="e.g., Alex the Adventurer" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" placeholder="your.email@adventure.com" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="project">Project Type</label>
                  <div className="project-type-selector">
                    {['Website', 'Web App', 'Game', 'Animation', 'Something Weird'].map(type => (
                      <button key={type} type="button" className="project-type-btn">
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    placeholder="Tell me about your awesome project idea..."
                  ></textarea>
                  <div className="char-count">0/500</div>
                </div>
                
                <motion.button 
                  type="submit" 
                  className="submit-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={18} />
                  Launch Message
                  <Zap size={16} />
                </motion.button>
              </form>
            </motion.div>
            
            <motion.div 
              className="contact-info"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="contact-methods">
                <h3>Other Ways to Connect</h3>
                
                <div className="contact-card">
                  <div className="contact-card-header">
                    <div className="contact-card-icon">💌</div>
                    <h4>Quick Response</h4>
                  </div>
                  <p>I love talking about creative projects. Hit me up anytime!</p>
                  <a href="mailto:hello@devwizard.com" className="contact-link">
                    hello@devwizard.com
                  </a>
                </div>
                
                <div className="contact-card">
                  <div className="contact-card-header">
                    <div className="contact-card-icon">🎮</div>
                    <h4>Game Together</h4>
                  </div>
                  <p>Want to play some games while we brainstorm? I'm always down!</p>
                  <div className="gamer-tag">
                    <span>Steam:</span> DevWizard_42
                  </div>
                </div>
                
                <div className="contact-card">
                  <div className="contact-card-header">
                    <div className="contact-card-icon">☕</div>
                    <h4>Virtual Coffee</h4>
                  </div>
                  <p>Let's have a virtual coffee chat and talk about tech, games, or cats!</p>
                  <button className="coffee-btn">
                    <Coffee size={16} />
                    Schedule a Chat
                  </button>
                </div>
              </div>
              
              <div className="social-links">
                <motion.a 
                  href="#" 
                  className="social-link"
                  whileHover={{ y: -5 }}
                >
                  <Code2 size={20} />
                  <span>GitHub</span>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-link"
                  whileHover={{ y: -5 }}
                >
                  <Gamepad2 size={20} />
                  <span>Itch.io</span>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-link"
                  whileHover={{ y: -5 }}
                >
                  <Video size={20} />
                  <span>YouTube</span>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-link"
                  whileHover={{ y: -5 }}
                >
                  <MessageSquare size={20} />
                  <span>Discord</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Cpu size={24} />
            </motion.div>
            <span>devWIZARD</span>
          </div>
          
          <div className="footer-tagline">
            Making the web more fun, one line of code at a time
          </div>
          
          <div className="footer-links">
            {['about', 'skills', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                className="footer-link"
                onClick={() => scrollToSection(item)}
              >
                {item}
              </button>
            ))}
          </div>
          
          <div className="footer-note">
            <Heart size={16} />
            <span>Made with fun in 2024 • Keep coding, keep playing</span>
            <Coffee size={16} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;