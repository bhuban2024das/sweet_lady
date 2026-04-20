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
    if (audioRef.current) {
      if (!isBgMuted && !isVideoPlaying) {
        audioRef.current.play().catch(e => console.log("Bg Audio error:", e));
      } else {
        audioRef.current.pause();
      }
    }
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
