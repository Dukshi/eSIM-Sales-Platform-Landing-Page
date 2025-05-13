import React, { cloneElement } from 'react';
import { CreditCardIcon, ScanIcon, WifiIcon, CheckCircleIcon } from 'lucide-react';
const steps = [{
  id: 1,
  icon: <CreditCardIcon className="h-8 w-8" />,
  title: 'Choose your plan',
  description: 'Select the eSIM data plan that matches your destination and needs.'
}, {
  id: 2,
  icon: <ScanIcon className="h-8 w-8" />,
  title: 'Pay securely',
  description: 'Complete your purchase using our secure payment methods.'
}, {
  id: 3,
  icon: <WifiIcon className="h-8 w-8" />,
  title: 'Scan QR or install manually',
  description: 'Activate your eSIM by scanning the QR code or using the installation instructions.'
}, {
  id: 4,
  icon: <CheckCircleIcon className="h-8 w-8" />,
  title: "You're online!",
  description: 'Connect to local networks and enjoy high-speed data during your travels.'
}];
export function HowItWorks() {
  return <section id="how-it-works" className="py-16 w-full bg-[#F9FAFB]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Setting up your travel eSIM is quick and easy. Follow these simple
            steps to get connected.
          </p>
        </div>
        {/* Desktop view - horizontal steps */}
        <div className="hidden md:grid grid-cols-4 gap-8 relative">
          {/* Connection line */}
          <div className="absolute top-16 left-0 w-full h-0.5 bg-gray-200" aria-hidden="true"></div>
          {steps.map(step => <div key={step.id} className="relative flex flex-col items-center">
              {/* Step number */}
              <div className="w-12 h-12 rounded-full bg-[#2563EB] text-white flex items-center justify-center mb-4 z-10">
                {step.id}
              </div>
              {/* Step content */}
              <div className="text-center">
                <div className="bg-white rounded-full p-4 shadow-sm border border-gray-100 mb-4 inline-flex">
                  {cloneElement(step.icon as React.ReactElement, {
                className: 'h-8 w-8 text-[#2563EB]'
              })}
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>)}
        </div>
        {/* Mobile view - vertical steps */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto pb-8 space-x-6 snap-x">
            {steps.map(step => <div key={step.id} className="snap-start scroll-ml-4 flex-shrink-0 w-64 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center mr-3 text-sm">
                    {step.id}
                  </div>
                  <h3 className="font-bold">{step.title}</h3>
                </div>
                <div className="bg-blue-50 rounded-full p-3 inline-flex mb-3">
                  {cloneElement(step.icon as React.ReactElement, {
                className: 'h-6 w-6 text-[#2563EB]'
              })}
                </div>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>)}
          </div>
          {/* Scroll indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {steps.map(step => <div key={step.id} className="w-2 h-2 rounded-full bg-gray-300"></div>)}
          </div>
        </div>
        {/* Additional information */}
        <div className="mt-16 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-xl mb-4">Need more information?</h3>
          <p className="text-gray-600 mb-6">
            Our detailed installation guides are available for all major device
            manufacturers. If you need any assistance, our support team is
            available 24/7.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors cursor-pointer">
              <h4 className="font-semibold mb-2">iPhone Installation Guide</h4>
              <p className="text-sm text-gray-600">
                Step-by-step instructions for iPhone users
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors cursor-pointer">
              <h4 className="font-semibold mb-2">Android Installation Guide</h4>
              <p className="text-sm text-gray-600">
                Step-by-step instructions for Android users
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
}