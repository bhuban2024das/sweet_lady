import { motion } from 'framer-motion';
import { FaInstagram, FaPlayCircle, FaEnvelope, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

export default function Navbar({ isBgMuted, setIsBgMuted }) {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: 'fixed',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '85%',
        maxWidth: '850px', // Width a little less, making it a floating pill
        display: 'flex',
        flexWrap: 'wrap', // Responsive wrapping for tight mobile devices
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 28px', // Thinner top/bottom padding for a sleek profile
        borderRadius: '50px',
        zIndex: 100,
        background: 'rgba(252, 245, 236, 0.8)', // Frosted Garad Silk
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(200, 156, 60, 0.4)', // Antique Gold border
        boxShadow: '0 10px 30px rgba(155, 28, 28, 0.08)' // Subtle Alta-tinted shadow
      }}
    >
      <div className="bengali-display" style={{ fontSize: '1.8rem', color: 'var(--color-primary)' }}>
        শ্রীজা_0828
      </div>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <a href="#home" style={{ textDecoration: 'none', color: 'var(--color-text)', fontStyle: 'italic' }}>Home</a>
        <a href="#reels" style={{ textDecoration: 'none', color: 'var(--color-text)', fontStyle: 'italic' }}>Reels</a>
        <a href="#gallery" style={{ textDecoration: 'none', color: 'var(--color-text)', fontStyle: 'italic' }}>Gallery</a>

        {/* Explicit Music Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsBgMuted(!isBgMuted)}
          style={{
            color: isBgMuted ? '#666' : '#fff',
            background: isBgMuted ? 'transparent' : 'var(--color-primary)',
            border: '1px solid var(--color-primary)',
            borderRadius: '20px',
            cursor: 'pointer',
            padding: '4px 12px',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginLeft: '12px'
          }}
        >
          {isBgMuted ? "🔈 Sound Off" : "🔊 Sound On"}
        </motion.button>
      </div>

      {/* Social Icons Container */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
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
