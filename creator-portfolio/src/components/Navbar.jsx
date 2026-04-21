import { motion } from 'framer-motion';
import { FaInstagram, FaPlayCircle, FaEnvelope, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

export default function Navbar({ isBgMuted, setIsBgMuted }) {
  return (
    <motion.nav
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="nav-wrapper"
      style={{
        position: 'fixed',
        top: '24px',
        left: '50%',
        // transform: 'translateX(-50%)' IS MOVED TO FRAMER MOTION ABOVE
        width: '85%',
        maxWidth: '850px',
        display: 'flex',
        flexWrap: 'nowrap', // Strictly NEVER wrap. Let the CSS squish the gap naturally!
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '30px',
        zIndex: 100,
        background: 'rgba(252, 245, 236, 0.8)', 
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(200, 156, 60, 0.4)', 
        boxShadow: '0 10px 30px rgba(155, 28, 28, 0.08)'
      }}
    >
      <div className="bengali-display nav-title" style={{ color: 'var(--color-primary)' }}>
        শ্রীজা_0828
      </div>

      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', whiteSpace: 'nowrap' }}>
        <a href="#home" className="nav-link" style={{ textDecoration: 'none', color: 'var(--color-text)', fontStyle: 'italic' }}>Home</a>
        <a href="#reels" className="nav-link" style={{ textDecoration: 'none', color: 'var(--color-text)', fontStyle: 'italic' }}>Reels</a>
        <a href="#gallery" className="nav-link" style={{ textDecoration: 'none', color: 'var(--color-text)', fontStyle: 'italic' }}>Gallery</a>

        {/* Clean Vector Music Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsBgMuted(!isBgMuted)}
          className="nav-btn"
          style={{
            color: isBgMuted ? 'var(--color-text)' : '#fff',
            background: isBgMuted ? 'transparent' : 'var(--color-primary)',
            border: '1px solid var(--color-primary)',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: 700,
            whiteSpace: 'nowrap', // Ensure the icons don't stack above the text on narrow displays!
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {isBgMuted ? (
            <><FaVolumeMute size={12} /> OFF</>
          ) : (
            <><FaVolumeUp size={12} /> ON</>
          )}
        </motion.button>
      </div>
    </motion.nav>
  );
}
