import { motion } from 'framer-motion';
import { FaInstagram, FaYoutube, FaTwitter, FaArrowRight } from 'react-icons/fa';

export default function ContactFooter() {
  return (
    <footer style={{ position: 'relative', overflow: 'hidden', padding: '100px 0 0 0', background: 'transparent' }}>

      {/* Infinite scrolling Marquee for Gen-Z Vibe */}
      <div style={{
        display: 'flex',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        borderTop: '1px solid rgba(155, 28, 28, 0.4)',
        borderBottom: '1px solid rgba(155, 28, 28, 0.4)',
        padding: '16px 0',
        transform: 'rotate(-2deg) scale(1.05)',
        background: 'transparent', // Looks cooler when blending directly with the background
        zIndex: 2,
        position: 'relative'
      }}>
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
          className="bengali-display"
          style={{ display: 'flex', gap: '30px', fontSize: '2.2rem', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '4px' }}
        >
          {Array(15).fill("").map((_, i) => (
            <span key={i} style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
              <span style={{ fontWeight: 800 }}>COLLAB</span>
              <span style={{ fontSize: '1.2rem', color: 'var(--color-accent)' }}>✦</span>
              {/* Hollow Outlined Text Effect */}
              <span style={{ color: 'transparent', WebkitTextStroke: '1px var(--color-primary)' }}>SPONSORSHIP</span>
              <span style={{ fontSize: '1.2rem', color: 'var(--color-accent)' }}>✦</span>
              <span style={{ fontStyle: 'italic', fontWeight: 600 }}>BRAND DEALS</span>
              <span style={{ fontSize: '1.2rem', color: 'var(--color-accent)' }}>✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '100px auto',
        padding: '0 5%',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '60px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>

        {/* Left Side: Huge Typography & Neo-Brutalist touch */}
        <div style={{ flex: '1 1 500px' }}>
          <h2 style={{ fontSize: 'clamp(4rem, 6vw, 6rem)', lineHeight: '1', color: 'var(--color-text)', marginBottom: '16px', letterSpacing: '-0.04em' }}>
            Ready to <br />
            <span style={{ color: 'var(--color-primary)', fontStyle: 'italic', fontFamily: 'Lora, serif' }}>create magic?</span>
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-accent)', maxWidth: '400px', marginBottom: '40px' }}>
            Whether it's a creative campaign or just to say hi, my DMs are always open. Act fast, the vibe doesn't wait.
          </p>

          <motion.a
            whileHover={{ scale: 1.02, x: 5, y: -5, boxShadow: '15px 15px 0px var(--color-secondary)' }}
            whileTap={{ scale: 0.98, x: 0, y: 0, boxShadow: '0px 0px 0px var(--color-secondary)' }}
            href="mailto:hello@example.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: 'var(--color-primary)',
              color: '#FFF',
              padding: '20px 40px',
              fontSize: '1.2rem',
              fontFamily: 'Lora, serif',
              fontWeight: 600,
              textDecoration: 'none',
              borderRadius: '0', // Bold sharp edges
              border: '2px solid var(--color-text)',
              boxShadow: '10px 10px 0px var(--color-secondary)',
              cursor: 'pointer',
              transition: 'box-shadow 0.2s ease, transform 0.2s ease'
            }}
          >
            Slide in my Email <FaArrowRight />
          </motion.a>
        </div>

        {/* Right Side: Glassmorphic Social Hub (Linktree Alternative) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass"
          style={{
            flex: '1 1 350px',
            padding: '40px',
            borderRadius: '24px',
            border: '1px solid var(--glass-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
        >
          <h3 className="bengali-display" style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '10px' }}>
            Find me online
          </h3>

          {[
            { icon: <FaInstagram size={28} />, name: 'Instagram', handle: '@srija.vibes', link: '#' },
            { icon: <FaYoutube size={28} />, name: 'YouTube', handle: 'srija Aesthetics', link: '#' },
            { icon: <FaTwitter size={28} />, name: 'Twitter (X)', handle: '@srija_x', link: '#' }
          ].map((social, idx) => (
            <motion.a
              key={idx}
              whileHover={{ x: 10, color: 'var(--color-primary)' }}
              href={social.link}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                color: 'var(--color-text)',
                textDecoration: 'none',
                paddingBottom: '20px',
                borderBottom: '1px solid rgba(200,156,60,0.3)'
              }}
            >
              <div style={{ background: 'var(--color-bg)', padding: '16px', borderRadius: '50%', color: 'var(--color-primary)', display: 'flex' }}>
                {social.icon}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, fontSize: '1.2rem', fontFamily: 'Lora, serif' }}>{social.name}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-accent)' }}>{social.handle}</span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Bottom Legal Footer */}
      <div style={{ textAlign: 'center', padding: '40px 0', borderTop: '1px solid rgba(155, 28, 28, 0.1)' }}>
        <p style={{ color: 'var(--color-accent)', fontSize: '0.9rem', fontWeight: 500, fontFamily: 'Lora, serif' }}>
          © {new Date().getFullYear()} Srija_0828 . Crafted with ♥ by Bhuban and filter-free vibes.
        </p>
      </div>
    </footer>
  );
}
