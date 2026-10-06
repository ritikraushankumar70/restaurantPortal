"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Store, Clock, ShoppingBag, Truck, Building2, 
  FileCheck, Printer, BellRing, Save, Upload, Info
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function Settings() {
  const isAdmin = true; // Admin bypass is active for this route

  const [activeTab, setActiveTab] = useState("info");

  const [formData, setFormData] = useState({
    restaurantName: "Eatery - Premium Dining",
    description: "Serving the best North Indian and Chinese cuisine in town since 2010.",
    openTime: "10:00",
    closeTime: "23:00",
    holiday: "tuesday",
    delivery: true,
    takeaway: true,
    dineIn: false,
    estDeliveryTime: "30",
    minOrderAmount: "150",
    maxDeliveryRadius: "5",
    accHolderName: "",
    accNumber: "",
    ifscCode: "",
    upiId: "",
    fssai: "",
    pan: "",
    aadhar: "",
    autoPrint: true,
    soundAlert: true
  });

  useEffect(() => {
    const saved = localStorage.getItem("restaurantSettings");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("restaurantSettings", JSON.stringify(formData));
    window.dispatchEvent(new Event("settingsUpdated"));
    alert("Settings saved successfully!");
  };

  const TABS = [
    { id: "info", label: "Restaurant Info", icon: Store },
    { id: "timings", label: "Timings", icon: Clock },
    { id: "orders", label: "Order Settings", icon: ShoppingBag },
    { id: "delivery", label: "Delivery", icon: Truck },
    { id: "bank", label: "Bank / Payout", icon: Building2 },
    { id: "kyc", label: "KYC Documents", icon: FileCheck },
    { id: "printer", label: "Printer", icon: Printer },
    { id: "notifications", label: "Notifications", icon: BellRing },
  ];



  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 pb-12 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Restaurant Settings</h1>
            <p className="text-sm text-gray-500">Manage your restaurant details, timings, and preferences.</p>
          </div>
          <button onClick={handleSave} className="flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-700 transition shadow-sm">
            <Save size={18} /> Save Changes
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex lg:flex-col overflow-x-auto scrollbar-hide">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors whitespace-nowrap lg:whitespace-normal ${
                      isActive 
                        ? "bg-orange-50 text-orange-600 font-bold" 
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
                    }`}
                  >
                    <Icon size={20} className={isActive ? "text-orange-600" : "text-gray-400"} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              
              {/* 1. Restaurant Info */}
              {activeTab === "info" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Restaurant Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Restaurant Name {!isAdmin && <span className="text-red-500 text-xs font-normal ml-2">(Only Admin can edit)</span>}
                      </label>
                      <input type="text" value={formData.restaurantName || ""} onChange={(e) => setFormData({...formData, restaurantName: e.target.value})} disabled={!isAdmin} className={`w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-all ${!isAdmin ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'}`} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                      <textarea rows={3} value={formData.description || ""} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full text-gray-900 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Restaurant Logo</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 hover:border-orange-400 transition-colors">
                        <Upload size={24} className="text-gray-400" />
                        <span className="text-sm text-gray-500 font-medium">Upload Logo (1:1 ratio)</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Banner</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 hover:border-orange-400 transition-colors">
                        <Upload size={24} className="text-gray-400" />
                        <span className="text-sm text-gray-500 font-medium">Upload Banner (16:9 ratio)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Timings */}
              {activeTab === "timings" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Operating Hours</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Opening Time</label>
                      <input type="time" value={formData.openTime} onChange={(e) => setFormData({...formData, openTime: e.target.value})} className="w-full text-gray-900 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Closing Time</label>
                      <input type="time" value={formData.closeTime} onChange={(e) => setFormData({...formData, closeTime: e.target.value})} className="w-full text-gray-900 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Weekly Holiday (Closed On)</label>
                      <select value={formData.holiday} onChange={(e) => setFormData({...formData, holiday: e.target.value})} className="w-full text-gray-900 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all appearance-none bg-white">
                        <option value="none">None (Open all days)</option>
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                        <option value="saturday">Saturday</option>
                        <option value="sunday">Sunday</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Order Settings */}
              {activeTab === "orders" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Order Types</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                      <div>
                        <h4 className="font-bold text-gray-900">Delivery</h4>
                        <p className="text-sm text-gray-500">Accept home delivery orders</p>
                      </div>
                      <button 
                        onClick={() => setFormData({...formData, delivery: !formData.delivery})} 
                        className={`w-12 h-6 rounded-full transition-colors relative ${formData.delivery ? 'bg-orange-500' : 'bg-gray-300'}`}
                      >
                        <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.delivery ? 'translate-x-6' : 'translate-x-0'}`}></span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                      <div>
                        <h4 className="font-bold text-gray-900">Takeaway (Pickup)</h4>
                        <p className="text-sm text-gray-500">Allow customers to order and pick up</p>
                      </div>
                      <button 
                        onClick={() => setFormData({...formData, takeaway: !formData.takeaway})} 
                        className={`w-12 h-6 rounded-full transition-colors relative ${formData.takeaway ? 'bg-orange-500' : 'bg-gray-300'}`}
                      >
                        <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.takeaway ? 'translate-x-6' : 'translate-x-0'}`}></span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                      <div>
                        <h4 className="font-bold text-gray-900">Dine-in</h4>
                        <p className="text-sm text-gray-500">Accept table reservations and QR ordering</p>
                      </div>
                      <button 
                        onClick={() => setFormData({...formData, dineIn: !formData.dineIn})} 
                        className={`w-12 h-6 rounded-full transition-colors relative ${formData.dineIn ? 'bg-orange-500' : 'bg-gray-300'}`}
                      >
                        <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.dineIn ? 'translate-x-6' : 'translate-x-0'}`}></span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Delivery Settings */}
              {activeTab === "delivery" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Delivery Configurations</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Estimated Delivery Time (mins)</label>
                      <input type="number" value={formData.estDeliveryTime} onChange={(e) => setFormData({...formData, estDeliveryTime: e.target.value})} className="w-full text-gray-900 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Order Amount (₹)</label>
                      <input type="number" value={formData.minOrderAmount} onChange={(e) => setFormData({...formData, minOrderAmount: e.target.value})} className="w-full text-gray-900 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Maximum Delivery Radius (KM)</label>
                      <input type="number" value={formData.maxDeliveryRadius} onChange={(e) => setFormData({...formData, maxDeliveryRadius: e.target.value})} className="w-full text-gray-900 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" />
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Bank / Payout */}
              {activeTab === "bank" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Bank Account Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Account Holder Name</label>
                      <input type="text" placeholder="e.g. Eatery Private Limited" value={formData.accHolderName} onChange={(e) => setFormData({...formData, accHolderName: e.target.value})} className="w-full text-gray-900 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Account Number</label>
                      <input type="password" placeholder="********" value={formData.accNumber} onChange={(e) => setFormData({...formData, accNumber: e.target.value})} className="w-full text-gray-900 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">IFSC Code</label>
                      <input type="text" placeholder="e.g. HDFC0001234" value={formData.ifscCode} onChange={(e) => setFormData({...formData, ifscCode: e.target.value})} className="w-full text-gray-900 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all uppercase" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">UPI ID (Optional)</label>
                      <input type="text" placeholder="e.g. restaurant@okhdfcbank" value={formData.upiId} onChange={(e) => setFormData({...formData, upiId: e.target.value})} className="w-full text-gray-900 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" />
                    </div>
                  </div>
                </div>
              )}

              {/* 6. KYC */}
              {activeTab === "kyc" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-xl font-bold text-gray-900 border-b pb-4">KYC Documents</h2>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div className="p-4 border rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block font-bold text-gray-900">FSSAI License</label>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${formData.fssai ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'}`}>{formData.fssai ? 'Verified' : 'Pending Action'}</span>
                      </div>
                      <input type="text" placeholder="Enter FSSAI Number" value={formData.fssai || ""} onChange={(e) => setFormData({...formData, fssai: e.target.value})} className="w-full text-gray-900 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" />
                    </div>
                    
                    <div className="p-4 border rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block font-bold text-gray-900">PAN Card</label>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${formData.pan ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'}`}>{formData.pan ? 'Verified' : 'Pending Action'}</span>
                      </div>
                      <input type="text" placeholder="Enter PAN Number" value={formData.pan || ""} onChange={(e) => setFormData({...formData, pan: e.target.value})} className="w-full text-gray-900 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all uppercase" />



                    </div>

                    <div className="p-4 border rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block font-bold text-gray-900">Aadhar Card (Owner)</label>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${formData.aadhar ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'}`}>{formData.aadhar ? 'Verified' : 'Pending Action'}</span>
                      </div>
                      <input type="text" placeholder="Enter Aadhar Number" value={formData.aadhar || ""} onChange={(e) => setFormData({...formData, aadhar: e.target.value})} className="w-full text-gray-900 px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" />
                    </div>
                  </div>
                </div>
              )}

              {/* 7. Printer */}
              {activeTab === "printer" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Kitchen Printer Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                      <div>
                        <h4 className="font-bold text-gray-900">Auto-Print KOT</h4>
                        <p className="text-sm text-gray-500">Automatically print Kitchen Order Ticket when a new order is accepted.</p>
                      </div>
                      <button 
                        onClick={() => setFormData({...formData, autoPrint: !formData.autoPrint})} 
                        className={`w-12 h-6 rounded-full transition-colors relative ${formData.autoPrint ? 'bg-orange-500' : 'bg-gray-300'}`}
                      >
                        <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.autoPrint ? 'translate-x-6' : 'translate-x-0'}`}></span>
                      </button>
                    </div>

                    <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex gap-3 text-sm">
                      <Info size={20} className="flex-shrink-0" />
                      <p>To use thermal printing, ensure you have our Desktop Printer Utility installed on the computer connected to the printer.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 8. Notifications */}
              {activeTab === "notifications" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-xl font-bold text-gray-900 border-b pb-4">Alerts & Notifications</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                      <div>
                        <h4 className="font-bold text-gray-900">New Order Sound Alert</h4>
                        <p className="text-sm text-gray-500">Play a continuous ringing sound until a new order is accepted or rejected.</p>
                      </div>
                      <button 
                        onClick={() => setFormData({...formData, soundAlert: !formData.soundAlert})} 
                        className={`w-12 h-6 rounded-full transition-colors relative ${formData.soundAlert ? 'bg-orange-500' : 'bg-gray-300'}`}
                      >
                        <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.soundAlert ? 'translate-x-6' : 'translate-x-0'}`}></span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
