import { motion } from 'framer-motion';
import { Cpu, Zap, Sparkles } from 'lucide-react';
import '../App.css'
import { Navlist } from './Navlist';

// child types
type childProps = {
  scrollToSection: (val: string) => void,
  activeSection: string,
  themeColor: string
}

export const Header = ({scrollToSection , activeSection, themeColor} : childProps) => {
    return(

<nav className="navbar">
        <motion.div 
          className="logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Cpu size={28} />
          <span>Ram Ram |<span className="logo-accent">Welcome</span></span>
          <Sparkles size={16} className="sparkle" />
        </motion.div>
        
        {/*Navlist*/}
        <Navlist scrollToSection={scrollToSection} activeSection={activeSection}></Navlist>
        
        {/*Nav button*/}
        <motion.button 
          className="cta-button"
          onClick={() => scrollToSection('contact')}
          whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${themeColor}` }}
          whileTap={{ scale: 0.95 }}
        >
          <Zap size={18} />
          Let's Build!
        </motion.button>
      </nav>

    )
}

