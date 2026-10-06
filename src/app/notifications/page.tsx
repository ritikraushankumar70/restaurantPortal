"use client";

import { Bell, CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";

export default function NotificationsPage() {
  const notifications = [
    { id: 1, title: 'New order received!', desc: 'Order #ORD-1006 from Amit Singh', time: '2 mins ago', read: false },
    { id: 2, title: 'Table booking request', desc: 'Table for 4 at 8:00 PM', time: '15 mins ago', read: true },
    { id: 3, title: 'Low stock alert', desc: 'Paneer is running low in inventory', time: '1 hour ago', read: true },
    { id: 4, title: 'New Review', desc: 'Rahul left a 5-star review', time: '3 hours ago', read: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onMenuClick={() => {}} />
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Bell className="text-orange-600" size={28} />
            All Notifications
          </h1>
          <button className="text-orange-600 font-medium hover:underline text-sm flex items-center gap-2">
            <CheckCircle size={16} /> Mark all as read
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 md:p-6 border-b border-gray-100 flex gap-4 items-start cursor-pointer hover:bg-gray-50 transition-colors ${
                !notification.read ? 'bg-orange-50/30' : ''
              }`}
            >
              <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${!notification.read ? 'bg-orange-500' : 'bg-transparent'}`} />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                    {notification.title}
                  </h3>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{notification.time}</span>
                </div>
                <p className="text-sm text-gray-600">{notification.desc}</p>
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              You're all caught up! No notifications to show.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
