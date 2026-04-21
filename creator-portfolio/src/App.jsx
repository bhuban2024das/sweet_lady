import { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import ReelsGrid from './components/ReelsGrid';
import PhotoGallery from './components/PhotoGallery';
import ContactFooter from './components/ContactFooter';
import BengaliBackground from './components/BengaliBackground';

function App() {
  const [isBgMuted, setIsBgMuted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Standard audio sync hook
    if (audioRef.current) {
      if (!isBgMuted && !isVideoPlaying) {
        audioRef.current.play().catch(e => console.log("Bg Audio error:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isBgMuted, isVideoPlaying]);

  // Global Audio Unlocker Protocol to bypass strict mobile browser autoplay blocks!
  useEffect(() => {
    const unlockAudio = () => {
      if (audioRef.current && !isBgMuted && !isVideoPlaying) {
        audioRef.current.play().catch(() => {});
      }
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('scroll', unlockAudio);
    };
    
    // The very first time they touch, click, or scroll anywhere, force the music on!
    document.addEventListener('touchstart', unlockAudio, { once: true });
    document.addEventListener('click', unlockAudio, { once: true });
    document.addEventListener('scroll', unlockAudio, { once: true });
    
    return () => {
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('scroll', unlockAudio);
    };
  }, [isBgMuted, isVideoPlaying]);

  return (
    <>
      {/* Bulletproof Loop: Manually resetting time + Play to bypass iOS/Chrome strict loop blocks */}
      <audio ref={audioRef} src="/background.mp3" loop autoPlay onEnded={(e) => { e.target.currentTime = 0; e.target.play().catch(()=>{}); }} />
      <BengaliBackground />
      <Navbar isBgMuted={isBgMuted} setIsBgMuted={setIsBgMuted} />
      <StorySection onStoryOpenChange={setIsVideoPlaying} />
      <HeroSection />
      <ReelsGrid onVideoPlayStateChange={setIsVideoPlaying} />
      <PhotoGallery />
      <ContactFooter />
    </>
  );
}

export default App;
