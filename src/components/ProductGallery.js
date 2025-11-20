import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import './ProductGallery.css';

const ProductGallery = ({ images, productName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const displayImages = images && images.length > 0 ? images : ['/placeholder-product.jpg'];
  const currentImage = displayImages[currentImageIndex]?.startsWith('/')
    ? displayImages[currentImageIndex]
    : `/${displayImages[currentImageIndex]}`;

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % displayImages.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? displayImages.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="product-gallery">
      {/* Main Image Display */}
      <div className="gallery-main">
        <img
          src={currentImage}
          alt={productName}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/600x600?text=Product+Image';
          }}
          onClick={() => setIsFullscreen(true)}
          className="main-image"
        />

        {displayImages.length > 1 && (
          <>
            <button className="gallery-nav gallery-prev" onClick={goToPreviousImage}>
              <FiChevronLeft size={24} />
            </button>
            <button className="gallery-nav gallery-next" onClick={goToNextImage}>
              <FiChevronRight size={24} />
            </button>
          </>
        )}

        <span className="image-counter">
          {currentImageIndex + 1} / {displayImages.length}
        </span>
      </div>

      {/* Thumbnail Strip */}
      {displayImages.length > 1 && (
        <div className="gallery-thumbnails">
          {displayImages.map((image, index) => {
            const imageUrl = image?.startsWith('/') ? image : `/${image}`;
            return (
              <button
                key={index}
                className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                onClick={() => goToImage(index)}
              >
                <img
                  src={imageUrl}
                  alt={`${productName} thumbnail ${index + 1}`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80x80?text=Thumb';
                  }}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fullscreen-modal" onClick={() => setIsFullscreen(false)}>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsFullscreen(false)}>
              <FiX size={32} />
            </button>
            <img src={currentImage} alt={productName} />
            <button className="fs-nav fs-prev" onClick={goToPreviousImage}>
              <FiChevronLeft size={32} />
            </button>
            <button className="fs-nav fs-next" onClick={goToNextImage}>
              <FiChevronRight size={32} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
