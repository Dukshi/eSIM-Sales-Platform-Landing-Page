import React, { useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { Wifi, Globe, Signal, Download, Upload, Clock, CreditCard, AlertCircle } from 'lucide-react';
import { Button } from '../Button';
import { RechargeModal } from './RechargeModal';
export function Dashboard() {
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [selectedEsim, setSelectedEsim] = useState(null);
  const activeEsims = [{
    id: 1,
    country: 'Turkey',
    flag: '🇹🇷',
    dataLeft: '3.2 GB',
    validUntil: '2024-02-20',
    status: 'active'
  }, {
    id: 2,
    country: 'UAE',
    flag: '🇦🇪',
    dataLeft: '1.5 GB',
    validUntil: '2024-02-15',
    status: 'expiring'
  }];
  const recentTransactions = [{
    id: 1,
    type: 'Purchase',
    amount: '$19.99',
    date: '2024-01-15',
    status: 'completed'
  }, {
    id: 2,
    type: 'Top-up',
    amount: '$9.99',
    date: '2024-01-10',
    status: 'completed'
  }];
  const handleRecharge = esim => {
    setSelectedEsim(esim);
    setIsRechargeModalOpen(true);
  };
  return <DashboardLayout onRechargeClick={() => setIsRechargeModalOpen(true)}>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <Wifi className="h-6 w-6 text-blue-500" />
            <span className="text-sm text-gray-500">Active eSIMs</span>
          </div>
          <p className="text-2xl font-bold">2</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <Globe className="h-6 w-6 text-green-500" />
            <span className="text-sm text-gray-500">Countries Visited</span>
          </div>
          <p className="text-2xl font-bold">5</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <Signal className="h-6 w-6 text-purple-500" />
            <span className="text-sm text-gray-500">Data Used</span>
          </div>
          <p className="text-2xl font-bold">25.4 GB</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <CreditCard className="h-6 w-6 text-orange-500" />
            <span className="text-sm text-gray-500">Total Spent</span>
          </div>
          <p className="text-2xl font-bold">$89.95</p>
        </div>
      </div>
      {/* Active eSIMs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold">Active eSIMs</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeEsims.map(esim => <div key={esim.id} className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{esim.flag}</span>
                    <div>
                      <h3 className="font-semibold">{esim.country}</h3>
                      <p className="text-sm text-gray-500">
                        Valid until {esim.validUntil}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${esim.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {esim.status}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Signal className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-600">Data Left</span>
                  </div>
                  <span className="font-semibold">{esim.dataLeft}</span>
                </div>
                <Button variant="outline" fullWidth onClick={() => handleRecharge(esim)}>
                  Top Up Data
                </Button>
              </div>)}
          </div>
        </div>
      </div>
      {/* Usage Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Data Usage */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold">Data Usage</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Download className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Download</span>
                </div>
                <span className="font-semibold">18.3 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Upload className="h-5 w-5 text-green-500 mr-2" />
                  <span>Upload</span>
                </div>
                <span className="font-semibold">7.1 GB</span>
              </div>
            </div>
          </div>
        </div>
        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold">Recent Transactions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentTransactions.map(transaction => <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="font-medium">{transaction.type}</p>
                      <p className="text-sm text-gray-500">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold">{transaction.amount}</span>
                </div>)}
            </div>
          </div>
        </div>
      </div>
      {/* Support Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white/10 rounded-lg">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Need Help?</h3>
            <p className="text-blue-100 mb-4">
              Our support team is available 24/7 to assist you with any
              questions.
            </p>
            <Button variant="outline" className="bg-white text-blue-600">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
      <RechargeModal isOpen={isRechargeModalOpen} onClose={() => setIsRechargeModalOpen(false)} esimDetails={selectedEsim} />
    </DashboardLayout>;
}