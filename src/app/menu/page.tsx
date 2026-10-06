"use client";

import { useState, useMemo, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Plus, Search, Edit, Trash2, X, Image as ImageIcon, LayoutDashboard, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const categories = ["All", "Main Course", "Appetizers", "Desserts", "Beverages"];
  
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('myMenu');
    if (saved) {
      setMenuItems(JSON.parse(saved));
    } else {
      const defaultItems = [
        { id: 1, name: "Butter Chicken", category: "Main Course", price: 350, status: "Available", image: "/images/butter_chicken.jpg" },
        { id: 2, name: "Paneer Tikka", category: "Appetizers", price: 250, status: "Available", image: "/images/paneer_biryani.jpg" },
        { id: 3, name: "Chocolate Brownie", category: "Desserts", price: 150, status: "Out of Stock", image: "/images/chocolate_brownie.jpg" }
      ];
      setMenuItems(defaultItems);
      localStorage.setItem('myMenu', JSON.stringify(defaultItems));
    }
  }, []);

  const saveMenu = (newItems: any[]) => {
    setMenuItems(newItems);
    localStorage.setItem('myMenu', JSON.stringify(newItems));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", category: "Main Course", price: "", status: "Available", image: "", type: "Pure Veg" });

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, activeCategory, searchQuery]);

  const handleDelete = (id: number) => {
    if(confirm("Are you sure you want to delete this item?")) {
      saveMenu(menuItems.filter(item => item.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ name: "", category: "Main Course", price: "", status: "Available", image: "", type: "Pure Veg" });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setFormData({ name: item.name, category: item.category, price: item.price.toString(), status: item.status, image: item.image, type: item.type || "Pure Veg" });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      saveMenu(menuItems.map(item => item.id === editingItem.id ? { ...item, ...formData, price: Number(formData.price) } : item));
    } else {
      saveMenu([...menuItems, { id: Date.now(), ...formData, price: Number(formData.price) }]);
    }
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 pb-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-orange-600 transition-colors flex items-center gap-1">
              <LayoutDashboard size={14} /> Dashboard
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Menu</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
              <p className="text-sm text-gray-500">Manage your restaurant categories and food items.</p>
            </div>
          <div className="flex items-center gap-3">
            <button onClick={openAddModal} className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-orange-700 transition-colors">
              <Plus size={16} /> Add Item
            </button>
          </div>
        </div>
      </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-orange-100 text-orange-700 font-semibold"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search items..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm w-full sm:w-48 transition-all text-gray-900 bg-white placeholder-gray-400" 
              />
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-all">
              <div className="h-48 relative overflow-hidden bg-gray-100 flex items-center justify-center">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1495147466023-e6a9287c53d1?auto=format&fit=crop&q=80&w=400&h=400"; }} />
                ) : (
                  <ImageIcon size={48} className="text-gray-300" />
                )}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button onClick={() => openEditModal(item)} className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-gray-700 hover:text-orange-600 shadow-sm transition-colors">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-gray-700 hover:text-red-600 shadow-sm transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                  <span className="font-bold text-orange-600">₹{item.price}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">{item.category}</span>
                  <span className={`text-xs font-semibold flex items-center gap-1.5 ${item.status === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Available' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Add New Card Placeholder */}
          <button onClick={openAddModal} className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 shadow-sm flex flex-col items-center justify-center min-h-[300px] text-gray-500 hover:bg-gray-100 hover:border-orange-300 hover:text-orange-600 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Plus size={24} />
            </div>
            <span className="font-semibold">Add New Item</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">{editingItem ? "Edit Item" : "Add New Item"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-black bg-white placeholder:text-gray-500" placeholder="e.g. Garlic Naan" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-black bg-white">
                    {categories.filter(c => c !== "All").map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-black bg-white">
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Non Veg">Non Veg</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input required type="number" min="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-black bg-white placeholder:text-gray-500" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" value="Available" checked={formData.status === "Available"} onChange={e => setFormData({...formData, status: e.target.value})} className="text-orange-600 focus:ring-orange-500" />
                    <span className="text-sm text-gray-700">Available</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" value="Out of Stock" checked={formData.status === "Out of Stock"} onChange={e => setFormData({...formData, status: e.target.value})} className="text-orange-600 focus:ring-orange-500" />
                    <span className="text-sm text-gray-700">Out of Stock</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
                <input type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-black bg-white placeholder:text-gray-500" placeholder="https://..." />
              </div>
              
              <div className="mt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 rounded-xl bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors">
                  {editingItem ? "Save Changes" : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
