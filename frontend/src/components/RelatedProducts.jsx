import React, { useState } from 'react';

const RelatedProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const relatedProducts = [
    {
      id: 1,
      name: 'Classic White Tee',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      badge: 'Popular',
    },
    {
      id: 2,
      name: 'Vintage Denim Jacket',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1543163521-9145f931371e?w=400&h=400&fit=crop',
      badge: 'New',
    },
    {
      id: 3,
      name: 'Summer Shorts',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop',
    },
    {
      id: 4,
      name: 'Essential Basics Combo',
      price: 74.99,
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop',
      badge: 'Best Seller',
    },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Related Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="relative bg-gray-100 h-64 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {product.badge && (
                <div className="absolute top-3 right-3">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                      product.badge === 'New'
                        ? 'bg-green-100 text-green-800'
                        : product.badge === 'Popular'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>
              )}

              {hoveredProduct === product.id && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <button className="bg-white text-gray-900 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition-all transform scale-95 hover:scale-100">
                    Quick View
                  </button>
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>

              <p className="text-lg font-bold text-gray-900 mb-3">
                ${product.price.toFixed(2)}
              </p>

              <div className="flex items-center gap-1 mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-xs text-gray-600 ml-1">(42)</span>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all active:scale-95">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button className="text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors">
          View All Products →
        </button>
      </div>
    </div>
  );
};

export default RelatedProducts;