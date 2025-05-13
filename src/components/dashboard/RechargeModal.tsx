import React, { useState } from 'react';
import { XIcon, CheckIcon, AlertCircle, Zap } from 'lucide-react';
import { Button } from '../Button';
type RechargePlan = {
  id: string;
  data: string;
  validity: string;
  price: number;
  discount?: number;
  speed?: string;
  features?: string[];
  recommended?: boolean;
  promo?: string;
};
interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  esimDetails?: {
    id: string;
    number: string;
    country: string;
    flag: string;
    dataLeft: string;
    validUntil: string;
  };
}
type Step = 'select-plan' | 'confirm' | 'payment' | 'success';
export function RechargeModal({
  isOpen,
  onClose,
  esimDetails
}: RechargeModalProps) {
  const [step, setStep] = useState<Step>('select-plan');
  const [selectedPlan, setSelectedPlan] = useState<RechargePlan | null>(null);
  const rechargePlans: RechargePlan[] = [{
    id: 'quick',
    data: '2GB',
    validity: '3 days',
    price: 4.99,
    speed: '4G/5G',
    features: ['Emergency top-up', 'Instant activation'],
    promo: 'Perfect for short trips'
  }, {
    id: 'basic',
    data: '5GB',
    validity: '7 days',
    price: 9.99,
    speed: '4G/5G',
    discount: 10,
    features: ['Rollover data', 'Social media bonus'],
    recommended: true,
    promo: 'Most Popular'
  }, {
    id: 'standard',
    data: '10GB',
    validity: '15 days',
    price: 18.99,
    speed: '4G/5G',
    discount: 15,
    features: ['Rollover data', 'Video streaming optimization', 'Priority support'],
    promo: 'Best Value'
  }, {
    id: 'premium',
    data: '20GB',
    validity: '30 days',
    price: 29.99,
    speed: '4G/5G',
    discount: 25,
    features: ['Unlimited social media', 'HD video streaming', '24/7 Priority support', 'Data sharing'],
    promo: 'Maximum Flexibility'
  }];
  if (!isOpen) return null;
  const handlePlanSelect = (plan: RechargePlan) => {
    setSelectedPlan(plan);
    setStep('confirm');
  };
  const handleConfirm = () => {
    setStep('payment');
  };
  const handlePayment = () => {
    setStep('success');
  };
  const getUsageRecommendation = (data: string) => {
    const gb = parseInt(data);
    if (gb <= 2) return 'Ideal for light browsing and messaging';
    if (gb <= 5) return 'Perfect for social media and occasional streaming';
    if (gb <= 10) return 'Great for regular video calls and streaming';
    return 'Best for heavy data users and HD streaming';
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 relative overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {step === 'select-plan' && 'Recharge eSIM'}
            {step === 'confirm' && 'Confirm Selection'}
            {step === 'payment' && 'Payment'}
            {step === 'success' && 'Success'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        {/* Content */}
        <div className="p-6">
          {/* eSIM Details */}
          {esimDetails && <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{esimDetails.flag}</span>
                  <div>
                    <h3 className="font-semibold">{esimDetails.country}</h3>
                    <p className="text-sm text-gray-600">
                      eSIM: {esimDetails.number}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Current Data: {esimDetails.dataLeft}
                  </p>
                  <p className="text-sm text-gray-600">
                    Valid until: {esimDetails.validUntil}
                  </p>
                </div>
              </div>
            </div>}
          {step === 'select-plan' && <div className="space-y-4">
              {/* Data Usage Guide */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold mb-2">
                  Not sure how much data you need?
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>1 hour video call ≈ 500MB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>1 hour HD streaming ≈ 2GB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Social media/day ≈ 250MB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Web browsing/day ≈ 100MB</span>
                  </div>
                </div>
              </div>
              {/* Plans */}
              <div className="grid grid-cols-1 gap-4">
                {rechargePlans.map(plan => <button key={plan.id} onClick={() => handlePlanSelect(plan)} className={`w-full p-6 border-2 rounded-xl hover:border-blue-500 transition-colors relative overflow-hidden ${plan.recommended ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    {/* Promo Tag */}
                    {plan.promo && <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-sm rounded-bl-xl">
                        {plan.promo}
                      </div>}
                    <div className="flex justify-between items-start mb-4 pt-6">
                      <div>
                        <h3 className="text-xl font-semibold">{plan.data}</h3>
                        <p className="text-gray-600">
                          Valid for {plan.validity}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {getUsageRecommendation(plan.data)}
                        </p>
                      </div>
                      <div className="text-right">
                        {plan.discount > 0 && <div className="text-sm text-red-500 mb-1">
                            Save {plan.discount}%
                          </div>}
                        <div className="flex items-center gap-2 justify-end">
                          {plan.discount > 0 && <span className="text-sm text-gray-500 line-through">
                              $
                              {(plan.price / (1 - plan.discount / 100)).toFixed(2)}
                            </span>}
                          <span className="text-2xl font-bold">
                            ${plan.price}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Features */}
                    <div className="space-y-2 mt-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-blue-500" />
                        <span>Speed: {plan.speed}</span>
                      </div>
                      {plan.features?.map((feature, index) => <div key={index} className="flex items-center gap-2">
                          <CheckIcon className="h-4 w-4 text-green-500" />
                          <span>{feature}</span>
                        </div>)}
                    </div>
                  </button>)}
              </div>
            </div>}
          {step === 'confirm' && selectedPlan && <div className="space-y-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold mb-4">Selected Plan</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Data</span>
                    <span className="font-semibold">{selectedPlan.data}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Validity</span>
                    <span className="font-semibold">
                      {selectedPlan.validity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price</span>
                    <span className="font-semibold">${selectedPlan.price}</span>
                  </div>
                </div>
              </div>
              <Button variant="primary" fullWidth onClick={handleConfirm}>
                Confirm Selection
              </Button>
              <Button variant="outline" fullWidth onClick={() => setStep('select-plan')}>
                Change Plan
              </Button>
            </div>}
          {step === 'payment' && <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl" placeholder="123" />
                  </div>
                </div>
              </div>
              <Button variant="primary" fullWidth onClick={handlePayment}>
                Pay ${selectedPlan?.price}
              </Button>
            </div>}
          {step === 'success' && <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Recharge Successful!
              </h3>
              <p className="text-gray-600 mb-6">
                Your eSIM has been recharged and the data will be added
                immediately.
              </p>
              <div className="bg-blue-50 rounded-xl p-6 mb-6 text-left">
                <div className="flex items-center mb-2">
                  <AlertCircle className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="font-semibold">Important</span>
                </div>
                <p className="text-sm text-gray-600">
                  If you don't see the additional data immediately, please wait
                  a few minutes and restart your device if necessary.
                </p>
              </div>
              <Button variant="primary" fullWidth onClick={onClose}>
                Done
              </Button>
            </div>}
        </div>
      </div>
    </div>;
}