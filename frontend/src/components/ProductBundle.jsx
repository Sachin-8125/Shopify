import React, { useState } from 'react';

const ProductBundle = ({ mainProductPrice }) => {
  const [isBundleSelected, setIsBundleSelected] = useState(true);

  const bundleItems = [
    {
      id: 1,
      name: 'Main Product',
      price: mainProductPrice,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
    },
    {
      id: 2,
      name: 'Complementary Item 1',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=200&h=200&fit=crop',
    },
    {
      id: 3,
      name: 'Complementary Item 2',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop',
    },
  ];

  const totalPrice = bundleItems.reduce((sum, item) => sum + item.price, 0);
  const bundleDiscount = totalPrice * 0.1;
  const bundlePrice = totalPrice - bundleDiscount;

  return (
    <div className="bg-white border-2 border-amber-300 rounded-lg p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-6">
        <span className="bg-amber-100 text-amber-800 text-sm font-bold px-3 py-1 rounded-full">
          SAVE {Math.round((bundleDiscount / totalPrice) * 100)}%
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Buy These Together</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {bundleItems.map((item) => (
          <div
            key={item.id}
            className={`relative border-2 rounded-lg p-4 transition-all ${
              isBundleSelected ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <div className="absolute top-2 right-2">
              {isBundleSelected && (
                <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                  ✓
                </div>
              )}
            </div>

            <div className="mb-3 bg-gray-100 rounded-lg h-32 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="font-semibold text-gray-900 text-sm mb-1">{item.name}</p>
            <p className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-3">
        <div className="flex justify-between text-gray-700">
          <span>Individual Total:</span>
          <span className="font-semibold">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-green-700 font-semibold">
          <span>Bundle Discount:</span>
          <span>-${bundleDiscount.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between">
          <span className="text-lg font-bold text-gray-900">Bundle Price:</span>
          <span className="text-2xl font-bold text-green-600">
            ${bundlePrice.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => setIsBundleSelected(!isBundleSelected)}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all active:scale-95"
        >
          {isBundleSelected ? '✓ Add Bundle to Cart' : 'Add Bundle to Cart'}
        </button>
        <button className="w-full border-2 border-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-all">
          or Buy Separately
        </button>
      </div>

      <p className="text-sm text-gray-600 mt-4 text-center">
        💡 Bundles are a great way to save and try complementary products together!
      </p>
    </div>
  );
};

export default ProductBundle;