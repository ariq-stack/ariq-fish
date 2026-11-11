"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        if (data.authenticated) {
          setCurrentUser(data.user);
        } else {
          router.push("/login");
        }
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const navItems = [
    { label: "Ringkasan", href: "/dashboard", icon: "dashboard" },
    { label: "Pesanan & Tiket QRIS", href: "/dashboard/orders", icon: "receipt_long" },
    { label: "Manajemen Pengguna", href: "/dashboard/users", icon: "group" },
    { label: "Manajemen Peran", href: "/dashboard/roles", icon: "admin_panel_settings" },
    { label: "Kelola Berita / Warta", href: "/dashboard/news", icon: "newspaper" },
    { label: "Profil & Password", href: "/dashboard/profile", icon: "shield_person" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f2ee] flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#00507d] text-white shrink-0 shadow-lg">
        {/* Brand Bar */}
        <div className="h-20 px-6 flex items-center gap-3 border-b border-[#0369a1]">
          <div className="w-10 h-10 rounded bg-[#f5dad0] text-[#00507d] flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">anchor</span>
          </div>
          <div>
            <span className="font-display font-semibold text-lg block leading-tight">
              {siteConfig.name}
            </span>
            <span className="text-[10px] uppercase font-semibold text-[#cbe4ff] tracking-wider">
              Admin Console
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow p-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-semibold tracking-wide transition-colors ${
                  isActive
                    ? "bg-[#0369a1] text-white shadow-sm"
                    : "text-[#cbe4ff] hover:bg-[#004b74] hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom User Strip */}
        <div className="p-4 border-t border-[#0369a1] bg-[#004b74]/40">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#c5a059] text-[#1d1b19] flex items-center justify-center font-bold text-xs uppercase">
              {currentUser?.name?.substring(0, 2) || "AD"}
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-semibold block truncate">
                {currentUser?.name || "Admin"}
              </span>
              <span className="text-[10px] text-[#cbe4ff] font-mono block truncate">
                {currentUser?.email || "admin@gmail.com"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 text-center py-1.5 rounded bg-[#0369a1] text-white text-[11px] font-medium hover:bg-[#0284c7] transition-colors"
            >
              Lihat Website
            </Link>
            <button
              onClick={handleLogout}
              title="Keluar"
              className="p-1.5 rounded bg-[#93000a] text-white hover:bg-[#ba1a1a] transition-colors"
            >
              <span className="material-symbols-outlined text-base">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Mobile */}
        <header className="md:hidden h-16 bg-[#00507d] text-white px-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="p-1.5 rounded text-white"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <span className="font-display font-semibold text-lg">
              {siteConfig.name} Admin
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs font-medium text-[#cbe4ff] hover:text-white"
          >
            Keluar
          </button>
        </header>

        {/* Mobile Sidebar Dropdown */}
        {mobileSidebarOpen && (
          <div className="md:hidden bg-[#004b74] text-white p-4 space-y-2 border-b border-[#0369a1]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded text-xs font-medium ${
                  pathname === item.href ? "bg-[#0369a1] text-white" : "text-[#cbe4ff]"
                }`}
              >
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="pt-2 border-t border-[#0369a1]/60">
              <Link
                href="/"
                target="_blank"
                className="block text-center py-2 rounded bg-[#0369a1] text-xs font-semibold"
              >
                Lihat Tampilan Website
              </Link>
            </div>
          </div>
        )}

        {/* Dynamic Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

