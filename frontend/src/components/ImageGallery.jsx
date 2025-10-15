// frontend/src/components/ImageGallery.jsx
import React, { useState, useRef } from 'react';

const ImageGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0] || null);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const mainImageRef = useRef(null);
  const [thumbnailScroll, setThumbnailScroll] = useState(0);

  const handleMouseMove = (e) => {
    if (!mainImageRef.current) return;

    const rect = mainImageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setZoomPosition({ x, y });
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  const scrollThumbnails = (direction) => {
    const scrollAmount = 150;
    const newScroll = direction === 'left' 
      ? Math.max(0, thumbnailScroll - scrollAmount)
      : thumbnailScroll + scrollAmount;
    setThumbnailScroll(newScroll);
  };

  if (!mainImage) {
    return <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">No images</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image with Zoom */}
      <div
        ref={mainImageRef}
        className="relative w-full bg-gray-100 rounded-lg overflow-hidden group"
        style={{ aspectRatio: '1/1' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={mainImage.imageUrl}
          alt={mainImage.alt || 'Product'}
          className="w-full h-full object-cover transition-transform duration-300"
          style={
            isZooming
              ? {
                  transform: `scale(1.5) translate(${(mainImage.imageUrl.length % 10) * 5}px, ${(mainImage.imageUrl.length % 10) * 5}px)`,
                }
              : {}
          }
        />

        {/* Zoom indicator */}
        {isZooming && (
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute w-16 h-16 border-2 border-white opacity-75 rounded"
              style={{
                left: `${(zoomPosition.x / mainImageRef.current.offsetWidth) * 100 - 8}%`,
                top: `${(zoomPosition.y / mainImageRef.current.offsetHeight) * 100 - 8}%`,
              }}
            />
          </div>
        )}

        {/* Zoom hint */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          🔍 Zoom
        </div>
      </div>

      {/* Thumbnails */}
      <div className="relative">
        {images.length > 5 && (
          <>
            <button
              onClick={() => scrollThumbnails('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 p-1 rounded hover:bg-gray-50 shadow-md"
            >
              ←
            </button>
            <button
              onClick={() => scrollThumbnails('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 p-1 rounded hover:bg-gray-50 shadow-md"
            >
              →
            </button>
          </>
        )}

        <div className="overflow-hidden px-6">
          <div
            className="flex gap-3 transition-transform duration-300"
            style={{ transform: `translateX(-${thumbnailScroll}px)` }}
          >
            {images.map((image) => (
              <button
                key={image.id}
                onClick={() => setMainImage(image)}
                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                  mainImage.id === image.id
                    ? 'border-blue-600'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={image.imageUrl}
                  alt={image.alt || 'Thumbnail'}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;