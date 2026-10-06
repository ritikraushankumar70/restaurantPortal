"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Download, Building2, CheckCircle2, Clock, AlertCircle, X, LayoutDashboard, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Payouts() {
  // Dummy data based on screenshot
  const [payouts, setPayouts] = useState([
    { id: "TXN-987654321", date: "01 Oct 2026", amount: 8250, status: "Settled" },
    { id: "TXN-123456789", date: "28 Sep 2026", amount: 15400, status: "Settled" },
    { id: "TXN-456789123", date: "25 Sep 2026", amount: 6120, status: "Settled" },
  ]);

  const [availablePayout, setAvailablePayout] = useState(12450);
  const [isBankLinked, setIsBankLinked] = useState(false); // Toggle to test different states
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequestPayout = () => {
    setIsModalOpen(true);
  };

  const confirmPayout = () => {
    if (availablePayout > 0) {
      // Add new transaction to the top
      const newTxn = {
        id: `TXN-${Math.floor(100000000 + Math.random() * 900000000)}`,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        amount: availablePayout,
        status: "Processing"
      };
      setPayouts([newTxn, ...payouts]);
      setAvailablePayout(0);
      setIsModalOpen(false);
    }
  };

  const downloadCSV = () => {
    const headers = "Date,Transaction ID,Amount,Status\n";
    const csv = payouts.map(t => `"${t.date}",${t.id},₹${t.amount},${t.status}`).join("\n");
    const blob = new Blob([headers + csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recent_payouts.csv`;
    a.click();
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
            <span className="text-gray-900 font-medium">Payouts</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payout Report</h1>
            <p className="text-sm text-gray-500">Manage your earnings, settlements, and bank details.</p>
          </div>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Available for Payout Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-500 mb-2">Available for Payout</div>
              <div className="text-4xl font-bold text-gray-900 mb-6">₹{availablePayout.toLocaleString()}</div>
            </div>
            <button 
              onClick={handleRequestPayout}
              disabled={availablePayout === 0}
              className={`w-full py-3 rounded-xl font-bold transition-colors ${
                availablePayout > 0 
                  ? "bg-[#ff4e00] hover:bg-[#e64600] text-white" 
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Request Payout
            </button>
          </div>

          {/* Linked Bank Account Card */}
          <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="text-[#ff4e00]" size={24} />
              <h2 className="text-lg font-bold text-gray-900">Linked Bank Account</h2>
            </div>
            
            {!isBankLinked ? (
              <div className="bg-[#fff8f3] text-[#d96621] p-4 rounded-xl text-sm font-medium flex items-center justify-between">
                <span>No bank account linked. Please update your bank details in Settings to receive payouts.</span>
                <button 
                  onClick={() => setIsBankLinked(true)} // Just for testing the UI
                  className="px-4 py-1.5 bg-white border border-[#ffdbb8] rounded-lg text-xs hover:bg-orange-50 transition-colors"
                >
                  Mock Link Bank
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-6 p-5 border border-gray-100 rounded-xl">
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">Bank Name</div>
                  <div className="font-semibold text-gray-900">HDFC Bank</div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">Account Number</div>
                  <div className="font-semibold text-gray-900">XXXX XXXX 1234</div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">Status</div>
                  <div className="inline-flex items-center gap-1 text-green-600 text-sm font-medium bg-green-50 px-2 py-0.5 rounded">
                    <CheckCircle2 size={14} /> Verified
                  </div>
                </div>
                <div>
                  <button 
                    onClick={() => setIsBankLinked(false)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Unlink
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Payouts Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-2">
          <div className="p-6 flex justify-between items-center bg-white">
            <h2 className="text-lg font-bold text-gray-900">Recent Payouts</h2>
            <button 
              onClick={downloadCSV}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              <Download size={16} /> Download CSV
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs font-semibold border-b border-gray-100">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payouts.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">{txn.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{txn.id}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">₹{txn.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      {txn.status === 'Settled' ? (
                        <div className="inline-flex items-center gap-1.5 text-green-600 text-sm font-medium">
                          <CheckCircle2 size={16} /> Settled
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 text-orange-500 text-sm font-medium">
                          <Clock size={16} /> Processing
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Request Payout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Request Payout</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 flex flex-col gap-6">
              {!isBankLinked ? (
                <div className="flex flex-col items-center text-center gap-3 py-4">
                  <AlertCircle size={48} className="text-orange-500" />
                  <h3 className="font-bold text-gray-900 text-lg">Bank Account Required</h3>
                  <p className="text-gray-500 text-sm">
                    You cannot request a payout because no bank account is linked. Please update your bank details in Settings first.
                  </p>
                  <button 
                    onClick={() => setIsModalOpen(false)} 
                    className="mt-2 w-full px-4 py-2 rounded-xl border border-gray-200 text-black bg-white font-medium hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                    <p className="text-sm text-gray-500 mb-1">Amount to transfer</p>
                    <p className="text-3xl font-bold text-gray-900">₹{availablePayout.toLocaleString()}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">To Account:</span>
                      <span className="font-medium text-black">HDFC Bank (XXXX 1234)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Estimated Time:</span>
                      <span className="font-medium text-black">1-2 Business Days</span>
                    </div>
                  </div>

                  <div className="mt-2 flex gap-3">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-black bg-white font-medium hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                    <button onClick={confirmPayout} className="flex-1 px-4 py-2 rounded-xl bg-[#ff4e00] text-white font-medium hover:bg-[#e64600] transition-colors">
                      Confirm Transfer
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
