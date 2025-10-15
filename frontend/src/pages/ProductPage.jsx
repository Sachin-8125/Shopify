import React, { useState, useEffect } from 'react';
import ImageGallery from '../components/ImageGallery';
import ProductVariants from '../components/ProductVariants';
import SizeChart from '../components/SizeChart';
import CompareColors from '../components/CompareColors';
import PairWellWith from '../components/PairWellWith';
import ProductBundle from '../components/ProductBundle';
import ProductTabs from '../components/ProductTabs';
import RelatedProducts from '../components/RelatedProducts';
import CartSummary from '../components/CartSummary';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Using product ID 1 as default - in real app, this would come from URL params
        const response = await fetch('http://localhost:5000/api/products/1');
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        setProduct(data);
        if (data.colors.length > 0) setSelectedColor(data.colors[0].name);
        if (data.sizes.length > 0) setSelectedSize(data.sizes[0].size);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      color: selectedColor,
      size: selectedSize,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">ShopHub</h1>
          <CartSummary />
        </div>
      </header>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Image Gallery */}
          <div>
            <ImageGallery images={product.images} />
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col">
            {/* Badge and Title */}
            <div className="mb-6">
              {product.badge && (
                <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full mb-3">
                  {product.badge}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Variants */}
            <ProductVariants
              colors={product.colors}
              sizes={product.sizes}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              onColorChange={setSelectedColor}
              onSizeChange={setSelectedSize}
            />

            {/* Size Chart and Compare */}
            <div className="flex gap-4 mb-6">
              <SizeChart />
              <CompareColors colors={product.colors} />
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 mb-6"
            >
              Add to Cart
            </button>

            {/* Quick Details */}
            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <p>✓ Free shipping on orders over $50</p>
              <p>✓ 30-day returns</p>
              <p>✓ Secure checkout</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Bundle Section */}
      <section className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductBundle mainProductPrice={product.price} />
        </div>
      </section>

      {/* Pair Well With Section */}
      <section className="py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PairWellWith />
        </div>
      </section>

      {/* Product Info Tabs */}
      <section className="py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductTabs
            description={product.description}
            productInfo={product.productInfo}
            shippingDetails={product.shippingDetails}
          />
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-12 border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RelatedProducts />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center">&copy; 2024 ShopHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductPage;