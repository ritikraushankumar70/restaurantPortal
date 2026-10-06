"use client";
import { useState, useEffect } from "react";
import { ShoppingCart, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function GlobalCartModal() {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cart, setCart] = useState<any[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const loadCart = () => {
      const saved = localStorage.getItem("myCart");
      if (saved) {
        try { setCart(JSON.parse(saved)); } catch(e) {}
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === "#cart") {
        setIsOpen(true);
        loadCart();
      } else {
        setIsOpen(false);
      }
    };
    
    // Check initially
    handleHashChange();
    
    window.addEventListener("hashchange", handleHashChange);
    
    const handleOpenGlobalCart = () => {
      setIsOpen(true);
      loadCart();
      // Optionally update hash without triggering scroll
      if (window.location.hash !== "#cart") {
        window.history.pushState(null, '', '#cart');
      }
    };
    
    window.addEventListener("openGlobalCart", handleOpenGlobalCart);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("openGlobalCart", handleOpenGlobalCart);
    };
  }, [pathname]);

  if (!isOpen) return null;

  const closeCart = () => {
    setIsOpen(false);
    if (window.location.hash === "#cart") {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => {
      const price = typeof item.price === 'number' ? item.price : parseInt(item.price.replace(/[^0-9]/g, ''));
      return sum + (price || 0);
    }, 0);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95">
        <button onClick={closeCart} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"><X size={24} /></button>
        <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-gray-900">
          <ShoppingCart size={28} className="text-orange-600" /> Your Cart
        </h2>
        
        {cart.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-6">Your cart is empty.</p>
            <button onClick={closeCart} className="bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-orange-700 transition">
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="max-h-[50vh] overflow-y-auto space-y-3">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {Object.values(cart.reduce((acc: any, item: any) => {
                if (!acc[item.name]) acc[item.name] = { ...item, count: 1 };
                else acc[item.name].count += 1;
                return acc;
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              }, {})).map((group: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <div>
                    <p className="font-bold text-gray-900">{group.name} <span className="text-orange-600">x{group.count}</span></p>
                    <p className="text-sm text-gray-500">{typeof group.price === 'number' ? `₹${group.price}` : group.price}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-gray-700">Subtotal</span>
                <span className="text-xl font-black text-gray-900">₹{getSubtotal()}</span>
              </div>
              <button 
                onClick={() => {
                  closeCart();
                  router.push('/home?action=cart');
                }}
                className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl hover:bg-orange-700 transition shadow-md"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
