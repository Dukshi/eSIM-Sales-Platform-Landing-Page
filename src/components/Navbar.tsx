import React, { useState } from 'react';
import { MenuIcon, XIcon, GlobeIcon, UserCircle } from 'lucide-react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-[#2563EB] flex items-center justify-center mr-2">
              <GlobeIcon className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">TravelSIM</span>
          </a>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#plans" className="font-medium hover:text-[#2563EB] transition-colors">
            Plans
          </a>
          <a href="#how-it-works" className="font-medium hover:text-[#2563EB] transition-colors">
            How It Works
          </a>
          <a href="#faq" className="font-medium hover:text-[#2563EB] transition-colors">
            FAQ
          </a>
          <a href="#support" className="font-medium hover:text-[#2563EB] transition-colors">
            Support
          </a>
          <div className="border-l border-gray-200 h-6 mx-2"></div>
          <Link to="/dashboard" className="flex items-center text-gray-700 hover:text-[#2563EB] transition-colors">
            <UserCircle className="h-5 w-5 mr-2" />
            Dashboard
          </Link>
          <Button variant="primary">Get Your eSIM</Button>
        </nav>
        {/* Mobile menu button */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden bg-white absolute w-full shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#plans" className="font-medium py-2 hover:text-[#2563EB] transition-colors">
              Plans
            </a>
            <a href="#how-it-works" className="font-medium py-2 hover:text-[#2563EB] transition-colors">
              How It Works
            </a>
            <a href="#faq" className="font-medium py-2 hover:text-[#2563EB] transition-colors">
              FAQ
            </a>
            <a href="#support" className="font-medium py-2 hover:text-[#2563EB] transition-colors">
              Support
            </a>
            <div className="flex items-center space-x-2 py-2">
              <GlobeIcon className="h-4 w-4" />
              <select className="bg-transparent border-none text-sm font-medium focus:outline-none">
                <option value="en">EN</option>
                <option value="ar">AR</option>
                <option value="fr">FR</option>
              </select>
            </div>
            <Link to="/dashboard" className="flex items-center font-medium py-2 hover:text-[#2563EB] transition-colors">
              <UserCircle className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
            <Button variant="primary" fullWidth>
              Get Your eSIM
            </Button>
          </div>
        </div>}
    </header>;
}