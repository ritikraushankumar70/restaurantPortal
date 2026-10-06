"use client";

import { useState } from "react";
import { Eye, EyeOff, ShieldCheck, Lock, AlertCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function AdminLoginPage() {
  // Steps: 1 = Login, 2 = OTP Verification, 3 = Forgot Password (optional flow)
  const [step, setStep] = useState<1 | 2>(1);
  
  // Form State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  
  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [adminId, setAdminId] = useState<number | null>(null);
  
  const router = useRouter();
  const { loginAdmin } = useAdminAuth();

  // Handle Initial Login (Email/Password)
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!username || !password) {
      setError("Please enter both username/email and password.");
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        // Success - Move to OTP
        setAdminId(data.adminId);
        setStep(2);
      }
    } catch (err: any) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP Verification
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    setError("");

    if (enteredOtp.length < 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await fetch('/api/admin/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, otp: enteredOtp, adminId })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "OTP verification failed");
      } else {
        // Success - Redirect
        loginAdmin();
      }
    } catch (err: any) {
      setError("An error occurred verifying OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple chars
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Auto-focus previous input on backspace
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col justify-center items-center p-4 selection:bg-orange-500/30">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-white p-4 rounded-full inline-flex mb-4 shadow-sm border border-slate-100">
            {step === 1 ? (
              <ShieldCheck className="text-[#ff5a00] w-10 h-10" />
            ) : (
              <Lock className="text-[#ff5a00] w-10 h-10" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Portal</h1>
          <p className="text-slate-500 mt-2">
            {step === 1 ? "Secure access for restaurant management" : "Two-factor authentication required"}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-slate-100">
          <div className="p-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm mb-6 font-medium flex items-start gap-2">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email / Phone / Username</label>
                  <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 font-medium bg-white placeholder-slate-400 outline-none focus:border-[#ff5a00] focus:ring-1 focus:ring-[#ff5a00] transition-all" 
                    placeholder="Enter your admin id" 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-semibold text-slate-700">Password</label>
                    <button type="button" className="text-xs text-[#ff5a00] hover:text-[#e04f00] font-medium transition-colors">
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 font-medium bg-white placeholder-slate-400 outline-none focus:border-[#ff5a00] focus:ring-1 focus:ring-[#ff5a00] transition-all" 
                      placeholder="••••••••" 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#ff5a00] focus:ring-[#ff5a00] focus:ring-offset-white bg-white accent-[#ff5a00]" 
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-slate-500 cursor-pointer select-none">
                    Remember me for 30 days
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#ff5a00] hover:bg-[#e04f00] disabled:bg-[#ff5a00]/50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(255,90,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,90,0,0.23)] hover:-translate-y-[1px] text-lg mt-2 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>Login <ArrowRight size={20} /></>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-6 text-center">
                <p className="text-sm text-slate-500 mb-6">
                  We've sent a 6-digit OTP to your registered device. Please enter it below to securely log in.
                </p>
                
                <div className="flex justify-center gap-2 sm:gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl border border-slate-300 text-slate-900 bg-white outline-none focus:border-[#ff5a00] focus:ring-1 focus:ring-[#ff5a00] transition-all shadow-sm"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#ff5a00] hover:bg-[#e04f00] disabled:bg-[#ff5a00]/50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(255,90,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,90,0,0.23)] hover:-translate-y-[1px] text-lg mt-4 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    "Verify & Access Dashboard"
                  )}
                </button>

                <div className="text-sm text-slate-500 mt-4">
                  Didn't receive the code?{" "}
                  <button type="button" className="text-[#ff5a00] hover:text-[#e04f00] font-medium">
                    Resend OTP
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm font-medium text-slate-400">
          Secure Restaurant Management System
        </div>
      </div>
    </div>
  );
}
