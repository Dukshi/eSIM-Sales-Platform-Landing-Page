import React from 'react';
import { StarIcon, MessageCircleIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { Button } from './Button';
export function TrustSection() {
  const reviews = [{
    id: 1,
    name: 'Sarah T.',
    country: 'United States',
    rating: 5,
    text: 'Perfect for my Europe trip! Setup was super easy and I had reliable connection throughout my vacation.',
    date: '2 weeks ago'
  }, {
    id: 2,
    name: 'James L.',
    country: 'Australia',
    rating: 5,
    text: 'Used this for my business trip to Japan. The connection was fast and stable. Will definitely use again!',
    date: '1 month ago'
  }, {
    id: 3,
    name: 'Maria G.',
    country: 'Spain',
    rating: 4,
    text: 'Good service overall. Had a minor issue but customer support resolved it quickly.',
    date: '2 months ago'
  }];
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => <StarIcon key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />);
  };
  return <section id="support" className="py-16 w-full bg-[#F9FAFB]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Trust badges and support */}
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Trusted by Travelers Worldwide
            </h2>
            {/* Payment methods */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4">
                Secure Payment Methods
              </h3>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe" className="h-8" />
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" alt="PayPal" className="h-8" />
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Apple_Pay_logo.svg/1280px-Apple_Pay_logo.svg.png" alt="Apple Pay" className="h-8" />
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1280px-Google_Pay_Logo.svg.png" alt="Google Pay" className="h-8" />
                </div>
              </div>
            </div>
            {/* 24/7 Support */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4">
                24/7 Customer Support
              </h3>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <p className="mb-6 text-gray-600">
                  Our support team is available 24/7 to assist you with any
                  questions or issues.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-4 border border-gray-100 rounded-lg hover:bg-blue-50 transition-colors">
                    <MessageCircleIcon className="h-6 w-6 text-[#2563EB] mb-2" />
                    <span className="text-sm font-medium">Live Chat</span>
                  </div>
                  <div className="flex flex-col items-center p-4 border border-gray-100 rounded-lg hover:bg-blue-50 transition-colors">
                    <MailIcon className="h-6 w-6 text-[#2563EB] mb-2" />
                    <span className="text-sm font-medium">Email Support</span>
                  </div>
                  <div className="flex flex-col items-center p-4 border border-gray-100 rounded-lg hover:bg-blue-50 transition-colors">
                    <PhoneIcon className="h-6 w-6 text-[#2563EB] mb-2" />
                    <span className="text-sm font-medium">Phone Support</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Need help CTA */}
            <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-xl p-6 text-white">
              <h3 className="font-semibold text-lg mb-2">Need Help?</h3>
              <p className="mb-4 text-blue-100">
                Our team is ready to assist you with any questions about our
                eSIM services.
              </p>
              <Button variant="primary">Contact Support</Button>
            </div>
          </div>
          {/* Customer reviews */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Customer Reviews</h2>
              <div className="flex items-center">
                <div className="flex mr-2">{renderStars(5)}</div>
                <span className="font-semibold">4.8/5</span>
              </div>
            </div>
            <div className="space-y-6">
              {reviews.map(review => <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{review.name}</h4>
                      <p className="text-sm text-gray-500">{review.country}</p>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex mb-3">{renderStars(review.rating)}</div>
                  <p className="text-gray-600">{review.text}</p>
                </div>)}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline">View All Reviews</Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
}