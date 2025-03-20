import React from 'react';
import { ShoppingCart, Milk } from 'lucide-react';

interface NavbarProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartItemCount, onCartClick }: NavbarProps) {
  return (
    <nav className="bg-pink-100 shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Milk className="h-8 w-8 text-pink-600" />
            <span className="ml-2 text-2xl font-bold text-pink-600">Royal Rose Milk</span>
          </div>
          <button
            onClick={onCartClick}
            className="relative p-2 text-pink-600 hover:text-pink-800"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}