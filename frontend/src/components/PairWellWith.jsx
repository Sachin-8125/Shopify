import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const PairWellWith = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const { addItem } = useCart();

  const pairingProducts = [
    {
      id: 1,
      name: 'Premium Socks Pack',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1556821552-5a0d49e82e54?w=300&h=300&fit=crop',
    },
    {
      id: 2,
      name: 'Shoe Care Kit',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1600488944358-ba7e7f1b141a?w=300&h=300&fit=crop',
    },
    {
      id: 3,
      name: 'Stylish Cap',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1587280413256-afc9d91a64d0?w=300&h=300&fit=crop',
    },
    {
      id: 4,
      name: 'Cotton T-Shirt',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
    },
    {
      id: 5,
      name: 'Casual Backpack',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
    },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const newScroll =
        direction === 'left'
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
      setTimeout(() => checkScroll(), 300);
    }
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      // Allow a tiny epsilon to account for fractional pixels during smooth scroll
      const maxScrollLeft = Math.max(0, scrollWidth - clientWidth);
      setCanScrollRight(Math.ceil(scrollLeft) < Math.ceil(maxScrollLeft));
    }
  };

  const handleAddToCart = (product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  return (
    <div className="py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Pair Well With</h2>

      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 p-2 rounded-full hover:bg-gray-50 shadow-md transition-all"
            aria-label="Scroll left"
          >
            ‹
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-10"
          onScroll={checkScroll}
        >
          {pairingProducts.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-64 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow snap-center"
            >
              <div className="relative bg-gray-100 h-64 overflow-hidden group">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://via.placeholder.com/300x300?text=Image+Unavailable';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-lg font-bold text-gray-900 mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 p-2 rounded-full hover:bg-gray-50 shadow-md transition-all"
            aria-label="Scroll right"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
};

export default PairWellWith;