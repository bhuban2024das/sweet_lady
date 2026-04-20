import { motion } from 'framer-motion';
import { useState } from 'react';
import { Play } from 'lucide-react';

const REELS = [
  { id: 1, views: "1.2M", title: "GRWM for fashion week 💫", video: "/reels-1.mp4", poster: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=400&h=700" },
  { id: 2, views: "850K", title: "My everyday makeup routine", video: "/reels-2.mp4", poster: "https://images.unsplash.com/photo-1512496115851-a52fb6108d5e?auto=format&fit=crop&q=80&w=400&h=700" },
  { id: 3, views: "2.5M", title: "Aesthetic morning coffee ☕", video: "/reels-3.mp4", poster: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=400&h=700" },
  { id: 4, views: "500K", title: "Outfit of the day ✨", video: "/reels-4.mp4", poster: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400&h=700" },
  { id: 5, views: "9M", title: "GRWM for fashion week 💫", video: "/reels-5.mp4", poster: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=400&h=700" },
  { id: 6, views: "888K", title: "My everyday makeup routine", video: "/reels-6.mp4", poster: "https://images.unsplash.com/photo-1512496115851-a52fb6108d5e?auto=format&fit=crop&q=80&w=400&h=700" },
];

export default function ReelsGrid({ onVideoPlayStateChange }) {
  const [activeReelId, setActiveReelId] = useState(null);

  return (
    <section id="reels" style={{ padding: '100px 5%', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
      >
        <div>
          <h2 style={{ fontSize: '3rem', color: 'var(--color-text)', marginBottom: '8px' }}>Latest Reels</h2>
          <p style={{ color: 'var(--color-accent)' }}>Catch up on my recent video diaries.</p>
        </div>
        <a href="#" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>View all on Instagram →</a>
      </motion.div>

      {/* Horizontal scrolling container */}
      <div
        className="no-scrollbar"
        style={{
          display: 'flex',
          gap: '24px',
          overflowX: 'auto',
          paddingBottom: '40px',
          scrollSnapType: 'x mandatory'
        }}
      >
        {REELS.map((reel, idx) => (
          <motion.div
            key={reel.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            animate={{
              scale: activeReelId === reel.id ? 1.05 : 1,
            }}
            whileHover={{ y: -10 }}
            onClick={(e) => {
              const clickedVid = e.currentTarget.querySelector('video');
              if (clickedVid) {
                // If it is already unmuted, the user is clicking to silence it
                if (!clickedVid.muted) {
                  clickedVid.muted = true;
                  setActiveReelId(null);
                  if (onVideoPlayStateChange) onVideoPlayStateChange(false);
                  return;
                }

                // Mute all other videos on the entire page
                document.querySelectorAll('video').forEach(v => {
                  v.muted = true;
                });

                // Unmute the clicked video
                clickedVid.muted = false;
                setActiveReelId(reel.id);
                if (onVideoPlayStateChange) onVideoPlayStateChange(true); // Silence background music immediately

                clickedVid.play().catch(() => {
                  // Fallback if browser blocks unmuting
                  clickedVid.muted = true;
                  setActiveReelId(null);
                  if (onVideoPlayStateChange) onVideoPlayStateChange(false);
                  clickedVid.play().catch(() => { });
                });
              }
            }}
            style={{
              minWidth: '280px',
              height: '450px',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              scrollSnapAlign: 'start',
              boxShadow: '0 15px 30px rgba(0,0,0,0.08)',
              cursor: 'pointer'
            }}
          >
            <video
              src={reel.video}
              poster={reel.poster}
              autoPlay
              loop
              muted
              playsInline
              onPause={(e) => {
                // If it gets hopelessly stuck, force restart
                e.target.play().catch(() => { });
              }}
              onEnded={(e) => {
                e.target.play().catch(() => { });
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor: '#e0e0e0', pointerEvents: 'none' }}
            />
            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)'
            }} />

            {/* Content OVER image */}
            <div style={{ position: 'absolute', top: '16px', right: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.4)', padding: '4px 10px', borderRadius: '20px', backdropFilter: 'blur(4px)', fontSize: '0.8rem', fontWeight: 600 }}>
              <Play size={14} fill="#fff" /> {reel.views}
            </div>

            <div style={{ position: 'absolute', bottom: '24px', left: '20px', right: '20px', color: '#fff', zIndex: 10 }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 500, lineHeight: '1.3', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{reel.title}</h3>
            </div>

            {/* Play Button Overlay on Hover -> now just decorative to show it's a video */}
            <motion.div
              className="glass"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none', /* let the parent hover handle it */
                zIndex: 10
              }}
            >
              <Play size={24} color="#fff" fill="#fff" style={{ marginLeft: '4px' }} />
            </motion.div>

          </motion.div>
        ))}
      </div>
    </section>
  );
}
