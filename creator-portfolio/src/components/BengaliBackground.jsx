import { motion } from 'framer-motion';
import { GiLotusFlower, GiFlowerTwirl, GiFlowerStar, GiFlowerEmblem } from 'react-icons/gi';

export default function BengaliBackground() {
  // We place various mehendi/alpana style vectors across the background
  const mehendiElements = [
    { Icon: GiLotusFlower, top: '2%', left: '-5%', size: 280, delay: 0 },
    { Icon: GiFlowerTwirl, top: '15%', right: '-8%', size: 350, delay: 2 },
    { Icon: GiFlowerEmblem, top: '45%', left: '10%', size: 180, delay: 4 },
    { Icon: GiFlowerStar, bottom: '25%', right: '5%', size: 220, delay: 1 },
    { Icon: GiFlowerTwirl, bottom: '-5%', left: '-5%', size: 300, delay: 3 },
    { Icon: GiLotusFlower, top: '60%', right: '25%', size: 160, delay: 5 },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: -1,
      overflow: 'hidden',
      pointerEvents: 'none',
      backgroundColor: 'var(--color-bg)'
    }}>
      {/* The colorful Bengali vibe mesh background (Alta Red, Marigold) */}
      <div className="bengali-mesh-bg" />

      {/* Floating fading Mehendi Patterns */}
      {mehendiElements.map((el, index) => {
        const { Icon } = el;
        return (
          <motion.div
            key={index}
            animate={{ opacity: [0, 0.15, 0], scale: [0.95, 1.05, 0.95], rotate: [0, 5, -5, 0] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: el.delay
            }}
            style={{
              position: 'absolute',
              top: el.top,
              left: el.left,
              right: el.right,
              bottom: el.bottom,
              color: '#d68585', // Soft, light watercolor alta pink 
            }}
          >
            <Icon size={el.size} />
          </motion.div>
        );
      })}

      {/* Animated Realistic Green Branch */}
      {/* Animated Realistic Green Branch */}
      <motion.div
        animate={{ 
          clipPath: [
            "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", // 0s: Completely Hidden on the right
            "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)",     // 5s: Fully revealed across
            "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)",     // 8s: Held in place
            "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"  // 10s: Vanished retreating right
          ],
          opacity: [0, 0.25, 0.25, 0] // Decreased to 25% peak opacity for a beautifully light wash
        }}
        transition={{ 
          duration: 10, 
          times: [0, 0.5, 0.8, 1], // Timing mapping: Grows for 5s (0.5*10), Holds 3s (0.8*10), Vanishes in 2s (1.0*10).
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{
          position: 'absolute',
          top: '-2%',
          right: '0%',
          width: '50vw',
          minWidth: '400px',
          maxWidth: '700px',
          pointerEvents: 'none',
          mixBlendMode: 'multiply', /* Magically removes pure white backgrounds! */
        }}
      >
        <img 
          src="/vibrant_green_branch.png" 
          alt="Branch" 
          style={{ 
            width: '100%', 
            display: 'block',
            transform: 'scaleX(-1)' // Flips it natively so it stems from the right!
          }} 
        />
      </motion.div>
    </div>
  );
}
