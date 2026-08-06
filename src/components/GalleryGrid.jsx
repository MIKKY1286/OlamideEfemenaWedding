import { useMemo } from 'react';
import Masonry from 'react-masonry-css';

const breakpointColumns = {
  default: 4,
  1536: 5,
  1280: 4,
  1024: 3,
  768: 2,
  0: 1,
};

// Intelligent image reordering to balance column heights
const balanceImages = (images) => {
  if (images.length === 0) return images;

  // Image aspect ratio estimation (wedding photography patterns)
  // Estimating based on typical patterns: portrait > 1.2, landscape < 0.8, square 0.9-1.1
  const estimateAspectRatio = (index) => {
    // Pattern to distribute tall, landscape, and square images evenly
    const patterns = [1.4, 0.65, 1.0, 1.3, 0.7, 0.95, 1.35, 0.68, 1.05, 1.32, 0.72, 0.98];
    return patterns[index % patterns.length];
  };

  // Score-based distribution: place images to minimize max column height
  const columnHeights = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
  const reordered = [];
  const remaining = [...images];

  while (remaining.length > 0) {
    let bestIndex = 0;
    let bestColumnIndex = 0;
    let lowestHeight = Infinity;

    // Find the best image to place in the shortest column
    for (let i = 0; i < remaining.length; i++) {
      const aspectRatio = estimateAspectRatio(images.indexOf(remaining[i]));
      const height = 200 / aspectRatio; // Normalized height calculation

      // Find shortest column that would benefit from this image
      for (let col = 0; col < 5; col++) {
        const potentialHeight = columnHeights[col] + height;
        if (potentialHeight < lowestHeight) {
          lowestHeight = potentialHeight;
          bestIndex = i;
          bestColumnIndex = col;
        }
      }
    }

    const selectedImage = remaining.splice(bestIndex, 1)[0];
    reordered.push(selectedImage);
    const aspectRatio = estimateAspectRatio(images.indexOf(selectedImage));
    const height = 200 / aspectRatio;
    columnHeights[bestColumnIndex] += height;
  }

  return reordered;
};

const GalleryGrid = ({ images, onImageClick }) => {
  const balancedImages = useMemo(() => balanceImages(images), [images]);

  return (
    <section className="py-16 fade show">
      <div className="max-w-7xl mx-auto px-4">
        <Masonry
          breakpointCols={breakpointColumns}
          className="gallery"
          columnClassName="gallery-column"
        >
          {balancedImages.map((img, index) => (
            <div
              key={`${img.src}-${index}`}
              className="gallery-item"
            >
              <img
                src={img.src}
                alt={img.alt || `Gallery Image ${index + 1}`}
                loading="lazy"
                onClick={() => onImageClick(index)}
              />
            </div>
          ))}
        </Masonry>
      </div>
    </section>
  );
};

export default GalleryGrid;
