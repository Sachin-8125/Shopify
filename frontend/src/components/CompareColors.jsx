import React, { useState, useEffect } from 'react';

const CompareColors = ({ colors }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const toggleColor = (colorId) => {
    setSelectedColors((prev) =>
      prev.includes(colorId) ? prev.filter((id) => id !== colorId) : [...prev, colorId]
    );
  };

  const getSelectedColorObjects = () => {
    return colors.filter((c) => selectedColors.includes(c.id));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 border-2 border-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all"
      >
        🎨 Compare Colors
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full max-h-screen overflow-y-auto shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Compare Colors</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Select colors to compare (minimum 2)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => toggleColor(color.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedColors.includes(color.id)
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div
                        className="w-full h-24 rounded-lg mb-2 border border-gray-300"
                        style={{ backgroundColor: color.hexCode }}
                      />
                      <p className="font-semibold text-gray-900 text-sm">{color.name}</p>
                      {selectedColors.includes(color.id) && (
                        <p className="text-xs text-blue-600 mt-1">✓ Selected</p>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {selectedColors.length >= 2 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Side-by-side comparison
                  </h3>
                  <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${getSelectedColorObjects().length}, 1fr)` }}>
                    {getSelectedColorObjects().map((color) => (
                      <div key={color.id} className="text-center">
                        <div
                          className="w-full h-40 rounded-lg mb-3 border-2 border-gray-300 shadow-md transition-transform hover:scale-105"
                          style={{ backgroundColor: color.hexCode }}
                        />
                        <h4 className="font-semibold text-gray-900">{color.name}</h4>
                        <p className="text-sm text-gray-600 font-mono">{color.hexCode}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedColors.length < 2 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-gray-700">
                    Please select at least 2 colors to compare.
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 p-6 flex justify-between">
              <button
                onClick={() => setSelectedColors([])}
                className="text-gray-600 hover:text-gray-900 font-semibold py-2 px-4 rounded-lg transition-all"
              >
                Clear Selection
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompareColors;