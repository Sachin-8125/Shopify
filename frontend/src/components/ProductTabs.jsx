import React, { useState } from 'react';

const ProductTabs = ({ description, productInfo, shippingDetails }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description', icon: '📝' },
    { id: 'info', label: 'Product Information', icon: 'ℹ️' },
    { id: 'shipping', label: 'Shipping Details', icon: '📦' },
  ];

  const contentMap = {
    description: description,
    info: productInfo,
    shipping: shippingDetails,
  };

  return (
    <div className="w-full">
      <div className="flex gap-4 border-b-2 border-gray-200 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 px-2 sm:px-4 whitespace-nowrap text-sm sm:text-base font-semibold transition-all relative ${
              activeTab === tab.id
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      <div className="animate-fadeIn">
        {activeTab === 'description' && (
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {contentMap.description}
            </p>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="prose prose-sm max-w-none">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Product Details</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {contentMap.info}
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Premium quality materials</li>
                  <li>✓ Crafted with attention to detail</li>
                  <li>✓ Sustainable and eco-friendly</li>
                  <li>✓ Tested for durability</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="prose prose-sm max-w-none">
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {contentMap.shipping}
              </p>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Shipping Options</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Standard Shipping (5-7 days)</span>
                    <span className="font-semibold text-gray-900">FREE</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Express Shipping (2-3 days)</span>
                    <span className="font-semibold text-gray-900">$9.99</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Next Day Shipping</span>
                    <span className="font-semibold text-gray-900">$19.99</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductTabs;