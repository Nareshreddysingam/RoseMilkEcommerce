import React from 'react';
import { Star } from 'lucide-react';
import { CustomerReview } from '../types';

interface CustomerReviewsProps {
  reviews: CustomerReview[];
}

export default function CustomerReviews({ reviews }: CustomerReviewsProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-pink-600 mb-12">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{review.comment}</p>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">{review.name}</span>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}