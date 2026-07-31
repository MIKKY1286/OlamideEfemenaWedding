const HeroSection = ({ subtitle, slideshow, onToggleSlideshow }) => {
  return (
    <section class="hero min-h-[50vh] flex items-center justify-center text-white text-center px-4 relative overflow-hidden">
      {/* Floating Gold Dust Particles */}
      <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div class="particle p1"></div>
        <div class="particle p2"></div>
        <div class="particle p3"></div>
        <div class="particle p4"></div>
      </div>

      <div class="fade show z-10 max-w-3xl">
        <span class="font-alex text-amber-300 text-3xl block mb-1 animate-fade-in-down">
          Our Visual Journey
        </span>
        <h1 class="text-5xl md:text-6xl font-cormorant font-bold mb-4 tracking-wider animate-fade-in-up">
          Photo Gallery
        </h1>
        <p
          id="gallerySubtitle"
          class="font-light tracking-wide text-sm md:text-base opacity-90 animate-fade-in-up"
        >
          {subtitle}
        </p>

        <div class="mt-8 flex gap-4 justify-center animate-fade-in-up">
          <a
            href="../index.html"
            class="btn-secondary px-6 py-2.5 rounded-full font-semibold uppercase tracking-wider text-xs border border-white hover:bg-white hover:text-gray-900 transition duration-300"
          >
            Home
          </a>
          <button
            onClick={onToggleSlideshow}
            id="slideshowBtn"
            class={`btn-primary px-6 py-2.5 rounded-full font-semibold uppercase tracking-wider text-xs ${
              slideshow ? "filter brightness-95" : ""
            }`}
          >
            {slideshow ? "Pause Slideshow" : "Start Slideshow"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
