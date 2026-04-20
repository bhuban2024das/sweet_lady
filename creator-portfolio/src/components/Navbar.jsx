import { motion } from 'framer-motion';
import { FaInstagram, FaPlayCircle, FaEnvelope } from 'react-icons/fa';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '1200px',
        display: 'flex',
        flexWrap: 'wrap', // Responsive wrapping for tight mobile devices
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 32px',
        borderRadius: '100px',
        zIndex: 100,
      }}
      className="glass"
    >
      <div className="bengali-display" style={{ fontSize: '1.8rem', color: 'var(--color-primary)' }}>
        রূপকথা
      </div>
      
      <div style={{ display: 'flex', gap: '24px' }}>
        <a href="#home" style={{ textDecoration: 'none', color: 'var(--color-text)', fontStyle: 'italic' }}>Home</a>
        <a href="#reels" style={{ textDecoration: 'none', color: 'var(--color-text)', fontStyle: 'italic' }}>Reels</a>
        <a href="#gallery" style={{ textDecoration: 'none', color: 'var(--color-text)', fontStyle: 'italic' }}>Gallery</a>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} href="#" style={{ color: 'var(--color-text)' }}>
          <FaInstagram size={20} />
        </motion.a>
        <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} href="#" style={{ color: 'var(--color-text)' }}>
          <FaPlayCircle size={20} />
        </motion.a>
        <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} href="#" style={{ color: 'var(--color-text)' }}>
          <FaEnvelope size={20} />
        </motion.a>
      </div>
    </motion.nav>
  );
}
