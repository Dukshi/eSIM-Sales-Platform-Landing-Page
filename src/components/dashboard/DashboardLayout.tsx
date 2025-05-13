import React from 'react';
import { LayoutDashboard, UserCircle, CreditCard, History, Settings, Wifi, LogOut, Plus, Zap } from 'lucide-react';
import { Button } from '../Button';
const sidebarLinks = [{
  icon: LayoutDashboard,
  label: 'Dashboard',
  href: '/dashboard'
}, {
  icon: UserCircle,
  label: 'Profile',
  href: '/dashboard/profile'
}, {
  icon: Wifi,
  label: 'My eSIMs',
  href: '/dashboard/esims'
}, {
  icon: History,
  label: 'Usage History',
  href: '/dashboard/usage'
}, {
  icon: CreditCard,
  label: 'Transactions',
  href: '/dashboard/transactions'
}, {
  icon: Settings,
  label: 'Settings',
  href: '/dashboard/settings'
}];
export function DashboardLayout({
  children,
  onRechargeClick
}: {
  children: React.ReactNode;
  onRechargeClick?: () => void;
}) {
  return <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 z-40">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-[#2563EB] flex items-center justify-center mr-2">
                <Wifi className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold">TravelSIM</span>
            </div>
          </div>
          {/* Quick Actions */}
          <div className="p-4">
            <div className="space-y-2">
              <Button variant="primary" fullWidth>
                <Plus className="h-4 w-4 mr-2" />
                Buy New eSIM
              </Button>
              <Button variant="secondary" fullWidth onClick={onRechargeClick}>
                <Zap className="h-4 w-4 mr-2" />
                Recharge & Upgrade
              </Button>
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1">
            {sidebarLinks.map(link => <a key={link.href} href={link.href} className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <link.icon className="h-5 w-5 mr-3" />
                {link.label}
              </a>)}
          </nav>
          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">john@example.com</p>
              </div>
            </div>
            <Button variant="outline" fullWidth>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
      {/* Main content */}
      <main className="ml-64 p-8">{children}</main>
    </div>;
}