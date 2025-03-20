import React, { useState } from 'react';
import { X, CreditCard, Truck } from 'lucide-react';
import { CartItem, UserDetails } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  paymentMethod: 'cod' | 'card' | null;
  setPaymentMethod: (method: 'cod' | 'card' | null) => void;
}

export default function Cart({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem,
  paymentMethod,
  setPaymentMethod 
}: CartProps) {
  const [step, setStep] = useState<'cart' | 'details' | 'payment'>('cart');
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = items.length > 0 ? 15 : 0;
  const grandTotal = total + deliveryCharge;

  const handleUserDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCheckout = async () => {
    if (step === 'cart') {
      setStep('details');
      return;
    }

    if (paymentMethod === 'card') {
      // Stripe payment logic would go here
      console.log('Processing card payment...', { userDetails });
    } else if (paymentMethod === 'cod') {
      console.log('Processing COD order...', { userDetails });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">
            {step === 'cart' ? 'Your Cart' : step === 'details' ? 'Delivery Details' : 'Payment'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {step === 'cart' ? (
          <>
            <div className="p-4 h-[calc(100vh-250px)] overflow-y-auto">
              {items.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex items-center py-4 border-b">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">{item.size}</p>
                      <p className="text-pink-600 font-bold">₹{item.price}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="px-2 py-1 bg-gray-200 rounded-l"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 bg-gray-200 rounded-r"
                        >
                          +
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="ml-4 text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t p-4 bg-gray-50">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Delivery Charge:</span>
                  <span>₹{deliveryCharge}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total:</span>
                  <span>₹{grandTotal}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600"
                >
                  Proceed to Delivery Details
                </button>
              </div>
            )}
          </>
        ) : step === 'details' ? (
          <form onSubmit={handleUserDetailsSubmit} className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                value={userDetails.name}
                onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                value={userDetails.email}
                onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                value={userDetails.phone}
                onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
              <textarea
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                value={userDetails.address}
                onChange={(e) => setUserDetails({...userDetails, address: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  value={userDetails.city}
                  onChange={(e) => setUserDetails({...userDetails, city: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  value={userDetails.state}
                  onChange={(e) => setUserDetails({...userDetails, state: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pincode</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                value={userDetails.pincode}
                onChange={(e) => setUserDetails({...userDetails, pincode: e.target.value})}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600"
            >
              Proceed to Payment
            </button>
          </form>
        ) : (
          <div className="p-4">
            <h3 className="font-semibold mb-4">Select Payment Method</h3>
            <div className="space-y-4">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-4 rounded-lg border ${
                  paymentMethod === 'card' 
                    ? 'border-pink-500 bg-pink-50' 
                    : 'border-gray-200'
                } flex items-center`}
              >
                <CreditCard className="h-6 w-6 mr-2" />
                <span>Pay with Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod('cod')}
                className={`w-full p-4 rounded-lg border ${
                  paymentMethod === 'cod' 
                    ? 'border-pink-500 bg-pink-50' 
                    : 'border-gray-200'
                } flex items-center`}
              >
                <Truck className="h-6 w-6 mr-2" />
                <span>Cash on Delivery</span>
              </button>
            </div>

            <div className="mt-8">
              <div className="flex justify-between mb-2">
                <span>Total Amount:</span>
                <span className="font-bold">₹{grandTotal}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={!paymentMethod}
                className={`w-full py-3 rounded-lg ${
                  paymentMethod
                    ? 'bg-pink-500 hover:bg-pink-600 text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {paymentMethod === 'card' ? 'Pay Now' : 'Place Order'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}