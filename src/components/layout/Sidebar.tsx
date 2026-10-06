"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag,
  Utensils,
  Calendar,
  Tag,
  Star,
  DollarSign,
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Info,
  Phone
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Order Management", href: "/orders", icon: ShoppingBag },
  { name: "Menu Management", href: "/menu", icon: Utensils },
  { name: "Table Management", href: "/tables", icon: Calendar },
  { name: "Offers / Coupons", href: "/offers", icon: Tag },
  { name: "Reviews", href: "/reviews", icon: Star },
  { name: "Payout Report", href: "/payouts", icon: DollarSign },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen, isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const pathname = usePathname();
  const { logoutAdmin } = useAdminAuth();

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r z-50 transition-all duration-300 flex flex-col
          ${isOpen ? "w-64" : "w-20"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? "bg-orange-50 text-orange-600" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                title={!isOpen ? item.name : undefined}
              >
                <Icon size={22} className={isActive ? "text-orange-600" : "text-gray-500"} />
                {isOpen && <span className="font-medium whitespace-nowrap">{item.name}</span>}
              </Link>
            );
          })}
        </div>

        <div className="p-3 border-t">
          <button
            onClick={logoutAdmin}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            title={!isOpen ? "Logout" : undefined}
          >
            <LogOut size={22} className="text-gray-500 group-hover:text-red-600" />
            {isOpen && <span className="font-medium whitespace-nowrap">Logout</span>}
          </button>
        </div>

        {/* Toggle Button (Desktop Only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden lg:flex absolute -right-4 top-8 bg-white border shadow-sm rounded-full p-1.5 text-gray-500 hover:text-gray-900 z-50"
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </aside>
    </>
  );
}
