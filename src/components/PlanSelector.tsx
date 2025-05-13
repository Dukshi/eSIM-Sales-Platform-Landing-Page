import React, { useState } from 'react';
import { XIcon, SearchIcon, CheckIcon } from 'lucide-react';
import { Button } from './Button';
type Step = 'destination' | 'plan' | 'checkout' | 'success';
interface PlanSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}
export function PlanSelector({
  isOpen,
  onClose
}: PlanSelectorProps) {
  const [step, setStep] = useState<Step>('destination');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const countries = [{
    id: 'us',
    name: 'United States',
    flag: '🇺🇸'
  }, {
    id: 'eu',
    name: 'European Union',
    flag: '🇪🇺'
  }, {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧'
  }, {
    id: 'jp',
    name: 'Japan',
    flag: '🇯🇵'
  }, {
    id: 'ae',
    name: 'UAE',
    flag: '🇦🇪'
  }];
  const plans = [{
    id: 1,
    data: '5GB',
    duration: '7 days',
    price: 19.99
  }, {
    id: 2,
    data: '10GB',
    duration: '14 days',
    price: 29.99
  }, {
    id: 3,
    data: '20GB',
    duration: '30 days',
    price: 49.99
  }];
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 relative overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {step === 'destination' && 'Choose Your Destination'}
            {step === 'plan' && 'Select Your Plan'}
            {step === 'checkout' && 'Checkout'}
            {step === 'success' && 'Success!'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        {/* Content */}
        <div className="p-6">
          {step === 'destination' && <div>
              <div className="relative mb-6">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" placeholder="Search countries..." className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {countries.filter(country => country.name.toLowerCase().includes(searchQuery.toLowerCase())).map(country => <button key={country.id} onClick={() => {
              setSelectedCountry(country.id);
              setStep('plan');
            }} className={`p-4 border rounded-xl flex items-center gap-3 hover:border-blue-500 transition-colors ${selectedCountry === country.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                      <span className="text-2xl">{country.flag}</span>
                      <span className="font-medium">{country.name}</span>
                      {selectedCountry === country.id && <CheckIcon className="w-5 h-5 text-blue-500 ml-auto" />}
                    </button>)}
              </div>
            </div>}
          {step === 'plan' && <div className="space-y-4">
              {plans.map(plan => <button key={plan.id} onClick={() => setStep('checkout')} className="w-full p-6 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{plan.data}</h3>
                    <span className="text-2xl font-bold">${plan.price}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Valid for {plan.duration}</span>
                    <span>Data only</span>
                  </div>
                </button>)}
            </div>}
          {step === 'checkout' && <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-xl" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Details
                </label>
                <div className="border border-gray-200 rounded-xl p-4">
                  {/* Stripe/Payment integration would go here */}
                  <p className="text-gray-500">Payment form placeholder</p>
                </div>
              </div>
              <Button variant="primary" fullWidth onClick={() => setStep('success')}>
                Pay Now
              </Button>
            </div>}
          {step === 'success' && <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Payment Successful!
              </h3>
              <p className="text-gray-600 mb-6">
                Your eSIM has been generated and is ready to use.
              </p>
              <div className="bg-gray-100 p-8 rounded-xl mb-6">
                {/* QR Code would go here */}
                <div className="w-48 h-48 bg-white mx-auto"></div>
              </div>
              <div className="space-y-4">
                <Button variant="primary" fullWidth>
                  Download QR Code
                </Button>
                <Button variant="outline" fullWidth>
                  View Installation Guide
                </Button>
              </div>
            </div>}
        </div>
        {/* Footer */}
        {step !== 'success' && <div className="p-6 border-t border-gray-100">
            {step !== 'destination' && <Button variant="outline" onClick={() => setStep(step === 'checkout' ? 'plan' : 'destination')}>
                Back
              </Button>}
          </div>}
      </div>
    </div>;
}