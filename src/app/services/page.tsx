"use client";
import CustomerLayout from "@/components/layout/CustomerLayout";
import { 
  Bike, CalendarDays, ShoppingBag, Clock, UtensilsCrossed, 
  Map, CreditCard, SlidersHorizontal, RefreshCcw, Users, 
  ChefHat, MessageCircle, QrCode, Video, Gift
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, MapPin, Calendar, Search, ChevronRight, Check, CheckCircle, Copy, Star, Coins, Activity, Wallet, Smartphone, Download } from "lucide-react";

export default function Services() {
  const router = useRouter();
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isTakeawayModalOpen, setIsTakeawayModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isTiffinModalOpen, setIsTiffinModalOpen] = useState(false);
  
  const [deliveryAddressDetails, setDeliveryAddressDetails] = useState("");
  const [tableDate, setTableDate] = useState("");
  const [tableTime, setTableTime] = useState("");
  const [tableGuests, setTableGuests] = useState("2 People");
  const [tableRestaurant, setTableRestaurant] = useState("The Grand Palate");
  const [tableSeating, setTableSeating] = useState("Any Available");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [tiffinStartDate, setTiffinStartDate] = useState("");
  const [tiffinPref, setTiffinPref] = useState("Lunch Only (1 Meal/day)");
  const [tiffinAddress, setTiffinAddress] = useState("Indore Vijay Nagar");
  const [toastMessage, setToastMessage] = useState("");
  

  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [trackingStatus, setTrackingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [trackingInput, setTrackingInput] = useState('');
  const [orderProgress, setOrderProgress] = useState('Preparing Food');
  const [deliveredOrders, setDeliveredOrders] = useState<string[]>([]);
  const [currentOrderId, setCurrentOrderId] = useState('');
  const [lastOrder, setLastOrder] = useState<any[]>([]);

  const [isOffersModalOpen, setIsOffersModalOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(150);
  const [totalSpent, setTotalSpent] = useState(300);

  const [isCctvModalOpen, setIsCctvModalOpen] = useState(false);
  const [cctvStatus, setCctvStatus] = useState<'connecting' | 'connected'>('connecting');

  const [isFamilyCartModalOpen, setIsFamilyCartModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isCustomizationModalOpen, setIsCustomizationModalOpen] = useState(false);


  const [isPartyCateringModalOpen, setIsPartyCateringModalOpen] = useState(false);


  useEffect(() => {
    if (isOffersModalOpen && typeof window !== 'undefined') {
      const storedWallet = localStorage.getItem('myWalletBalance');
      if (storedWallet) {
        setWalletBalance(Number(storedWallet));
      }
      const storedOrders = JSON.parse(localStorage.getItem('myOrders') || '[]');
      let spent = 0;
      storedOrders.forEach((o: any) => {
        const amtStr = o.amount?.toString().replace(/[^0-9]/g, '');
        if (amtStr) spent += parseInt(amtStr, 10);
      });
      if (spent > 0) setTotalSpent(spent);
      if (!storedWallet && spent > 0) {
        const earned = Math.floor(spent / 500) * 50;
        setWalletBalance(earned > 150 ? earned : 150);
      }
    }
  }, [isOffersModalOpen]);

  useEffect(() => {
    if (isCctvModalOpen) {
      setCctvStatus('connecting');
      const timer = setTimeout(() => {
        setCctvStatus('connected');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isCctvModalOpen]);
  const showToast = (msg: string) => { 
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };
  const setCurrentAddress = (addr: string) => {};

  const coreServices = [
    { name: "Food Delivery", desc: "Fast & hot delivery to your home or office.", icon: <Bike size={24} />, onClick: () => setIsDeliveryModalOpen(true) },
    { name: "Table Booking", desc: "Reserve your table and time slot in advance.", icon: <CalendarDays size={24} />, onClick: () => setIsTableModalOpen(true) },
    { name: "Takeaway / Pickup", desc: "Self-pickup from restaurant with 10% discount.", icon: <ShoppingBag size={24} />, onClick: () => setIsTakeawayModalOpen(true) },
    { name: "Schedule Order", desc: "Pre-order at night, get it delivered by 9 AM.", icon: <Clock size={24} />, onClick: () => setIsScheduleModalOpen(true) },
    { name: "Tiffin Service", desc: "Monthly subscription for daily lunch/dinner.", icon: <UtensilsCrossed size={24} />, onClick: () => setIsTiffinModalOpen(true) },
  ];

  const handleReorder = () => {
    const storedFavs = JSON.parse(localStorage.getItem('myFavourites') || '[]');
    if (storedFavs.length > 0) {
      const currentCart = JSON.parse(localStorage.getItem('myCart') || '[]');
      const newCart = [...currentCart, ...storedFavs];
      localStorage.setItem('myCart', JSON.stringify(newCart));
      showToast("Added all your favourites to the cart!");
      window.dispatchEvent(new Event("openGlobalCart"));
    } else {
      showToast("You don't have any favourites saved yet.");
    }
  };

  const convenience = [
    { name: "Live Tracking", desc: "Track your rider on the map in real-time.", icon: <Map size={24} />, onClick: () => setIsTrackingModalOpen(true) },
    { name: "Multiple Payments", desc: "UPI, COD, Card, Wallet options available.", icon: <CreditCard size={24} />, onClick: () => setIsPaymentModalOpen(true) },
    { name: "Customization", desc: "Jain food, extra spicy, or no onion-garlic.", icon: <SlidersHorizontal size={24} />, onClick: () => setIsCustomizationModalOpen(true) },
    { name: "1-Click Reorder", desc: "Quickly order your previous favorites.", icon: <RefreshCcw size={24} />, onClick: handleReorder },
    { name: "Family Cart", desc: "Add multiple different items for everyone.", icon: <Users size={24} />, onClick: () => setIsFamilyCartModalOpen(true) },
  ];

  const premium = [
    { name: "Live Kitchen View", desc: "Watch CCTV clip for 100% hygiene trust.", icon: <Video size={24} />, onClick: () => setIsCctvModalOpen(true) },
    { name: "Party Catering", desc: "Bulk orders for 20+ people with special menu.", icon: <ChefHat size={24} />, onClick: () => setIsPartyCateringModalOpen(true) },
    { name: "Offers & Loyalty", desc: "Get 50 Rs in wallet for every 500 Rs spent.", icon: <Gift size={24} />, onClick: () => setIsOffersModalOpen(true) },
    { name: "WhatsApp Ordering", desc: "Direct and simple ordering via WhatsApp.", icon: <MessageCircle size={24} />, onClick: () => window.open("https://wa.me/919876543210", "_blank") },
    { name: "In-Table QR Order", desc: "Scan QR at the table and order instantly.", icon: <QrCode size={24} />, onClick: () => setIsTableModalOpen(true) },
  ];

  return (
    <CustomerLayout>
      <div className="flex flex-col gap-10 pb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Our Services</h1>
          <p className="text-gray-600 mt-2 text-lg">Explore the premium services designed for the best dining experience in Indore.</p>
        </div>

        {/* Core Services */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-6">Core Ordering Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreServices.map((service: any, idx) => (
              <div onClick={service.onClick} key={idx} className="block h-full cursor-pointer">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-orange-100 hover:shadow-md hover:border-orange-300 transition-all group h-full cursor-pointer">
                  <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{service.name}</h3>
                  <p className="text-gray-500 text-sm">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Convenience */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-6">Customer Convenience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {convenience.map((service, idx) => (
              <div onClick={service.onClick} key={idx} className="block h-full cursor-pointer">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100 hover:shadow-md hover:border-blue-300 transition-all group h-full">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{service.name}</h3>
                  <p className="text-gray-500 text-sm">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Premium Services */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-6">Premium Offerings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premium.map((service, idx) => (
              <div onClick={service.onClick} key={idx} className="block h-full cursor-pointer">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-purple-100 hover:shadow-md hover:border-purple-300 transition-all group h-full">
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{service.name}</h3>
                  <p className="text-gray-500 text-sm">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    {isDeliveryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDeliveryModalOpen(false)}></div>
          <div className="bg-white rounded-3xl w-full max-w-md relative z-10 overflow-hidden shadow-2xl animate-scaleIn">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black mb-1">Food Delivery</h2>
                <p className="text-orange-100 text-sm">Where should we deliver your hot food?</p>
              </div>
              <button onClick={() => setIsDeliveryModalOpen(false)} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Delivery Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      value={deliveryAddressDetails}
                      onChange={(e) => setDeliveryAddressDetails(e.target.value)}
                      placeholder="Enter full address..." 
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-gray-900 bg-white placeholder-gray-400"
                    />
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex gap-3">
                  <Clock className="text-orange-500 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-sm font-bold text-gray-900">Delivery in 30 mins</p>
                    <p className="text-xs text-gray-600">Our delivery partner will be assigned shortly after you place the order.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsDeliveryModalOpen(false)} className="px-5 py-2.5 rounded-xl text-gray-600 font-bold hover:bg-gray-200 transition">Cancel</button>
              <button 
                onClick={() => {
                  if (deliveryAddressDetails) {
                    
                  }
                  setIsDeliveryModalOpen(false);
                  showToast("Delivery location confirmed! Browse the menu.");
                  
                }}
                className="px-6 py-2.5 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition shadow-md"
              >
                Browse Menu
              </button>
            </div>
          </div>
        </div>
      )}
{isTableModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book a Table</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant</label>
                <select value={tableRestaurant} onChange={(e) => setTableRestaurant(e.target.value)} className="w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none bg-white">
                  <option value="The Grand Palate">The Grand Palate</option>
                  <option value="Spice Symphony">Spice Symphony</option>
                  <option value="Ocean View Diner">Ocean View Diner</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" min={new Date().toISOString().split('T')[0]} value={tableDate} onChange={(e) => setTableDate(e.target.value)} className="w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input type="time" value={tableTime} onChange={(e) => setTableTime(e.target.value)} className="w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none bg-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <select value={tableGuests} onChange={(e) => setTableGuests(e.target.value)} className="w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none bg-white">
                    {[1,2,3,4,5,6,7,8,"8+"].map(n => <option key={n} value={`${n} People`}>{n} People</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Table</label>
                  <select value={tableSeating} onChange={(e) => setTableSeating(e.target.value)} className="w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none bg-white">
                    {0 > 0 ? (
                      [].map((t: any) => (
                        <option key={t.id} value={`Table ${t.id} (${t.capacity} Seats)`}>
                          {t.id} (Capacity: {t.capacity})
                        </option>
                      ))
                    ) : (
                      <option value="Any Available">Any Available</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button 
                  onClick={() => setIsTableModalOpen(false)} 
                  className="bg-gray-100 text-gray-700 font-bold rounded-xl px-6 py-2.5 hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (!tableDate) {
                      showToast("Please select a date!");
                      return;
                    }
                    if (typeof window !== 'undefined') {
                      const existingBookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
                      const newId = existingBookings.length > 0 ? Math.max(...existingBookings.map((b: any) => b.id)) + 1 : 1;
                      const dateObj = new Date(`${tableDate}T${tableTime || "19:00"}`);
                      const newBooking = {
                        id: newId,
                        restaurant: tableRestaurant,
                        date: dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ` at ${tableTime || "19:00"}`,
                        details: `${tableGuests.replace(' People', '')} Guests • ${tableSeating}`,
                        status: "Confirmed"
                      };
                      localStorage.setItem('myBookings', JSON.stringify([newBooking, ...existingBookings]));

                      // Also mark the table as Reserved in admin portal if a specific table was selected
                      if (tableSeating !== "Any Available") {
                        const tableId = tableSeating.split(' ')[1]; // "Table T1 (4 Seats)" -> "T1"
                        const allTables = JSON.parse(localStorage.getItem('myTables') || '[]');
                        const updatedTables = allTables.map((t: any) => 
                          t.id === tableId ? { ...t, status: "Reserved", customer: "Customer", time: tableTime || "19:00" } : t
                        );
                        localStorage.setItem('myTables', JSON.stringify(updatedTables));
                        // Re-fetch to update available tables
                        window.dispatchEvent(new Event("storage"));
                      }
                    }
                    setIsTableModalOpen(false);
                    showToast("Table reserved successfully! Check Profile for details.");
                  }} 
                  className="bg-orange-600 text-white font-bold rounded-xl px-6 py-2.5 hover:bg-orange-700 transition"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
{isTakeawayModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsTakeawayModalOpen(false)}></div>
          <div className="bg-white rounded-3xl w-full max-w-md relative z-10 overflow-hidden shadow-2xl animate-scaleIn">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 text-white flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black mb-1">Takeaway / Pickup</h2>
                <p className="text-green-100 text-sm">Pick up your order and get 10% OFF!</p>
              </div>
              <button onClick={() => setIsTakeawayModalOpen(false)} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Pickup Store Location</label>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 cursor-default">
                    <p className="font-bold text-gray-900">The Grand Palate</p>
                    <p className="text-sm text-gray-600 mt-1">123 Food Street, Vijay Nagar, Indore</p>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex gap-3">
                  <ShoppingBag className="text-green-600 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-sm font-bold text-gray-900">Skip the Queue</p>
                    <p className="text-xs text-gray-600">Your order will be ready for pickup in 15-20 minutes after placement.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsTakeawayModalOpen(false)} className="px-5 py-2.5 rounded-xl text-gray-600 font-bold hover:bg-gray-200 transition">Cancel</button>
              <button 
                onClick={() => {
                  setIsTakeawayModalOpen(false);
                  showToast("Takeaway selected! Browse menu for pickup.");
                  router.push('/home#categories');
                }}
                className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition shadow-md"
              >
                Start Order
              </button>
            </div>
          </div>
        </div>
      )}
{isScheduleModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button onClick={() => setIsScheduleModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold">&times;</button>
            
            <h2 className="text-3xl font-black text-gray-900 mb-2">Schedule Order</h2>
            <p className="text-gray-500 mb-6 font-medium">Plan your meal ahead of time for delivery or takeaway.</p>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Date</label>
                <input 
                  type="date" 
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Time</label>
                <input 
                  type="time" 
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all" 
                />
              </div>
              
              <button 
                onClick={() => {
                  if (!scheduleDate || !scheduleTime) {
                    showToast("Please select both date and time.");
                    return;
                  }
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('scheduledOrderContext', JSON.stringify({ date: scheduleDate, time: scheduleTime }));
                  }
                  setIsScheduleModalOpen(false);
                  showToast(`Order scheduled for ${scheduleDate} at ${scheduleTime}`);
                  
                  
                }} 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl py-4 shadow-lg transition active:scale-95 uppercase tracking-wide text-sm mt-4"
              >
                Confirm Schedule
              </button>
            </div>
          </div>
        </div>
      )}
{isTiffinModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setIsTiffinModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold">&times;</button>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tiffin Subscription</h2>
            <p className="text-gray-500 text-sm mb-6">₹2999/month for healthy daily meals.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input type="date" min={new Date().toISOString().split('T')[0]} value={tiffinStartDate} onChange={(e) => setTiffinStartDate(e.target.value)} className="w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meal Preference</label>
                <select value={tiffinPref} onChange={(e) => setTiffinPref(e.target.value)} className="w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none">
                  <option>Lunch Only (1 Meal/day)</option>
                  <option>Dinner Only (1 Meal/day)</option>
                  <option>Both Lunch & Dinner (₹4999/month)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                <textarea value={tiffinAddress} onChange={(e) => setTiffinAddress(e.target.value)} rows={2} className="w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" placeholder="Enter your full address..."></textarea>
              </div>
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const existingSubs = JSON.parse(localStorage.getItem('mySubscriptions') || '[]');
                    const newId = existingSubs.length > 0 ? Math.max(...existingSubs.map((s: any) => s.id)) + 1 : 1;
                    const validTillObj = new Date(tiffinStartDate || new Date());
                    validTillObj.setMonth(validTillObj.getMonth() + 1);
                    const newSub = {
                      id: newId,
                      title: "Monthly Lunch Tiffin",
                      details: `Pure Veg • ${tiffinPref}`,
                      validTill: validTillObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                      remainingMeals: "30 / 30",
                      status: "Active"
                    };
                    localStorage.setItem('mySubscriptions', JSON.stringify([newSub, ...existingSubs]));
                  }
                  setIsTiffinModalOpen(false);
                  showToast("Subscription successful! Check Profile for details.");
                }} 
                className="w-full bg-orange-600 text-white font-bold rounded-xl py-3 mt-4 hover:bg-orange-700 transition"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      )}
      
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-xl shadow-2xl z-50">
          {toastMessage}
        </div>
      )}
    {isTrackingModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative text-center">
            <button onClick={() => {
                setIsTrackingModalOpen(false);
                setTrackingStatus("idle");
                setTrackingInput("");
                setOrderProgress("Preparing Food");
              }} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold">&times;</button>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner transition-colors ${trackingStatus === 'success' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
              {trackingStatus === 'success' ? (
                <Check size={40} className="animate-bounce" />
              ) : (
                <MapPin size={40} className={trackingStatus === 'loading' ? 'animate-pulse' : 'animate-bounce'} />
              )}
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Track Order</h2>
            <p className="text-gray-500 mb-6 font-medium">Enter your Order ID to track your delicious food.</p>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Order ID" 
                value={trackingInput}
                onChange={(e) => {
                  setTrackingInput(e.target.value);
                  if (trackingStatus === 'error') setTrackingStatus('idle');
                }}
                disabled={trackingStatus === 'loading' || trackingStatus === 'success'}
                className={`w-full border ${trackingStatus === 'error' ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-xl px-4 py-3 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none shadow-sm transition-all`} 
              />
              {trackingStatus === 'error' && (
                <p className="text-red-500 text-xs font-bold text-left -mt-2">Please enter a valid Order ID.</p>
              )}
              <button 
                disabled={trackingStatus === 'loading' || trackingStatus === 'success'}
                onClick={() => {
                  if (!trackingInput || trackingInput.length < 5) {
                    setTrackingStatus('error');
                    return;
                  }
                  
                  // Try to find the actual order from localStorage
                  let foundOrder = null;
                  if (typeof window !== 'undefined') {
                    const existingOrders = JSON.parse(localStorage.getItem('myOrders') || '[]');
                    foundOrder = existingOrders.find((o: any) => o.id === trackingInput);
                  }

                  if (foundOrder) {
                    if (foundOrder.rawItems) {
                      setLastOrder(foundOrder.rawItems);
                    }
                    if (foundOrder.status) {
                      setOrderProgress(foundOrder.status);
                    }
                  } else {
                    // Lenient check for demo purposes if order not found
                    if (!trackingInput.startsWith("#ORD") && trackingInput !== currentOrderId) {
                      setTrackingStatus('error');
                      showToast("Please enter a valid order ID (e.g., #ORD12345).");
                      return;
                    }
                    
                    if (deliveredOrders.includes(trackingInput)) {
                      setOrderProgress('Delivered');
                    } else {
                      setOrderProgress('Preparing Food');
                    }
                  }

                  setTrackingStatus("loading");
                  setTimeout(() => {
                    setTrackingStatus("success");
                    if (foundOrder?.status === 'Delivered' || deliveredOrders.includes(trackingInput)) {
                      showToast("Order Found! Your food has already been delivered.");
                    } else {
                      showToast("Order Found! Your food is being prepared.");
                    }
                  }, 2000);
                }} 
                className={`w-full text-white font-bold rounded-xl py-4 shadow-lg transition tracking-wide uppercase text-sm flex items-center justify-center disabled:opacity-90 disabled:active:scale-100 active:scale-95 ${
                  trackingStatus === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-600 hover:bg-orange-700'
                }`}
              >
                {trackingStatus === 'idle' || trackingStatus === 'error' ? 'Track Now' : null}
                {trackingStatus === 'loading' ? <><span className="animate-spin inline-block mr-2">↻</span> Searching...</> : null}
                {trackingStatus === 'success' ? 'Refresh Status' : null}
              </button>
              
              {trackingStatus === 'success' && (
                <div className="mt-6 text-left border-t border-gray-100 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-gray-500 font-medium">Status</div>
                      <div className={`font-bold flex items-center gap-2 ${orderProgress === 'Delivered' ? 'text-green-600' : 'text-orange-600'}`}>
                        {orderProgress !== 'Delivered' && <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>}
                        {orderProgress === 'Delivered' && <Check size={16} />}
                        {orderProgress}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 font-medium">ETA</div>
                      <div className={`font-bold ${orderProgress === 'Delivered' ? 'text-green-600' : 'text-gray-900'}`}>
                        {orderProgress === 'Preparing Food' ? '15 mins' : 
                         orderProgress === 'Out for Delivery' ? '5 mins' : 
                         'Arrived'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Order Details</h4>
                    <div className="space-y-3 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                      {lastOrder && lastOrder.length > 0 ? (
                        lastOrder.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <span className="font-medium text-gray-800 flex-1 truncate pr-2">{item.name}</span>
                            <span className="font-bold text-gray-900 shrink-0">{item.price}</span>
                          </div>
                        ))
                      ) : (
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium text-gray-800">1x Farmhouse Pizza</span>
                          <span className="font-bold text-gray-900">₹399</span>
                        </div>
                      )}
                    </div>
                    {lastOrder && lastOrder.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                        <span className="font-bold text-gray-900">Total</span>
                        <span className="font-black text-orange-600">₹{lastOrder.reduce((total, item) => total + parseInt(String(item.price).replace('₹', '') || "0"), 0)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}\n{isOffersModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button onClick={() => setIsOffersModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold">&times;</button>
            
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <Gift size={32} />
            </div>
            
            <h2 className="text-3xl font-black text-gray-900 mb-2">Your Loyalty Wallet</h2>
            <p className="text-gray-500 mb-6 font-medium">Earn ₹50 for every ₹500 you spend!</p>
            
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white mb-6 shadow-lg shadow-purple-200">
              <div className="text-sm font-medium opacity-80 mb-1">Current Balance</div>
              <div className="text-4xl font-black mb-4">₹{walletBalance.toFixed(2)}</div>
              
              <div className="w-full bg-black/20 rounded-full h-2 mb-2">
                <div className="bg-white h-2 rounded-full" style={{ width: `${(totalSpent % 500) / 5}%` }}></div>
              </div>
              <div className="flex justify-between text-xs font-medium opacity-80">
                <span>Spent: ₹{totalSpent}</span>
                <span>₹{500 - (totalSpent % 500)} more for next ₹50!</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="border border-gray-100 bg-gray-50 p-4 rounded-xl flex justify-between items-center">
                <div className="font-bold text-gray-900">WELCOME50</div>
                <div className="text-sm text-green-600 font-bold">₹50 OFF</div>
              </div>
              <div className="border border-gray-100 bg-gray-50 p-4 rounded-xl flex justify-between items-center">
                <div className="font-bold text-gray-900">FESTIVE20</div>
                <div className="text-sm text-green-600 font-bold">20% OFF</div>
              </div>
            </div>
            
              <button 
                onClick={() => {
                  setIsOffersModalOpen(false);
                  router.push('/home#categories');
                }} 
                className="w-full bg-gray-900 hover:bg-black text-white font-bold rounded-xl py-4 shadow-lg transition active:scale-95 uppercase tracking-wide text-sm mt-6"
              >
              Order Now to Earn More
            </button>
          </div>
        </div>
      )}\n{isCctvModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative">
            <div className="p-4 bg-black flex justify-between items-center border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <h2 className="text-white font-bold tracking-wider">LIVE KITCHEN FEED</h2>
              </div>
              <button onClick={() => setIsCctvModalOpen(false)} className="text-gray-400 hover:text-white font-bold">&times;</button>
            </div>
            <div className="aspect-video bg-black flex items-center justify-center relative overflow-hidden">
              {cctvStatus === "connecting" ? (
                <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-mono text-sm animate-pulse">
                  [ CAMERA SIGNAL CONNECTING... ]
                </div>
              ) : (
                <Image 
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop" 
                  alt="Live Kitchen Feed"
                  fill
                  className="object-cover opacity-80"
                  unoptimized
                />
              )}
              
              {/* Overlay layout */}
              <div className="absolute top-4 right-4 text-xs font-mono text-white/70 bg-black/40 px-2 py-1 rounded">{new Date().toLocaleTimeString()}</div>
              <div className="absolute bottom-4 left-4 text-xs font-mono text-white/70 bg-black/40 px-2 py-1 rounded">CAM 01 - MAIN LINE</div>
              
              {cctvStatus === "connected" && (
                <div className="absolute top-4 left-4 text-xs font-bold text-red-500 bg-black/60 px-2 py-1 rounded animate-pulse flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div> REC
                </div>
              )}
            </div>
          </div>
        </div>
      )}\n{isFamilyCartModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFamilyCartModalOpen(false)}></div>
          <div className="bg-white rounded-3xl w-full max-w-md relative z-10 overflow-hidden shadow-2xl animate-scaleIn">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black mb-1">Family Cart</h2>
                <p className="text-purple-100 text-sm">Order everything together, seamlessly</p>
              </div>
              <button onClick={() => setIsFamilyCartModalOpen(false)} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition"><X size={20} /></button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex gap-3">
                <Users className="text-purple-600 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900">How it works</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Just browse the menu and add as many different items as you want. Our system automatically organizes your large orders perfectly!
                  </p>
                </div>
              </div>
              
              <ul className="space-y-3 text-sm text-gray-700 font-medium">
                <li className="flex items-center gap-2"><Check className="text-green-500" size={18}/> Mix and match cuisines</li>
                <li className="flex items-center gap-2"><Check className="text-green-500" size={18}/> Add special instructions per item</li>
                <li className="flex items-center gap-2"><Check className="text-green-500" size={18}/> Free delivery for family orders</li>
              </ul>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3 justify-end">
              <button 
                onClick={() => setIsFamilyCartModalOpen(false)} 
                className="px-5 py-2.5 rounded-xl text-gray-600 font-bold hover:bg-gray-200 transition"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setIsFamilyCartModalOpen(false);
                  router.push('/home#categories');
                }} 
                className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition shadow-md"
              >
                Start Adding
              </button>
            </div>
          </div>
        </div>
      )}\n{isPartyCateringModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setIsPartyCateringModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold">&times;</button>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Party Catering</h2>
            <p className="text-gray-500 text-sm mb-6">Let us make your event special with our delicious food!</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                <input type="date" min={new Date().toISOString().split('T')[0]} className="w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                <select className="w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none">
                  <option>Birthday Party</option>
                  <option>Corporate Event</option>
                  <option>Wedding / Reception</option>
                  <option>Other Gathering</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                <input type="number" min="10" placeholder="E.g., 50" className="w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" placeholder="Your contact number" className="w-full border border-gray-300 text-gray-900 rounded-xl px-4 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none" />
              </div>
              <button 
                onClick={() => {
                  setIsPartyCateringModalOpen(false);
                  showToast("Catering request submitted! Our team will contact you shortly.");
                }} 
                className="w-full bg-purple-600 text-white font-bold rounded-xl py-3 mt-4 hover:bg-purple-700 transition"
              >
                Request Quote
              </button>
            </div>
          </div>
        </div>
      )}\n
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsPaymentModalOpen(false)}></div>
          <div className="bg-white rounded-3xl w-full max-w-md relative z-10 overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white relative">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-black mb-1">Payment Methods</h2>
                  <p className="text-blue-100 text-sm">All options available at checkout.</p>
                </div>
                <button onClick={() => setIsPaymentModalOpen(false)} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition"><X size={20} /></button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex gap-4 items-center">
                <CreditCard className="text-blue-600" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900">Credit / Debit Cards</h3>
                  <p className="text-sm text-gray-500">Visa, MasterCard, RuPay</p>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex gap-4 items-center">
                <QrCode className="text-blue-600" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900">UPI / QR Scan</h3>
                  <p className="text-sm text-gray-500">GPay, PhonePe, Paytm</p>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex gap-4 items-center">
                <Map className="text-blue-600" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900">Cash on Delivery (COD)</h3>
                  <p className="text-sm text-gray-500">Pay when your food arrives</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsPaymentModalOpen(false);
                  showToast("Proceed to checkout to complete payment!");
                  window.dispatchEvent(new Event("openGlobalCart"));
                }}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-md mt-4"
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {isCustomizationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCustomizationModalOpen(false)}></div>
          <div className="bg-white rounded-3xl w-full max-w-md relative z-10 overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white relative">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-black mb-1">Food Customization</h2>
                  <p className="text-orange-100 text-sm">Make your meal perfectly yours!</p>
                </div>
                <button onClick={() => setIsCustomizationModalOpen(false)} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition"><X size={20} /></button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-600 mb-4">You can customize any dish directly from the menu before adding it to your cart. Options include:</p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-orange-50 border border-orange-100 p-3 rounded-xl text-center">
                  <span className="font-bold text-orange-900 block">🌶️ Spice Level</span>
                  <span className="text-xs text-orange-600">Mild to Extra Spicy</span>
                </div>
                <div className="bg-green-50 border border-green-100 p-3 rounded-xl text-center">
                  <span className="font-bold text-green-900 block">🥬 Jain Prep</span>
                  <span className="text-xs text-green-600">No Onion/Garlic</span>
                </div>
                <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-xl text-center">
                  <span className="font-bold text-yellow-900 block">🧀 Add-ons</span>
                  <span className="text-xs text-yellow-600">Extra Cheese/Toppings</span>
                </div>
                <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl text-center">
                  <span className="font-bold text-blue-900 block">📝 Special Notes</span>
                  <span className="text-xs text-blue-600">Custom instructions</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  setIsCustomizationModalOpen(false);
                  router.push('/home#categories');
                }}
                className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl hover:bg-orange-700 transition shadow-md mt-4"
              >
                Browse Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </CustomerLayout>
  );
}
