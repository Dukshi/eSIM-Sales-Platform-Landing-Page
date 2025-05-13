import React, { useState } from 'react';
import { CheckCircleIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from './Button';
import { AIChat } from './AIChat';
import { PlanSelector } from './PlanSelector';
export function HeroSection() {
  const [isPlanSelectorOpen, setIsPlanSelectorOpen] = useState(false);
  return <section className="w-full bg-gradient-to-br from-[#F9FAFB] to-[#EFF6FF] pt-20">
      <div className="container mx-auto px-6 max-w-[1280px]">
        {/* Title and subtitle */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Buy Your eSIM Instantly —{' '}
            <span className="text-[#2563EB]">Travel Connected.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant mobile data in 190+ countries, skip SIM shops.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button variant="primary" size="lg" onClick={() => setIsPlanSelectorOpen(true)}>
              Get Your eSIM
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg">
              How It Works
            </Button>
          </div>
        </div>
        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-12">
          {/* Chat interface */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <AIChat />
          </div>
          {/* Phone mockup */}
          <div className="lg:col-span-7 flex justify-center lg:justify-start">
            <div className="relative max-w-[500px] w-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2563EB] to-[#F97316] rounded-3xl blur-lg opacity-30 animate-pulse"></div>
              <div className="relative bg-white rounded-3xl shadow-xl p-2 border border-gray-100">
                <img src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2335&q=80" alt="Smartphone showing eSIM activation" className="w-full h-auto rounded-2xl" />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full shadow-lg p-3">
                  <div className="bg-[#10B981] text-white rounded-full p-2 animate-pulse">
                    <CheckCircleIcon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PlanSelector isOpen={isPlanSelectorOpen} onClose={() => setIsPlanSelectorOpen(false)} />
    </section>;
}