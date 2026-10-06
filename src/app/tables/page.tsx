"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Plus, Users, Clock, Coffee, X, LayoutDashboard, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Tables() {
  const initialTables = [
    { id: "T1", capacity: 4, status: "Occupied", customer: "Rahul", time: "45m", amount: "₹1200" },
    { id: "T2", capacity: 2, status: "Available", customer: "", time: "", amount: "" },
    { id: "T3", capacity: 6, status: "Reserved", time: "7:30 PM", customer: "Sharma Family", amount: "" },
    { id: "T4", capacity: 4, status: "Occupied", customer: "Priya", time: "12m", amount: "₹450" },
    { id: "T5", capacity: 8, status: "Available", customer: "", time: "", amount: "" },
    { id: "T6", capacity: 2, status: "Available", customer: "", time: "", amount: "" },
  ];

  const [tables, setTables] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('myTables');
    if (saved) {
      setTables(JSON.parse(saved));
    } else {
      setTables(initialTables);
      localStorage.setItem('myTables', JSON.stringify(initialTables));
    }
  }, []);

  const saveTables = (newTables: any[]) => {
    setTables(newTables);
    localStorage.setItem('myTables', JSON.stringify(newTables));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingTable, setEditingTable] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    id: "", capacity: 2, status: "Available", customer: "", time: "", amount: ""
  });

  const openAddModal = () => {
    setModalMode("add");
    setEditingTable(null);
    setFormData({ id: `T${tables.length + 1}`, capacity: 4, status: "Available", customer: "", time: "", amount: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (table: any) => {
    setModalMode("edit");
    setEditingTable(table);
    setFormData({ 
      id: table.id, 
      capacity: table.capacity, 
      status: table.status, 
      customer: table.customer || table.name || "", 
      time: table.time || "", 
      amount: table.amount || "" 
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === "edit") {
      saveTables(tables.map(t => t.id === editingTable.id ? { 
        ...t, 
        ...formData, 
        name: formData.customer // map customer to name for reserved
      } : t));
    } else {
      saveTables([...tables, { ...formData, name: formData.customer }]);
    }
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 pb-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-orange-600 transition-colors flex items-center gap-1">
              <LayoutDashboard size={14} /> Dashboard
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Tables</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Table Management</h1>
              <p className="text-sm text-gray-500">Monitor and manage seating arrangements.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={openAddModal} className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-orange-700 transition-colors">
                <Plus size={16} /> Add Table
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tables.map((table) => (
            <div 
              key={table.id}
              onClick={() => openEditModal(table)}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer hover:shadow-md ${
                table.status === 'Available' ? 'border-green-100 bg-green-50/30 hover:border-green-300' :
                table.status === 'Occupied' ? 'border-orange-100 bg-orange-50/30 hover:border-orange-300' :
                'border-blue-100 bg-blue-50/30 hover:border-blue-300'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`text-xl font-bold ${
                  table.status === 'Available' ? 'text-green-700' :
                  table.status === 'Occupied' ? 'text-orange-700' :
                  'text-blue-700'
                }`}>{table.id}</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  table.status === 'Available' ? 'bg-green-100 text-green-700' :
                  table.status === 'Occupied' ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>{table.status}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Users size={14} />
                <span>Capacity: {table.capacity}</span>
              </div>

              {table.status === 'Occupied' && (
                <div className="bg-white p-3 rounded-xl border border-orange-100/50">
                  <div className="text-sm font-semibold text-gray-900">{table.customer}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="flex items-center gap-1 text-xs text-gray-500"><Clock size={12} /> {table.time}</span>
                    <span className="text-sm font-bold text-gray-900">{table.amount}</span>
                  </div>
                </div>
              )}

              {table.status === 'Reserved' && (
                <div className="bg-white p-3 rounded-xl border border-blue-100/50">
                  <div className="text-sm font-semibold text-gray-900">{table.customer || (table as any).name}</div>
                  <div className="flex items-center mt-2">
                    <span className="flex items-center gap-1 text-xs text-blue-600 font-medium"><Clock size={12} /> {table.time}</span>
                  </div>
                </div>
              )}

              {table.status === 'Available' && (
                <div className="h-[76px] flex items-center justify-center opacity-40">
                  <Coffee size={32} className="text-green-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-black">{modalMode === "edit" ? "Update Table Status" : "Add New Table"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Table ID</label>
                  <input required type="text" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-black bg-white placeholder-gray-400" disabled={modalMode === "edit"} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                  <input required type="number" min="1" value={formData.capacity} onChange={e => setFormData({...formData, capacity: parseInt(e.target.value)})} className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-black bg-white placeholder-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-black bg-white">
                  <option value="Available">Available</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </div>

              {formData.status !== "Available" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer / Name</label>
                    <input type="text" value={formData.customer} onChange={e => setFormData({...formData, customer: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-black bg-white placeholder-gray-400" placeholder="e.g. Rahul" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time {formData.status === 'Reserved' ? '(e.g. 7:30 PM)' : '(Duration)'}</label>
                      <input type="text" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-black bg-white placeholder-gray-400" placeholder={formData.status === 'Reserved' ? "7:30 PM" : "45m"} />
                    </div>
                    {formData.status === "Occupied" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bill Amount</label>
                        <input type="text" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-black bg-white placeholder-gray-400" placeholder="e.g. ₹1200" />
                      </div>
                    )}
                  </div>
                </>
              )}
              
              <div className="mt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 rounded-xl bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors">
                  {modalMode === "edit" ? "Update Status" : "Add Table"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
