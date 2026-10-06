"use client";

import { useState } from "react";
import Header from "./Header";
import CustomerSidebar from "./CustomerSidebar";
import GlobalCartModal from "../modals/GlobalCartModal";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <CustomerSidebar 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setIsMobileOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
      <GlobalCartModal />
    </div>
  );
}
