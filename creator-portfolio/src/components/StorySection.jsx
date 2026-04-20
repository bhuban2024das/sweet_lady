import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// You can edit the stories here! They support images, images with audio, and videos.
const MOCK_STORIES = [
  // {
  //   id: 1,
  //   type: 'image',
  //   url: 'https://images.unsplash.com/photo-1542385151-efd5cc02c525?auto=format&fit=crop&q=80&w=1080&h=1920',
  //   duration: 5000
  // }, // Image only
  // { 
  //   id: 2, 
  //   type: 'video', 
  //   url: '/reels01.mp4' 
  // }, // Video (Will wait until video ends)
  // { 
  //   id: 3, 
  //   type: 'image', 
  //   url: 'https://images.unsplash.com/photo-1610214690835-ed230230f878?auto=format&fit=crop&q=80&w=1080&h=1920', 
  //   audio: 'https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3', // Audio plays in background
  //   duration: 5000 
  // }

  {
    id: 1,
    type: 'image',
    url: '/ss01.jpeg',
    duration: 5000
  },
  {
    id: 2,
    type: 'image',
    url: '/ss02.jpeg',
    duration: 5000
  },
  {
    id: 3,
    type: 'image',
    url: '/ss03.jpeg',
    duration: 5000
  },
  {
    id: 4,
    type: 'image',
    url: '/ss04.jpeg',
    duration: 5000
  },
  {
    id: 5,
    type: 'image',
    url: '/ss05.jpeg',
    duration: 5000
  },
  {
    id: 6,
    type: 'image',
    url: '/ss06.jpeg',
    duration: 5000
  },
  {
    id: 7,
    type: 'image',
    url: '/ss07.jpeg',
    duration: 5000
  },
  {
    id: 8,
    type: 'image',
    url: '/ss08.jpeg',
    duration: 5000
  },
  {
    id: 9,
    type: 'image',
    url: '/ss09.jpeg',
    duration: 5000
  },
  {
    id: 10,
    type: 'image',
    url: '/ss10.jpeg',
    duration: 5000
  },
  {
    id: 11,
    type: 'image',
    url: '/ss11.jpeg',
    duration: 5000
  },

];

const STORY_DURATION = 5000;

function StoryViewer({ stories, onClose, onMediaPlayStateChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  // Dynamically analyze the current slide and tell the root app to pause background music ONLY if this slide is noisy!
  useEffect(() => {
    if (!stories[currentIndex]) return;
    const isNoisy = stories[currentIndex].type === 'video' || !!stories[currentIndex].audio;
    if (onMediaPlayStateChange) onMediaPlayStateChange(isNoisy);
  }, [currentIndex, stories, onMediaPlayStateChange]);

  useEffect(() => {
    let animationFrameId;
    let startTime = Date.now();
    const currentStory = stories[currentIndex];

    // Reset progress when index changes
    setProgress(0);

    // If it is a video, we let the video's onTimeUpdate handle the progress
    if (currentStory.type === 'video') return;

    const durationToUse = currentStory.duration || STORY_DURATION;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / durationToUse) * 100;

      if (newProgress >= 100) {
        setProgress(100);
        handleNext();
      } else {
        setProgress(newProgress);
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, [currentIndex, stories]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onClose(); // Auto close when all stories finish
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setProgress(0); // Restart first story
    }
  };

  const current = stories[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      onClick={onClose} // Clicking outside the story box will close it
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999, // On top of absolutely everything
        background: 'transparent', // The portfolio remains completely unaffected behind it
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        pointerEvents: 'auto' // Capture backdrop clicks
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent clicks *inside* the story from closing it
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '450px',
          height: '85vh', // Appears as a floating popup card rather than full screen
          background: '#111',
          borderRadius: '24px',
          overflow: 'hidden',
          pointerEvents: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)'
        }}>

        {/* Instagram segment progress bars */}
        <div style={{ position: 'absolute', top: 20, left: 10, right: 10, display: 'flex', gap: 4, zIndex: 10 }}>
          {stories.map((_, idx) => {
            let width = '0%';
            if (idx < currentIndex) width = '100%';
            if (idx === currentIndex) width = `${progress}%`;

            return (
              <div key={idx} style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.3)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  background: '#fff',
                  width: width,
                  // Videos update in chunks via react state, images update smoothly via animation frames!
                  transition: current.type === 'video' ? 'width 0.1s linear' : 'none'
                }} />
              </div>
            );
          })}
        </div>

        {/* User Info Overlay */}
        <div style={{ position: 'absolute', top: 35, left: 15, zIndex: 10, display: 'flex', alignItems: 'center', gap: 10, color: '#fff' }}>
          <img src="/dp01.png" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ fontWeight: 600, fontSize: '0.9rem', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>Srija</span>
          <span style={{ fontSize: '0.8rem', opacity: 0.8, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>12h</span>
        </div>

        {/* Close Button */}
        <button onClick={onClose} style={{ position: 'absolute', top: 35, right: 15, zIndex: 10, background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
          <X size={28} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
        </button>

        {/* Story Media Render */}
        <div style={{ width: '100%', height: '100%' }}>
          {current.type === 'image' ? (
            <img src={current.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <video
              ref={videoRef}
              src={current.url}
              autoPlay
              playsInline
              onTimeUpdate={(e) => {
                if (e.target.duration) {
                  setProgress((e.target.currentTime / e.target.duration) * 100);
                }
              }}
              onEnded={handleNext}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}

          {/* Background Audio Player for Images if it exists */}
          {current.audio && (
            <audio src={current.audio} autoPlay />
          )}
        </div>

        {/* Invisible Tap Zones for Navigation */}
        <div onClick={handlePrev} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '30%', zIndex: 5 }} />
        <div onClick={handleNext} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '70%', zIndex: 5 }} />
      </div>
    </motion.div>
  );
}


const ROTATING_DPS = [
  "/dp01.png",
  "/dp02.png",
  "/dp03.png",
  "/dp04.png",
];

export default function StorySection({ onStoryOpenChange }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [hasViewed, setHasViewed] = useState(false);
  const [currentDpIndex, setCurrentDpIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDpIndex((prev) => (prev + 1) % ROTATING_DPS.length);
    }, 3500); 
    return () => clearInterval(interval);
  }, []);

  const openStory = () => {
    setIsViewerOpen(true);
    setHasViewed(true);
  };

  const closeStory = () => {
    setIsViewerOpen(false);
    if (onStoryOpenChange) onStoryOpenChange(false);
  };

  return (
    <section style={{ padding: '20px 5%', maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '20px', overflowX: 'auto' }} className="no-scrollbar">

      {/* The Story Avatar Ring */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openStory}
          style={{
            width: '160px',  /* Massive 160px circle size */
            height: '160px',
            borderRadius: '50%',
            padding: '4px',
            // Uses traditional Insta gradient or Bengali Gold gradient
            background: hasViewed
              ? 'linear-gradient(45deg, #e0e0e0, #c0c0c0)' // Grayed out if watched
              : 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', // Colorful Instagram Ring
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '4px solid var(--color-bg)',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#fff'
          }}>
            <AnimatePresence>
              <motion.img
                key={currentDpIndex}
                src={ROTATING_DPS[currentDpIndex]}
                alt="My Story"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
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
        </motion.div>

        <span style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: 'var(--color-primary)', fontSize: '1.1rem' }}>
          Srija
        </span>
      </div>

      <AnimatePresence>
        {isViewerOpen && (
          <StoryViewer stories={MOCK_STORIES} onClose={closeStory} onMediaPlayStateChange={onStoryOpenChange} />
        )}
      </AnimatePresence>

    </section>
  );
}
