import React, { useEffect } from 'react';

const ProductVariants = ({
  colors,
  sizes,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
}) => {
  useEffect(() => {
    const savedColor = localStorage.getItem('selectedColor');
    const savedSize = localStorage.getItem('selectedSize');
    if (savedColor) onColorChange(savedColor);
    if (savedSize) onSizeChange(savedSize);
  }, []);

  const handleColorChange = (color) => {
    onColorChange(color);
    localStorage.setItem('selectedColor', color);
  };

  const handleSizeChange = (size) => {
    onSizeChange(size);
    localStorage.setItem('selectedSize', size);
  };

  return (
    <div className="space-y-6 mb-6">
      {colors.length > 0 && (
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-3">
            Color: <span className="text-blue-600">{selectedColor}</span>
          </label>
          <div className="flex gap-3 flex-wrap">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => handleColorChange(color.name)}
                className={`w-12 h-12 rounded-full border-2 transition-all ${
                  selectedColor === color.name
                    ? 'border-gray-900 shadow-lg ring-2 ring-blue-400'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color.hexCode }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}

      {sizes.length > 0 && (
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-3">
            Size: <span className="text-blue-600">{selectedSize}</span>
          </label>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
            {sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => handleSizeChange(size.size)}
                className={`py-2 px-4 border-2 rounded-lg font-medium transition-all ${
                  selectedSize === size.size
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                    : 'bg-white text-gray-900 border-gray-300 hover:border-blue-400'
                }`}
              >
                {size.size}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductVariants;
