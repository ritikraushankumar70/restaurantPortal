"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Settings, 
  LogOut,
  TrendingUp,
  DollarSign,
  Activity,
  Utensils,
  Calendar,
  Tag,
  Star
} from "lucide-react";

import DashboardTab from "@/components/admin/DashboardTab";
import SettingsTab from "@/components/admin/SettingsTab";

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [orderFilter, setOrderFilter] = useState("all");
  const [customerSearch, setCustomerSearch] = useState("");
  const [viewingOrder, setViewingOrder] = useState<{id: string, customer: string, items: string, total: number, status: string} | null>(null);
  const [ordersList, setOrdersList] = useState([
    { id: "#ORD-1001", customer: "Rahul Kumar", items: "2x Paneer Tikka, 1x Naan", total: 400, status: "Delivered", time: "Today, 12:31 PM" },
    { id: "#ORD-1002", customer: "Priya Sharma", items: "1x Butter Chicken, 2x Roti", total: 450, status: "Delivered", time: "Today, 12:32 PM" },
    { id: "#ORD-1003", customer: "Amit Singh", items: "1x Veg Biryani, 1x Raita", total: 500, status: "Delivered", time: "Today, 12:33 PM" },
    { id: "#ORD-1004", customer: "Neha Gupta", items: "1x Dal Makhani, 2x Naan", total: 550, status: "Delivered", time: "Today, 12:34 PM" },
    { id: "#ORD-1005", customer: "Rohan Patel", items: "1x Chicken Tikka, 1x Coke", total: 600, status: "Delivered", time: "Today, 12:35 PM" }
  ]);
  const [editingCustomer, setEditingCustomer] = useState<{id: number, name: string, phone: string, email: string} | null>(null);
  const [customersList, setCustomersList] = useState([
    { id: 1, name: "Amit Singh", phone: "+91 9876543210", email: "amit@example.com", orders: 10 },
    { id: 2, name: "Priya Sharma", phone: "+91 9876543211", email: "priya@example.com", orders: 9 },
    { id: 3, name: "Rohan Gupta", phone: "+91 9876543212", email: "rohan@example.com", orders: 8 },
    { id: 4, name: "Sneha Patel", phone: "+91 9876543213", email: "sneha@example.com", orders: 7 }
  ]);
  const [restaurantSettings, setRestaurantSettings] = useState({
    restaurantName: "Restaurant Portal",
    contactNumber: "+91 9876543210",
    address: "123 Food Street, Tech Hub Area, Bengaluru",
    openingTime: "10:00",
    closingTime: "23:00"
  });
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    localStorage.setItem("restaurantSettings", JSON.stringify(restaurantSettings));
    window.dispatchEvent(new Event("settingsUpdated"));
    
    setTimeout(() => {
      setIsSavingSettings(false);
      alert("Restaurant Settings saved successfully!");
    }, 800);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error', e);
    }
    router.push("/admin/login");
  };

  useEffect(() => {
    const savedCustomers = localStorage.getItem("admin_customers");
    if (savedCustomers) {
      try {
        setCustomersList(JSON.parse(savedCustomers));
      } catch(e) {}
    }
    
    const savedSettings = localStorage.getItem("restaurantSettings");
    if (savedSettings) {
      try {
        setRestaurantSettings(JSON.parse(savedSettings));
      } catch(e) {}
    }

    const savedOrders = localStorage.getItem("admin_orders");
    if (savedOrders) {
      try {
        setOrdersList(JSON.parse(savedOrders));
      } catch(e) {}
    }
    // Just a small delay to simulate loading state for now
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Logout if user switches tabs or browser
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleLogout();
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-[#ff5a00]/30 border-t-[#ff5a00] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="bg-[#ff5a00] p-2 rounded-lg">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-slate-900">AdminPanel</span>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-[#ff5a00]/10 text-[#ff5a00]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'orders' ? 'bg-[#ff5a00]/10 text-[#ff5a00]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <ShoppingBag className="w-5 h-5" />
            Orders
          </button>
          <button 
            onClick={() => setActiveTab("customers")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'customers' ? 'bg-[#ff5a00]/10 text-[#ff5a00]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <Users className="w-5 h-5" />
            Customers
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'settings' ? 'bg-[#ff5a00]/10 text-[#ff5a00]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <Settings className="w-5 h-5" />
            Basic Settings
          </button>
          
          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Advanced Features</p>
          </div>
          
          <Link href="/menu" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-slate-500 hover:bg-slate-50 hover:text-slate-900">
            <Utensils className="w-5 h-5" />
            Menu Management
          </Link>
          <Link href="/tables" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-slate-500 hover:bg-slate-50 hover:text-slate-900">
            <Calendar className="w-5 h-5" />
            Table Management
          </Link>
          <Link href="/offers" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-slate-500 hover:bg-slate-50 hover:text-slate-900">
            <Tag className="w-5 h-5" />
            Offers / Coupons
          </Link>
          <Link href="/reviews" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-slate-500 hover:bg-slate-50 hover:text-slate-900">
            <Star className="w-5 h-5" />
            Reviews
          </Link>
          <Link href="/settings" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-slate-500 hover:bg-slate-50 hover:text-slate-900">
            <Settings className="w-5 h-5" />
            Advanced Settings
          </Link>
        </div>
        
        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 capitalize">{activeTab}</h1>
            <p className="text-slate-500">Welcome back, Super Admin!</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#ff5a00] flex items-center justify-center text-white font-bold shadow-sm cursor-pointer hover:bg-[#e04f00] transition-colors">
              A
            </div>
          </div>
        </div>

        {activeTab === "dashboard" && (
          <DashboardTab />
        )}

        {activeTab === "orders" && (
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Orders Management</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setOrderFilter("all")} 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${orderFilter === 'all' ? 'bg-[#ff5a00] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >All</button>
                <button 
                  onClick={() => setOrderFilter("pending")} 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${orderFilter === 'pending' ? 'bg-[#ff5a00] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >Pending</button>
                <button 
                  onClick={() => setOrderFilter("completed")} 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${orderFilter === 'completed' ? 'bg-[#ff5a00] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >Completed</button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-500 border-b border-slate-100">
                    <th className="pb-4 font-semibold">Order ID</th>
                    <th className="pb-4 font-semibold">Customer</th>
                    <th className="pb-4 font-semibold">Items</th>
                    <th className="pb-4 font-semibold">Total</th>
                    <th className="pb-4 font-semibold">Status</th>
                    <th className="pb-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ordersList
                    .filter(order => {
                      if (orderFilter === 'all') return true;
                      if (orderFilter === 'pending') return order.status === 'Preparing';
                      if (orderFilter === 'completed') return order.status === 'Delivered';
                      return true;
                    })
                    .map((order, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 font-medium text-slate-900">{order.id}</td>
                      <td className="py-4 text-slate-600">{order.customer}</td>
                      <td className="py-4 text-slate-600">{order.items}</td>
                      <td className="py-4 font-bold text-slate-900">₹{order.total}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Preparing' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button onClick={() => setViewingOrder(order)} className="text-[#ff5a00] font-medium text-sm hover:underline">View</button>
                      </td>
                    </tr>
                  ))}
                  
                  {/* Empty state if no orders match filter */}
                  {ordersList.filter(order => (orderFilter === 'all') || (orderFilter === 'pending' && order.status === 'Preparing') || (orderFilter === 'completed' && order.status === 'Delivered')).length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">No orders found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {viewingOrder && (
              <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
                  <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-900 text-lg">Order Details</h3>
                    <button onClick={() => setViewingOrder(null)} className="text-slate-400 hover:text-slate-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Order ID</p>
                        <p className="font-bold text-slate-900">{viewingOrder.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500 mb-1">Status</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${viewingOrder.status === 'Preparing' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                          {viewingOrder.status}
                        </span>
                      </div>
                    </div>
                    <div className="py-2">
                      <p className="text-sm font-semibold text-slate-700 mb-2">Customer</p>
                      <p className="text-slate-900">{viewingOrder.customer}</p>
                    </div>
                    <div className="py-2">
                      <p className="text-sm font-semibold text-slate-700 mb-2">Items</p>
                      <p className="text-slate-900">{viewingOrder.items}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                      <p className="font-bold text-slate-900">Total Amount</p>
                      <p className="font-bold text-xl text-[#ff5a00]">₹{viewingOrder.total}</p>
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                    <button onClick={() => setViewingOrder(null)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-lg transition-colors">Close</button>
                    {viewingOrder.status === 'Preparing' && (
                      <button 
                        onClick={() => {
                          const newOrders = ordersList.map(o => o.id === viewingOrder.id ? { ...o, status: 'Delivered' } : o);
                          setOrdersList(newOrders);
                          localStorage.setItem("admin_orders", JSON.stringify(newOrders));
                          setViewingOrder({ ...viewingOrder, status: 'Delivered' });
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors"
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "customers" && (
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Customer Database</h2>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  placeholder="Search customers..." 
                  className="px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#ff5a00] focus:border-[#ff5a00]"
                />
                <button 
                  onClick={() => setEditingCustomer({ id: 0, name: "", phone: "", email: "" })} 
                  className="bg-[#ff5a00] text-white px-4 py-2 rounded-xl font-medium hover:bg-[#e04f00] transition-colors whitespace-nowrap"
                >
                  + Add Customer
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-500 border-b border-slate-100">
                    <th className="pb-4 font-semibold">Name</th>
                    <th className="pb-4 font-semibold">Phone</th>
                    <th className="pb-4 font-semibold">Email</th>
                    <th className="pb-4 font-semibold">Total Orders</th>
                    <th className="pb-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {customersList
                    .filter(c => 
                      c.name.toLowerCase().includes(customerSearch.toLowerCase()) || 
                      c.phone.includes(customerSearch) || 
                      c.email.toLowerCase().includes(customerSearch.toLowerCase())
                    )
                    .map((c, i) => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#ff5a00]/10 text-[#ff5a00] flex items-center justify-center font-bold text-sm">
                          {c.name.charAt(0)}
                        </div>
                        <span className="font-medium text-slate-900">{c.name}</span>
                      </td>
                      <td className="py-4 text-slate-600">{c.phone}</td>
                      <td className="py-4 text-slate-600">{c.email}</td>
                      <td className="py-4 font-medium text-slate-900">{c.orders}</td>
                      <td className="py-4 text-right">
                        <button onClick={() => setEditingCustomer({id: c.id, name: c.name, phone: c.phone, email: c.email})} className="text-[#ff5a00] font-medium text-sm hover:underline">Edit</button>
                      </td>
                    </tr>
                  ))}
                  
                  {customersList
                    .filter(c => 
                      c.name.toLowerCase().includes(customerSearch.toLowerCase()) || 
                      c.phone.includes(customerSearch) || 
                      c.email.toLowerCase().includes(customerSearch.toLowerCase())
                    ).length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500">No customers found matching "{customerSearch}".</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {editingCustomer && (
              <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
                  <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-900 text-lg">{editingCustomer.id === 0 ? "Add Customer" : "Edit Customer"}</h3>
                    <button onClick={() => setEditingCustomer(null)} className="text-slate-400 hover:text-slate-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                      <input type="text" value={editingCustomer.name} onChange={(e) => setEditingCustomer({...editingCustomer, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-[#ff5a00] focus:border-[#ff5a00]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                      <input type="text" value={editingCustomer.phone} onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-[#ff5a00] focus:border-[#ff5a00]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                      <input type="email" value={editingCustomer.email} onChange={(e) => setEditingCustomer({...editingCustomer, email: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-[#ff5a00] focus:border-[#ff5a00]" />
                    </div>
                  </div>
                  <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                    <button onClick={() => setEditingCustomer(null)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-lg transition-colors">Cancel</button>
                    <button onClick={() => {
                      let newList;
                      if (editingCustomer.id === 0) {
                        const newId = customersList.length > 0 ? Math.max(...customersList.map(c => c.id)) + 1 : 1;
                        newList = [...customersList, { id: newId, name: editingCustomer.name, phone: editingCustomer.phone, email: editingCustomer.email, orders: 0 }];
                      } else {
                        newList = customersList.map(c => c.id === editingCustomer.id ? {...c, name: editingCustomer.name, phone: editingCustomer.phone, email: editingCustomer.email} : c);
                      }
                      setCustomersList(newList);
                      localStorage.setItem("admin_customers", JSON.stringify(newList));
                      setEditingCustomer(null);
                    }} className="px-4 py-2 text-sm font-medium text-white bg-[#ff5a00] hover:bg-[#e04f00] rounded-lg transition-colors">
                      {editingCustomer.id === 0 ? "Add Customer" : "Save Changes"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <SettingsTab />
        )}
      </main>
    </div>
  );
}
