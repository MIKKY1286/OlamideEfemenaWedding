import React from 'react';

// Predefined deterministic layout sequence for editorial rhythm
const LAYOUT_VARIANTS = [
  'variant-medium',  // 1
  'variant-tall',    // 2
  'variant-small',   // 3
  'variant-wide',    // 4
  'variant-medium',  // 5
  'variant-featured',// 6 (Featured every ~6-8 items)
  'variant-tall',    // 7
  'variant-small',   // 8
  'variant-medium',  // 9
  'variant-wide',    // 10
  'variant-small',   // 11
  'variant-tall'     // 12
];

const GalleryGrid = ({ images, onImageClick }) => {
  return (
    <section className="py-16 fade show">
      <div className="max-w-7xl mx-auto px-4">
        <div className="gallery" id="gallery">
          {images.map((img, index) => {
            const variantClass = LAYOUT_VARIANTS[index % LAYOUT_VARIANTS.length];
            return (
              <div
                key={index}
                className={`gallery-item ${variantClass}`}
              >
                <img
                  src={img.src}
                  alt={img.alt || `Gallery Image ${index + 1}`}
                  loading="lazy"
                  onClick={() => onImageClick(index)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GalleryGrid;
