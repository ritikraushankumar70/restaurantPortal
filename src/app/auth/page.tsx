"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Utensils, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { auth as firebaseAuth } from "@/lib/firebase";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  
  // Login fields
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Customer Signup fields
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const { login, register } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [restaurantName, setRestaurantName] = useState("Restaurant Portal");

  useEffect(() => {
    const loadSettings = () => {
      const saved = localStorage.getItem("restaurantSettings");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.restaurantName) {
            setRestaurantName(parsed.restaurantName);
          }
        } catch (e) {}
      }
    };
    loadSettings();
    window.addEventListener("settingsUpdated", loadSettings);
    return () => window.removeEventListener("settingsUpdated", loadSettings);
  }, []);
  


  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/home`,
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (isLogin) {
        if (!loginId || !loginPassword) throw new Error("Please fill in all fields");
        login(loginId.trim(), loginPassword);
      } else {
        // Signup
        if (!name || !phone || !password) throw new Error("Please fill all required fields");
        register(phone.trim(), email.trim(), password);
        setSuccess("Account created successfully!");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 py-12">
      <div className="mb-8 flex items-center gap-3">
        <div className="bg-orange-600 p-3 rounded-xl shadow-lg">
          <Utensils className="text-white w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{restaurantName}</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100">
        <div className="flex border-b border-gray-100">
          <button
            className={`flex-1 py-4 text-center font-bold transition-colors ${
              isLogin ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50/30" : "text-gray-500 hover:text-gray-700 bg-gray-50"
            }`}
            onClick={() => { setIsLogin(true); setError(""); setSuccess(""); }}
          >
            Log In
          </button>
          <button
            className={`flex-1 py-4 text-center font-bold transition-colors ${
              !isLogin ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50/30" : "text-gray-500 hover:text-gray-700 bg-gray-50"
            }`}
            onClick={() => { setIsLogin(false); setError(""); setSuccess(""); }}
          >
            Sign Up
          </button>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {isLogin ? "Welcome Back!" : "Create your Account"}
          </h2>

          {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 font-medium text-center border border-red-100">{error}</div>}
          {success && <div className="bg-green-50 text-green-600 p-3 rounded-xl text-sm mb-6 font-medium text-center border border-green-100">{success}</div>}



          <form onSubmit={handleSubmit} className="space-y-5">
            {isLogin ? (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number or Email</label>
                  <input type="text" value={loginId} onChange={(e) => setLoginId(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-900 font-medium bg-white placeholder-gray-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:bg-orange-50/20 transition-all" placeholder="Enter your mobile or email" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-900 font-medium bg-white placeholder-gray-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:bg-orange-50/20 transition-all" placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number *</label>
                  <input type="tel" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-900 font-medium bg-white placeholder-gray-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:bg-orange-50/20 transition-all" placeholder="10-digit mobile number" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-900 font-medium bg-white placeholder-gray-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:bg-orange-50/20 transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email (Optional)</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-900 font-medium bg-white placeholder-gray-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:bg-orange-50/20 transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Set Password *</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-900 font-medium bg-white placeholder-gray-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:bg-orange-50/20 transition-all" placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Terms and Submit */}
            {!isLogin && (
              <label className="flex items-center gap-3 cursor-pointer mt-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <input type="checkbox" required className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                <span className="text-sm text-gray-600 font-medium">I agree to the <span className="text-orange-600 hover:underline">Terms & Conditions</span> and <span className="text-orange-600 hover:underline">Privacy Policy</span></span>
              </label>
            )}

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-orange-200 text-lg mt-6"
            >
              {isLogin ? "Log In to Account" : "Complete Registration"}
            </button>
            
            {/* Social Login for Customer/Login only */}
            <div className="pt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">or continue with</span>
                </div>
              </div>
              <button type="button" onClick={handleGoogleLogin} className="mt-6 w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-900 font-bold py-3 rounded-xl transition-colors shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign in with Google
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center text-sm font-medium text-gray-600">
            {isLogin ? (
              <>Don't have an account? <button onClick={() => {setIsLogin(false); setError(""); setSuccess("");}} className="text-orange-600 hover:underline font-bold">Sign Up for free</button></>
            ) : (
              <>Already have an account? <button onClick={() => {setIsLogin(true); setError(""); setSuccess("");}} className="text-orange-600 hover:underline font-bold">Log In here</button></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
