import React, { useState, useEffect } from 'react';

const SizeChart = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const sizeData = [
    { size: 'XS', chest: '30-32', waist: '24-26', length: '27' },
    { size: 'S', chest: '32-34', waist: '26-28', length: '28' },
    { size: 'M', chest: '36-38', waist: '30-32', length: '29' },
    { size: 'L', chest: '40-42', waist: '34-36', length: '30' },
    { size: 'XL', chest: '44-46', waist: '38-40', length: '31' },
    { size: '2XL', chest: '48-50', waist: '42-44', length: '32' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 border-2 border-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all"
      >
        📏 Size Chart
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Size Chart</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Size</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Chest (in)</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Waist (in)</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Length (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeData.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-300 px-4 py-3 font-semibold">{row.size}</td>
                        <td className="border border-gray-300 px-4 py-3">{row.chest}</td>
                        <td className="border border-gray-300 px-4 py-3">{row.waist}</td>
                        <td className="border border-gray-300 px-4 py-3">{row.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Tip:</strong> For the best fit, we recommend measuring yourself and
                  comparing to this chart. All measurements are approximate.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 p-6 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SizeChart;
