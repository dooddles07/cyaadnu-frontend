import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/slices/productSlice';
import { FiSearch, FiX } from 'react-icons/fi';
import './PhotoGallery.css';

const PhotoGallery = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getProducts({}));
  }, [dispatch]);

  useEffect(() => {
    if (search) {
      setFilteredProducts(
        products.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [search, products]);

  return (
    <div className="photo-gallery-page">
      <div className="container">
        <div className="gallery-header">
          <h1>Product Gallery</h1>
          <p>Explore our collection of CYA ADNU merchandise and products</p>
        </div>

        <div className="gallery-search">
          <FiSearch />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="gallery-grid">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="gallery-item"
              onClick={() =>
                setSelectedImage({
                  url: product.image,
                  name: product.name,
                  price: product.price,
                })
              }
            >
              <div className="gallery-image">
                <img
                  src={product.image || 'https://via.placeholder.com/300x300?text=Product'}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=Product';
                  }}
                />
                <div className="gallery-overlay">
                  <span className="view-btn">View</span>
                </div>
              </div>
              <div className="gallery-info">
                <h3>{product.name}</h3>
                <p className="gallery-category">{product.category}</p>
                <p className="gallery-price">₱{product.price?.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-gallery">
            <p>No products found</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="gallery-lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
              <FiX size={32} />
            </button>
            <img src={selectedImage.url} alt={selectedImage.name} />
            <div className="lightbox-info">
              <h2>{selectedImage.name}</h2>
              <p className="lightbox-price">₱{selectedImage.price?.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
