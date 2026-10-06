"use client";

import { useState, useEffect } from "react";
import LocationDetector from "@/components/LocationDetector";
import { 
  Search, ShoppingCart, User, MapPin, ChevronRight, 
  Star, Clock, ShieldCheck, Ticket, Download, Smartphone, Check,
  Mail, Phone, Heart, Wallet, LayoutDashboard, Gift, ShoppingBag, X,
  CreditCard, Banknote, Users, SlidersHorizontal
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CustomerLayout from "@/components/layout/CustomerLayout";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { useAuth } from "@/context/AuthContext";

function HomeContent() {
  const searchParams = useSearchParams();
  const q = searchParams?.get("q");
  const { user, isLoading } = useAuth();
  const isAdmin = user?.email === "admin@restaurant.com" || user?.email?.toLowerCase().includes("admin");
  const router = useRouter();
  const [restaurantName, setRestaurantName] = useState("EATERY");
  const [deliveryTime, setDeliveryTime] = useState("30");

  useEffect(() => {
    const loadSettings = () => {
      const saved = localStorage.getItem("restaurantSettings");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.restaurantName) {
            setRestaurantName(parsed.restaurantName.toUpperCase());
          }
          if (parsed.estDeliveryTime) {
            setDeliveryTime(parsed.estDeliveryTime);
          }
        } catch (e) {}
      }
    };

    loadSettings();
    window.addEventListener("settingsUpdated", loadSettings);
    
    return () => {
      window.removeEventListener("settingsUpdated", loadSettings);
    };
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth");
    }
  }, [user, isLoading, router]);

  const [showLocationDetector, setShowLocationDetector] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("Indore Vijay Nagar");
  const [toastMessage, setToastMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<any[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const [favourites, setFavourites] = useState<any[]>([]);
  const [hasPastOrders, setHasPastOrders] = useState(false);
  const [festive20Uses, setFestive20Uses] = useState(0);

  useEffect(() => {
    if (q) {
      setSearchQuery(q);
      const categoriesElement = document.getElementById('categories');
      if (categoriesElement) {
        categoriesElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [q]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('myCart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      setIsCartLoaded(true);

      const storedFavs = localStorage.getItem('myFavourites');
      if (storedFavs) {
        setFavourites(JSON.parse(storedFavs));
      }

      const storedOrders = localStorage.getItem('myOrders');
      if (storedOrders) {
        const parsedOrders = JSON.parse(storedOrders);
        if (parsedOrders.length > 0) {
          setHasPastOrders(true);
        }
      }

      const storedUses = localStorage.getItem('festive20Uses');
      if (storedUses) {
        setFestive20Uses(parseInt(storedUses, 10));
      }
    }
  }, []);



  // New States for Modals
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isTiffinModalOpen, setIsTiffinModalOpen] = useState(false);
  const [isPartyCateringModalOpen, setIsPartyCateringModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isCctvModalOpen, setIsCctvModalOpen] = useState(false);
  const [isTakeawayModalOpen, setIsTakeawayModalOpen] = useState(false);
  const [cctvStatus, setCctvStatus] = useState<"connecting" | "connected">("connecting");
  const [isOffersModalOpen, setIsOffersModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isCustomizationModalOpen, setIsCustomizationModalOpen] = useState(false);
  const [isFamilyCartModalOpen, setIsFamilyCartModalOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(150);
  const [totalSpent, setTotalSpent] = useState(300);

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
      // Auto credit wallet based on spend if not manually managed
      if (!storedWallet && spent > 0) {
        const earned = Math.floor(spent / 500) * 50;
        setWalletBalance(earned > 150 ? earned : 150);
      }
    }
  }, [isOffersModalOpen]);
  useEffect(() => {
    if (isCctvModalOpen) {
      setCctvStatus("connecting");
      const timer = setTimeout(() => {
        setCctvStatus("connected");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isCctvModalOpen]);
  const [orderType, setOrderType] = useState<"Delivery" | "Takeaway">("Delivery");
  const [phoneNumber, setPhoneNumber] = useState("");
  // New States for Forms
  const [tableDate, setTableDate] = useState("");
  const [tableTime, setTableTime] = useState("");
  const [tableGuests, setTableGuests] = useState("2 People");
  const [tableRestaurant, setTableRestaurant] = useState("The Grand Palate");
  const [tableSeating, setTableSeating] = useState("Any Available");
  const [tiffinStartDate, setTiffinStartDate] = useState("");
  const [tiffinPref, setTiffinPref] = useState("Lunch Only (1 Meal/day)");
  const [tiffinAddress, setTiffinAddress] = useState("Indore Vijay Nagar");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  // Tracking Modal State
  const [trackingInput, setTrackingInput] = useState("");
  const [trackingStatus, setTrackingStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [orderProgress, setOrderProgress] = useState<"Preparing Food" | "Out for Delivery" | "Delivered">("Preparing Food");
  const [currentOrderId, setCurrentOrderId] = useState("");
  const [lastOrder, setLastOrder] = useState<any[]>([]);
  const [deliveredOrders, setDeliveredOrders] = useState<string[]>([]);
  // Checkout flow states
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "address" | "payment" | "success">("cart");
  const [deliveryName, setDeliveryName] = useState("");
  const [deliveryPhone, setDeliveryPhone] = useState("");
  const [deliveryAddressDetails, setDeliveryAddressDetails] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [availableOffers, setAvailableOffers] = useState<any[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"card" | "upi" | "cod" | "wallet">("card");

  useEffect(() => {
    const action = searchParams?.get("action");
    if (action === "table") {
      setIsTableModalOpen(true);
    } else if (action === "tiffin") {
      setIsTiffinModalOpen(true);
    } else if (action === "schedule") {
      setIsScheduleModalOpen(true);
    } else if (action === "delivery") {
      setOrderType("Delivery");
      setIsDeliveryModalOpen(true);
    } else if (action === "takeaway") {
      setOrderType("Takeaway");
      setIsTakeawayModalOpen(true);
    } else if (action === "track") {
      setIsTrackingModalOpen(true);
    } else if (action === "party") {
      setIsPartyCateringModalOpen(true);
    } else if (action === "cctv") {
      setIsCctvModalOpen(true);
    } else if (action === "offers") {
      setIsOffersModalOpen(true);
    } else if (action === "payment") {
      setIsPaymentModalOpen(true);
    } else if (action === "customization") {
      setIsCustomizationModalOpen(true);
    } else if (action === "family_cart") {
      setIsFamilyCartModalOpen(true);
    } else if (action === "reorder_favourites") {
      setTimeout(() => {
        const storedFavs = JSON.parse(localStorage.getItem('myFavourites') || '[]');
        if (storedFavs.length > 0) {
          setCart((prev) => {
            const newCart = [...prev, ...storedFavs];
            localStorage.setItem('myCart', JSON.stringify(newCart));
            return newCart;
          });
          setCheckoutStep("cart");
          setIsCartModalOpen(true);
          showToast("Added all your favourites to the cart!");
        } else {
          showToast("You don't have any favourites saved yet.");
        }
      }, 300);
    } else if (action === "cart") {
      setIsCartModalOpen(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isCartLoaded && typeof window !== 'undefined') {
      localStorage.setItem('myCart', JSON.stringify(cart));
      if (appliedCoupon !== "") {
        const currentSubtotal = cart.reduce((total, item) => total + parseInt(String(item.price).replace('₹', '') || "0"), 0);
        const offer = availableOffers.find(o => o.code === appliedCoupon);
        if (offer && offer.minOrder && currentSubtotal < offer.minOrder) {
          setAppliedCoupon("");
          setCouponInput("");
          showToast(`Coupon removed as cart total is below ₹${offer.minOrder}.`);
        }
      }
    }
  }, [cart, isCartLoaded, appliedCoupon, availableOffers]);

  // Sync delivery address with location if not modified manually
  useEffect(() => {
    if (!deliveryAddressDetails) {
      setDeliveryAddressDetails(currentAddress);
    }
  }, [currentAddress]);

  useEffect(() => {
    if (trackingStatus === 'success' && orderProgress !== 'Delivered') {
      const timer = setTimeout(() => {
        if (orderProgress === 'Preparing Food') {
          setOrderProgress('Out for Delivery');
          if (typeof window !== 'undefined') {
            const existing = JSON.parse(localStorage.getItem('myOrders') || '[]');
            const updated = existing.map((o: any) => o.id === ("#" + trackingInput) ? { ...o, status: 'Out for Delivery' } : o);
            localStorage.setItem('myOrders', JSON.stringify(updated));
          }
        } else if (orderProgress === 'Out for Delivery') {
          setOrderProgress('Delivered');
          if (typeof window !== 'undefined') {
            const existing = JSON.parse(localStorage.getItem('myOrders') || '[]');
            const updated = existing.map((o: any) => o.id === ("#" + trackingInput) ? { ...o, status: 'Delivered' } : o);
            localStorage.setItem('myOrders', JSON.stringify(updated));
          }
          setDeliveredOrders(prev => {
            if (!prev.includes(trackingInput)) return [...prev, trackingInput];
            return prev;
          });
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [trackingStatus, orderProgress, trackingInput]);

  function showToast(message: string) {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  }

  const handleLocationFound = (address: string) => {
    // Show a bit more of the address, format it nicely
    const parts = address.split(',').map(p => p.trim());
    const shortAddress = parts.slice(0, 3).join(', ') || address;
    setCurrentAddress(shortAddress);
    setTimeout(() => setShowLocationDetector(false), 2000); // Close after 2 seconds
  };

  const addToCart = (e: React.MouseEvent | any, item: any) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    setCart([...cart, item]);
    showToast(`Added ${item.name} to cart!`);
  };

  const toggleFavourite = (e: React.MouseEvent, item: any) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    let newFavs;
    const exists = favourites.some(f => f.name === item.name);
    if (exists) {
      newFavs = favourites.filter(f => f.name !== item.name);
      showToast(`${item.name} removed from favourites!`);
    } else {
      const favItem = {
        id: Date.now(),
        name: item.name,
        price: parseInt(String(item.price).replace('₹', '') || "0"),
        image: item.img,
        type: item.type === "Pure Veg" ? "veg" : "non-veg",
        rating: 4.5,
        reviews: 120,
        restaurant: item.category || "The Grand Palate"
      };
      newFavs = [...favourites, favItem];
      showToast(`${item.name} added to favourites!`);
    }
    setFavourites(newFavs);
    if (typeof window !== 'undefined') {
      localStorage.setItem('myFavourites', JSON.stringify(newFavs));
    }
  };

  const defaultCategories = [
    { name: "All", img: "/images/thali.jpg" },
    { name: "Indian", img: "/images/thali.jpg" },
    { name: "Chinese", img: "/images/thali.jpg" },
    { name: "South Indian", img: "/images/thali.jpg" },
    { name: "Pizza", img: "/images/farmhouse_pizza.jpg" },
    { name: "Biryani", img: "/images/hyderabadi_chicken_biryani.jpg" },
    { name: "Pure Veg", img: "/images/thali.jpg" },
    { name: "Thali", img: "/images/thali.jpg" },
    { name: "Fast Food", img: "/images/thali.jpg" },
  ];

  const [categories, setCategories] = useState(defaultCategories);

  const initialBestsellers = [
    // Punjabi / North Indian
    { name: "Paneer Butter Masala", price: "₹249", prepTime: "15 min", img: "/images/kadai_paneer.jpg", type: "Pure Veg", category: "Punjabi / North Indian" },
    { name: "Chicken Tikka Masala", price: "₹349", prepTime: "20 min", img: "/images/butter_chicken.jpg", type: "Non Veg", category: "Punjabi / North Indian" },
    { name: "Dal Makhani", price: "₹199", prepTime: "25 min", img: "/images/dal_makhani.jpg", type: "Pure Veg", category: "Punjabi / North Indian" },
    { name: "Butter Chicken", price: "₹399", prepTime: "25 min", img: "/images/butter_chicken.jpg", type: "Non Veg", category: "Punjabi / North Indian" },
    { name: "Chole Bhature", price: "₹149", prepTime: "15 min", img: "/images/chole_bhature.jpg", type: "Pure Veg", category: "Punjabi / North Indian" },
    { name: "Palak Paneer", price: "₹229", prepTime: "18 min", img: "/images/palak_paneer.jpg", type: "Pure Veg", category: "Punjabi / North Indian" },
    { name: "Rogan Josh", price: "₹449", prepTime: "30 min", img: "/images/rogan_josh.jpg", type: "Non Veg", category: "Punjabi / North Indian" },
    { name: "Malai Kofta", price: "₹259", prepTime: "22 min", img: "/images/malai_kofta.jpg", type: "Pure Veg", category: "Punjabi / North Indian" },
    { name: "Kadai Paneer", price: "₹239", prepTime: "20 min", img: "/images/kadai_paneer.jpg", type: "Pure Veg", category: "Punjabi / North Indian" },
    { name: "Mutton Curry", price: "₹499", prepTime: "35 min", img: "/images/mutton_curry.jpg", type: "Non Veg", category: "Punjabi / North Indian" },
    { name: "Shahi Paneer", price: "₹249", prepTime: "20 min", img: "/images/kadai_paneer.jpg", type: "Pure Veg", category: "Punjabi / North Indian" },
    { name: "Aloo Paratha", price: "₹89", prepTime: "12 min", img: "/images/chole_bhature.jpg", type: "Pure Veg", category: "Punjabi / North Indian" },
    { name: "Amritsari Kulcha", price: "₹119", prepTime: "15 min", img: "/images/chole_bhature.jpg", type: "Pure Veg", category: "Punjabi / North Indian" },
    { name: "Rajma Chawal", price: "₹179", prepTime: "15 min", img: "/images/dal_makhani.jpg", type: "Pure Veg", category: "Punjabi / North Indian" },
    { name: "Sarson Ka Saag", price: "₹199", prepTime: "20 min", img: "/images/palak_paneer.jpg", type: "Pure Veg", category: "Punjabi / North Indian" },
    { name: "Makki Ki Roti", price: "₹49", prepTime: "10 min", img: "/images/palak_paneer.jpg", type: "Pure Veg", category: "Punjabi / North Indian" },
    { name: "Tandoori Chicken", price: "₹349", prepTime: "25 min", img: "/images/butter_chicken.jpg", type: "Non Veg", category: "Punjabi / North Indian" },
    { name: "Paneer Tikka", price: "₹229", prepTime: "18 min", img: "/images/kadai_paneer.jpg", type: "Pure Veg", category: "Punjabi / North Indian" },
    { name: "Kadhai Chicken", price: "₹329", prepTime: "22 min", img: "/images/butter_chicken.jpg", type: "Non Veg", category: "Punjabi / North Indian" },
    { name: "Bhindi Masala", price: "₹159", prepTime: "15 min", img: "/images/chole_bhature.jpg", type: "Pure Veg", category: "Punjabi / North Indian" },
    { name: "Jeera Rice", price: "₹129", prepTime: "10 min", img: "/images/chicken_fried_rice.jpg", type: "Pure Veg", category: "Punjabi / North Indian" },
    { name: "Chicken Do Pyaza", price: "₹319", prepTime: "22 min", img: "/images/butter_chicken.jpg", type: "Non Veg", category: "Punjabi / North Indian" },
    { name: "Matar Paneer", price: "₹219", prepTime: "18 min", img: "/images/palak_paneer.jpg", type: "Pure Veg", category: "Punjabi / North Indian" },
    { name: "Garlic Naan", price: "₹69", prepTime: "8 min", img: "/images/butter_chicken.jpg", type: "Pure Veg", category: "Punjabi / North Indian" },

    // Chinese
    { name: "Hakka Noodles", price: "₹129", prepTime: "12 min", img: "/images/chowmein.jpg", type: "Pure Veg", category: "Chinese" },
    { name: "Chilli Chicken", price: "₹249", prepTime: "15 min", img: "/images/chilli_chicken.jpg", type: "Non Veg", category: "Chinese" },
    { name: "Veg Manchurian", price: "₹179", prepTime: "15 min", img: "/images/veg_manchurian.jpg", type: "Pure Veg", category: "Chinese" },
    { name: "Chicken Fried Rice", price: "₹199", prepTime: "12 min", img: "/images/chicken_fried_rice.jpg", type: "Non Veg", category: "Chinese" },
    { name: "Spring Rolls", price: "₹119", prepTime: "10 min", img: "/images/spring_rolls.jpg", type: "Pure Veg", category: "Chinese" },
    { name: "Schezwan Noodles", price: "₹149", prepTime: "12 min", img: "/images/chowmein.jpg", type: "Pure Veg", category: "Chinese" },
    { name: "Gobi Manchurian", price: "₹159", prepTime: "15 min", img: "/images/gobi_manchurian.jpg", type: "Pure Veg", category: "Chinese" },
    { name: "Garlic Chicken", price: "₹269", prepTime: "18 min", img: "/images/garlic_chicken.jpg", type: "Non Veg", category: "Chinese" },
    { name: "Veg Fried Rice", price: "₹149", prepTime: "12 min", img: "/images/chicken_fried_rice.jpg", type: "Pure Veg", category: "Chinese" },
    { name: "Sweet & Sour Pork", price: "₹299", prepTime: "20 min", img: "/images/sweet_sour_pork.jpg", type: "Non Veg", category: "Chinese" },
    { name: "Chilli Paneer", price: "₹219", prepTime: "15 min", img: "/images/kadai_paneer.jpg", type: "Pure Veg", category: "Chinese" },
    { name: "Chicken Sweet Corn Soup", price: "₹149", prepTime: "10 min", img: "/images/sweet_corn_soup.jpg", type: "Non Veg", category: "Chinese" },
    { name: "Veg Manchow Soup", price: "₹129", prepTime: "10 min", img: "/images/manchow_soup.jpg", type: "Pure Veg", category: "Chinese" },
    { name: "Chicken Lollypop", price: "₹279", prepTime: "20 min", img: "/images/chicken_lollipop.jpg", type: "Non Veg", category: "Chinese" },
    { name: "Mushroom Manchurian", price: "₹199", prepTime: "15 min", img: "/images/veg_manchurian.jpg", type: "Pure Veg", category: "Chinese" },
    { name: "Crispy Chilli Baby Corn", price: "₹189", prepTime: "15 min", img: "/images/baby_corn.jpg", type: "Pure Veg", category: "Chinese" },
    { name: "Chicken Schezwan Rice", price: "₹229", prepTime: "15 min", img: "/images/chicken_fried_rice.jpg", type: "Non Veg", category: "Chinese" },
    { name: "Veg Chowmein", price: "₹119", prepTime: "12 min", img: "/images/chowmein.jpg", type: "Pure Veg", category: "Chinese" },

    // South Indian
    { name: "Masala Dosa", price: "₹159", prepTime: "15 min", img: "/images/masala_dosa.jpg", type: "Pure Veg", category: "South Indian" },
    { name: "Idli Sambar", price: "₹99", prepTime: "10 min", img: "/images/idli_sambar.jpg", type: "Pure Veg", category: "South Indian" },
    { name: "Medu Vada", price: "₹89", prepTime: "10 min", img: "/images/medu_vada.jpg", type: "Pure Veg", category: "South Indian" },
    { name: "Uttapam", price: "₹129", prepTime: "15 min", img: "/images/uttapam.jpg", type: "Pure Veg", category: "South Indian" },
    { name: "Paper Dosa", price: "₹179", prepTime: "15 min", img: "/images/paper_dosa.jpg", type: "Pure Veg", category: "South Indian" },
    { name: "Rava Dosa", price: "₹169", prepTime: "18 min", img: "/images/rava_dosa.jpg", type: "Pure Veg", category: "South Indian" },
    { name: "Mysore Masala Dosa", price: "₹189", prepTime: "18 min", img: "/images/mysore_masala_dosa.jpg", type: "Pure Veg", category: "South Indian" },
    { name: "Upma", price: "₹79", prepTime: "10 min", img: "/images/upma.jpg", type: "Pure Veg", category: "South Indian" },
    { name: "Pongal", price: "₹119", prepTime: "15 min", img: "/images/pongal.jpg", type: "Pure Veg", category: "South Indian" },
    { name: "Curd Rice", price: "₹109", prepTime: "10 min", img: "/images/curd_rice.jpg", type: "Pure Veg", category: "South Indian" },

    // Pizza
    { name: "Margherita Pizza", price: "₹199", prepTime: "20 min", img: "/images/margherita_pizza.jpg", type: "Pure Veg", category: "Pizza" },
    { name: "Pepperoni Pizza", price: "₹299", prepTime: "22 min", img: "/images/farmhouse_pizza.jpg", type: "Non Veg", category: "Pizza" },
    { name: "BBQ Chicken Pizza", price: "₹349", prepTime: "25 min", img: "/images/farmhouse_pizza.jpg", type: "Non Veg", category: "Pizza" },
    { name: "Veggie Supreme Pizza", price: "₹259", prepTime: "22 min", img: "/images/veggie_supreme_pizza.jpg", type: "Pure Veg", category: "Pizza" },
    { name: "Hawaiian Pizza", price: "₹279", prepTime: "20 min", img: "/images/farmhouse_pizza.jpg", type: "Non Veg", category: "Pizza" },
    { name: "Mushroom Truffle Pizza", price: "₹319", prepTime: "25 min", img: "/images/mushroom_truffle_pizza.jpg", type: "Pure Veg", category: "Pizza" },
    { name: "Four Cheese Pizza", price: "₹289", prepTime: "20 min", img: "/images/four_cheese_pizza.jpg", type: "Pure Veg", category: "Pizza" },
    { name: "Spicy Paneer Pizza", price: "₹269", prepTime: "22 min", img: "/images/spicy_paneer_pizza.jpg", type: "Pure Veg", category: "Pizza" },
    { name: "Meat Lovers Pizza", price: "₹399", prepTime: "25 min", img: "/images/farmhouse_pizza.jpg", type: "Non Veg", category: "Pizza" },
    { name: "Farmhouse Pizza", price: "₹249", prepTime: "22 min", img: "/images/farmhouse_pizza.jpg", type: "Pure Veg", category: "Pizza" },

    // Biryani
    { name: "Hyderabadi Chicken Biryani", price: "₹299", prepTime: "25 min", img: "/images/hyderabadi_chicken_biryani.jpg", type: "Non Veg", category: "Biryani" },
    { name: "Lucknowi Mutton Biryani", price: "₹399", prepTime: "30 min", img: "/images/veg_dum_biryani.jpg", type: "Non Veg", category: "Biryani" },
    { name: "Veg Dum Biryani", price: "₹229", prepTime: "25 min", img: "/images/hyderabadi_chicken_biryani.jpg", type: "Pure Veg", category: "Biryani" },
    { name: "Paneer Biryani", price: "₹249", prepTime: "25 min", img: "/images/paneer_biryani.jpg", type: "Pure Veg", category: "Biryani" },
    { name: "Kolkata Chicken Biryani", price: "₹319", prepTime: "25 min", img: "/images/hyderabadi_chicken_biryani.jpg", type: "Non Veg", category: "Biryani" },
    { name: "Egg Biryani", price: "₹219", prepTime: "20 min", img: "/images/real_egg_biryani.jpg", type: "Non Veg", category: "Biryani" },
    { name: "Prawn Biryani", price: "₹449", prepTime: "30 min", img: "/images/veg_dum_biryani.jpg", type: "Non Veg", category: "Biryani" },
    { name: "Fish Biryani", price: "₹399", prepTime: "30 min", img: "/images/veg_dum_biryani.jpg", type: "Non Veg", category: "Biryani" },
    { name: "Mushroom Biryani", price: "₹239", prepTime: "25 min", img: "/images/mushroom_biryani.jpg", type: "Pure Veg", category: "Biryani" },
    { name: "Soya Chaap Biryani", price: "₹259", prepTime: "25 min", img: "/images/soya_chaap_biryani.jpg", type: "Pure Veg", category: "Biryani" },

    // Pure Veg (Additional explicit pure veg items to ensure category has enough)
    { name: "Veg Makhanwala", price: "₹219", prepTime: "20 min", img: "/images/veg_makhanwala.jpg", type: "Pure Veg", category: "Pure Veg" },
    { name: "Aloo Gobi", price: "₹179", prepTime: "15 min", img: "/images/aloo_gobi.jpg", type: "Pure Veg", category: "Pure Veg" },
    { name: "Bhindi Masala", price: "₹189", prepTime: "15 min", img: "/images/bhindi_masala.jpg", type: "Pure Veg", category: "Pure Veg" },
    { name: "Rajma Chawal", price: "₹199", prepTime: "15 min", img: "/images/rajma_chawal.jpg", type: "Pure Veg", category: "Pure Veg" },
    { name: "Navratan Korma", price: "₹269", prepTime: "25 min", img: "/images/curry.jpg", type: "Pure Veg", category: "Pure Veg" },
    { name: "Baingan Bharta", price: "₹169", prepTime: "20 min", img: "/images/baingan_bharta.jpg", type: "Pure Veg", category: "Pure Veg" },
    { name: "Veg Kolhapuri", price: "₹229", prepTime: "22 min", img: "/images/kadai_paneer.jpg", type: "Pure Veg", category: "Pure Veg" },
    { name: "Methi Matar Malai", price: "₹249", prepTime: "20 min", img: "/images/malai_kofta.jpg", type: "Pure Veg", category: "Pure Veg" },
    { name: "Mix Veg Curry", price: "₹199", prepTime: "18 min", img: "/images/curry.jpg", type: "Pure Veg", category: "Pure Veg" },
    { name: "Dum Aloo", price: "₹189", prepTime: "20 min", img: "/images/curry.jpg", type: "Pure Veg", category: "Pure Veg" },

    // Thali
    { name: "Special Veg Thali", price: "₹349", prepTime: "25 min", img: "/images/thali.jpg", type: "Pure Veg", category: "Thali" },
    { name: "Maharaja Non-Veg Thali", price: "₹499", prepTime: "30 min", img: "/images/thali.jpg", type: "Non Veg", category: "Thali" },
    { name: "Mini Veg Thali", price: "₹199", prepTime: "15 min", img: "/images/thali.jpg", type: "Pure Veg", category: "Thali" },
    { name: "Punjabi Thali", price: "₹299", prepTime: "25 min", img: "/images/thali.jpg", type: "Pure Veg", category: "Thali" },
    { name: "South Indian Thali", price: "₹249", prepTime: "20 min", img: "/images/thali.jpg", type: "Pure Veg", category: "Thali" },
    { name: "Rajasthani Thali", price: "₹399", prepTime: "30 min", img: "/images/thali.jpg", type: "Pure Veg", category: "Thali" },
    { name: "Gujarati Thali", price: "₹349", prepTime: "25 min", img: "/images/thali.jpg", type: "Pure Veg", category: "Thali" },
    { name: "Seafood Thali", price: "₹599", prepTime: "35 min", img: "/images/thali.jpg", type: "Non Veg", category: "Thali" },
    { name: "Chicken Thali", price: "₹399", prepTime: "25 min", img: "/images/hyderabadi_chicken_biryani.jpg", type: "Non Veg", category: "Thali" },
    { name: "Mutton Thali", price: "₹499", prepTime: "30 min", img: "/images/thali.jpg", type: "Non Veg", category: "Thali" },

    // Fast Food
    { name: "Chicken Tikka Burger", price: "₹149", prepTime: "10 min", img: "/images/burger.jpg", type: "Non Veg", category: "Fast Food" },
    { name: "Chocolate Brownie", price: "₹119", prepTime: "5 min", img: "/images/brownie.jpg", type: "Pure Veg", category: "Fast Food" },
    { name: "Classic French Fries", price: "₹99", prepTime: "8 min", img: "/images/fries.jpg", type: "Pure Veg", category: "Fast Food" },
    { name: "Veggie Burger", price: "₹129", prepTime: "10 min", img: "/images/burger.jpg", type: "Pure Veg", category: "Fast Food" },
    { name: "Chicken Wings", price: "₹249", prepTime: "15 min", img: "/images/chicken_wings.jpg", type: "Non Veg", category: "Fast Food" },
    { name: "Cheese Sandwich", price: "₹119", prepTime: "8 min", img: "/images/sandwich.jpg", type: "Pure Veg", category: "Fast Food" },
    { name: "Chicken Wrap", price: "₹179", prepTime: "12 min", img: "/images/wrap.jpg", type: "Non Veg", category: "Fast Food" },
    { name: "Onion Rings", price: "₹109", prepTime: "8 min", img: "/images/onion_rings.jpg", type: "Pure Veg", category: "Fast Food" },
    { name: "Hot Dog", price: "₹149", prepTime: "10 min", img: "/images/hot_dog.jpg", type: "Non Veg", category: "Fast Food" },
    { name: "Paneer Wrap", price: "₹169", prepTime: "12 min", img: "/images/wrap.jpg", type: "Pure Veg", category: "Fast Food" },
    { name: "Aloo Tikki Burger", price: "₹99", prepTime: "10 min", img: "/images/burger.jpg", type: "Pure Veg", category: "Fast Food" },
    { name: "Veg Frankie", price: "₹129", prepTime: "12 min", img: "/images/frankie.jpg", type: "Pure Veg", category: "Fast Food" },
    { name: "Chicken Frankie", price: "₹169", prepTime: "12 min", img: "/images/frankie.jpg", type: "Non Veg", category: "Fast Food" },
    { name: "Potato Wedges", price: "₹119", prepTime: "10 min", img: "/images/potato_wedges.jpg", type: "Pure Veg", category: "Fast Food" },
    { name: "Cheese Nachos", price: "₹159", prepTime: "10 min", img: "/images/nachos.jpg", type: "Pure Veg", category: "Fast Food" },
    { name: "Chicken Nuggets", price: "₹189", prepTime: "12 min", img: "/images/chicken_nuggets.jpg", type: "Non Veg", category: "Fast Food" },
    { name: "Veg Grilled Sandwich", price: "₹139", prepTime: "10 min", img: "/images/sandwich.jpg", type: "Pure Veg", category: "Fast Food" },
    { name: "Chicken Grilled Sandwich", price: "₹179", prepTime: "10 min", img: "/images/sandwich.jpg", type: "Non Veg", category: "Fast Food" },
    { name: "Samosa (2 pcs)", price: "₹49", prepTime: "5 min", img: "/images/samosa.jpg", type: "Pure Veg", category: "Fast Food" },
    { name: "Kachori (2 pcs)", price: "₹59", prepTime: "5 min", img: "/images/kachori.jpg", type: "Pure Veg", category: "Fast Food" },
    { name: "Pani Puri", price: "₹79", prepTime: "5 min", img: "/images/pani_puri.jpg", type: "Pure Veg", category: "Fast Food" },
    { name: "Pav Bhaji", price: "₹149", prepTime: "15 min", img: "/images/pav_bhaji.jpg", type: "Pure Veg", category: "Fast Food" },
    
    // Desserts & Sweets
    { name: "Gulab Jamun", price: "₹69", prepTime: "5 min", img: "/images/gulab_jamun.jpg", type: "Pure Veg", category: "Desserts & Sweets" },
    { name: "Rasgulla", price: "₹79", prepTime: "5 min", img: "/images/rasgulla.jpg", type: "Pure Veg", category: "Desserts & Sweets" },
    { name: "Gajar Ka Halwa", price: "₹129", prepTime: "10 min", img: "/images/gajar_ka_halwa.jpg", type: "Pure Veg", category: "Desserts & Sweets" },
    { name: "Kheer", price: "₹99", prepTime: "8 min", img: "/images/kheer.jpg", type: "Pure Veg", category: "Desserts & Sweets" },
    { name: "Jalebi", price: "₹59", prepTime: "5 min", img: "/images/jalebi.jpg", type: "Pure Veg", category: "Desserts & Sweets" },
    { name: "Rasmalai", price: "₹149", prepTime: "5 min", img: "/images/rasgulla.jpg", type: "Pure Veg", category: "Desserts & Sweets" }, // Using rasgulla as fallback
    { name: "Vanilla Ice Cream", price: "₹89", prepTime: "5 min", img: "/images/vanilla_ice_cream.jpg", type: "Pure Veg", category: "Desserts & Sweets" },
    { name: "Chocolate Cake", price: "₹199", prepTime: "10 min", img: "/images/chocolate_cake.jpg", type: "Pure Veg", category: "Desserts & Sweets" },
    { name: "Kulfi", price: "₹99", prepTime: "5 min", img: "/images/kulfi.jpg", type: "Pure Veg", category: "Desserts & Sweets" },
    { name: "Brownie with Ice Cream", price: "₹249", prepTime: "10 min", img: "/images/chocolate_brownie.jpg", type: "Pure Veg", category: "Desserts & Sweets" },
    
    // Beverages
    { name: "Masala Chai", price: "₹49", prepTime: "5 min", img: "/images/masala_chai.jpg", type: "Pure Veg", category: "Beverages" },
    { name: "Filter Coffee", price: "₹59", prepTime: "5 min", img: "/images/coffee.jpg", type: "Pure Veg", category: "Beverages" },
    { name: "Sweet Lassi", price: "₹79", prepTime: "5 min", img: "/images/lassi.jpg", type: "Pure Veg", category: "Beverages" },
    { name: "Mango Shake", price: "₹99", prepTime: "5 min", img: "/images/mango_shake_real.jpg", type: "Pure Veg", category: "Beverages" },
    { name: "Cold Coffee", price: "₹109", prepTime: "5 min", img: "/images/coffee.jpg", type: "Pure Veg", category: "Beverages" },
    { name: "Lemon Iced Tea", price: "₹89", prepTime: "5 min", img: "/images/lemon_iced_tea.jpg", type: "Pure Veg", category: "Beverages" },
    { name: "Fresh Lime Soda", price: "₹69", prepTime: "5 min", img: "/images/coffee.jpg", type: "Pure Veg", category: "Beverages" },
    { name: "Buttermilk (Chaas)", price: "₹49", prepTime: "5 min", img: "/images/lassi.jpg", type: "Pure Veg", category: "Beverages" },
    
    // Indori Special
    { name: "Poha Jalebi", price: "₹69", prepTime: "5 min", img: "/images/poha_jalebi.jpg", type: "Pure Veg", category: "Indori Special" },
    { name: "Bhutte Ka Kees", price: "₹89", prepTime: "10 min", img: "/images/bhutte_ka_kees.jpg", type: "Pure Veg", category: "Indori Special" },
    { name: "Khatta Meetha Poha", price: "₹49", prepTime: "5 min", img: "/images/poha_jalebi.jpg", type: "Pure Veg", category: "Indori Special" },
    { name: "Sabudana Khichdi", price: "₹79", prepTime: "8 min", img: "/images/sabudana_khichdi.jpg", type: "Pure Veg", category: "Indori Special" },
    { name: "Indori Namkeen", price: "₹99", prepTime: "2 min", img: "/images/namkeen.jpg", type: "Pure Veg", category: "Indori Special" },
    { name: "Garadu", price: "₹109", prepTime: "10 min", img: "/images/garadu.jpg", type: "Pure Veg", category: "Indori Special" },

    // Filter Specific Categories
    { name: "Jain Paneer Tikka", price: "₹249", prepTime: "15 min", img: "/images/paneer_tikka.jpg", type: "Pure Veg", category: "Jain Food (No Onion/Garlic)" },
    { name: "Jain Dal Makhani", price: "₹199", prepTime: "20 min", img: "/images/dal_makhani.jpg", type: "Pure Veg", category: "Jain Food (No Onion/Garlic)" },
    
    { name: "Sabudana Vada", price: "₹89", prepTime: "10 min", img: "/images/sabudana_vada.jpg", type: "Pure Veg", category: "Upwas / Fasting" },
    { name: "Rajgira Puri Sabzi", price: "₹149", prepTime: "15 min", img: "/images/curry.jpg", type: "Pure Veg", category: "Upwas / Fasting" },
    
    { name: "Morning Idli Sambar", price: "₹89", prepTime: "10 min", img: "/images/idli.jpg", type: "Pure Veg", category: "Breakfast (7am-11am)" },
    { name: "Stuffed Aloo Paratha", price: "₹99", prepTime: "15 min", img: "/images/aloo_paratha.jpg", type: "Pure Veg", category: "Breakfast (7am-11am)" },
    
    { name: "Executive Veg Thali", price: "₹249", prepTime: "20 min", img: "/images/thali.jpg", type: "Pure Veg", category: "Lunch (11am-3pm)" },
    { name: "Non-Veg Power Lunch", price: "₹299", prepTime: "20 min", img: "/images/thali.jpg", type: "Non Veg", category: "Lunch (11am-3pm)" },
    
    { name: "Family Dinner Pack", price: "₹799", prepTime: "30 min", img: "/images/thali.jpg", type: "Pure Veg", category: "Dinner (7pm-11pm)" },
    { name: "Mutton Biryani Feast", price: "₹499", prepTime: "25 min", img: "/images/hyderabadi_chicken_biryani.jpg", type: "Non Veg", category: "Dinner (7pm-11pm)" },
    
    { name: "Midnight Maggi", price: "₹79", prepTime: "10 min", img: "/images/maggi.jpg", type: "Pure Veg", category: "Late Night" },
    { name: "Night Owl Burger Combo", price: "₹249", prepTime: "15 min", img: "/images/burger.jpg", type: "Non Veg", category: "Late Night" },
    
    { name: "Chef's Special Pasta", price: "₹299", prepTime: "20 min", img: "/images/pasta.jpg", type: "Pure Veg", category: "Today's Special" },
    { name: "Exotic Sushi Platter", price: "₹599", prepTime: "25 min", img: "/images/sushi.jpg", type: "Non Veg", category: "Today's Special" },
    
    { name: "Veg Daily Tiffin", price: "₹3000/mo", prepTime: "Regular", img: "/images/thali.jpg", type: "Pure Veg", category: "Tiffin / Monthly Meal" },
    { name: "Premium Non-Veg Tiffin", price: "₹4500/mo", prepTime: "Regular", img: "/images/thali.jpg", type: "Non Veg", category: "Tiffin / Monthly Meal" },
    
    { name: "Pizza + Coke + Fries", price: "₹399", prepTime: "20 min", img: "/images/margherita_pizza.jpg", type: "Pure Veg", category: "Combo Offers" },
    { name: "Burger + Shake Combo", price: "₹249", prepTime: "15 min", img: "/images/burger.jpg", type: "Non Veg", category: "Combo Offers" }
  ];

  const [bestsellers, setBestsellers] = useState(initialBestsellers);
  const [availableTables, setAvailableTables] = useState<any[]>([]);

  useEffect(() => {
    const loadMenu = () => {
      const storedMenu = localStorage.getItem('myMenu');
      if (storedMenu) {
        try {
          const customItems = JSON.parse(storedMenu)
            .filter((item: any) => item.status !== "Out of Stock" && item.status !== "Inactive")
            .map((item: any) => {
              const initialMatch = initialBestsellers.find(p => p.name.toLowerCase() === item.name.toLowerCase());
              let finalImg = item.image;
              if ((!finalImg || finalImg.includes("unsplash.com") || finalImg.startsWith("/images/")) && initialMatch) {
                finalImg = initialMatch.img;
              }
              if (!finalImg) {
                finalImg = "/images/thali.jpg";
              }
              
              return {
              name: item.name,
              price: `₹${item.price}`,
              prepTime: "20 min",
              img: finalImg,
              type: item.type || "Non Veg", // Provide a reasonable default if type is missing
              category: item.category
            };
            });
          
          setBestsellers(() => {
            const customNames = new Set(customItems.map((c: any) => c.name.toLowerCase()));
            const remainingInitial = initialBestsellers.filter(p => !customNames.has(p.name.toLowerCase()));
            return [...customItems, ...remainingInitial];
          });

          setCategories(() => {
            const baseCatNames = new Set(defaultCategories.map(c => c.name));
            const newCats = customItems.map((item: any) => item.category).filter((c: string) => !baseCatNames.has(c));
            const newCatObjects = Array.from(new Set(newCats)).map((c: any) => ({
               name: c,
               img: "/images/thali.jpg"
            }));
            return [...defaultCategories, ...newCatObjects];
          });
        } catch (e) {}
      }
      const storedTables = localStorage.getItem('myTables');
      if (storedTables) {
        try {
          setAvailableTables(JSON.parse(storedTables).filter((t: any) => t.status === "Available"));
        } catch(e) {}
      }
      const storedOffers = localStorage.getItem('myOffers');
      if (storedOffers) {
        try {
          setAvailableOffers(JSON.parse(storedOffers).filter((o: any) => o.status === "Active"));
        } catch(e) {}
      } else {
        setAvailableOffers([
          { id: 1, code: "WELCOME50", title: "New User Discount", type: "Flat", value: "₹50 Off", validTill: "31 Dec 2026", status: "Active", usage: 145, minOrder: 0 },
          { id: 2, code: "FESTIVE20", title: "Diwali Special", type: "Percentage", value: "20% Off", validTill: "15 Nov 2026", status: "Active", usage: 89, minOrder: 499 },
          { id: 3, code: "FREEDEL", title: "Free Delivery", type: "Delivery", value: "Free", validTill: "Expired", status: "Inactive", usage: 312, minOrder: 299 },
        ].filter(o => o.status === "Active"));
      }
    };

    loadMenu();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'myMenu' || e.key === 'myTables' || e.key === 'myOffers') {
        loadMenu();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const filteredBestsellers = bestsellers.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory || item.type === selectedCategory;
    
    const searchTerms = searchQuery.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
    let matchesSearch = true;
    
    if (searchTerms.length > 0) {
      matchesSearch = searchTerms.some(term => 
        item.name.toLowerCase().includes(term) || 
        item.category.toLowerCase().includes(term) ||
        (item.type && item.type.toLowerCase().includes(term))
      );
    }
    
    return matchesCategory && matchesSearch;
  });

  const getCartSubtotal = () => {
    return cart.reduce((total, item) => total + parseInt(String(item.price).replace('₹', '') || "0"), 0);
  };

  const getDiscountAmount = () => {
    if (!appliedCoupon) return 0;
    const offer = availableOffers.find(o => o.code === appliedCoupon);
    if (!offer) return 0;
    const subtotal = getCartSubtotal();
    
    if (offer.type === "Percentage") {
      const discountPct = parseInt(offer.value.replace('%', '').replace(' Off', '').trim()) || 0;
      return Math.floor(subtotal * (discountPct / 100));
    } else if (offer.type === "Flat") {
      const discount = parseInt(offer.value.replace('₹', '').replace(' Off', '').trim()) || 0;
      return discount;
    }
    return 0; // Delivery offers could be handled differently if they affect total
  };

  const getCartTotal = () => {
    return Math.max(0, getCartSubtotal() - getDiscountAmount());
  };

  return (
    <CustomerLayout>
        <div className="bg-gray-50 font-sans pb-12 relative">
        
        {/* 1. Top Header (Local) */}
        <header className="bg-white z-20 shadow-sm rounded-2xl mb-8 relative">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <h1 className="text-3xl font-extrabold text-orange-600 tracking-tight">{restaurantName}</h1>
            <div 
              className="flex items-center gap-1 text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
              onClick={() => setShowLocationDetector(!showLocationDetector)}
            >
              <MapPin size={20} className="text-orange-500" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium">Deliver to</span>
                <span className="text-sm font-bold truncate max-w-[250px]">{currentAddress}</span>
              </div>
            </div>
          </div>

          <form 
            className="flex-1 w-full max-w-2xl mx-auto relative group"
            onSubmit={(e) => {
              e.preventDefault();
              document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value && window.scrollY < 400) {
                   document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              placeholder="Search for dish, cuisine or restaurant..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all shadow-sm bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-400"
            />
          </form>

          <div className="flex items-center gap-6 hidden md:flex">
            {isAdmin && (
              <Link href="/admin/dashboard">
                <button className="text-gray-700 font-semibold hover:text-orange-600 transition flex items-center gap-1">
                  <LayoutDashboard size={18} /> Admin
                </button>
              </Link>
            )}
            <Link href="/auth"><button className="text-gray-700 font-semibold hover:text-orange-600 transition">Log in</button></Link>
            <button onClick={() => { setIsCartModalOpen(true); setCheckoutStep("cart"); }} className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full font-medium hover:bg-gray-800 transition shadow-md">
              <ShoppingCart size={18} /> Cart {cart.length > 0 && <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">{cart.length}</span>}
            </button>
          </div>
        </div>
        {showLocationDetector && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 p-4 z-40">
            <div className="max-w-7xl mx-auto">
              <LocationDetector onLocationFound={handleLocationFound} />
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-12">
        
        {/* 2. Hero Banner */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden group cursor-pointer shadow-md">
            <img src="/images/thali.jpg" alt="Offer 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-3 uppercase tracking-wider">Today's Special</span>
              <h2 className="text-white text-3xl font-bold mb-2">50% OFF on Indian Thali</h2>
              <Link href="/categories"><button className="bg-white text-black px-6 py-2 rounded-full font-bold w-max hover:bg-gray-100 transition">Order Now</button></Link>
            </div>
          </div>
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden group cursor-pointer shadow-md">
            <img src="/images/burger.jpg" alt="Offer 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
              <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-3 uppercase tracking-wider">Free Delivery</span>
              <h2 className="text-white text-3xl font-bold mb-2">Craving Pizza? Free Delivery!</h2>
              <Link href="/categories"><button className="bg-white text-black px-6 py-2 rounded-full font-bold w-max hover:bg-gray-100 transition">Order Now</button></Link>
            </div>
          </div>
        </section>

        {/* 7. Offer Zone (Coupon) */}
        <section className="bg-gradient-to-r from-orange-100 to-red-50 border border-orange-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between shadow-sm">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="bg-orange-500 p-3 rounded-full text-white">
              <Ticket size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Get Flat 50% OFF</h3>
              <p className="text-gray-600">Use code for your first order in Indore</p>
            </div>
          </div>
          <div 
            className="bg-white border-2 border-dashed border-orange-400 px-6 py-3 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-orange-50 transition"
            onClick={() => {
              navigator.clipboard.writeText("IND50");
              showToast("Coupon code 'IND50' copied!");
            }}
          >
            <span className="text-2xl font-black text-orange-600 tracking-widest">IND50</span>
            <span className="text-sm font-semibold text-gray-500 border-l border-gray-300 pl-4">COPY CODE</span>
          </div>
        </section>

        {/* 3. Quick Services */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { 
              title: "Delivery", 
              desc: `Hot food in ${deliveryTime} mins`,
              icon: "🛵", 
              color: orderType === "Delivery" ? "bg-blue-600 text-white shadow-xl scale-105" : "bg-blue-50 hover:bg-blue-100 text-blue-700", 
              action: () => {
                setOrderType("Delivery");
                document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
                showToast("Switched to Delivery! Browse menu.");
              }
            },
            { 
              title: "Takeaway", 
              desc: "Skip the line",
              icon: "🛍️", 
              color: orderType === "Takeaway" ? "bg-green-600 text-white shadow-xl scale-105" : "bg-green-50 hover:bg-green-100 text-green-700", 
              action: () => {
                setOrderType("Takeaway");
                document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
                showToast("Switched to Takeaway! Browse menu.");
              }
            },
            { 
              title: "Dine-in", 
              desc: "Pre-book a table",
              icon: "🍽️", 
              color: "bg-purple-50 hover:bg-purple-100 text-purple-700", 
              action: () => setIsTableModalOpen(true) 
            },
            { 
              title: "Tiffin", 
              desc: "Monthly meals",
              icon: "🍱", 
              color: "bg-orange-50 hover:bg-orange-100 text-orange-700", 
              action: () => setIsTiffinModalOpen(true) 
            },
          ].map((service, idx) => (
            <div key={idx} onClick={service.action} className={`p-4 md:p-6 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-sm ${service.color}`}>
              <span className="text-4xl mb-1">{service.icon}</span>
              <span className="font-bold text-lg md:text-xl text-center leading-tight">{service.title}</span>
              <span className={`text-xs md:text-sm text-center font-medium ${service.color.includes('text-white') ? 'text-white/80' : 'opacity-70'}`}>{service.desc}</span>
            </div>
          ))}
        </section>

        {/* 4. Categories / Cuisines */}
        <section id="categories">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Inspiration for your first order</h2>
          </div>
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x">
            {categories.map((cat, idx) => (
              <div key={idx} onClick={() => setSelectedCategory(cat.name)} className="flex flex-col items-center gap-3 cursor-pointer group min-w-[100px] snap-center">
                <div className={`w-24 h-24 rounded-full overflow-hidden shadow-sm border-2 transition-all p-1 ${selectedCategory === cat.name ? 'border-orange-500 bg-orange-50' : 'border-transparent group-hover:border-orange-300'}`}>
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <span className={`font-medium transition-colors text-center ${selectedCategory === cat.name ? 'text-orange-600 font-bold' : 'text-gray-700 group-hover:text-orange-500'}`}>{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Our Bestsellers */}
        <section id="bestsellers">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{searchQuery ? `Search Results for "${searchQuery}"` : (selectedCategory === "All" ? "Our Bestsellers" : `${selectedCategory} Bestsellers`)}</h2>
            <Link href="/categories"><button className="text-orange-600 font-semibold flex items-center hover:underline">View All <ChevronRight size={18} /></button></Link>
          </div>
          {filteredBestsellers.length > 0 ? (
            <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x">
              {filteredBestsellers.map((item, idx) => (
                <div key={idx} className="min-w-[280px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 snap-center group flex flex-col">
                  <div className="h-48 overflow-hidden relative cursor-pointer" onClick={() => showToast(`View details for ${item.name}`)}>
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className={`absolute top-3 left-3 bg-white px-2 py-1 rounded text-xs font-bold shadow-sm flex items-center gap-1 ${item.type === 'Pure Veg' ? 'text-green-700' : 'text-red-700'}`}>
                      <span className={`w-2 h-2 rounded-full ${item.type === 'Pure Veg' ? 'bg-green-600' : 'bg-red-600'}`}></span> {item.type}
                    </div>
                    <button 
                      onClick={(e) => toggleFavourite(e, item)}
                      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:scale-110 transition-transform"
                    >
                      <Heart size={18} className={favourites.some(f => f.name === item.name) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                    </button>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-gray-900 pr-2" title={item.name}>{item.name}</h3>
                        <span className="bg-green-700 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1">4.5 <Star size={10} className="fill-white" /></span>
                      </div>
                      <p className="text-gray-500 text-sm mb-3">Chef's Special Preparation</p>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-2">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-lg">{item.price}</span>
                        <span className="text-[10px] text-gray-500 flex items-center gap-1"><Clock size={10} /> {item.prepTime}</span>
                      </div>
                      <button onClick={(e) => addToCart(e, item)} className="bg-orange-100 text-orange-600 px-4 py-2 rounded-xl font-bold hover:bg-orange-600 hover:text-white transition-colors text-sm uppercase tracking-wider shadow-sm">Add</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-white rounded-2xl border border-gray-100 border-dashed">
              <p className="text-gray-500 text-lg">
                {searchQuery ? `We couldn't find any match for "${searchQuery}".` : "No items found in this category."}
              </p>
              <div className="mt-4 flex gap-4 justify-center">
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-orange-600 font-bold hover:underline bg-orange-50 px-4 py-2 rounded-lg">Clear Search</button>
                )}
                <button onClick={() => setSelectedCategory("All")} className="text-gray-600 font-bold hover:underline bg-gray-100 px-4 py-2 rounded-lg">View All Categories</button>
              </div>
            </div>
          )}
        </section>

        {/* 6. Signature Combos & Thalis */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Signature Combos & Thalis</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Maharaja Veg Thali", desc: "Complete family meal", rating: "4.8", img: "/images/thali.jpg", price: "₹399" },
              { name: "Chinese Mini Combo", desc: "Noodles + Manchurian + Coke", rating: "4.2", img: "/images/chowmein.jpg", price: "₹249" },
              { name: "Healthy Jain Thali", desc: "No Onion, No Garlic", rating: "4.6", img: "/images/thali.jpg", price: "₹299" },
            ].map((combo, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer">
                <div className="h-56 overflow-hidden relative">
                  <img src={combo.img} alt={combo.name} className="w-full h-full object-cover" />
                  <button 
                    onClick={(e) => toggleFavourite(e, combo)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:scale-110 transition-transform z-10"
                  >
                    <Heart size={18} className={favourites.some(f => f.name === combo.name) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <h3 className="font-bold text-xl text-white mb-1">{combo.name}</h3>
                      <p className="text-gray-300 text-sm">{combo.desc}</p>
                    </div>
                    <span className="bg-green-700 text-white text-sm font-bold px-2 py-1 rounded flex items-center gap-1">{combo.rating} <Star size={12} className="fill-white" /></span>
                  </div>
                </div>
                <div className="p-4 flex justify-between text-sm text-gray-600 bg-gray-50 border-t border-gray-100 items-center">
                  <span className="flex items-center gap-1 font-bold text-lg text-gray-900">{combo.price}</span>
                  <button onClick={(e) => addToCart(e, combo)} className="bg-orange-100 text-orange-600 px-3 py-1 rounded-lg font-bold hover:bg-orange-600 hover:text-white transition-colors text-xs uppercase tracking-wider">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Table Booking Banner & 10. Tiffin Subscription */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-900 rounded-3xl overflow-hidden relative shadow-lg h-72 group cursor-pointer" onClick={() => setIsTableModalOpen(true)}>
            <img src="/images/coffee.jpg" alt="Table Booking" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 p-8 flex flex-col justify-center items-start">
              <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase">No Waiting</span>
              <h2 className="text-white text-3xl font-black mb-3">Book Your Table</h2>
              <p className="text-blue-100 mb-6 max-w-sm">Reserve your favorite spot for family dinners or romantic dates.</p>
              <button className="bg-white text-blue-900 font-bold px-6 py-3 rounded-xl shadow-md hover:bg-blue-50 transition">Book Now</button>
            </div>
          </div>
          <div className="bg-orange-600 rounded-3xl overflow-hidden relative shadow-lg h-72 group cursor-pointer" onClick={() => setIsTiffinModalOpen(true)}>
            <img src="/images/thali.jpg" alt="Tiffin" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 p-8 flex flex-col justify-center items-start">
              <span className="bg-yellow-400 text-orange-900 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase">Bestseller in Indore</span>
              <h2 className="text-white text-3xl font-black mb-3">Monthly Tiffin @ ₹2999</h2>
              <p className="text-orange-100 mb-6 max-w-sm">Ghar jaisa khana, roz time pe. Subscribe now for healthy daily meals.</p>
              <button className="bg-white text-orange-700 font-bold px-6 py-3 rounded-xl shadow-md hover:bg-orange-50 transition">Subscribe Now</button>
            </div>
          </div>
        </section>

        {/* 8. How It Works */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-[3rem] text-center px-6 shadow-2xl border border-gray-800 relative overflow-hidden mt-12 mb-12">
          {/* Decorative glowing orbs */}
          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-orange-600 rounded-full opacity-20 blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-blue-600 rounded-full opacity-20 blur-[100px] pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-orange-500/5 blur-[120px] pointer-events-none"></div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 relative z-10 tracking-tight">How It Works</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-16 relative z-10 text-lg">Your favorite meals delivered in three simple steps. Fast, hot, and reliable.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 max-w-5xl mx-auto mt-10">
            {/* Desktop connecting lines */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent z-0"></div>

            {[
              { 
                step: "1", 
                title: "Choose Dish", 
                desc: "Browse our premium menu.", 
                icon: <Search size={32} />,
                action: () => {
                  document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
                  showToast("Explore our premium categories!");
                }
              },
              { 
                step: "2", 
                title: "Place Order", 
                desc: "Checkout with one tap.", 
                icon: <ShoppingCart size={32} />,
                action: () => {
                  setIsCartModalOpen(true);
                  setCheckoutStep("cart");
                }
              },
              { 
                step: "3", 
                title: "Enjoy at Home", 
                desc: `Hot delivery in ${deliveryTime} mins.`, 
                icon: <MapPin size={32} />,
                action: () => setIsTrackingModalOpen(true)
              },
            ].map((s, i) => (
              <div 
                key={i} 
                onClick={s.action}
                className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-orange-500/20 hover:-translate-y-3 transition-all duration-500 cursor-pointer group flex flex-col items-center border border-white/10 z-10"
              >
                <div className="w-32 h-32 bg-gray-800/50 group-hover:bg-orange-600 text-orange-500 group-hover:text-white rounded-[2rem] rotate-3 group-hover:rotate-0 flex items-center justify-center mb-8 relative transition-all duration-500 shadow-inner border border-white/5">
                  <div className="absolute inset-0 bg-orange-500 rounded-[2rem] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                  <div className="relative z-10 scale-110 group-hover:scale-125 transition-transform duration-500">
                    {s.icon}
                  </div>
                  <span className="absolute -top-4 -right-4 w-12 h-12 bg-black text-white rounded-xl rotate-[-12deg] group-hover:rotate-12 flex items-center justify-center font-black text-2xl border-4 border-gray-900 shadow-2xl transition-transform duration-500 z-20">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">{s.title}</h3>
                <p className="text-gray-400 font-medium">{s.desc}</p>
                <div className="mt-8 px-6 py-2 rounded-full bg-white/5 text-orange-400 font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-2 border border-orange-500/30 group-hover:bg-orange-500/10 translate-y-4 group-hover:translate-y-0">
                  Try it <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>

          {/* Trust Markers / Statistics */}
          <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10 max-w-5xl mx-auto">
            {[
              { label: "Happy Customers", value: "10,000+" },
              { label: "Average Delivery", value: `${deliveryTime} Mins` },
              { label: "Premium Dishes", value: "50+" },
              { label: "Support Available", value: "24/7" },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-black text-orange-500 mb-2">{stat.value}</span>
                <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
        {/* 11. Customer Reviews */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">What Foodies Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Rahul Sharma", text: "Best tiffin service in Indore! The quality is exactly like home food.", img: "/images/coffee.jpg" },
              { name: "Priya Jain", text: "Ordered Jain Thali, it was perfectly packed and tasted amazing. 5 stars!", img: "/images/coffee.jpg" },
              { name: "Amit Verma", text: "Table booking was so smooth. Skipped the entire weekend queue.", img: "/images/coffee.jpg" },
            ].map((review, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex text-yellow-400 mb-4">
                    <Star size={16} className="fill-yellow-400" /><Star size={16} className="fill-yellow-400" /><Star size={16} className="fill-yellow-400" /><Star size={16} className="fill-yellow-400" /><Star size={16} className="fill-yellow-400" />
                  </div>
                  <p className="text-gray-700 italic mb-6">"{review.text}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <img src={review.img} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{review.name}</h4>
                    <p className="text-xs text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 12. App Download Section */}
      <section className="bg-gray-100 mt-12 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12 justify-between">
          <div className="text-center md:text-left max-w-lg md:w-1/2">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Get the Eatery App</h2>
            <p className="text-gray-600 text-lg mb-8">We will send you a link, open it on your phone to download the app and get <strong className="text-gray-900">₹100 off your first order!</strong></p>
            
            <div className="mb-8 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto md:mx-0">
              <div className="flex w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
                <div className="px-4 py-3 bg-gray-50 border-r border-gray-200 text-gray-600 font-medium">+91</div>
                <input 
                  type="tel" 
                  placeholder="Enter your phone number" 
                  className="w-full px-4 py-3 outline-none text-gray-900" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                />
              </div>
              <button 
                onClick={(e) => {
                  if (phoneNumber.length !== 10) {
                    showToast("Please enter a valid 10-digit phone number");
                    return;
                  }
                  const btn = e.currentTarget;
                  const originalText = btn.innerText;
                  btn.innerText = "Link Sent!";
                  btn.classList.replace("bg-orange-600", "bg-green-600");
                  setTimeout(() => {
                    btn.innerText = originalText;
                    btn.classList.replace("bg-green-600", "bg-orange-600");
                    setPhoneNumber("");
                  }, 3000);
                }}
                className="w-full sm:w-auto bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-600/30 whitespace-nowrap">
                Share Link
              </button>
            </div>

            <div className="flex gap-4 justify-center md:justify-start">
              <div onClick={() => setIsAppModalOpen(true)} className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-gray-800 transition hover:scale-105 active:scale-95 duration-200 shadow-xl shadow-black/20">
                <Download size={24} />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-gray-300 tracking-wider">Get it on</div>
                  <div className="text-lg font-bold leading-none mt-0.5">Google Play</div>
                </div>
              </div>
              <div onClick={() => setIsAppModalOpen(true)} className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-gray-800 transition hover:scale-105 active:scale-95 duration-200 shadow-xl shadow-black/20">
                <Download size={24} />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-gray-300 tracking-wider">Download on the</div>
                  <div className="text-lg font-bold leading-none mt-0.5">App Store</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center relative mt-8 md:mt-0">
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            
            {/* Phone Mockup with generated image */}
            <div className="w-72 h-[550px] bg-white rounded-[3rem] border-[10px] border-gray-900 shadow-2xl relative overflow-hidden flex flex-col group rotate-[-5deg] hover:rotate-0 transition-all duration-500 ease-out z-10 hover:shadow-orange-500/20">
              <div className="absolute top-0 w-32 h-6 bg-gray-900 rounded-b-2xl left-1/2 -translate-x-1/2 z-20"></div>
              <div className="relative w-full h-full bg-gray-900 flex-1">
                <Image src="/app-screen.jpg" alt="Eatery App Interface" fill sizes="(max-width: 768px) 100vw, 288px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-800 pb-12 mb-8">
          <div>
            <h1 className="text-3xl font-black text-white mb-6 tracking-tight">{restaurantName}</h1>
            <p className="text-gray-400 mb-6">The best food delivery and dining experience in Indore. Quick, hot, and delicious.</p>
            <div className="flex gap-4">
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 cursor-pointer transition-colors text-white font-bold">F</a>
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 cursor-pointer transition-colors text-white font-bold">X</a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 cursor-pointer transition-colors text-white font-bold">IG</a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a href="https://maps.google.com/?q=123+Food+Street,+Vijay+Nagar,+Indore,+Madhya+Pradesh+452010" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-white transition-colors">
                  <MapPin size={20} className="text-orange-500 shrink-0 mt-0.5" />
                  <span>123 Food Street, Vijay Nagar, Indore, Madhya Pradesh 452010</span>
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-3 hover:text-white transition-colors">
                  <Phone size={20} className="text-orange-500 shrink-0" />
                  <span>+91 98765 43210</span>
                </a>
              </li>
              <li>
                <a href="mailto:support@eatery.in" className="flex items-center gap-3 hover:text-white transition-colors">
                  <Mail size={20} className="text-orange-500 shrink-0" />
                  <span>support@eatery.in</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-4 text-gray-400">
              <li onClick={() => { document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' }); showToast("Explore our categories!"); }} className="hover:text-orange-500 cursor-pointer transition-colors flex items-center gap-2"><ChevronRight size={14}/> Food Delivery</li>
              <li onClick={() => setIsTableModalOpen(true)} className="hover:text-orange-500 cursor-pointer transition-colors flex items-center gap-2"><ChevronRight size={14}/> Table Booking</li>
              <li onClick={() => setIsTiffinModalOpen(true)} className="hover:text-orange-500 cursor-pointer transition-colors flex items-center gap-2"><ChevronRight size={14}/> Tiffin Subscription</li>
              <li onClick={() => setIsPartyCateringModalOpen(true)} className="hover:text-orange-500 cursor-pointer transition-colors flex items-center gap-2"><ChevronRight size={14}/> Party Catering</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6">Legal & Links</h3>
            <ul className="space-y-4 text-gray-400">
              <Link href="/about" className="block"><li className="hover:text-orange-500 cursor-pointer transition-colors flex items-center gap-2"><ChevronRight size={14}/> About Us</li></Link>
              <Link href="/terms" className="block"><li className="hover:text-orange-500 cursor-pointer transition-colors flex items-center gap-2"><ChevronRight size={14}/> Terms & Conditions</li></Link>
              <Link href="/privacy" className="block"><li className="hover:text-orange-500 cursor-pointer transition-colors flex items-center gap-2"><ChevronRight size={14}/> Privacy Policy</li></Link>
              <Link href="/refund" className="block"><li className="hover:text-orange-500 cursor-pointer transition-colors flex items-center gap-2"><ChevronRight size={14}/> Refund Policy</li></Link>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies.</p>
          <p className="mt-2 text-gray-600">2024-2025 © Eatery Ltd. All rights reserved. Made with ❤️ in Indore.</p>
        </div>
      </footer>
        </div>
      
      {/* Table Booking Modal */}
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
                    {availableTables.length > 0 ? (
                      availableTables.map(t => (
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

      {/* Tiffin Subscription Modal */}
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

      {/* Party Catering Modal */}
      {isPartyCateringModalOpen && (
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
      )}

      {/* Cart & Checkout Modal */}
      {isCartModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => { setIsCartModalOpen(false); setCheckoutStep("cart"); }} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold">&times;</button>
            
            {checkoutStep === "cart" && (
              <>
                <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3"><ShoppingCart size={28} className="text-orange-600" /> Your Cart</h2>
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-orange-50 text-orange-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-orange-100">
                      <ShoppingCart size={48} />
                    </div>
                    <p className="text-gray-500 mb-8 text-lg font-medium">Your cart is feeling a bit light.</p>
                    <button 
                      onClick={() => {
                        setIsCartModalOpen(false);
                        setTimeout(() => {
                          document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }} 
                      className="bg-orange-600 text-white font-bold px-10 py-4 rounded-xl shadow-md hover:bg-orange-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mx-auto"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.values(cart.reduce((acc: any, item: any, index: number) => {
                      if (!acc[item.name]) {
                        acc[item.name] = { ...item, count: 1 };
                      } else {
                        acc[item.name].count += 1;
                      }
                      return acc;
                    }, {})).map((group: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-4">
                          {group.img && <img src={group.img} className="w-16 h-16 rounded-xl object-cover shadow-sm" alt={group.name} />}
                          <div>
                            <p className="font-bold text-gray-900">{group.name}</p>
                            <p className="text-sm text-gray-500 font-medium">{typeof group.price === 'number' ? `₹${group.price}` : group.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-gray-100 rounded-lg">
                            <button 
                              onClick={() => {
                                const newCart = [...cart];
                                const lastIndex = newCart.map(i => i.name).lastIndexOf(group.name);
                                if (lastIndex !== -1) {
                                  newCart.splice(lastIndex, 1);
                                  setCart(newCart);
                                }
                              }}
                              className="px-3 py-1 font-bold text-gray-600 hover:text-orange-600 transition"
                            >-</button>
                            <span className="font-bold text-gray-900 w-4 text-center">{group.count}</span>
                            <button 
                              onClick={() => {
                                const itemToAdd = cart.find(i => i.name === group.name);
                                if (itemToAdd) {
                                  setCart([...cart, { ...itemToAdd }]);
                                }
                              }}
                              className="px-3 py-1 font-bold text-gray-600 hover:text-orange-600 transition"
                            >+</button>
                          </div>
                          <button 
                            onClick={() => setCart(cart.filter(item => item.name !== group.name))} 
                            className="text-red-500 text-sm font-bold bg-red-50 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white transition"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    {availableOffers.map(offer => {
                      const subtotal = getCartSubtotal();
                      if (offer.minOrder && subtotal < offer.minOrder) return null;
                      if (offer.code === "FESTIVE20" && festive20Uses >= 3) return null;
                      if ((offer.code === "WELCOME50" || offer.code === "IND50") && (hasPastOrders || currentOrderId !== "")) return null;
                      return (
                        <div key={offer.id} className="bg-blue-50 border border-blue-200 border-dashed rounded-xl p-4 flex justify-between items-center mt-6">
                          <div className="flex gap-4 items-center">
                            <div className="border border-blue-200 bg-white text-blue-600 font-black px-4 py-2 rounded-md tracking-wider">
                              {offer.code}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{offer.value}</p>
                              <p className="text-sm text-gray-500">
                                {offer.minOrder ? `Valid on orders above ₹${offer.minOrder}.` : "Valid on this order."} {offer.code === "FESTIVE20" && "Use it up to 3 times."}
                              </p>
                            </div>
                          </div>
                          <button 
                            onClick={() => {
                              setCouponInput(offer.code);
                              showToast("Coupon code copied!");
                            }} 
                            className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                          >
                            Copy Code
                          </button>
                        </div>
                      );
                    })}
                    <div className="flex gap-2 pt-4 border-t border-gray-100 mt-4">
                      <input 
                        type="text" 
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Enter Coupon Code" 
                        className="flex-1 border border-gray-300 rounded-xl px-4 py-2 outline-none focus:border-orange-500 text-gray-900 placeholder:text-gray-400 disabled:bg-gray-100 disabled:text-gray-400"
                        disabled={appliedCoupon !== ""}
                      />
                      <button 
                        onClick={() => {
                          const subtotal = getCartSubtotal();
                          if (appliedCoupon !== "") {
                            setAppliedCoupon("");
                            setCouponInput("");
                            showToast("Coupon removed.");
                          } else {
                            const offer = availableOffers.find(o => o.code === couponInput);
                            if (!offer) {
                              showToast("Invalid coupon code.");
                            } else if (offer.minOrder && subtotal < offer.minOrder) {
                              showToast(`${offer.code} is valid on orders above ₹${offer.minOrder}.`);
                            } else if (offer.code === "FESTIVE20" && festive20Uses >= 3) {
                              showToast("FESTIVE20 usage limit reached (3 times).");
                            } else if ((offer.code === "WELCOME50" || offer.code === "IND50") && (hasPastOrders || currentOrderId !== "")) {
                              showToast("This coupon is valid for first orders only.");
                            } else {
                              setAppliedCoupon(offer.code);
                              showToast(`${offer.code} applied! ${offer.value}`);
                            }
                          }
                        }}
                        disabled={couponInput.trim() === "" && appliedCoupon === ""}
                        className={`px-6 font-bold rounded-xl transition-colors ${appliedCoupon !== "" ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-gray-100 text-gray-900 hover:bg-gray-200"} disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {appliedCoupon !== "" ? "Remove" : "Apply"}
                      </button>
                    </div>

                    <div className="flex justify-between items-center pt-6 font-black text-2xl text-gray-900 border-t-2 border-dashed border-gray-200 mt-4">
                      <span>Total:</span>
                      <div className="flex items-center gap-2">
                        {appliedCoupon !== "" && (
                          <span className="text-lg text-gray-400 line-through">₹{getCartSubtotal()}</span>
                        )}
                        <span>₹{getCartTotal()}</span>
                      </div>
                    </div>
                    <button onClick={() => setCheckoutStep("address")} className="w-full bg-orange-600 text-white font-bold rounded-xl py-4 mt-8 hover:bg-orange-700 transition shadow-lg text-lg flex justify-center items-center gap-2">
                      Enter Delivery Address <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}

            {checkoutStep === "address" && (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <button onClick={() => setCheckoutStep("cart")} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"><ChevronRight size={20} className="rotate-180" /></button>
                  <h2 className="text-3xl font-black text-gray-900">Delivery Address</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" value={deliveryName} onChange={(e) => setDeliveryName(e.target.value)} placeholder="John Doe" className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500 bg-white text-gray-900 placeholder-gray-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" value={deliveryPhone} onChange={(e) => setDeliveryPhone(e.target.value)} placeholder="+91 9876543210" className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500 bg-white text-gray-900 placeholder-gray-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Address</label>
                    <textarea rows={3} value={deliveryAddressDetails} onChange={(e) => setDeliveryAddressDetails(e.target.value)} placeholder="House/Flat No., Street, Landmark..." className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500 bg-white text-gray-900 placeholder-gray-400"></textarea>
                  </div>
                  <button onClick={() => {
                    if (!deliveryName.trim() || !deliveryPhone.trim() || !deliveryAddressDetails.trim()) {
                      showToast("Please fill all address fields to proceed!");
                      return;
                    }
                    setCheckoutStep("payment");
                  }} className="w-full bg-orange-600 text-white font-bold rounded-xl py-4 mt-4 hover:bg-orange-700 transition shadow-lg text-lg flex justify-center items-center gap-2">
                    Proceed to Payment <ChevronRight size={20} />
                  </button>
                </div>
              </>
            )}

            {checkoutStep === "payment" && (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <button onClick={() => setCheckoutStep("address")} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"><ChevronRight size={20} className="rotate-180" /></button>
                  <h2 className="text-3xl font-black text-gray-900">Payment</h2>
                </div>
                
                <div className="space-y-4">
                  <label className={`border-2 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-orange-500 transition-colors group ${selectedPaymentMethod === 'card' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-100'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-blue-600"><span className="font-black text-sm">CARD</span></div>
                      <div>
                        <span className="block font-bold text-gray-900 group-hover:text-orange-600 transition">Credit / Debit Card</span>
                        <span className="text-xs text-gray-500">Visa, Mastercard, RuPay</span>
                      </div>
                    </div>
                    <input type="radio" name="payment" checked={selectedPaymentMethod === 'card'} onChange={() => setSelectedPaymentMethod('card')} className="w-5 h-5 accent-orange-600" />
                  </label>

                  <label className={`border-2 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-orange-500 transition-colors group ${selectedPaymentMethod === 'upi' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-100'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-100 font-bold text-green-600 text-sm">UPI</div>
                      <div>
                        <span className="block font-bold text-gray-900 group-hover:text-orange-600 transition">UPI / GPay / PhonePe</span>
                        <span className="text-xs text-gray-500">Fast & Secure</span>
                      </div>
                    </div>
                    <input type="radio" name="payment" checked={selectedPaymentMethod === 'upi'} onChange={() => setSelectedPaymentMethod('upi')} className="w-5 h-5 accent-orange-600" />
                  </label>

                  <label className={`border-2 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-orange-500 transition-colors group ${selectedPaymentMethod === 'wallet' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-100'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-100 text-orange-600"><Wallet size={24} /></div>
                      <div>
                        <span className="block font-bold text-gray-900 group-hover:text-orange-600 transition">Wallet Balance</span>
                        <span className="text-xs text-gray-500">Pay using Eatery Pay</span>
                      </div>
                    </div>
                    <input type="radio" name="payment" checked={selectedPaymentMethod === 'wallet'} onChange={() => setSelectedPaymentMethod('wallet')} className="w-5 h-5 accent-orange-600" />
                  </label>

                  <label className={`border-2 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-orange-500 transition-colors group ${selectedPaymentMethod === 'cod' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-100'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-100 text-gray-600"><MapPin size={24} /></div>
                      <div>
                        <span className="block font-bold text-gray-900 group-hover:text-orange-600 transition">Cash on Delivery</span>
                        <span className="text-xs text-gray-500">Pay at your doorstep</span>
                      </div>
                    </div>
                    <input type="radio" name="payment" checked={selectedPaymentMethod === 'cod'} onChange={() => setSelectedPaymentMethod('cod')} className="w-5 h-5 accent-orange-600" />
                  </label>
                  
                  <button onClick={() => {
                    const totalAmount = Math.floor(cart.reduce((total, item) => total + parseInt(String(item.price).replace('₹', '') || "0"), 0) * (appliedCoupon === "IND50" ? 0.5 : (appliedCoupon === "FESTIVE20" ? 0.8 : 1)));

                    if (selectedPaymentMethod === 'wallet') {
                      let currentWalletBalance = 450;
                      if (typeof window !== 'undefined') {
                        const storedWallet = localStorage.getItem('myWalletBalance');
                        if (storedWallet) currentWalletBalance = Number(storedWallet);
                      }
                      
                      if (totalAmount > currentWalletBalance) {
                        showToast(`Insufficient Wallet Balance! You need ₹${totalAmount}, but you only have ₹${currentWalletBalance}.`);
                        return; // Prevent payment
                      }
                      
                      // Deduct from wallet
                      const newBalance = currentWalletBalance - totalAmount;
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('myWalletBalance', newBalance.toString());
                        const storedTx = localStorage.getItem('myTransactions');
                        const transactions = storedTx ? JSON.parse(storedTx) : [];
                        const newTx = {
                          id: Math.random(),
                          title: "Order Payment",
                          date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                          amount: totalAmount,
                          type: "debit"
                        };
                        localStorage.setItem('myTransactions', JSON.stringify([newTx, ...transactions]));
                      }
                    }

                    if (appliedCoupon === "FESTIVE20") {
                      const newUses = festive20Uses + 1;
                      setFestive20Uses(newUses);
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('festive20Uses', newUses.toString());
                      }
                    }

                    const newOrderId = "ORD" + Math.floor(100000 + Math.random() * 900000);
                    setCurrentOrderId(newOrderId);
                    setLastOrder([...cart]);
                    
                    if (typeof window !== 'undefined') {
                      let finalScheduleDate = scheduleDate;
                      let finalScheduleTime = scheduleTime;
                      
                      try {
                        const schedStr = localStorage.getItem('scheduledOrderContext');
                        if (schedStr) {
                          const sched = JSON.parse(schedStr);
                          finalScheduleDate = sched.date || scheduleDate;
                          finalScheduleTime = sched.time || scheduleTime;
                          localStorage.removeItem('scheduledOrderContext');
                        }
                      } catch (e) {}

                      const orderStatus = (finalScheduleDate && finalScheduleTime) 
                        ? `Scheduled for ${finalScheduleDate} at ${finalScheduleTime}`
                        : "Preparing Food";

                      const newOrderRecord = {
                          id: "#" + newOrderId,
                          items: Object.entries(
                              cart.reduce((acc: any, item: any) => {
                                  acc[item.name] = (acc[item.name] || 0) + 1;
                                  return acc;
                              }, {})
                          ).map(([name, count]) => `${count}x ${name}`).join(", "),
                          date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }),
                          timestamp: Date.now(),
                          amount: `₹${totalAmount}`,
                          status: orderStatus,
                          rawItems: [...cart]
                      };
                      const existingOrders = JSON.parse(localStorage.getItem('myOrders') || '[]');
                      localStorage.setItem('myOrders', JSON.stringify([newOrderRecord, ...existingOrders]));
                    }
                    
                    setScheduleDate("");
                    setScheduleTime("");
                    
                    setCart([]);
                    setAppliedCoupon("");
                    setCouponInput("");
                    setCheckoutStep("success");
                  }} className="w-full bg-black text-white font-bold rounded-xl py-4 mt-8 hover:bg-gray-800 transition shadow-xl text-lg flex justify-between px-6 items-center">
                    <span>Pay Now</span>
                    <span className="font-black">₹{Math.floor(cart.reduce((total, item) => total + parseInt(String(item.price).replace('₹', '') || "0"), 0) * (appliedCoupon === "IND50" ? 0.5 : (appliedCoupon === "FESTIVE20" ? 0.8 : 1)))}</span>
                  </button>
                </div>
              </>
            )}

            {checkoutStep === "success" && (
              <div className="text-center py-10 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10 shadow-inner">
                  <Check size={48} className="animate-pulse" />
                </div>
                <h2 className="text-4xl font-black text-gray-900 mb-4 relative z-10">Order Confirmed!</h2>
                <p className="text-gray-500 mb-4 text-lg relative z-10 max-w-xs mx-auto">Your delicious food is being prepared and will be delivered shortly.</p>
                <div className="bg-gray-100 rounded-lg p-3 mb-10 relative z-10 inline-block shadow-sm">
                  <span className="text-sm text-gray-500 font-medium">Order ID:</span>
                  <span className="ml-2 font-black text-gray-900">{currentOrderId}</span>
                </div>
                <button onClick={() => { setIsCartModalOpen(false); setCart([]); setCheckoutStep("cart"); setTrackingInput(currentOrderId); setIsTrackingModalOpen(true); }} className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-orange-700 transition relative z-10 text-lg">Track My Order</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tracking Modal */}
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
      )}

      {/* App Download Modal */}
      {isAppModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative text-center">
            <button onClick={() => setIsAppModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold">&times;</button>
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Smartphone size={40} className="animate-pulse" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Scan to Download</h2>
            <p className="text-gray-500 mb-8 font-medium">Get the Eatery app for exclusive offers and lightning fast ordering.</p>
            
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 mx-auto w-48 h-48 flex items-center justify-center mb-6">
              {/* Dummy QR Code using a generic placeholder or CSS pattern */}
              <div className="w-full h-full bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://eatery.in')] bg-center bg-no-repeat bg-cover opacity-80 mix-blend-multiply"></div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <div className="w-10 h-10 bg-black rounded-full text-white flex items-center justify-center shadow-lg"><Download size={18} /></div>
              <div className="w-10 h-10 bg-orange-500 rounded-full text-white flex items-center justify-center shadow-lg"><Star size={18} /></div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Order Modal */}
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
                  setIsScheduleModalOpen(false);
                  showToast(`Order scheduled for ${scheduleDate} at ${scheduleTime}`);
                  setOrderType("Delivery");
                  setTimeout(() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' }), 500);
                }} 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl py-4 shadow-lg transition active:scale-95 uppercase tracking-wide text-sm mt-4"
              >
                Confirm Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live CCTV Modal */}
      {isCctvModalOpen && (
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
                  src="/images/coffee.jpg" 
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
      )}

      {/* Offers & Loyalty Modal */}
      {isOffersModalOpen && (
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
                setOrderType("Delivery");
                setTimeout(() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' }), 500);
              }} 
              className="w-full bg-gray-900 hover:bg-black text-white font-bold rounded-xl py-4 shadow-lg transition active:scale-95 uppercase tracking-wide text-sm mt-6"
            >
              Order Now to Earn More
            </button>
          </div>
        </div>
      )}

      {/* Delivery Setup Modal */}
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
                    <p className="text-sm font-bold text-gray-900">Delivery in {deliveryTime} mins</p>
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
                    setCurrentAddress(deliveryAddressDetails);
                  }
                  setIsDeliveryModalOpen(false);
                  showToast("Delivery location confirmed! Browse the menu.");
                  setTimeout(() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' }), 300);
                }}
                className="px-6 py-2.5 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition shadow-md"
              >
                Browse Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Options Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsPaymentModalOpen(false)}></div>
          <div className="bg-white rounded-3xl w-full max-w-md relative z-10 overflow-hidden shadow-2xl animate-scaleIn">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black mb-1">Multiple Payments</h2>
                <p className="text-blue-100 text-sm">Flexible and secure ways to pay</p>
              </div>
              <button onClick={() => setIsPaymentModalOpen(false)} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition"><X size={20} /></button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="border-b border-gray-100 pb-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <CreditCard className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Credit / Debit Cards</h3>
                  <p className="text-sm text-gray-500">Visa, Mastercard, RuPay & more</p>
                </div>
              </div>
              
              <div className="border-b border-gray-100 pb-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                  <Smartphone className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">UPI Payments</h3>
                  <p className="text-sm text-gray-500">GPay, PhonePe, Paytm, Amazon Pay</p>
                </div>
              </div>

              <div className="border-b border-gray-100 pb-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                  <Wallet className="text-orange-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Loyalty Wallet</h3>
                  <p className="text-sm text-gray-500">Pay directly using your cashback wallet</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Banknote className="text-gray-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Cash on Delivery</h3>
                  <p className="text-sm text-gray-500">Pay by cash when your order arrives</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <button 
                onClick={() => {
                  setIsPaymentModalOpen(false);
                  setTimeout(() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' }), 300);
                }} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-4 shadow-lg transition active:scale-95"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customization Modal */}
      {isCustomizationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCustomizationModalOpen(false)}></div>
          <div className="bg-white rounded-3xl w-full max-w-md relative z-10 overflow-hidden shadow-2xl animate-scaleIn">
            <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-6 text-white flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black mb-1">Food Customization</h2>
                <p className="text-yellow-100 text-sm">Made exactly how you like it</p>
              </div>
              <button onClick={() => setIsCustomizationModalOpen(false)} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition"><X size={20} /></button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 flex gap-3">
                <SlidersHorizontal className="text-yellow-600 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900">Personalize Your Order</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    When you select any item from our menu, you'll see a 'Customization' option before adding to cart. You can request:
                  </p>
                </div>
              </div>
              
              <ul className="space-y-3 text-sm text-gray-700 font-medium">
                <li className="flex items-center gap-2"><Check className="text-green-500" size={18}/> Jain Preparation (No Onion, No Garlic)</li>
                <li className="flex items-center gap-2"><Check className="text-green-500" size={18}/> Spice Level (Mild, Medium, Extra Spicy)</li>
                <li className="flex items-center gap-2"><Check className="text-green-500" size={18}/> Allergy Information</li>
                <li className="flex items-center gap-2"><Check className="text-green-500" size={18}/> Special Cooking Instructions</li>
              </ul>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => {
                  setIsCustomizationModalOpen(false);
                  setTimeout(() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' }), 300);
                }} 
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-xl py-4 shadow-lg transition active:scale-95"
              >
                Browse Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Family Cart Modal */}
      {isFamilyCartModalOpen && (
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
                  setTimeout(() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' }), 300);
                }} 
                className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition shadow-md"
              >
                Start Adding
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Takeaway Setup Modal */}
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
                  setTimeout(() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' }), 300);
                }}
                className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition shadow-md"
              >
                Start Order
              </button>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <div style={{ zIndex: 9999 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-300 font-medium whitespace-nowrap">
          {toastMessage}
        </div>
      )}
    </CustomerLayout>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div></div>}>
      <HomeContent />
    </Suspense>
  );
}
