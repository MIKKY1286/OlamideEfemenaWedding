import { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import SocialFeed from "./components/SocialFeed";
import GalleryGrid from "./components/GalleryGrid";
import Lightbox from "./components/Lightbox";
import MusicPlayer from "./components/MusicPlayer";

const config = {
  weddingDate: "November 15, 2025",
  instagramHandle: "olamide_efemena",
  lightwidgetId: "",
  socialPhotos: [
    { src: "/images/img-7.jpg", likes: 84, comments: 6 },
    { src: "/images/img-8.jpg", likes: 112, comments: 14 },
    { src: "/images/img-9.jpg", likes: 95, comments: 8 },
    { src: "/images/img-10.jpg", likes: 130, comments: 11 },
    { src: "/images/img-11.jpg", likes: 78, comments: 5 },
    { src: "/images/img-12.jpg", likes: 105, comments: 9 },
  ],
};

const galleryImages = [
  { src: "/images/img-1.jpg", alt: "Gallery Image 1" },
  { src: "/images/img-2.jpg", alt: "Gallery Image 2" },
  { src: "/images/img-3.jpg", alt: "Gallery Image 3" },
  { src: "/images/img-4.jpg", alt: "Gallery Image 4" },
  { src: "/images/img-5.jpg", alt: "Gallery Image 5" },
  { src: "/images/img-6.jpg", alt: "Gallery Image 6" },
  { src: "/images/img-7.jpg", alt: "Gallery Image 7" },
  { src: "/images/img-8.jpg", alt: "Gallery Image 8" },
  { src: "/images/img-9.jpg", alt: "Gallery Image 9" },
  { src: "/images/img-10.jpg", alt: "Gallery Image 10" },
  { src: "/images/img-11.jpg", alt: "Gallery Image 11" },
  { src: "/images/img-12.jpg", alt: "Gallery Image 12" },
];

function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function calculateSubtitle() {
  const start = new Date(config.weddingDate);
  const now = new Date();

  let diffYears = now.getFullYear() - start.getFullYear();
  let anniversaryThisYear = new Date(
    now.getFullYear(),
    start.getMonth(),
    start.getDate(),
  );

  let nextAnniversaryNum;
  if (now < anniversaryThisYear) {
    nextAnniversaryNum = diffYears;
  } else {
    nextAnniversaryNum = diffYears + 1;
  }

  return `Moments Celebrating Our ${getOrdinal(nextAnniversaryNum)} Year & Beyond`;
}

function App() {
  const [subtitle] = useState(calculateSubtitle);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeImageSrc, setActiveImageSrc] = useState("");
  const [slideshow, setSlideshow] = useState(false);

  // Sync body scroll with lightbox open status
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [lightboxOpen]);

  // Slideshow interval timer
  useEffect(() => {
    let slideInterval;
    if (slideshow) {
      slideInterval = setInterval(() => {
        setCurrentImageIndex((prev) => {
          const nextIndex = (prev + 1) % galleryImages.length;
          setActiveImageSrc(galleryImages[nextIndex].src);
          return nextIndex;
        });
      }, 3000);
    } else {
      clearInterval(slideInterval);
    }
    return () => clearInterval(slideInterval);
  }, [slideshow]);

  const handleOpenLightbox = (indexOrSrc) => {
    if (typeof indexOrSrc === "number") {
      setCurrentImageIndex(indexOrSrc);
      setActiveImageSrc(galleryImages[indexOrSrc].src);
    } else {
      // Find matching index in galleryImages if present
      const foundIdx = galleryImages.findIndex((img) => img.src === indexOrSrc);
      if (foundIdx !== -1) {
        setCurrentImageIndex(foundIdx);
      }
      setActiveImageSrc(indexOrSrc);
    }
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    if (slideshow) {
      setSlideshow(false);
    }
  };

  const handleNext = () => {
    const nextIdx = (currentImageIndex + 1) % galleryImages.length;
    setCurrentImageIndex(nextIdx);
    setActiveImageSrc(galleryImages[nextIdx].src);
  };

  const handlePrev = () => {
    const prevIdx =
      (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentImageIndex(prevIdx);
    setActiveImageSrc(galleryImages[prevIdx].src);
  };

  const handleToggleSlideshow = () => {
    const nextState = !slideshow;
    setSlideshow(nextState);
    if (nextState) {
      if (!lightboxOpen) {
        handleOpenLightbox(currentImageIndex);
      }
    }
  };

  return (
    <>
      <HeroSection
        subtitle={subtitle}
        slideshow={slideshow}
        onToggleSlideshow={handleToggleSlideshow}
      />
      <SocialFeed
        config={config}
        onOpenLightbox={(src) => handleOpenLightbox(src)}
      />
      <GalleryGrid
        images={galleryImages}
        onImageClick={(idx) => handleOpenLightbox(idx)}
      />
      <Lightbox
        isOpen={lightboxOpen}
        currentSrc={activeImageSrc}
        onClose={handleCloseLightbox}
        onNext={handleNext}
        onPrev={handlePrev}
      />
      <MusicPlayer />
    </>
  );
}

export default App;
