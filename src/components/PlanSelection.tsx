import React, { useState } from 'react';
import { GlobeIcon, SearchIcon, FilterIcon } from 'lucide-react';
import { Button } from './Button';
type Plan = {
  id: number;
  country: string;
  flag: string;
  data: string;
  validity: string;
  price: number;
};
export function PlanSelection() {
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'AED'>('USD');
  const [searchQuery, setSearchQuery] = useState('');
  const plans: Plan[] = [{
    id: 1,
    country: 'United States',
    flag: '🇺🇸',
    data: '5GB',
    validity: '7 days',
    price: 19.99
  }, {
    id: 2,
    country: 'European Union',
    flag: '🇪🇺',
    data: '10GB',
    validity: '14 days',
    price: 29.99
  }, {
    id: 3,
    country: 'Japan',
    flag: '🇯🇵',
    data: '3GB',
    validity: '7 days',
    price: 24.99
  }, {
    id: 4,
    country: 'United Kingdom',
    flag: '🇬🇧',
    data: '8GB',
    validity: '30 days',
    price: 34.99
  }, {
    id: 5,
    country: 'Australia',
    flag: '🇦🇺',
    data: '5GB',
    validity: '14 days',
    price: 27.99
  }, {
    id: 6,
    country: 'Singapore',
    flag: '🇸🇬',
    data: '2GB',
    validity: '7 days',
    price: 14.99
  }];
  const currencySymbols = {
    USD: '$',
    EUR: '€',
    AED: 'د.إ'
  };
  const exchangeRates = {
    USD: 1,
    EUR: 0.85,
    AED: 3.67
  };
  const convertPrice = (priceUSD: number) => {
    return (priceUSD * exchangeRates[currency]).toFixed(2);
  };
  const filteredPlans = plans.filter(plan => plan.country.toLowerCase().includes(searchQuery.toLowerCase()));
  return <section id="plans" className="py-16 w-full bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your eSIM Plan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select from our range of data plans for your destination. All plans
            include data-only service with no contracts.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Search and filter */}
          <div className="relative w-full md:w-auto mb-4 md:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" placeholder="Search by country..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          {/* Currency selector */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Currency:</span>
            <div className="flex border border-gray-300 rounded-xl overflow-hidden">
              {(['USD', 'EUR', 'AED'] as const).map(curr => <button key={curr} className={`px-4 py-2 text-sm ${currency === curr ? 'bg-[#2563EB] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`} onClick={() => setCurrency(curr)}>
                  {curr}
                </button>)}
            </div>
          </div>
        </div>
        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map(plan => <div key={plan.id} className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{plan.flag}</span>
                <h3 className="text-xl font-semibold">{plan.country}</h3>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Data</span>
                <span className="font-semibold">{plan.data}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Validity</span>
                <span className="font-semibold">{plan.validity}</span>
              </div>
              <div className="mt-4 mb-6">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">
                    {currencySymbols[currency]}
                    {convertPrice(plan.price)}
                  </span>
                  <span className="ml-2 text-gray-500">/ plan</span>
                </div>
              </div>
              <Button variant="primary" fullWidth>
                Buy Now
              </Button>
            </div>)}
        </div>
        {filteredPlans.length === 0 && <div className="text-center py-12">
            <GlobeIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No plans found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or check out our other destinations
            </p>
          </div>}
        <div className="mt-8 text-center">
          <Button variant="outline">
            <FilterIcon className="h-4 w-4 mr-2" />
            View All Destinations
          </Button>
        </div>
      </div>
    </section>;
}