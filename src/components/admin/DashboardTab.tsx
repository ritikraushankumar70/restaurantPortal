"use client";

import { useState, useEffect, useRef } from "react";

import Link from "next/link";
import { 
  TrendingUp, ShoppingBag, Clock, Star, Bell, 
  CheckCircle2, XCircle, ChevronRight, Download, ArrowLeft
} from "lucide-react";

export default function DashboardTab() {
  const [hasNewOrder, setHasNewOrder] = useState(false);
  const [avgRating, setAvgRating] = useState("4.3");
  const [weeklyData, setWeeklyData] = useState([6000, 9750, 4500, 12750, 8250, 13500, 10500]);

  
  // Dummy Live Orders
  const [liveOrders, setLiveOrders] = useState([
    { id: "#ORD-8901", customer: "Rahul Sharma", items: "2x Maharaja Thali", amount: "₹798", time: "2 mins ago", status: "delivered" },
    { id: "#ORD-8902", customer: "Priya Singh", items: "1x Paneer Tikka, 2x Naan", amount: "₹450", time: "5 mins ago", status: "delivered" },
    { id: "#ORD-8899", customer: "Amit Kumar", items: "1x Veg Biryani", amount: "₹220", time: "15 mins ago", status: "delivered" },
  ]);

  // Simulate incoming new order & sound alert
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasNewOrder(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Real Rating Calculation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedReviews = localStorage.getItem('myReviews');
      if (storedReviews) {
        try {
          const parsed = JSON.parse(storedReviews);
          const initialReviews = [ { rating: 5 }, { rating: 4 }, { rating: 2 } ];
          const allReviews = [...parsed, ...initialReviews];
          if (allReviews.length > 0) {
            const avg = (allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length).toFixed(1);
            setAvgRating(avg);
          }
        } catch (e) {}
      }
    }
  }, []);

  // Real Weekly Sales Calculation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedOrders = localStorage.getItem('myOrders');
      if (storedOrders) {
        try {
          const parsed = JSON.parse(storedOrders);
          const newWeekly = [0, 0, 0, 0, 0, 0, 0];
          let hasData = false;
          parsed.forEach((order: any) => {
            if (order.timestamp) {
              const date = new Date(order.timestamp);
              let day = date.getDay();
              day = day === 0 ? 6 : day - 1; // Convert Sun=0 to Sun=6, Mon=1 to Mon=0
              const amount = parseInt(String(order.amount).replace(/[^0-9]/g, '')) || 0;
              newWeekly[day] += amount;
              hasData = true;
            }
          });
          if (hasData) {
            setWeeklyData(newWeekly);
          }
        } catch (e) {}
      }
    }
  }, []);

  // Continuous Ringing Logic
  useEffect(() => {
    let ringInterval: NodeJS.Timeout;
    
    if (hasNewOrder) {
      try {
        const saved = localStorage.getItem("restaurantSettings");
        if (saved) {
          const settings = JSON.parse(saved);
          if (settings.soundAlert) {
            console.log("🔔 [ALERT UTILITY] Continuous ringing started...");
            alert("🔔 [Alert Utility]\nContinuous Ringing Sound playing... (New Order Received)");
            ringInterval = setInterval(() => {
              console.log("🔔 Ring... Ring...");
            }, 2000);
          }
        }
      } catch (e) {}
    }

    return () => {
      if (ringInterval) clearInterval(ringInterval);
    };
  }, [hasNewOrder]);

  const handleAcceptOrder = (id: string) => {
    setLiveOrders(orders => 
      orders.map(order => order.id === id ? { ...order, status: "preparing" } : order)
    );
    setHasNewOrder(false);

    // KOT Auto-Print Logic
    try {
      const saved = localStorage.getItem("restaurantSettings");
      if (saved) {
        const settings = JSON.parse(saved);
        if (settings.autoPrint) {
          console.log(`[PRINTER UTILITY] Printing KOT for ${id}...`);
          alert(`🖨️ [Printer Utility]\nAutomatically printing Kitchen Order Ticket (KOT) for ${id}...`);
        }
      }
    } catch (e) {
      console.error("Failed to read printer settings", e);
    }
  };

  const downloadReport = () => {
    const headers = "Metric,Value\n";
    const data = `Today's Sales,12450\nToday's Orders,42\nPending Orders,${liveOrders.filter(o => o.status === 'pending').length}\nAvg Rating,${avgRating}\n`;
    const blob = new Blob([headers + data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-8 pb-12">
        
        {/* Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Owner Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/home" className="flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-100 transition-colors shadow-sm">
              <ArrowLeft size={16} /> Customer View
            </Link>
            <button onClick={downloadReport} className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
              <Download size={16} /> Export Report
            </button>
          </div>
        </div>

        {/* TOP CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Link href="/payouts" className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer block">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">Today's Sales</span>
              <div className="p-2 bg-green-50 text-green-600 rounded-lg"><TrendingUp size={20} /></div>
            </div>
            <div className="flex items-end gap-2">
              <h2 className="text-3xl font-bold text-gray-900">₹12,450</h2>
              <span className="text-green-600 text-xs font-bold mb-1">+15%</span>
            </div>
          </Link>
          
          <Link href="/orders" className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer block">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">Today's Orders</span>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><ShoppingBag size={20} /></div>
            </div>
            <div className="flex items-end gap-2">
              <h2 className="text-3xl font-bold text-gray-900">42</h2>
              <span className="text-green-600 text-xs font-bold mb-1">+8%</span>
            </div>
          </Link>

          <Link href="/orders" className="bg-white p-5 rounded-2xl shadow-sm border border-orange-200 relative overflow-hidden flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer block">
            {hasNewOrder && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping m-3"></span>}
            <div className="flex items-center justify-between">
              <span className="text-orange-800 text-sm font-bold">Pending Orders</span>
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Clock size={20} /></div>
            </div>
            <div className="flex items-end gap-2">
              <h2 className="text-3xl font-bold text-orange-600">
                {liveOrders.filter(o => o.status === 'pending').length}
              </h2>
              <span className="text-orange-600 text-xs font-bold mb-1">Needs Action!</span>
            </div>
          </Link>

          <Link href="/reviews" className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer block">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">Avg Rating</span>
              <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg"><Star size={20} /></div>
            </div>
            <div className="flex items-end gap-2">
              <h2 className="text-3xl font-bold text-gray-900">{avgRating}<span className="text-lg text-gray-400">/5</span></h2>
            </div>
          </Link>
        </div>

        {/* MIDDLE SECTION: Live Orders & Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LIVE ORDERS (1-Click Accept Rule) */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                Live Orders 
                <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-xs">Live</span>
              </h3>
              <Link href="/orders" className="text-orange-600 text-sm font-medium hover:underline">View All</Link>
            </div>
            
            <div className="space-y-4">
              {liveOrders.map((order) => (
                <div key={order.id} className={`p-4 rounded-xl border ${order.status === 'pending' ? 'border-orange-200 bg-orange-50/30' : 'border-gray-100 bg-gray-50'} flex flex-col sm:flex-row justify-between gap-4 transition-colors`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-gray-900">{order.id}</span>
                      <span className="text-xs text-gray-500">{order.time}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-800">{order.customer}</p>
                    <p className="text-sm text-gray-500 mt-1">{order.items}</p>
                  </div>
                  
                  <div className="flex flex-col sm:items-end justify-between gap-3">
                    <span className="font-bold text-lg text-gray-900">{order.amount}</span>
                    {order.status === 'pending' ? (
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button 
                          onClick={() => handleAcceptOrder(order.id)}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors"
                        >
                          <CheckCircle2 size={16} /> Accept
                        </button>
                        <button 
                          onClick={() => setLiveOrders(orders => orders.map(o => o.id === order.id ? { ...o, status: "cancelled" } : o))}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
                        >
                          <XCircle size={20} />
                        </button>
                      </div>
                    ) : order.status === 'preparing' ? (
                      <div className="flex gap-2 w-full sm:w-auto">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-center flex items-center">
                          Preparing
                        </span>
                        <button 
                          onClick={() => setLiveOrders(orders => orders.map(o => o.id === order.id ? { ...o, status: "ready" } : o))}
                          className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-colors"
                        >
                          Mark Ready
                        </button>
                      </div>
                    ) : order.status === 'ready' ? (
                      <div className="flex gap-2 w-full sm:w-auto">
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-center flex items-center">
                          Ready
                        </span>
                        <button 
                          onClick={() => setLiveOrders(orders => orders.map(o => o.id === order.id ? { ...o, status: "delivered" } : o))}
                          className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-colors"
                        >
                          Deliver
                        </button>
                      </div>
                    ) : (
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-center ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {order.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIMPLE CSS SALES CHART */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Weekly Sales</h3>
            <div className="flex-1 flex items-end justify-between gap-2 h-48 mt-auto pb-2">
              {/* CSS Bars for Chart Demo */}
              {weeklyData.map((amount, i) => {
                const maxAmount = Math.max(...weeklyData) || 1;
                const height = amount > 0 ? Math.max((amount / maxAmount) * 100, 5) : 0;
                const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
                return (
                <div key={i} className="flex flex-col items-center justify-end gap-2 group w-full h-full">
                  <div className="w-full relative flex justify-center h-full items-end">
                    <div 
                      className={`w-full max-w-[2rem] rounded-t-md transition-all duration-500 ${i === todayIndex ? 'bg-orange-500' : 'bg-orange-100 group-hover:bg-orange-200 cursor-pointer'}`}
                      style={{ height: `${height}%` }}
                    ></div>
                    {/* Tooltip */}
                    <span className="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none whitespace-nowrap">
                      ₹{amount}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                  </span>
                </div>
              )})}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
