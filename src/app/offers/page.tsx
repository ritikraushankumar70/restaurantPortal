"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import { Plus, Tag, Calendar, Percent, Copy, X, LayoutDashboard, ChevronRight } from "lucide-react";

export default function Offers() {
  const [offers, setOffers] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("myOffers");
    if (saved) {
      try {
        setOffers(JSON.parse(saved));
      } catch(e) {}
    } else {
      setOffers([
        { id: 1, code: "WELCOME50", title: "New User Discount", type: "Flat", value: "₹50 Off", validTill: "31 Dec 2026", status: "Active", usage: 145, minOrder: 0 },
        { id: 2, code: "FESTIVE20", title: "Diwali Special", type: "Percentage", value: "20% Off", validTill: "15 Nov 2026", status: "Active", usage: 89, minOrder: 499 },
        { id: 3, code: "FREEDEL", title: "Free Delivery", type: "Delivery", value: "Free", validTill: "Expired", status: "Inactive", usage: 312, minOrder: 299 },
      ]);
    }
  }, []);

  const saveOffers = (newOffers: any[]) => {
    setOffers(newOffers);
    localStorage.setItem("myOffers", JSON.stringify(newOffers));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingOffer, setEditingOffer] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    code: "", title: "", type: "Percentage", value: "", validTill: "", status: "Active"
  });

  const openAddModal = () => {
    setModalMode("add");
    setEditingOffer(null);
    setFormData({ code: "", title: "", type: "Percentage", value: "", validTill: "", status: "Active" });
    setIsModalOpen(true);
  };

  const openEditModal = (offer: any) => {
    setModalMode("edit");
    setEditingOffer(offer);
    setFormData({ 
      code: offer.code, 
      title: offer.title, 
      type: offer.type, 
      value: offer.value, 
      validTill: offer.validTill, 
      status: offer.status 
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === "edit") {
      saveOffers(offers.map(o => o.id === editingOffer.id ? { ...o, ...formData } : o));
    } else {
      saveOffers([...offers, { id: Date.now(), ...formData, usage: 0 }]);
    }
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 pb-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href="/home" className="flex items-center gap-1 hover:text-orange-600 transition-colors">
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <ChevronRight size={16} />
              <span className="text-gray-900 font-medium">Offers</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Offers / Coupons</h1>
            <p className="text-sm text-gray-500">Create and manage discount codes and promotions.</p>
          </div>
          <button onClick={openAddModal} className="flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-orange-700 transition-colors w-full sm:w-auto">
            <Plus size={16} /> Create Coupon
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative overflow-hidden group">
              <div className={`absolute top-0 left-0 w-1 h-full ${offer.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${offer.status === 'Active' ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-400'}`}>
                    <Percent size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{offer.title}</h3>
                    <p className="text-xs text-gray-500">{offer.type}</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${offer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {offer.status}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 border-dashed mb-4">
                <span className="font-mono font-bold tracking-wider text-gray-900">{offer.code}</span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(offer.code);
                    alert("Copied to clipboard!");
                  }}
                  className="text-gray-400 hover:text-orange-600 transition-colors"
                  title="Copy Code"
                >
                  <Copy size={16} />
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Tag size={14} /> <span className="font-semibold text-gray-900">{offer.value}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                  <Calendar size={14} /> {offer.validTill}
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-500">Used <span className="font-bold text-gray-900">{offer.usage}</span> times</span>
                <button onClick={() => openEditModal(offer)} className="text-orange-600 text-sm font-medium hover:underline">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">{modalMode === "edit" ? "Edit Coupon" : "Create New Coupon"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-black bg-white placeholder-gray-500" placeholder="e.g. Diwali Special" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
                <input required type="text" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})} className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-mono uppercase text-black bg-white placeholder-gray-500" placeholder="e.g. FESTIVE20" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-black bg-white">
                    <option value="Percentage">Percentage</option>
                    <option value="Flat">Flat Discount</option>
                    <option value="Delivery">Delivery</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                  <input required type="text" value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-black bg-white placeholder-gray-500" placeholder="e.g. 20% Off" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valid Till</label>
                  <input required type="text" value={formData.validTill} onChange={e => setFormData({...formData, validTill: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-black bg-white placeholder-gray-500" placeholder="e.g. 15 Nov 2026" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-black bg-white">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 rounded-xl bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors">
                  {modalMode === "edit" ? "Update Coupon" : "Create Coupon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
