"use client";

import { useState, useEffect } from "react";
import CustomerLayout from "@/components/layout/CustomerLayout";
import { useAuth } from "@/context/AuthContext";
import { 
  User, 
  MapPin, 
  ShoppingBag, 
  CalendarCheck, 
  RefreshCcw,
  Heart,
  Wallet,
  Star,
  Ticket,
  Settings,
  LogOut,
  ChevronRight,
  Edit2,
  Trash2,
  Smartphone,
  ShieldAlert,
  CheckCircle2,
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  Award,
  TrendingUp,
  CreditCard
} from "lucide-react";

export default function CustomerProfilePage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("orders");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedMobile = localStorage.getItem("myMobileNumber");
      if (storedMobile) {
        setMobileNumber(storedMobile);
      } else if (user?.phone && !mobileNumber) {
        setMobileNumber(user.phone);
      }
    }
  }, [user]);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    dob: "",
    gender: ""
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem("myPersonalInfo");
      if (stored) {
        setPersonalInfo(JSON.parse(stored));
      } else if (user) {
        setPersonalInfo({
          fullName: user.username || "Guest User",
          email: user.email || "",
          dob: "",
          gender: ""
        });
      }
    }
  }, [user]);

  const handleSavePersonalInfo = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("myPersonalInfo", JSON.stringify(personalInfo));
      alert("Personal Details Updated!");
    }
  };

  // Real Past Orders
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateOrders = (isInitial = false) => {
      const stored = localStorage.getItem('myOrders');
      if (stored) {
        let parsedOrders = JSON.parse(stored);
        let needsUpdate = false;
        
        parsedOrders = parsedOrders.map((o: any) => {
          if (o.status !== 'Delivered' && !o.status?.startsWith('Scheduled')) {
            const age = Date.now() - (o.timestamp || 0);
            if (!o.timestamp || age > 10000) { // >10s -> Delivered
              needsUpdate = true;
              return { ...o, status: 'Delivered' };
            } else if (age > 5000 && o.status === 'Preparing Food') { // >5s -> Out for Delivery
              needsUpdate = true;
              return { ...o, status: 'Out for Delivery' };
            }
          }
          return o;
        });

        if (needsUpdate) {
          localStorage.setItem('myOrders', JSON.stringify(parsedOrders));
          setOrders(parsedOrders);
        } else if (isInitial) {
          setOrders(parsedOrders);
        }
      }
    };

    updateOrders(true);
    const interval = setInterval(() => updateOrders(false), 2000);
    return () => clearInterval(interval);
  }, []);

  // Addresses State
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isAddressesLoaded, setIsAddressesLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('myAddresses');
      if (stored) {
        setAddresses(JSON.parse(stored));
      } else {
        setAddresses([]);
      }
      setIsAddressesLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isAddressesLoaded && typeof window !== 'undefined') {
      localStorage.setItem('myAddresses', JSON.stringify(addresses));
    }
  }, [addresses, isAddressesLoaded]);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ tag: "Home", name: "", address: "" });

  const handleAddAddress = () => {
    setFormData({ tag: "Home", name: "", address: "" });
    setEditingAddressId(null);
    setIsAddressModalOpen(true);
  };

  const handleEditAddress = (id: number) => {
    const addr = addresses.find(a => a.id === id);
    if (addr) {
      setFormData({ tag: addr.tag, name: addr.name, address: addr.address });
      setEditingAddressId(id);
      setIsAddressModalOpen(true);
    }
  };

  const saveAddress = () => {
    if (!formData.name || !formData.address) return;

    if (editingAddressId) {
      setAddresses(addresses.map(a => a.id === editingAddressId ? { ...a, ...formData } : a));
    } else {
      const newId = addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1;
      setAddresses([...addresses, {
        id: newId,
        tag: formData.tag,
        tagColor: "bg-gray-100 text-gray-600",
        iconColor: formData.tag === "Home" ? "text-orange-500" : formData.tag === "Work" ? "text-blue-500" : "text-gray-500",
        name: formData.name,
        address: formData.address
      }]);
    }
    setIsAddressModalOpen(false);
  };

  const handleDeleteAddress = (id: number) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };

  // Bookings State
  const [bookings, setBookings] = useState<any[]>([]);
  const [isBookingsLoaded, setIsBookingsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('myBookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      } else {
        setBookings([]);
      }
      setIsBookingsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isBookingsLoaded && typeof window !== 'undefined') {
      localStorage.setItem('myBookings', JSON.stringify(bookings));
    }
  }, [bookings, isBookingsLoaded]);

  // Subscriptions State
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [isSubscriptionsLoaded, setIsSubscriptionsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mySubscriptions');
      if (stored) {
        setSubscriptions(JSON.parse(stored));
      } else {
        setSubscriptions([]);
      }
      setIsSubscriptionsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isSubscriptionsLoaded && typeof window !== 'undefined') {
      localStorage.setItem('mySubscriptions', JSON.stringify(subscriptions));
    }
  }, [subscriptions, isSubscriptionsLoaded]);

  // Wallet State
  const [walletBalance, setWalletBalance] = useState(450);
  const [loyaltyCoins, setLoyaltyCoins] = useState(1250);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isWalletLoaded, setIsWalletLoaded] = useState(false);
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false);
  const [addMoneyAmount, setAddMoneyAmount] = useState("");
  const [addMoneyStep, setAddMoneyStep] = useState<"amount" | "payment">("amount");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedWallet = localStorage.getItem('myWalletBalance');
      if (storedWallet) setWalletBalance(Number(storedWallet));

      const storedCoins = localStorage.getItem('myLoyaltyCoins');
      if (storedCoins) setLoyaltyCoins(Number(storedCoins));

      const storedTx = localStorage.getItem('myTransactions');
      if (storedTx) {
        setTransactions(JSON.parse(storedTx));
      } else {
        setTransactions([]);
      }
      setIsWalletLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isWalletLoaded && typeof window !== 'undefined') {
      localStorage.setItem('myWalletBalance', walletBalance.toString());
      localStorage.setItem('myLoyaltyCoins', loyaltyCoins.toString());
      localStorage.setItem('myTransactions', JSON.stringify(transactions));
    }
  }, [walletBalance, loyaltyCoins, transactions, isWalletLoaded]);

  const handleAddMoney = () => {
    const amount = Number(addMoneyAmount);
    if (amount > 0) {
      setWalletBalance(prev => prev + amount);
      const newTx = {
        id: Math.random(),
        title: "Added to Wallet",
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        amount: amount,
        type: "credit"
      };
      setTransactions([newTx, ...transactions]);
      setIsAddMoneyModalOpen(false);
      setAddMoneyAmount("");
      setAddMoneyStep("amount");
      alert(`₹${amount} added successfully!`);
    } else {
      alert("Please enter a valid amount.");
    }
  };

  // Reviews State
  const [reviews, setReviews] = useState<any[]>([]);
  const [isReviewsLoaded, setIsReviewsLoaded] = useState(false);
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({ title: "", rating: 5, comment: "" });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('myReviews');
      if (stored) {
        setReviews(JSON.parse(stored));
      } else {
        setReviews([]);
      }
      setIsReviewsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isReviewsLoaded && typeof window !== 'undefined') {
      localStorage.setItem('myReviews', JSON.stringify(reviews));
    }
  }, [reviews, isReviewsLoaded]);

  const handleDeleteReview = (id: number) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  const handleAddReview = () => {
    if (!reviewFormData.title || !reviewFormData.comment) {
      alert("Please fill all fields");
      return;
    }
    const newReview = {
      id: Math.random(),
      title: reviewFormData.title,
      rating: reviewFormData.rating,
      comment: reviewFormData.comment,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setReviews([newReview, ...reviews]);
    setIsAddReviewModalOpen(false);
    setReviewFormData({ title: "", rating: 5, comment: "" });
  };

  // Coupons State
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => {
      setCopiedCoupon(null);
    }, 2000);
  };


  // Favourites State
  const [favourites, setFavourites] = useState<any[]>([]);
  const [isFavouritesLoaded, setIsFavouritesLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('myFavourites');
      if (stored) {
        setFavourites(JSON.parse(stored));
      } else {
        setFavourites([]);
      }
      setIsFavouritesLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isFavouritesLoaded && typeof window !== 'undefined') {
      localStorage.setItem('myFavourites', JSON.stringify(favourites));
    }
  }, [favourites, isFavouritesLoaded]);

  const handleRemoveFavourite = (id: number) => {
    setFavourites(favourites.filter(f => f.id !== id));
  };

  const handleAddToCart = (item: any) => {
    if (typeof window !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem('myCart') || '[]');
      localStorage.setItem('myCart', JSON.stringify([...cart, item]));
      alert(`${item.name} added to cart!`);
    }
  };

  const handleToggleSubscriptionStatus = (id: number) => {
    if (window.confirm("Are you sure you want to change the status of this subscription?")) {
      setSubscriptions(subscriptions.map(s => {
        if (s.id === id) {
          return { ...s, status: s.status === 'Active' ? 'Paused' : 'Active' };
        }
        return s;
      }));
    }
  };

  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [subscriptionFormData, setSubscriptionFormData] = useState({ title: "Monthly Lunch Tiffin", details: "Pure Veg • 2 Rotis, Rice, Dal, Sabzi", duration: "1 Month" });

  const handleAddSubscription = () => {
    setSubscriptionFormData({ title: "Monthly Lunch Tiffin", details: "Pure Veg • 2 Rotis, Rice, Dal, Sabzi", duration: "1 Month" });
    setIsSubscriptionModalOpen(true);
  };

  const saveSubscription = () => {
    const newId = subscriptions.length > 0 ? Math.max(...subscriptions.map(s => s.id)) + 1 : 1;
    
    // Calculate Valid Till date
    const today = new Date();
    const validTillDate = new Date(today.setMonth(today.getMonth() + (subscriptionFormData.duration === "1 Month" ? 1 : 3)));
    
    setSubscriptions([{
      id: newId,
      title: subscriptionFormData.title,
      details: subscriptionFormData.details,
      validTill: validTillDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      remainingMeals: subscriptionFormData.duration === "1 Month" ? "30 / 30" : "90 / 90",
      status: "Active"
    }, ...subscriptions]);
    setIsSubscriptionModalOpen(false);
  };

  const handleCancelBooking = (id: number) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setBookings(bookings.map(b => b.id === id ? { ...b, status: "Cancelled" } : b));
    }
  };

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({ restaurant: "The Grand Palate", date: "", guests: "2", seating: "Indoor Seating" });

  const handleAddBooking = () => {
    setBookingFormData({ restaurant: "The Grand Palate", date: "", guests: "2", seating: "Indoor Seating" });
    setIsBookingModalOpen(true);
  };

  const saveBooking = () => {
    if (!bookingFormData.date) return;
    const newId = bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1;
    setBookings([{
      id: newId,
      restaurant: bookingFormData.restaurant,
      date: bookingFormData.date,
      details: `${bookingFormData.guests} Guests • ${bookingFormData.seating}`,
      status: "Confirmed"
    }, ...bookings]);
    setIsBookingModalOpen(false);
  };

  const handleMobileEdit = () => {
    if (!showOtpInput) {
      alert("OTP has been sent to your new mobile number.");
      setShowOtpInput(true);
    } else {
      alert("Mobile number updated successfully!");
      setShowOtpInput(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem("myMobileNumber", mobileNumber);
      }
    }
  };

  const handleReorder = (orderId: string) => {
    const orderToReorder = orders.find(o => o.id === orderId);
    if (orderToReorder && orderToReorder.rawItems && orderToReorder.rawItems.length > 0) {
      if (typeof window !== 'undefined') {
        const existingCart = JSON.parse(localStorage.getItem('myCart') || '[]');
        localStorage.setItem('myCart', JSON.stringify([...existingCart, ...orderToReorder.rawItems]));
        alert(`Items from Order ${orderId} added to cart!`);
      }
    } else {
      alert(`Cannot reorder this old order directly.`);
    }
  };

  const handleOpenReviewForOrder = (order: any) => {
    setReviewFormData({ title: order.items, rating: 5, comment: "" });
    setIsAddReviewModalOpen(true);
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.");
    if (confirmDelete) {
      if (typeof window !== 'undefined') {
        const email = user?.email;
        const phone = user?.phone;
        const storedUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');
        const updatedUsers = storedUsers.filter((u: any) => {
          if (email && u.email === email) return false;
          if (phone && u.phone === phone) return false;
          return true;
        });
        localStorage.setItem('mock_users', JSON.stringify(updatedUsers));
        
        localStorage.removeItem('myOrders');
        localStorage.removeItem('myAddresses');
        localStorage.removeItem('myMobileNumber');
        localStorage.removeItem('myCart');
        localStorage.removeItem('myWalletBalance');
        localStorage.removeItem('myTransactions');
        localStorage.removeItem('myPersonalInfo');
        localStorage.removeItem('festive20Uses');
        localStorage.removeItem('myBookings');
        localStorage.removeItem('mySubscriptions');
        localStorage.removeItem('myLoyaltyCoins');
        localStorage.removeItem('myReviews');
        localStorage.removeItem('myFavourites');
        
        logout();
      }
      alert("Your account has been permanently deleted.");
    }
  };

  const menuItems = [
    { id: "orders", icon: ShoppingBag, label: "My Orders", desc: "Past & Live Orders" },
    { id: "addresses", icon: MapPin, label: "My Addresses", desc: "Saved Delivery Locations" },
    { id: "bookings", icon: CalendarCheck, label: "Bookings & Enquiries", desc: "Reservations & Catering" },
    { id: "subscription", icon: RefreshCcw, label: "My Subscriptions", desc: "Tiffin Services" },
    { id: "favourites", icon: Heart, label: "Favourites", desc: "Dishes & Restaurants" },
    { id: "wallet", icon: Wallet, label: "Wallet & Coins", desc: "Balance & Loyalty Points" },
    { id: "reviews", icon: Star, label: "My Reviews", desc: "Ratings given by you" },
    { id: "coupons", icon: Ticket, label: "My Coupons", desc: "Available Offers" },
    { id: "settings", icon: Settings, label: "Settings", desc: "Security & Notifications" },
  ];

  return (
    <CustomerLayout>
      <div className="flex flex-col lg:flex-row gap-8 pb-12 items-start">
        
        {/* Left Sidebar Menu */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          
          {/* Top Profile Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-orange-400 to-amber-500"></div>
            <div className="relative mt-8">
              <div className="w-24 h-24 bg-white rounded-full mx-auto p-1 border border-gray-100 shadow-md">
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                  <User size={40} />
                </div>
              </div>
              <button className="absolute bottom-0 right-[35%] bg-white p-1.5 rounded-full border shadow-sm text-gray-600 hover:text-orange-600">
                <Edit2 size={14} />
              </button>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mt-4 capitalize">{personalInfo.fullName || user?.username || "Guest User"}</h2>
            <p className="text-gray-500 text-sm">{personalInfo.email || user?.email || "No email provided"}</p>
            
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-2">
              <Smartphone size={16} className="text-gray-400" />
              <span className="font-medium text-gray-700">{mobileNumber || "Add Mobile Number"}</span>
            </div>
          </div>

          {/* Navigation List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 border-b border-gray-50 transition-colors ${isActive ? 'bg-orange-50/50' : 'hover:bg-gray-50'}`}
                >
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>
                    <Icon size={20} />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className={`font-bold text-sm ${isActive ? 'text-orange-900' : 'text-gray-900'}`}>{item.label}</h3>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <ChevronRight size={16} className={isActive ? 'text-orange-600' : 'text-gray-300'} />
                </button>
              );
            })}
            
            <button onClick={logout} className="w-full flex items-center gap-4 px-6 py-4 hover:bg-red-50 transition-colors text-left group">
              <div className="p-2 rounded-lg bg-red-50 text-red-500 group-hover:bg-red-100">
                <LogOut size={20} />
              </div>
              <h3 className="font-bold text-sm text-red-600">Logout</h3>
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[600px]">
          
          {/* TAB: My Orders */}
          {activeTab === "orders" && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
                <p className="text-gray-500 mt-1">View your past and live orders here.</p>
              </div>
              
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                    <p>No orders found. Go ahead and order some delicious food!</p>
                  </div>
                ) : (
                  orders.map((order, idx) => (
                    <div key={idx} className="border border-gray-100 rounded-xl p-5 flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold text-gray-900">{order.id}</span>
                          <span className={`text-xs px-2 py-0.5 rounded font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{order.items}</p>
                        <p className="text-xs text-gray-400 mt-2">{order.date}</p>
                      </div>
                      <div className="flex flex-col items-start md:items-end justify-between gap-4">
                        <span className="font-bold text-lg text-gray-900">{order.amount}</span>
                        <div className="flex gap-2">
                          {order.status === 'Delivered' && (
                            <button 
                              onClick={() => handleOpenReviewForOrder(order)}
                              className="flex items-center gap-1.5 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-bold transition-colors"
                            >
                              <Star size={14} className="text-amber-500 fill-amber-500" /> Review
                            </button>
                          )}
                          {/* REQUIRED FEATURE: 1-Click Reorder */}
                          <button 
                            onClick={() => handleReorder(order.id)}
                            className="flex items-center gap-2 bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                          >
                            <RefreshCcw size={14} /> Reorder
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB: Settings (Mobile Edit & Delete Account) */}
          {activeTab === "settings" && (
            <div className="space-y-8 animate-in fade-in">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Settings & Security</h2>
                <p className="text-gray-500 mt-1">Manage your account credentials and data.</p>
              </div>

              {/* Personal Details */}
              <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User size={20} className="text-orange-500" /> Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-500">Full Name</label>
                    <input type="text" value={personalInfo.fullName} onChange={e => setPersonalInfo({...personalInfo, fullName: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:border-orange-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-500">Email Address</label>
                    <input type="email" value={personalInfo.email} onChange={e => setPersonalInfo({...personalInfo, email: e.target.value})} placeholder="No email provided" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:border-orange-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-500">Date of Birth</label>
                    <input type="date" value={personalInfo.dob} onChange={e => setPersonalInfo({...personalInfo, dob: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:border-orange-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-500">Gender</label>
                    <select value={personalInfo.gender} onChange={e => setPersonalInfo({...personalInfo, gender: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:border-orange-500">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button onClick={handleSavePersonalInfo} className="bg-orange-100 text-orange-700 px-6 py-2 rounded-lg font-bold text-sm hover:bg-orange-200 transition">Save Changes</button>
                </div>
              </div>

              {/* REQUIRED FEATURE: OTP Mobile Edit */}
              <div className="p-6 border border-gray-100 rounded-xl bg-gray-50">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Smartphone className="text-blue-500" /> Update Mobile Number
                </h3>
                <div className="flex flex-col md:flex-row gap-4 max-w-lg">
                  <div className="flex-1 space-y-2">
                    <input 
                      type="tel" 
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-blue-500" 
                    />
                    {showOtpInput && (
                      <input 
                        type="text" 
                        placeholder="Enter 6-digit OTP"
                        className="w-full px-4 py-2.5 rounded-lg border border-blue-200 bg-blue-50 text-gray-900 focus:outline-none focus:border-blue-500 mt-2 placeholder-blue-300 font-medium tracking-widest" 
                      />
                    )}
                  </div>
                  <button 
                    onClick={handleMobileEdit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold transition-colors whitespace-nowrap h-fit"
                  >
                    {showOtpInput ? "Verify OTP" : "Change Number"}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3">* Mobile number change requires OTP verification for security.</p>
              </div>

              {/* Notifications */}
              <div className="p-6 border border-gray-100 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-4">Notification Preferences</h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Email & WhatsApp Order Updates</span>
                </label>
              </div>

              {/* REQUIRED FEATURE: Delete Account */}
              <div className="p-6 border border-red-100 rounded-xl bg-red-50/50 mt-8">
                <h3 className="font-bold text-red-700 mb-2 flex items-center gap-2">
                  <ShieldAlert size={20} /> Danger Zone
                </h3>
                <p className="text-sm text-red-600/80 mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone. Required for Google Play / App Store compliance.
                </p>
                <button 
                  onClick={handleDeleteAccount}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
                >
                  <Trash2 size={16} /> Delete Account
                </button>
              </div>

            </div>
          )}

          {activeTab === "addresses" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">My Addresses</h2>
                  <p className="text-gray-500 mt-1">Manage your saved delivery locations.</p>
                </div>
                <button 
                  onClick={handleAddAddress}
                  className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-orange-200 transition"
                >
                  + Add New
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="border border-gray-100 p-5 rounded-xl relative">
                    <span className={`absolute top-4 right-4 ${addr.tagColor} text-xs px-2 py-1 rounded font-bold`}>{addr.tag}</span>
                    <MapPin className={`${addr.iconColor} mb-3`} />
                    <p className="font-bold text-gray-900">{addr.name}</p>
                    <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{addr.address}</p>
                    <div className="mt-4 flex gap-3 text-sm font-bold text-orange-600">
                      <button onClick={() => handleEditAddress(addr.id)} className="hover:underline">Edit</button>
                      <button onClick={() => handleDeleteAddress(addr.id)} className="text-red-500 hover:underline">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Bookings & Enquiries</h2>
                  <p className="text-gray-500 mt-1">Your upcoming reservations and catering enquiries.</p>
                </div>
                <button 
                  onClick={handleAddBooking}
                  className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-orange-200 transition"
                >
                  + Book a Table
                </button>
              </div>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-100 p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{booking.restaurant}</h3>
                      <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                        <CalendarCheck size={14} /> {booking.date}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{booking.details}</p>
                    </div>
                    <div className="text-left md:text-right flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto mt-2 md:mt-0">
                      <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                        (booking.status === 'Confirmed' || booking.status === 'Upcoming') ? 'bg-green-100 text-green-700' : 
                        booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {booking.status}
                      </span>
                      {(booking.status === 'Confirmed' || booking.status === 'Upcoming') && (
                        <button 
                          onClick={() => handleCancelBooking(booking.id)}
                          className="block mt-0 md:mt-3 text-sm text-red-500 font-bold hover:underline ml-auto"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "subscription" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">My Subscriptions</h2>
                  <p className="text-gray-500 mt-1">Manage your daily tiffin services.</p>
                </div>
                <button 
                  onClick={handleAddSubscription}
                  className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-orange-200 transition"
                >
                  + New Plan
                </button>
              </div>
              <div className="space-y-4">
                {subscriptions.map(sub => (
                  <div key={sub.id} className={`${sub.status === 'Active' ? 'bg-orange-50 border-orange-100' : 'bg-gray-50 border-gray-100 text-gray-500'} border p-6 rounded-xl relative overflow-hidden transition-all duration-300`}>
                    <div className="relative z-10">
                      <span className={`${sub.status === 'Active' ? 'bg-orange-500' : 'bg-gray-500'} text-white text-xs px-2 py-1 rounded font-bold`}>{sub.status}</span>
                      <h3 className="font-bold text-gray-900 text-xl mt-3">{sub.title}</h3>
                      <p className={`text-sm ${sub.status === 'Active' ? 'text-gray-700' : 'text-gray-500'} mt-1`}>{sub.details}</p>
                      <div className="mt-4 flex gap-8">
                        <div>
                          <p className="text-xs text-gray-500">Valid Till</p>
                          <p className="font-bold text-gray-900">{sub.validTill}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Remaining Meals</p>
                          <p className="font-bold text-gray-900">{sub.remainingMeals}</p>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-6">
                        <button 
                          onClick={() => handleToggleSubscriptionStatus(sub.id)}
                          className={`bg-white ${sub.status === 'Active' ? 'text-orange-600 border-orange-200 hover:bg-orange-50' : 'text-gray-600 border-gray-200 hover:bg-gray-50'} border px-4 py-2 rounded-lg font-bold text-sm shadow-sm transition-colors`}
                        >
                          {sub.status === 'Active' ? 'Pause Subscription' : 'Resume Subscription'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "favourites" && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Favourites</h2>
                <p className="text-gray-500 mt-1">Dishes and restaurants you love.</p>
              </div>
              
              {favourites.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                  <p>You haven't added any favourites yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favourites.map((fav) => (
                    <div key={fav.id} className="border border-gray-100 rounded-xl overflow-hidden flex hover:shadow-md transition-shadow">
                      <div className="w-32 h-auto bg-gray-200 flex-shrink-0 relative">
                        <img src={fav.image} alt={fav.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur p-1 rounded text-[10px] font-bold flex items-center gap-1 shadow-sm">
                          {fav.type === 'veg' ? <span className="w-2 h-2 rounded-full bg-green-500"></span> : <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                          {fav.type.toUpperCase()}
                        </div>
                      </div>
                      <div className="p-4 flex flex-col justify-between w-full">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-bold text-gray-900 leading-tight">{fav.name}</h3>
                            <button onClick={() => handleRemoveFavourite(fav.id)} className="p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
                              <Heart className="text-red-500 fill-red-500" size={18} />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 truncate">{fav.restaurant}</p>
                          <div className="flex items-center gap-1 mt-2 text-xs font-medium text-gray-600">
                            <div className="flex items-center bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                              <span className="mr-0.5">{fav.rating}</span>
                              <Star size={10} className="fill-green-700" />
                            </div>
                            <span className="text-gray-400">({fav.reviews})</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-50">
                          <span className="font-bold text-gray-900 text-lg">₹{fav.price}</span>
                          <button 
                            onClick={() => handleAddToCart(fav)} 
                            className="text-sm bg-orange-100 text-orange-700 px-4 py-1.5 rounded-lg font-bold hover:bg-orange-500 hover:text-white transition-colors"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "wallet" && (
            <div className="space-y-8 animate-in fade-in">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">Wallet & Rewards</h2>
                  <p className="text-gray-500 mt-1">Manage your Eatery balance and loyalty points.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Eatery Pay Card */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 text-white shadow-2xl hover:scale-[1.02] transition-transform duration-300 group">
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl group-hover:bg-orange-500/30 transition-colors"></div>
                  
                  <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Eatery Balance</p>
                        <h2 className="text-5xl font-black tracking-tight">₹{walletBalance.toFixed(2)}</h2>
                      </div>
                      <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                        <CreditCard size={28} className="text-white/80" />
                      </div>
                    </div>
                    
                    <button onClick={() => setIsAddMoneyModalOpen(true)} className="flex items-center gap-2 w-fit bg-white text-gray-900 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-100 transition-colors">
                      <Plus size={18} /> Add Money
                    </button>
                  </div>
                </div>

                {/* Loyalty Coins Card */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-orange-400 to-orange-600 p-8 text-white shadow-2xl hover:scale-[1.02] transition-transform duration-300 group">
                  <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-yellow-300/40 rounded-full blur-2xl group-hover:bg-yellow-300/60 transition-colors"></div>
                  
                  <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-orange-100 text-sm font-medium uppercase tracking-wider mb-1">Loyalty Coins</p>
                        <div className="flex items-center gap-3">
                          <h2 className="text-5xl font-black tracking-tight">{loyaltyCoins.toLocaleString()}</h2>
                        </div>
                      </div>
                      <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm shadow-inner">
                        <Award size={28} className="text-yellow-50" />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-black/10 w-fit px-4 py-2 rounded-lg backdrop-blur-md">
                      <TrendingUp size={16} className="text-yellow-100" />
                      <p className="text-sm font-bold text-white">100 Coins = ₹10</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 mt-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
                  <button className="text-sm font-bold text-orange-600 hover:text-orange-700">View All</button>
                </div>
                
                <div className="space-y-4">
                  {transactions.map(tx => (
                    <div key={tx.id} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-2xl transition-colors group cursor-pointer border border-transparent hover:border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} group-hover:scale-110 transition-transform shadow-sm`}>
                          {tx.type === 'credit' ? <ArrowDownLeft size={24} /> : <ArrowUpRight size={24} />}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-lg">{tx.title}</p>
                          <p className="text-sm text-gray-500 font-medium">{tx.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`block font-black text-lg ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                          {tx.type === 'credit' ? '+' : '-'} ₹{tx.amount}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">{tx.type === 'credit' ? 'Successful' : 'Debited'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">My Reviews</h2>
                  <p className="text-gray-500 mt-1">Ratings and feedback provided by you.</p>
                </div>
                <button 
                  onClick={() => setIsAddReviewModalOpen(true)}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-orange-700 transition"
                >
                  Write a Review
                </button>
              </div>
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-500">No reviews yet.</p>
                  </div>
                ) : (
                  reviews.map(review => (
                    <div key={review.id} className="border border-gray-100 p-5 rounded-xl relative group">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-900">{review.title}</h3>
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={16} className={i < review.rating ? "fill-amber-400" : "text-gray-200"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">"{review.comment}"</p>
                      <p className="text-xs text-gray-400 mt-3">{review.date}</p>
                      
                      <button 
                        onClick={() => handleDeleteReview(review.id)}
                        className="absolute bottom-4 right-4 text-red-500 bg-red-50 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
                        title="Delete Review"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "coupons" && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">My Coupons</h2>
                <p className="text-gray-500 mt-1">Exclusive offers and discounts for you.</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="border-2 border-dashed border-orange-200 bg-orange-50 p-5 rounded-xl flex flex-col md:flex-row items-center gap-6">
                  <div className="bg-white px-4 py-2 rounded-lg border border-orange-200 font-mono font-black text-xl text-orange-600 tracking-wider flex-shrink-0">
                    IND50
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-bold text-gray-900 text-lg">Flat 50% OFF</h3>
                    <p className="text-sm text-gray-600 mt-1">Valid only on your first order. Max discount ₹500.</p>
                  </div>
                  <button 
                    className={`px-6 py-2 rounded-lg font-bold text-sm transition w-full md:w-auto ${copiedCoupon === 'IND50' ? 'bg-green-500 text-white' : 'bg-orange-600 text-white hover:bg-orange-700'}`} 
                    onClick={() => handleCopyCoupon('IND50')}
                  >
                    {copiedCoupon === 'IND50' ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                
                <div className="border-2 border-dashed border-blue-200 bg-blue-50 p-5 rounded-xl flex flex-col md:flex-row items-center gap-6">
                  <div className="bg-white px-4 py-2 rounded-lg border border-blue-200 font-mono font-black text-xl text-blue-600 tracking-wider flex-shrink-0">
                    FESTIVE20
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-bold text-gray-900 text-lg">Flat 20% OFF</h3>
                    <p className="text-sm text-gray-600 mt-1">Valid on orders above ₹499. Use it up to 3 times.</p>
                  </div>
                  <button 
                    className={`px-6 py-2 rounded-lg font-bold text-sm transition w-full md:w-auto ${copiedCoupon === 'FESTIVE20' ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`} 
                    onClick={() => handleCopyCoupon('FESTIVE20')}
                  >
                    {copiedCoupon === 'FESTIVE20' ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Fallback for other tabs */}
          {!["orders", "settings", "addresses", "bookings", "subscription", "favourites", "wallet", "reviews", "coupons"].includes(activeTab) && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50 py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <Info size={32} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 capitalize">{activeTab}</h2>
              <p className="text-gray-500 mt-2 max-w-sm">
                This section is under development. You will soon be able to manage your {activeTab} here.
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md animate-in fade-in zoom-in-95 text-left">
            <h3 className="text-xl font-bold mb-4 text-gray-900">{editingAddressId ? "Edit Address" : "Add New Address"}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Tag (e.g., Home, Work)</label>
                <select 
                  value={formData.tag} 
                  onChange={(e) => setFormData({...formData, tag: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-orange-500 text-gray-900 bg-white"
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Name / Receiver</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-orange-500 text-gray-900 placeholder:text-gray-400 bg-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Complete Address</label>
                <textarea 
                  value={formData.address} 
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg p-2.5 min-h-[100px] focus:outline-none focus:border-orange-500 text-gray-900 placeholder:text-gray-400 bg-white"
                  placeholder="123, Rose Villa..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsAddressModalOpen(false)} className="px-5 py-2.5 bg-gray-100 font-bold rounded-lg hover:bg-gray-200 transition text-gray-700">Cancel</button>
              <button onClick={saveAddress} className="px-5 py-2.5 bg-orange-600 font-bold text-white rounded-lg hover:bg-orange-700 transition">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md animate-in fade-in zoom-in-95 text-left">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Book a Table</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Restaurant</label>
                <select 
                  value={bookingFormData.restaurant} 
                  onChange={(e) => setBookingFormData({...bookingFormData, restaurant: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-orange-500 text-gray-900 bg-white"
                >
                  <option value="The Grand Palate">The Grand Palate</option>
                  <option value="Spice Symphony">Spice Symphony</option>
                  <option value="Ocean View Diner">Ocean View Diner</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Date & Time</label>
                <input 
                  type="datetime-local" 
                  value={bookingFormData.date} 
                  onChange={(e) => setBookingFormData({...bookingFormData, date: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-orange-500 text-gray-900 bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Guests</label>
                  <select 
                    value={bookingFormData.guests} 
                    onChange={(e) => setBookingFormData({...bookingFormData, guests: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-orange-500 text-gray-900 bg-white"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5+">5+ People</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Seating</label>
                  <select 
                    value={bookingFormData.seating} 
                    onChange={(e) => setBookingFormData({...bookingFormData, seating: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-orange-500 text-gray-900 bg-white"
                  >
                    <option value="Indoor Seating">Indoor</option>
                    <option value="Outdoor Seating">Outdoor</option>
                    <option value="Rooftop">Rooftop</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsBookingModalOpen(false)} className="px-5 py-2.5 bg-gray-100 font-bold rounded-lg hover:bg-gray-200 transition text-gray-700">Cancel</button>
              <button onClick={saveBooking} className="px-5 py-2.5 bg-orange-600 font-bold text-white rounded-lg hover:bg-orange-700 transition">Confirm Booking</button>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Modal */}
      {isSubscriptionModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md animate-in fade-in zoom-in-95 text-left">
            <h3 className="text-xl font-bold mb-4 text-gray-900">New Subscription Plan</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Plan Type</label>
                <select 
                  value={subscriptionFormData.title} 
                  onChange={(e) => {
                    const title = e.target.value;
                    const details = title === "Monthly Lunch Tiffin" ? "Pure Veg • 2 Rotis, Rice, Dal, Sabzi" : 
                                  title === "Premium Dinner Tiffin" ? "Non Veg/Veg • 3 Rotis, Rice, Dal, 2 Sabzi, Dessert" :
                                  "Healthy Salad Bowl • Mixed Greens, Protein, Dressing";
                    setSubscriptionFormData({...subscriptionFormData, title, details});
                  }}
                  className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-orange-500 text-gray-900 bg-white"
                >
                  <option value="Monthly Lunch Tiffin">Monthly Lunch Tiffin</option>
                  <option value="Premium Dinner Tiffin">Premium Dinner Tiffin</option>
                  <option value="Diet Salad Subscription">Diet Salad Subscription</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Details</label>
                <input 
                  type="text" 
                  value={subscriptionFormData.details} 
                  disabled
                  className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-orange-500 text-gray-500 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Duration</label>
                <select 
                  value={subscriptionFormData.duration} 
                  onChange={(e) => setSubscriptionFormData({...subscriptionFormData, duration: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-orange-500 text-gray-900 bg-white"
                >
                  <option value="1 Month">1 Month (30 Meals)</option>
                  <option value="3 Months">3 Months (90 Meals)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsSubscriptionModalOpen(false)} className="px-5 py-2.5 bg-gray-100 font-bold rounded-lg hover:bg-gray-200 transition text-gray-700">Cancel</button>
              <button onClick={saveSubscription} className="px-5 py-2.5 bg-orange-600 font-bold text-white rounded-lg hover:bg-orange-700 transition">Confirm Plan</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Money Modal */}
      {isAddMoneyModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm animate-in fade-in zoom-in-95 text-left">
            {addMoneyStep === "amount" ? (
              <>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Add Money to Wallet</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Amount (₹)</label>
                    <input 
                      type="number" 
                      value={addMoneyAmount} 
                      onChange={(e) => setAddMoneyAmount(e.target.value)}
                      placeholder="e.g. 500"
                      className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-orange-500 text-gray-900 bg-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    {[100, 500, 1000].map(amt => (
                      <button 
                        key={amt} 
                        onClick={() => setAddMoneyAmount(amt.toString())}
                        className="flex-1 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-orange-500 hover:text-orange-600 transition"
                      >
                        +₹{amt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={() => { setIsAddMoneyModalOpen(false); setAddMoneyAmount(""); setAddMoneyStep("amount"); }} className="px-5 py-2.5 bg-gray-100 font-bold rounded-lg hover:bg-gray-200 transition text-gray-700">Cancel</button>
                  <button 
                    onClick={() => {
                      if (Number(addMoneyAmount) > 0) setAddMoneyStep("payment");
                      else alert("Please enter a valid amount.");
                    }} 
                    className="px-5 py-2.5 bg-orange-600 font-bold text-white rounded-lg hover:bg-orange-700 transition"
                  >
                    Proceed
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <button onClick={() => setAddMoneyStep("amount")} className="text-gray-500 hover:text-gray-800">
                    <ChevronRight size={20} className="rotate-180" />
                  </button>
                  <h3 className="text-xl font-bold text-gray-900">Payment Details</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center mb-4 border border-gray-100">
                    <span className="text-sm text-gray-600">Amount to add:</span>
                    <span className="font-black text-gray-900">₹{addMoneyAmount}</span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Card Number</label>
                    <input 
                      type="text" 
                      placeholder="XXXX XXXX XXXX XXXX"
                      className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-orange-500 text-gray-900 bg-white"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1 text-gray-700">Expiry</label>
                      <input 
                        type="text" 
                        placeholder="MM/YY"
                        className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-orange-500 text-gray-900 bg-white"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1 text-gray-700">CVV</label>
                      <input 
                        type="password" 
                        placeholder="•••"
                        maxLength={3}
                        className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-orange-500 text-gray-900 bg-white"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={() => { setIsAddMoneyModalOpen(false); setAddMoneyAmount(""); setAddMoneyStep("amount"); }} className="px-5 py-2.5 bg-gray-100 font-bold rounded-lg hover:bg-gray-200 transition text-gray-700">Cancel</button>
                  <button onClick={handleAddMoney} className="px-5 py-2.5 bg-black font-bold text-white rounded-lg hover:bg-gray-800 transition">Pay & Add Money</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Add Review Modal */}
      {isAddReviewModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md animate-in fade-in zoom-in-95 text-left">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Write a Review</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Dish / Restaurant Name</label>
                <input 
                  type="text" 
                  value={reviewFormData.title} 
                  onChange={(e) => setReviewFormData({...reviewFormData, title: e.target.value})}
                  placeholder="e.g. Maharaja Thali"
                  className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-orange-500 text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button 
                      key={star} 
                      onClick={() => setReviewFormData({...reviewFormData, rating: star})}
                      className="focus:outline-none"
                    >
                      <Star size={24} className={star <= reviewFormData.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Comment</label>
                <textarea 
                  value={reviewFormData.comment} 
                  onChange={(e) => setReviewFormData({...reviewFormData, comment: e.target.value})}
                  placeholder="Share your experience..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:border-orange-500 text-gray-900 bg-white resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsAddReviewModalOpen(false)} className="px-5 py-2.5 bg-gray-100 font-bold rounded-lg hover:bg-gray-200 transition text-gray-700">Cancel</button>
              <button onClick={handleAddReview} className="px-5 py-2.5 bg-orange-600 font-bold text-white rounded-lg hover:bg-orange-700 transition">Submit Review</button>
            </div>
          </div>
        </div>
      )}

    </CustomerLayout>
  );

  // Helper component for fallback icons
  function Info({size}: {size: number}) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
  }
}

