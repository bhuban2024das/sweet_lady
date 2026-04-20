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
      "/home01.jpg",
      "/home02.jpg",
      "/home03.jpg",
      "/home04.jpg",
      "/home05.jpg",
      "/home06.jpg",



    ]
  },
  {
    id: 'festive',
    title: 'Festive Vibes',
    subtitle: 'Grand moments and golden hours.',
    type: 'bento',
    images: [


      "/cafe01.png",
      "/cafe02.png",
      "/cafe03.png",
      "/cafe04.png",
      "/cafe05.png",
      "/cafe06.png",
    ]
  },
  {
    id: 'everyday',
    title: 'Everyday Magic',
    subtitle: 'Finding poetry in the ordinary streets.',
    type: 'cinematic',
    images: [
      "/pose01.heic",
      "/pose02.heic",
      "/pose03.heic",
      "/pose04.heic",
      "/pose05.heic",
      "/pose06.heic",
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
          {diary.images.map((src, i) => {
            // Force random masonry stagger by hardcoding varied heights even if uploaded images are all squares
            const staggerHeight = i % 2 === 0 ? '420px' : i % 3 === 0 ? '250px' : '360px';
            return (
              <motion.div whileHover={{ scale: 1.02 }} key={i} style={{ marginBottom: '20px', breakInside: 'avoid', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', height: staggerHeight }}>
                <img draggable={false} src={src} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
              </motion.div>
            );
          })}
        </div>
      );
    } 
    else if (diary.type === 'bento') {
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {diary.images.map((src, i) => {
            // Bento Box layout mathematically forces 1 large hero banner, and mixed medium squares below it safely wrapping.
            const boxBasis = i === 0 ? '100%' : (i === 3 || i === 4) ? '45%' : '25%';
            const boxHeight = i === 0 ? '450px' : '280px';
            return (
              <motion.div whileHover={{ scale: 1.03 }} key={i} style={{ flexGrow: 1, flexShrink: 1, flexBasis: boxBasis, height: boxHeight, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 16px rgba(0,0,0,0.08)' }}>
                <img draggable={false} src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>
            );
          })}
        </div>
      );
    }
    else { // cinematic
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {diary.images.map((src, i) => {
            // Cinematic layout focuses on extremely tall side-by-side portraits randomly interrupted by wide panoramic shots.
            const cineBasis = i === 2 || i === 5 ? '100%' : '45%';
            const cineHeight = i === 2 || i === 5 ? '300px' : '550px';
            return (
              <motion.div whileHover={{ scale: 1.02 }} key={i} style={{ flexGrow: 1, flexShrink: 1, flexBasis: cineBasis, height: cineHeight, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                <img draggable={false} src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>
            );
          })}
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
