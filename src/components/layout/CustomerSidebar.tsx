"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Grid,
  Info,
  Phone,
  User,
  Settings,
  LayoutDashboard,
  ConciergeBell,
  ShoppingCart,
  LogOut
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Services", href: "/services", icon: ConciergeBell },
  { name: "Categories", href: "/categories", icon: Grid },
  { name: "Profile", href: "/profile", icon: User },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Phone },
  { name: "Cart", href: "#cart", icon: ShoppingCart },
];

interface CustomerSidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
}

export default function CustomerSidebar({ isMobileOpen, setIsMobileOpen }: CustomerSidebarProps) {
  const pathname = usePathname();
  const [restaurantName, setRestaurantName] = useState("Eatery");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loadSettings = () => {
      const saved = localStorage.getItem("restaurantSettings");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.restaurantName) {
            setRestaurantName(parsed.restaurantName);
          }
        } catch (e) {}
      }
    };

    const loadCartCount = () => {
      const savedCart = localStorage.getItem("myCart");
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          setCartCount(parsed.length || 0);
        } catch (e) {}
      } else {
        setCartCount(0);
      }
    };

    loadSettings();
    loadCartCount();
    
    // Poll for cart changes since localStorage events only fire across tabs
    const intervalId = setInterval(loadCartCount, 1000);
    
    window.addEventListener("settingsUpdated", loadSettings);
    window.addEventListener("storage", loadCartCount);
    
    return () => {
      window.removeEventListener("settingsUpdated", loadSettings);
      window.removeEventListener("storage", loadCartCount);
      clearInterval(intervalId);
    };
  }, []);

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
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r z-50 transition-all duration-300 flex flex-col w-64
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo area inside sidebar for mobile */}
        <div className="h-16 flex items-center px-6 border-b lg:hidden">
          <span className="text-xl font-bold text-orange-600">{restaurantName}</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            if (item.name === "Cart") {
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setIsMobileOpen(false);
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new Event('openGlobalCart'));
                    }
                  }}
                  className={`flex items-center justify-between px-3 py-3 rounded-xl transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full text-left`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={22} className="text-gray-500" />
                    <span className="font-medium whitespace-nowrap">{item.name}</span>
                  </div>
                  {cartCount > 0 && (
                    <div className="bg-orange-500 text-white text-[11px] font-bold h-5 min-w-[20px] px-1.5 flex items-center justify-center rounded-full shadow-sm">
                      {cartCount}
                    </div>
                  )}
                </button>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? "bg-orange-50 text-orange-600" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={22} className={isActive ? "text-orange-600" : "text-gray-500"} />
                <span className="font-medium whitespace-nowrap">{item.name}</span>
              </Link>
            );
          })}
          
          {/* Logout Button */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <button
              onClick={() => {
                setIsMobileOpen(false);
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('currentUser');
                  window.location.href = '/auth';
                }
              }}
              className="flex w-full items-center gap-3 px-3 py-3 rounded-xl transition-colors text-red-600 hover:bg-red-50"
            >
              <LogOut size={22} />
              <span className="font-medium whitespace-nowrap">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
