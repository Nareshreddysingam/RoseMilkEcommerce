import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import CustomerReviews from './components/CustomerReviews';
import Footer from './components/Footer';
import { Product, CartItem, CustomerReview } from './types';

const products: Product[] = [
  {
    id: '1',
    name: 'Royal Rose Milk (1 Litre)',
    price: 40,
    size: '1 Litre',
    image: 'https://images.unsplash.com/photo-1624781748172-7151704a42b2?auto=format&fit=crop&q=80&w=800',
    description: 'Indulge in our signature rose milk, perfectly blended with fresh milk and premium rose syrup. A refreshing treat in a generous 1-litre serving.'
  },
  {
    id: '2',
    name: 'Royal Rose Milk (500ml)',
    price: 25,
    size: '500ml',
    image: 'https://images.unsplash.com/photo-1619158401201-8fa932695178?auto=format&fit=crop&q=80&w=800',
    description: 'Our classic rose milk in a convenient 500ml size. The perfect balance of creamy milk and aromatic rose flavor.'
  },
  {
    id: '3',
    name: 'Vanilla Ice Cream',
    price: 35,
    size: '200ml',
    image: 'https://images.unsplash.com/photo-1570197571499-166b36435e9f?auto=format&fit=crop&q=80&w=800',
    description: 'Creamy and smooth vanilla ice cream made with real Madagascar vanilla beans. The perfect dessert for any occasion.'
  },
  {
    id: '4',
    name: 'Fresh Lemon Juice',
    price: 30,
    size: '500ml',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=800',
    description: 'Refreshing natural lemon juice made from freshly squeezed lemons. No artificial flavors or preservatives added.'
  }
];

const customerReviews: CustomerReview[] = [
  {
    id: "1",
    name: "Poorna Chandra M",
    rating: 5,
    comment: "The best rose milk I've ever had! The 1-litre pack is perfect for sharing with family. Quick delivery and excellent packaging.",
    date: "March 15, 2024"
  },
  {
    id: "2",
    name: "Kanishka Reddy",
    rating: 4.5,
    comment: "Love the vanilla ice cream! It's so creamy and the perfect sweetness. The rose milk is fantastic too.",
    date: "March 12, 2024"
  },
  {
    id: "3",
    name: "Tharun Kumar K",
    rating: 5,
    comment: "Fresh lemon juice is amazing! Perfect for summer. The delivery was quick and the staff was very professional.",
    date: "March 10, 2024"
  }
];

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | null>(null);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(prevItems =>
      quantity === 0
        ? prevItems.filter(item => item.id !== id)
        : prevItems.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      {/* Hero Banner */}
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1538587888044-79f13ddd7e49?auto=format&fit=crop&q=80&w=2000")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-6xl font-bold mb-6">Royal Refreshments</h1>
            <p className="text-2xl mb-8 max-w-2xl mx-auto">
              Discover our signature rose milk, handcrafted ice cream, and refreshing beverages. 
              Made with love, served with passion.
            </p>
            <a 
              href="#products"
              className="bg-pink-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-pink-700 transition-colors"
            >
              Explore Our Menu
            </a>
          </div>
        </div>
      </div>

      <main id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-pink-600 mb-4">
            Our Signature Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From our famous rose milk to refreshing beverages and delightful desserts,
            we offer the perfect treats to satisfy your cravings.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <CustomerReviews reviews={customerReviews} />
      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
    </div>
  );
}

export default App;