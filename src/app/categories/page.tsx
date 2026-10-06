"use client";

import { useState } from "react";
import CustomerLayout from "@/components/layout/CustomerLayout";
import { 
  Coffee, 
  Pizza, 
  IceCream, 
  UtensilsCrossed, 
  Utensils, 
  Leaf, 
  Sun, 
  Moon, 
  Sunset, 
  Gift, 
  Clock, 
  Flame,
  Search
} from "lucide-react";

import { useRouter } from "next/navigation";

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const router = useRouter();

  const toggleFilter = (filterName: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterName) 
        ? prev.filter(f => f !== filterName) 
        : [...prev, filterName]
    );
  };

  // 1. Main Categories (Cuisines)
  const mainCategories = [
    { name: "Indian Thali", icon: UtensilsCrossed, count: 12, img: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?auto=format&fit=crop&w=400&q=80" },
    { name: "Punjabi / North Indian", icon: Utensils, count: 24, img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80" },
    { name: "South Indian", icon: Coffee, count: 15, img: "https://images.unsplash.com/photo-1610192773928-76672803b9b9?auto=format&fit=crop&w=400&q=80" },
    { name: "Chinese", icon: Pizza, count: 18, img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=400&q=80" },
    { name: "Fast Food & Snacks", icon: Flame, count: 22, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80" },
    { name: "Desserts & Sweets", icon: IceCream, count: 10, img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80" },
    { name: "Beverages", icon: Coffee, count: 8, img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=400&q=80" },
    { name: "Indori Special", icon: Flame, count: 6, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80" },
  ];

  // 2. Filter Categories
  const filters = {
    foodType: [
      { name: "Pure Veg", icon: Leaf, color: "text-green-600 bg-green-50" },
      { name: "Jain Food (No Onion/Garlic)", icon: Leaf, color: "text-emerald-600 bg-emerald-50" },
      { name: "Upwas / Fasting", icon: Sun, color: "text-yellow-600 bg-yellow-50" },
    ],
    mealTime: [
      { name: "Breakfast (7am-11am)", icon: Sun, color: "text-orange-600 bg-orange-50" },
      { name: "Lunch (11am-3pm)", icon: Sun, color: "text-blue-600 bg-blue-50" },
      { name: "Dinner (7pm-11pm)", icon: Moon, color: "text-indigo-600 bg-indigo-50" },
      { name: "Late Night", icon: Sunset, color: "text-purple-600 bg-purple-50" },
    ],
    needs: [
      { name: "Today's Special", icon: Flame, color: "text-red-600 bg-red-50" },
      { name: "Tiffin / Monthly Meal", icon: Clock, color: "text-teal-600 bg-teal-50" },
      { name: "Combo Offers", icon: Gift, color: "text-pink-600 bg-pink-50" },
    ]
  };

  // 3. Sub-Categories (Menu Hierarchy)
  const subCategories = [
    {
      parent: "Thali",
      items: ["Regular Veg Thali", "Deluxe Thali", "Maharaja Special Thali", "Jain Thali"]
    },
    {
      parent: "Sabzi (Main Course)",
      items: ["Paneer Butter Masala", "Dal Makhani", "Kaju Curry", "Mix Veg", "Sev Tamatar"]
    },
    {
      parent: "Roti & Breads",
      items: ["Tandoori Roti", "Butter Naan", "Garlic Naan", "Lachha Paratha", "Missi Roti"]
    },
    {
      parent: "Indori Special",
      items: ["Poha Jalebi", "Khopra Patties", "Garadu", "Bhutte Ka Kees"]
    }
  ];

  return (
    <CustomerLayout>
      <div className="flex flex-col gap-8 pb-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Food Categories</h1>
            <p className="text-gray-500 mt-1">
              Pure Veg & Jain Specialities - Structured in 3 Levels for easy ordering
            </p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search categories..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Level 1: Main Categories */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">1</span>
            Main Categories (Cuisine Wise)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {mainCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div key={idx} onClick={() => {
                  let query = cat.name;
                  if (cat.name === "Indian Thali" || cat.name === "Punjabi / North Indian") {
                    query = "Indian";
                  } else if (cat.name === "South Indian") {
                    query = "South Indian";
                  } else if (cat.name === "Fast Food & Snacks") {
                    query = "Fast Food";
                  }
                  router.push(`/home?q=${encodeURIComponent(query)}`);
                }} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-500 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center gap-3 group">
                  <div className="w-14 h-14 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors overflow-hidden border-2 border-transparent group-hover:border-orange-200">
                    {cat.img ? <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" /> : <Icon size={24} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm leading-tight">{cat.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{cat.count} Items</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Level 2: Filter Categories */}
        <section className="bg-gray-50 -mx-6 px-6 py-8 border-y border-gray-100 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">2</span>
              Filter Categories (Customer Convenience)
            </h2>
            {selectedFilters.length > 0 && (
              <button 
                onClick={() => router.push(`/home?q=${encodeURIComponent(selectedFilters.join(","))}`)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition"
              >
                Apply Filters ({selectedFilters.length})
              </button>
            )}
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Food Type */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">By Food Type</h3>
              <div className="flex flex-col gap-2">
                {filters.foodType.map((f, i) => {
                  const filterVal = f.name.includes("Pure Veg") ? "Pure Veg" : f.name;
                  const isActive = selectedFilters.includes(filterVal);
                  return (
                    <button 
                      key={i} 
                      onClick={() => toggleFilter(filterVal)} 
                      className={`flex items-center justify-between p-3 rounded-xl bg-white border transition-all text-left ${isActive ? 'border-orange-500 ring-1 ring-orange-500' : 'border-gray-100 hover:border-gray-300'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${f.color}`}><f.icon size={18} /></div>
                        <span className="font-medium text-gray-800">{f.name}</span>
                      </div>
                      {isActive && <div className="w-3 h-3 rounded-full bg-orange-500"></div>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Meal Time */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">By Meal Time</h3>
              <div className="flex flex-col gap-2">
                {filters.mealTime.map((f, i) => {
                  const filterVal = f.name.split(" ")[0];
                  const isActive = selectedFilters.includes(filterVal);
                  return (
                    <button 
                      key={i} 
                      onClick={() => toggleFilter(filterVal)} 
                      className={`flex items-center justify-between p-3 rounded-xl bg-white border transition-all text-left ${isActive ? 'border-orange-500 ring-1 ring-orange-500' : 'border-gray-100 hover:border-gray-300'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${f.color}`}><f.icon size={18} /></div>
                        <span className="font-medium text-gray-800">{f.name}</span>
                      </div>
                      {isActive && <div className="w-3 h-3 rounded-full bg-orange-500"></div>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Needs */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">By Special Need</h3>
              <div className="flex flex-col gap-2">
                {filters.needs.map((f, i) => {
                  const filterVal = f.name.split(" / ")[0];
                  const isActive = selectedFilters.includes(filterVal);
                  return (
                    <button 
                      key={i} 
                      onClick={() => toggleFilter(filterVal)} 
                      className={`flex items-center justify-between p-3 rounded-xl bg-white border transition-all text-left ${isActive ? 'border-orange-500 ring-1 ring-orange-500' : 'border-gray-100 hover:border-gray-300'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${f.color}`}><f.icon size={18} /></div>
                        <span className="font-medium text-gray-800">{f.name}</span>
                      </div>
                      {isActive && <div className="w-3 h-3 rounded-full bg-orange-500"></div>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Level 3: Sub-Categories */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-green-100 text-green-600 w-8 h-8 rounded-lg flex items-center justify-center text-sm">3</span>
            Sub-Categories (Menu Hierarchy)
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {subCategories.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900">{cat.parent}</h3>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item, i) => (
                      <span key={i} onClick={() => router.push(`/home?q=${encodeURIComponent(item)}`)} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </CustomerLayout>
  );
}
