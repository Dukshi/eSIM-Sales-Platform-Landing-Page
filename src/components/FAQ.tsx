import React, { useState } from 'react';
import { SearchIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
type FAQItem = {
  id: number;
  question: string;
  answer: string;
  category: string;
};
export function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const faqs: FAQItem[] = [{
    id: 1,
    question: 'How do I install an eSIM?',
    answer: "Installing an eSIM is simple. After purchasing, you'll receive a QR code. On your device, go to Settings > Cellular/Mobile Data > Add Data Plan, then scan the QR code. Follow the on-screen instructions to complete the setup. We also provide detailed step-by-step guides for all major device manufacturers.",
    category: 'installation'
  }, {
    id: 2,
    question: 'What phones support eSIM?',
    answer: 'Most recent smartphones support eSIM technology, including iPhone XS and newer, Samsung Galaxy S20 and newer, Google Pixel 3 and newer, and many other modern Android devices. You can use our Device Checker tool to verify if your specific device is compatible.',
    category: 'compatibility'
  }, {
    id: 3,
    question: 'Can I top-up data later?',
    answer: 'Yes, you can easily top-up your data plan at any time through your account dashboard. Simply log in, select your active eSIM, and choose from available top-up options. The additional data will be added to your existing plan immediately.',
    category: 'usage'
  }, {
    id: 4,
    question: 'What is your refund policy?',
    answer: "We offer a 100% refund if you haven't activated your eSIM yet. Once activated, we can provide partial refunds based on data usage within 24 hours of activation. Please contact our customer support team for assistance with refunds.",
    category: 'billing'
  }, {
    id: 5,
    question: 'Can I use the eSIM for calls and SMS?',
    answer: 'Our eSIMs are primarily designed for data connectivity. While some plans may support VoIP calls through apps like WhatsApp, Skype, or FaceTime, traditional cellular calls and SMS are generally not included. We recommend using messaging apps for communication.',
    category: 'usage'
  }, {
    id: 6,
    question: 'How long is my eSIM valid?',
    answer: 'The validity period depends on the plan you choose. We offer plans ranging from 7 days to 30 days. The validity period begins when you activate the eSIM, not when you purchase it. You can see the validity period for each plan on the plan selection page.',
    category: 'usage'
  }];
  const filteredFaqs = faqs.filter(faq => faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));
  const toggleFaq = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };
  return <section id="faq" className="py-16 w-full bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our eSIM service,
            installation process, and more.
          </p>
        </div>
        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" placeholder="Search for questions..." className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
        </div>
        {/* FAQ accordion */}
        <div className="max-w-3xl mx-auto">
          {filteredFaqs.map(faq => <div key={faq.id} className="border-b border-gray-200 last:border-b-0">
              <button className="flex justify-between items-center w-full py-5 px-4 text-left focus:outline-none" onClick={() => toggleFaq(faq.id)} aria-expanded={expandedId === faq.id}>
                <h3 className="font-semibold text-lg">{faq.question}</h3>
                {expandedId === faq.id ? <ChevronUpIcon className="h-5 w-5 text-gray-500" /> : <ChevronDownIcon className="h-5 w-5 text-gray-500" />}
              </button>
              {expandedId === faq.id && <div className="pb-5 px-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>}
            </div>)}
          {filteredFaqs.length === 0 && <div className="text-center py-8">
              <p className="text-gray-500">
                No results found. Please try a different search term.
              </p>
            </div>}
        </div>
        {/* Contact support */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-2">Still have questions?</p>
          <a href="#support" className="text-[#2563EB] font-medium hover:underline">
            Contact our support team
          </a>
        </div>
      </div>
    </section>;
}