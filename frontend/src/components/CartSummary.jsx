import React from 'react';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const { totals, items } = useCart();
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600">Cart</span>
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-semibold">
        {totals.count}
      </span>
      <span className="text-sm font-medium text-gray-900">${totals.amount.toFixed(2)}</span>
    </div>
  );
};

export default CartSummary;


