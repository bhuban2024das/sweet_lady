import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import ReelsGrid from './components/ReelsGrid';
import PhotoGallery from './components/PhotoGallery';
import ContactFooter from './components/ContactFooter';
import BengaliBackground from './components/BengaliBackground';

function App() {
  return (
    <>
      <BengaliBackground />
      <Navbar />
      <StorySection />
      <HeroSection />
      <ReelsGrid />
      <PhotoGallery />
      <ContactFooter />
    </>
  );
}

export default App;
