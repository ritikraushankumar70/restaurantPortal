"use client";

import { useState, useMemo, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, Filter, Clock, CheckCircle2, XCircle, MoreVertical, Check, X, ChevronDown, Download, Receipt, User, MapPin, Phone, LayoutDashboard, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Orders() {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");

  // Order Details Modal State
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdownId(null);
      setIsFilterOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const [orders, setOrders] = useState([
    { id: "#ORD-9025", date: "Today, 12:30 PM", customer: "Sneha Patel", phone: "+91 98765 43210", address: "Takeaway", type: "Takeaway", amount: "₹650", status: "Preparing", category: "active", items: [{name: "Butter Chicken", qty: 1, price: 350}, {name: "Garlic Naan", qty: 3, price: 100}] },
    { id: "#ORD-9024", date: "Today, 12:15 PM", customer: "Arjun Reddy", phone: "+91 91234 56789", address: "14, MG Road, Indore", type: "Delivery", amount: "₹1,450", status: "Ready for Pickup", category: "active", items: [{name: "Paneer Tikka", qty: 2, price: 500}, {name: "Veg Biryani", qty: 2, price: 950}] },
    { id: "#ORD-9023", date: "Today, 11:50 AM", customer: "Pooja Desai", phone: "+91 99887 76655", address: "Table 1, Indoor", type: "Table 1", amount: "₹2,200", status: "Preparing", category: "active", items: [{name: "Family Thali", qty: 4, price: 2200}] },
    { id: "#ORD-9022", date: "Today, 11:20 AM", customer: "Karan Singh", phone: "+91 98712 34567", address: "Vijay Nagar, Indore", type: "Delivery", amount: "₹890", status: "Ready for Pickup", category: "active", items: [{name: "Chicken Burger Combo", qty: 2, price: 890}] },
    { id: "#ORD-9021", date: "Today, 10:42 AM", customer: "Rahul Sharma", phone: "+91 98111 22233", address: "Table 4, Rooftop", type: "Table 4", amount: "₹850", status: "Preparing", category: "active", items: [{name: "Dal Makhani", qty: 1, price: 250}, {name: "Jeera Rice", qty: 2, price: 600}] },
    { id: "#ORD-9020", date: "Today, 10:25 AM", customer: "Priya Singh", phone: "+91 90000 11111", address: "Palasia, Indore", type: "Delivery", amount: "₹1,240", status: "Ready for Pickup", category: "active", items: [{name: "Mutton Curry", qty: 1, price: 600}, {name: "Butter Naan", qty: 4, price: 640}] },
    { id: "#ORD-9019", date: "Today, 09:15 AM", customer: "Amit Kumar", phone: "+91 88888 99999", address: "Takeaway", type: "Takeaway", amount: "₹450", status: "Delivered", category: "completed", items: [{name: "Veg Manchurian", qty: 1, price: 200}, {name: "Hakka Noodles", qty: 1, price: 250}] },
    { id: "#ORD-9018", date: "Yesterday, 08:30 PM", customer: "Neha Gupta", phone: "+91 77777 66666", address: "Table 2, Indoor", type: "Table 2", amount: "₹2,100", status: "Cancelled", category: "cancelled", items: [{name: "Paneer Butter Masala", qty: 2, price: 600}, {name: "Tandoori Roti", qty: 10, price: 1500}] },
    { id: "#ORD-9017", date: "Yesterday, 07:15 PM", customer: "Vikram", phone: "+91 66666 55555", address: "Bhawarkuan, Indore", type: "Delivery", amount: "₹950", status: "Delivered", category: "completed", items: [{name: "Chole Bhature", qty: 3, price: 450}, {name: "Lassi", qty: 5, price: 500}] },
    { id: "#ORD-9016", date: "Yesterday, 06:45 PM", customer: "Rohan Das", phone: "+91 55555 44444", address: "Table 5, Indoor", type: "Table 5", amount: "₹3,400", status: "Delivered", category: "completed", items: [{name: "Maharaja Thali", qty: 4, price: 3400}] },
  ]);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesTab = order.category === activeTab;
      const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            order.customer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || order.status === statusFilter;
      
      return matchesTab && matchesSearch && matchesStatus;
    });
  }, [orders, activeTab, searchQuery, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const counts = {
    active: orders.filter(o => o.category === "active").length,
    completed: orders.filter(o => o.category === "completed").length,
    cancelled: orders.filter(o => o.category === "cancelled").length,
  };

  const updateOrderStatus = (orderId: string, newStatus: string, newCategory: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus, category: newCategory } : order
    ));
    setOpenDropdownId(null);
  };

  const exportToCSV = () => {
    const csvContent = [
      ["Order ID", "Date", "Customer", "Type", "Amount", "Status"],
      ...filteredOrders.map(o => [o.id, o.date, o.customer, o.type, o.amount, o.status])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `orders_export_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: string) => {
    if (status === "Preparing") return <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold"><Clock size={12} /> {status}</span>;
    if (status === "Ready for Pickup") return <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold"><CheckCircle2 size={12} /> {status}</span>;
    if (status === "Delivered") return <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold"><Check size={12} /> {status}</span>;
    if (status === "Cancelled") return <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold"><XCircle size={12} /> {status}</span>;
    return <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">{status}</span>;
  };

  // Prevent click propagation for dropdowns
  const handleDropdownClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === id ? null : id);
    setIsFilterOpen(false);
  };

  const handleFilterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFilterOpen(!isFilterOpen);
    setOpenDropdownId(null);
  };

  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setOpenDropdownId(null);
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
            <span className="text-gray-900 font-medium">Orders</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
              <p className="text-sm text-gray-500">Track, process, and manage all incoming orders.</p>
            </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search order ID or name..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to page 1 on search
                }}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm w-full sm:w-64 transition-all text-gray-900 bg-white placeholder-gray-400" 
              />
            </div>
            
            <div className="relative">
              <button 
                onClick={handleFilterClick}
                className={`flex items-center gap-2 border px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isFilterOpen || statusFilter !== "All" 
                    ? "bg-orange-50 border-orange-200 text-orange-700" 
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Filter size={16} /> 
                {statusFilter === "All" ? "Filter" : statusFilter}
                <ChevronDown size={14} className={`transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
              </button>
              
              {isFilterOpen && (
                <div 
                  className="absolute right-0 top-12 bg-white shadow-xl border border-gray-100 rounded-xl py-2 w-48 z-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</div>
                  {["All", "Preparing", "Ready for Pickup", "Delivered", "Cancelled"].map(status => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setIsFilterOpen(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        statusFilter === status 
                          ? "bg-orange-50 text-orange-700 font-medium" 
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <Download size={16} /> Export
            </button>
          </div>
        </div>
      </div>

        <div className="flex items-center gap-6 border-b border-gray-200">
          {[
            { id: "active", label: "Active Orders", count: counts.active },
            { id: "completed", label: "Completed", count: counts.completed },
            { id: "cancelled", label: "Cancelled", count: counts.cancelled }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setCurrentPage(1); // Reset page on tab change
                setStatusFilter("All"); // Reset filter on tab change
              }}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors relative flex items-center gap-2 ${
                activeTab === tab.id
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-orange-100' : 'bg-gray-100'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[400px] flex flex-col relative z-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Date & Time</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentOrders.length > 0 ? (
                  currentOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-900">{order.id}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">{order.customer}</span>
                          <span className="text-xs text-gray-500">{order.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-gray-900">{order.amount}</span>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="relative inline-block text-left">
                          <button 
                            onClick={(e) => handleDropdownClick(e, order.id)}
                            className="p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                          >
                            <MoreVertical size={18} />
                          </button>
                          
                          {openDropdownId === order.id && (
                            <div 
                              className="absolute right-0 mt-2 origin-top-right bg-white shadow-xl border border-gray-100 rounded-xl py-2 w-48 z-50 text-left"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button onClick={() => viewOrderDetails(order)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 flex items-center gap-2">
                                <Receipt size={16} /> View Details
                              </button>
                              
                              {order.category === "active" && (
                                <>
                                  <div className="h-px bg-gray-100 my-1 mx-2"></div>
                                  {order.status === "Preparing" && (
                                    <button onClick={() => updateOrderStatus(order.id, "Ready for Pickup", "active")} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-2">
                                      <CheckCircle2 size={16} /> Mark as Ready
                                    </button>
                                  )}
                                  {order.status === "Ready for Pickup" && (
                                    <button onClick={() => updateOrderStatus(order.id, "Delivered", "completed")} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 flex items-center gap-2">
                                      <Check size={16} /> Mark Delivered
                                    </button>
                                  )}
                                  <div className="h-px bg-gray-100 my-1 mx-2"></div>
                                  <button onClick={() => updateOrderStatus(order.id, "Cancelled", "cancelled")} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                    <XCircle size={16} /> Cancel Order
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No orders found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-auto p-6 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50 rounded-b-2xl">
            <span>
              Showing {filteredOrders.length > 0 ? Math.min((currentPage - 1) * itemsPerPage + 1, filteredOrders.length) : 0} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} {activeTab} orders
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-gray-700"
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-4 py-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-gray-700"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="sticky top-0 bg-white px-8 py-6 border-b border-gray-100 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                <p className="text-sm text-gray-500 font-medium mt-1">{selectedOrder.id} • {selectedOrder.date}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                {getStatusBadge(selectedOrder.status)}
                <span className="text-sm text-gray-500 font-medium px-3 py-1 bg-gray-100 rounded-full">{selectedOrder.type}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2"><User size={16} className="text-orange-500"/> Customer Info</h3>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-900 font-medium">{selectedOrder.customer}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-2"><Phone size={14}/> {selectedOrder.phone}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2"><MapPin size={16} className="text-orange-500"/> Delivery/Table</h3>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-700">{selectedOrder.address}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Items</h3>
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Item</th>
                        <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase text-center">Qty</th>
                        <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {selectedOrder.items?.map((item: any, idx: number) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-500 text-center">{item.qty}</td>
                          <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">₹{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="w-full sm:w-1/2 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-3 text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium text-gray-900">{selectedOrder.amount}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3 text-sm">
                    <span className="text-gray-500">Taxes</span>
                    <span className="font-medium text-gray-900">Included</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-black text-xl text-orange-600">{selectedOrder.amount}</span>
                  </div>
                </div>
              </div>
            </div>

            {selectedOrder.category === "active" && (
              <div className="sticky bottom-0 bg-white px-8 py-4 border-t border-gray-100 flex justify-end gap-3 rounded-b-3xl">
                {selectedOrder.status === "Preparing" && (
                  <button onClick={() => {updateOrderStatus(selectedOrder.id, "Ready for Pickup", "active"); setSelectedOrder(null);}} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-md flex items-center gap-2">
                    <CheckCircle2 size={18}/> Mark as Ready
                  </button>
                )}
                {selectedOrder.status === "Ready for Pickup" && (
                  <button onClick={() => {updateOrderStatus(selectedOrder.id, "Delivered", "completed"); setSelectedOrder(null);}} className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-green-700 transition shadow-md flex items-center gap-2">
                    <Check size={18}/> Mark Delivered
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}
