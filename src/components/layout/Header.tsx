"use client";

import { Bell, Menu, Search, User, LogOut, Utensils } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  onMenuClick: () => void;
}

const TOP_NAV_LINKS = [
  { name: "Home", href: "/home" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Categories", href: "/categories" },
  { name: "Contact", href: "/contact" },
  { name: "Profile", href: "/profile" },
];

export default function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const { isAdminAuthenticated, logoutAdmin } = useAdminAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New order received!', desc: 'Order #ORD-1006 from Amit Singh', time: '2 mins ago', read: false, link: '/orders' },
    { id: 2, title: 'Table booking request', desc: 'Table for 4 at 8:00 PM', time: '15 mins ago', read: false, link: '/tables' },
    { id: 3, title: 'Low stock alert', desc: 'Paneer is running low in inventory', time: '1 hour ago', read: false, link: '/admin/dashboard' },
  ]);
  const [restaurantName, setRestaurantName] = useState("Restaurant Portal");
  const pathname = usePathname();
  const router = useRouter();

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

    loadSettings();
    window.addEventListener("settingsUpdated", loadSettings);
    
    return () => {
      window.removeEventListener("settingsUpdated", loadSettings);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white border-b shadow-sm flex flex-col">
      <div className="flex items-center justify-between px-4 lg:px-8 h-16">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <Menu size={24} className="text-gray-600" />
          </button>
          
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-orange-600 p-2 rounded-lg">
              <Utensils size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              {restaurantName}
            </span>
          </Link>
        </div>

        <div className="flex-1 max-w-xl px-4 lg:px-8 hidden md:block">
          <form 
            className="relative group"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const q = formData.get("q");
              if (q) {
                router.push(`/home?q=${encodeURIComponent(q as string)}`);
              }
            }}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 w-5 h-5 transition-colors" />
            <input 
              type="text"
              name="q"
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white border focus:border-orange-500 rounded-full outline-none transition-all text-gray-900 placeholder-gray-400"
            />
          </form>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 relative rounded-full hover:bg-gray-100 transition-colors"
            >
              <Bell size={22} className="text-gray-600" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>

            {showNotifications && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-lg border py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Notifications</h3>
                    {notifications.some(n => !n.read) && (
                      <span 
                        onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                        className="text-xs text-orange-600 font-medium cursor-pointer hover:underline"
                      >
                        Mark all as read
                      </span>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-6 text-center text-gray-500 text-sm">
                        No notifications
                      </div>
                    ) : (
                      notifications.map(notification => (
                        <div 
                          key={notification.id}
                          onClick={() => {
                            setNotifications(notifications.map(n => n.id === notification.id ? { ...n, read: true } : n));
                            setShowNotifications(false);
                            if (notification.link) router.push(notification.link);
                          }}
                          className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${!notification.read ? 'bg-orange-50/30' : ''}`}
                        >
                          <p className={`text-sm ${!notification.read ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{notification.desc}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100 text-center">
                    <span 
                      onClick={() => {
                        setShowNotifications(false);
                        router.push('/notifications');
                      }}
                      className="text-sm text-orange-600 font-medium cursor-pointer hover:underline"
                    >
                      View all notifications
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-full lg:rounded-xl transition-colors border border-transparent lg:border-gray-200"
            >
              <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                {isAdminAuthenticated ? 'A' : (user?.username?.charAt(0).toUpperCase() || 'U')}
              </div>
              <span className="font-medium text-sm text-gray-700 hidden lg:block mr-2">
                {isAdminAuthenticated ? 'Admin' : user?.username}
              </span>
            </button>

            {showProfileMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfileMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{isAdminAuthenticated ? 'Admin' : user?.username}</p>
                    <p className="text-xs text-gray-500 truncate">{isAdminAuthenticated ? 'admin@restaurant.com' : user?.email}</p>
                  </div>
                  {!isAdminAuthenticated && (
                    <Link 
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <User size={16} /> Profile
                    </Link>
                  )}
                  <button 
                    onClick={() => {
                      setShowProfileMenu(false);
                      if (isAdminAuthenticated) {
                        logoutAdmin();
                      } else {
                        logout();
                      }
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Secondary Top Nav */}
      <div className="hidden lg:flex px-8 border-t bg-gray-50/50">
        {TOP_NAV_LINKS.map(link => (
          <Link 
            key={link.name} 
            href={link.href}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
              pathname === link.href 
                ? "border-orange-600 text-orange-600" 
                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
}
