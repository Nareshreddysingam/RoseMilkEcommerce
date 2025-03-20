import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-pink-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Royal Rose Milk</h3>
            <p className="text-pink-200 mb-4">
              Serving the finest rose milk and refreshments in Bengaluru since 2020.
            </p>
            <div className="space-y-2">
              <a href="tel:+919515855625" className="flex items-center text-pink-200 hover:text-white">
                <Phone className="h-5 w-5 mr-2" />
                +91 9515855625
              </a>
              <a href="mailto:contact@royalrosemilk.com" className="flex items-center text-pink-200 hover:text-white">
                <Mail className="h-5 w-5 mr-2" />
                contact@royalrosemilk.com
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Business Hours</h3>
            <ul className="space-y-2 text-pink-200">
              <li>Monday - Friday: 9:00 AM - 9:00 PM</li>
              <li>Saturday - Sunday: 10:00 AM - 10:00 PM</li>
              <li>Holidays: 10:00 AM - 8:00 PM</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Location</h3>
            <div className="flex items-start text-pink-200">
              <MapPin className="h-5 w-5 mr-2 mt-1" />
              <p>
                Royal Rose Milk<br />
                #123, 5th Block<br />
                Koramangala<br />
                Bengaluru, Karnataka 560099
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-pink-800 text-center text-pink-200">
          <p>© 2024 Royal Rose Milk. All rights reserved.</p>
          <p className="mt-2">Owned by: Naresh Singam</p>
        </div>
      </div>
    </footer>
  );
}