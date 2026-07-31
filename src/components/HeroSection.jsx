import React from 'react';

const HeroSection = ({ subtitle, slideshow, onToggleSlideshow }) => {
  return (
    <section className="hero min-h-[55vh] flex items-center justify-center text-white text-center px-4 relative overflow-hidden">
      {/* Subtle Moving Background Light Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-amber-700/15 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Floating Gold Dust Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="particle p1"></div>
        <div className="particle p2"></div>
        <div className="particle p3"></div>
        <div className="particle p4"></div>
      </div>

      <div className="fade show z-10 max-w-3xl">
        <span className="font-alex text-amber-300 text-3xl block mb-1 animate-fade-in-down">
          Our Visual Journey
        </span>
        <h1 className="text-5xl md:text-6xl font-cormorant font-bold mb-4 tracking-wider animate-fade-in-up">
          Photo Gallery
        </h1>
        <p
          id="gallerySubtitle"
          className="font-light tracking-wide text-sm md:text-base opacity-90 animate-fade-in-up"
        >
          {subtitle}
        </p>

        <div className="mt-8 flex gap-4 justify-center animate-fade-in-up">
          <a
            href="../index.html"
            className="btn-secondary px-6 py-2.5 rounded-full font-semibold uppercase tracking-wider text-xs border border-white hover:bg-white hover:text-gray-900 transition duration-300"
          >
            Home
          </a>
          <button
            onClick={onToggleSlideshow}
            id="slideshowBtn"
            className={`btn-primary px-6 py-2.5 rounded-full font-semibold uppercase tracking-wider text-xs ${
              slideshow ? 'filter brightness-95' : ''
            }`}
          >
            {slideshow ? 'Pause Slideshow' : 'Start Slideshow'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
