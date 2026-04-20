import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DIARIES = [
  {
    id: 'cultural',
    title: 'Cultural Lookbook',
    subtitle: 'Sarees, bindis, and pure Bengali aesthetics.',
    type: 'masonry',
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1434389670869-c8ea23c316eb?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1492446845049-9c50cc313f00?auto=format&fit=crop&q=80&w=600",
    ]
  },
  {
    id: 'festive',
    title: 'Festive Vibes',
    subtitle: 'Grand moments and golden hours.',
    type: 'bento',
    images: [
      "https://images.unsplash.com/photo-1544280590-534d0b04a081?auto=format&fit=crop&q=80&w=1200", // Main wide
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=500", 
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=500",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=500"
    ]
  },
  {
    id: 'everyday',
    title: 'Everyday Magic',
    subtitle: 'Finding poetry in the ordinary streets.',
    type: 'cinematic',
    images: [
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1000", // wide top
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=500", // port left
      "https://images.unsplash.com/photo-1512496115851-a52fb6108d5e?auto=format&fit=crop&q=80&w=500", // port right
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000", // wide bottom
    ]
  }
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

export default function PhotoGallery() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextDiary = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % DIARIES.length);
  };

  const prevDiary = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? DIARIES.length - 1 : prev - 1));
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = offset.x;
    if (swipe < -50) nextDiary();
    else if (swipe > 50) prevDiary();
  };

  const activeDiary = DIARIES[index];

  const renderLayout = (diary) => {
    if (diary.type === 'masonry') {
      return (
        <div style={{ columns: '3 250px', columnGap: '20px' }}>
          {diary.images.map((src, i) => (
            <motion.div whileHover={{ scale: 1.02 }} key={i} style={{ marginBottom: '20px', breakInside: 'avoid', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
              <img draggable={false} src={src} style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
            </motion.div>
          ))}
        </div>
      );
    } 
    else if (diary.type === 'bento') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Main Hero Shot */}
          <motion.div whileHover={{ scale: 1.01 }} style={{ width: '100%', height: '500px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 24px rgba(0,0,0,0.1)' }}>
            <img draggable={false} src={diary.images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
          {/* Trio of supporting shots */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {diary.images.slice(1).map((src, i) => (
              <motion.div whileHover={{ scale: 1.03 }} key={i} style={{ flex: '1 1 250px', height: '350px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 16px rgba(0,0,0,0.08)' }}>
                <img draggable={false} src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>
            ))}
          </div>
        </div>
      );
    }
    else { // cinematic
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <motion.div whileHover={{ scale: 1.01 }} style={{ width: '100%', height: '350px', borderRadius: '16px', overflow: 'hidden' }}>
            <img draggable={false} src={diary.images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <motion.div whileHover={{ scale: 1.02 }} style={{ flex: '1 1 300px', height: '400px', borderRadius: '16px', overflow: 'hidden' }}>
              <img draggable={false} src={diary.images[1]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} style={{ flex: '1 1 300px', height: '400px', borderRadius: '16px', overflow: 'hidden' }}>
              <img draggable={false} src={diary.images[2]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
          </div>
          <motion.div whileHover={{ scale: 1.01 }} style={{ width: '100%', height: '350px', borderRadius: '16px', overflow: 'hidden' }}>
            <img draggable={false} src={diary.images[3]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        </div>
      );
    }
  };

  return (
    <section id="gallery" style={{ padding: '100px 5%', maxWidth: '1200px', margin: '0 auto', overflowX: 'hidden' }}>
      
      {/* Header and Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="bengali-display" style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '8px' }}>
            Visual Diaries
          </h2>
          <p style={{ color: 'var(--color-accent)' }}>Swipe or click to explore different moments.</p>
        </motion.div>

        {/* Carousel UI Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={prevDiary} className="glass" style={{ width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', color: 'var(--color-primary)' }}>
            <FaChevronLeft size={18} />
          </button>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            {DIARIES.map((_, i) => (
              <div 
                key={i} 
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                style={{
                  width: '12px', height: '12px', borderRadius: '50%', cursor: 'pointer',
                  backgroundColor: i === index ? 'var(--color-primary)' : 'rgba(155, 28, 28, 0.2)',
                  transition: 'background 0.3s ease'
                }} 
              />
            ))}
          </div>

          <button onClick={nextDiary} className="glass" style={{ width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', color: 'var(--color-primary)' }}>
            <FaChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Diary Title Display */}
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h3 className="bengali-display" style={{ fontSize: '2rem', color: 'var(--color-text)' }}>{activeDiary.title}</h3>
        <p style={{ fontStyle: 'italic', color: '#666' }}>{activeDiary.subtitle}</p>
      </div>

      {/* Swipeable Container */}
      <div style={{ position: 'relative', minHeight: '800px' }}>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            style={{ width: '100%' }}
          >
            {renderLayout(activeDiary)}
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
}
