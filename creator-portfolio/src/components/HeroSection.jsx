import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Swap these links out with your 3 or 4 local DP filenames!
const DP_IMAGES = [
  "/dp01.png",
  "/dp02.png",
  "/dp03.png",
  "/dp04.png",

];

export default function HeroSection() {
  const [currentDpIndex, setCurrentDpIndex] = useState(0);

  useEffect(() => {
    // Automatically fades to the next picture every 3.5 seconds
    const interval = setInterval(() => {
      setCurrentDpIndex((prev) => (prev + 1) % DP_IMAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);
  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 5% 0 5%',
    }}>
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px',
        alignItems: 'center'
      }}>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '1.2rem', display: 'block', marginBottom: '16px', fontStyle: 'italic' }}
          >
            Aesthetic Muse & Digital Creator
          </motion.span>

          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', lineHeight: '1.1', marginBottom: '24px', color: 'var(--color-text)' }}>
            The essence of <br />
            <span style={{ color: 'var(--color-primary)' }}>MySelf</span> in <br /> modern frames.
          </h1>

          <p style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '400px' }}>
            Be like the moon,
            even alone it doesn't stop shining✨
            ‧͙⁺˚*･༓☾　☽༓･*˚⁺‧͙         </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '16px 36px',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#fff',
              backgroundColor: 'var(--color-primary)',
              border: '2px solid var(--color-secondary)',
              borderRadius: '0px', // Traditional sharp edges
              fontFamily: 'Lora, serif',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 10px 20px rgba(155, 28, 28, 0.2)'
            }}
          >
            Work with me <ArrowRight size={18} />
          </motion.button>
        </motion.div>

        {/* Image Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
        >
          {/* Decorative glowing blob behind image */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'var(--color-secondary)',
            filter: 'blur(80px)',
            opacity: 0.4,
            borderRadius: '50%',
            zIndex: 0
          }} />

          {/* Auto-Rotating Hero Image Slideshow */}
          <div style={{
            width: '100%',
            maxWidth: '450px',
            height: '600px',
            position: 'relative',
            zIndex: 1,
            borderRadius: '200px 200px 0 0', /* Subtle arch shape a la historical windows */
            borderBottom: '8px solid var(--color-secondary)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            overflow: 'hidden',
            backgroundColor: 'var(--color-bg)'
          }}>
            <AnimatePresence>
              <motion.img
                key={currentDpIndex}
                src={DP_IMAGES[currentDpIndex]}
                alt="Creator Portrait"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </AnimatePresence>
          </div>

          {/* Floating Glass Badges */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="glass-card"
            style={{ position: 'absolute', top: '10%', left: '0', padding: '16px 24px', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '0' }}
          >
            <span style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--color-primary)', fontFamily: 'Rozha One, serif' }}>500K+</span>
            <span style={{ fontSize: '0.8rem', color: '#666' }}>Followers</span>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
