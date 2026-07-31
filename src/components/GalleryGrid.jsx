const GalleryGrid = ({ images, onImageClick }) => {
  return (
    <section class="py-16 fade show">
      <div class="max-w-6xl mx-auto px-4">
        <div class="gallery" id="gallery">
          {images.map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt={img.alt}
              onClick={() => onImageClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryGrid;
