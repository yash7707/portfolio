import { motion } from 'framer-motion';

// child types
type childProps = {
  scrollToSection: (val: string) => void,
  activeSection: string,
}

export const Navlist = ({scrollToSection , activeSection} : childProps) => {
    return (
         <div className="nav-links">
          {['about', 'skills', 'projects', 'contact'].map((item) => (
            <motion.button
              key={item}
              className={`nav-link ${activeSection === item ? 'active' : ''}`}
              onClick={() => scrollToSection(item)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {item}
              {activeSection === item && (
                <motion.div 
                  className="nav-link-underline" 
                  layoutId="nav-underline"
                />
              )}
            </motion.button>
          ))}
        </div>
    )
}