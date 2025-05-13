import React, { useState } from 'react';
import { MessageSquareIcon, XIcon, SmartphoneIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { Button } from './Button';
export function DeviceChecker() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [device, setDevice] = useState({
    brand: '',
    model: ''
  });
  const [result, setResult] = useState<'compatible' | 'incompatible' | null>(null);
  const handleStartCheck = () => {
    setStep(1);
  };
  const handleSubmitDevice = () => {
    // Simulate device check
    if (device.brand.toLowerCase() === 'iphone' || device.brand.toLowerCase() === 'samsung' || device.brand.toLowerCase() === 'google') {
      setResult('compatible');
    } else {
      setResult('incompatible');
    }
    setStep(2);
  };
  const handleReset = () => {
    setStep(0);
    setDevice({
      brand: '',
      model: ''
    });
    setResult(null);
  };
  return <div className="fixed bottom-6 right-6 z-40">
      {/* Chat button */}
      <button onClick={() => setIsOpen(!isOpen)} className="bg-[#2563EB] text-white rounded-full p-4 shadow-lg hover:bg-[#1D4ED8] transition-colors" aria-label="Device checker">
        {isOpen ? <XIcon className="h-6 w-6" /> : <MessageSquareIcon className="h-6 w-6" />}
      </button>
      {/* Chat window */}
      {isOpen && <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-[#2563EB] text-white p-4">
            <h3 className="font-bold flex items-center">
              <SmartphoneIcon className="mr-2 h-5 w-5" />
              Device Compatibility Checker
            </h3>
            <p className="text-sm text-blue-100">
              Check if your phone supports eSIM
            </p>
          </div>
          {/* Content */}
          <div className="p-4 h-80 overflow-y-auto">
            {step === 0 && <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <SmartphoneIcon className="h-8 w-8 text-[#2563EB]" />
                </div>
                <h4 className="font-semibold text-lg mb-2">
                  Is your device eSIM compatible?
                </h4>
                <p className="text-gray-600 mb-6">
                  Let us check if your device supports our eSIM technology.
                </p>
                <Button onClick={handleStartCheck} variant="primary" fullWidth>
                  Check My Device
                </Button>
              </div>}
            {step === 1 && <div>
                <h4 className="font-medium mb-4">
                  Please enter your device details:
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand
                    </label>
                    <input type="text" placeholder="e.g. Apple, Samsung, Google" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" value={device.brand} onChange={e => setDevice({
                ...device,
                brand: e.target.value
              })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Model
                    </label>
                    <input type="text" placeholder="e.g. iPhone 13, Galaxy S22" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]" value={device.model} onChange={e => setDevice({
                ...device,
                model: e.target.value
              })} />
                  </div>
                  <Button onClick={handleSubmitDevice} variant="primary" fullWidth disabled={!device.brand || !device.model}>
                    Check Compatibility
                  </Button>
                </div>
              </div>}
            {step === 2 && <div className="flex flex-col items-center text-center">
                {result === 'compatible' ? <>
                    <div className="bg-green-100 p-4 rounded-full mb-4">
                      <CheckCircleIcon className="h-8 w-8 text-[#10B981]" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Good news!</h4>
                    <p className="text-gray-600 mb-6">
                      Your {device.brand} {device.model} is compatible with our
                      eSIM technology.
                    </p>
                    <Button onClick={() => window.location.href = '#plans'} variant="primary" fullWidth>
                      View Available Plans
                    </Button>
                  </> : <>
                    <div className="bg-red-100 p-4 rounded-full mb-4">
                      <XCircleIcon className="h-8 w-8 text-red-500" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Sorry!</h4>
                    <p className="text-gray-600 mb-6">
                      It seems your {device.brand} {device.model} might not be
                      compatible with eSIM technology.
                    </p>
                    <Button onClick={handleReset} variant="outline" fullWidth>
                      Check Another Device
                    </Button>
                  </>}
              </div>}
          </div>
          {/* Footer */}
          <div className="border-t border-gray-100 p-3 text-center">
            <button onClick={handleReset} className="text-sm text-gray-600 hover:text-[#2563EB]">
              Start over
            </button>
          </div>
        </div>}
    </div>;
}