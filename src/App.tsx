import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PlanSelection } from './components/PlanSelection';
import { HowItWorks } from './components/HowItWorks';
import { FAQ } from './components/FAQ';
import { TrustSection } from './components/TrustSection';
import { Footer } from './components/Footer';
import { Dashboard } from './components/dashboard/Dashboard';
export function App() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="min-h-screen bg-[#F9FAFB] font-[Inter] text-[#111827]">
              <Navbar />
              <main>
                <HeroSection />
                <PlanSelection />
                <HowItWorks />
                <FAQ />
                <TrustSection />
              </main>
              <Footer />
            </div>} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>;
}