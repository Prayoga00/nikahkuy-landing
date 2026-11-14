'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface OrderItem {
  id: string;
  invoice: string;
  couple: string;
  phone: string;
  source: string;
  packageType: 'VIP' | 'Premium' | 'Basic';
  packageName: string;
  theme: string;
  total: number;
  totalFormatted: string;
  paymentMethod: string;
  isPaid: boolean;
  status: 'perlu-dikerjakan' | 'menunggu-bukti' | 'sedang-dikerjakan' | 'siap-kirim' | 'selesai';
  statusLabel: string;
  progressPercent?: number;
  date: string;
}

const INITIAL_ORDERS: OrderItem[] = [
  {
    id: '1',
    invoice: '#NK-8821',
    couple: 'Dimas & Anindya',
    phone: '0812-9988-1234',
    source: 'Form Web',
    packageType: 'Premium',
    packageName: 'Paket Premium',
    theme: 'Royal Emerald',
    total: 99000,
    totalFormatted: 'Rp 99.000',
    paymentMethod: 'QRIS Auto',
    isPaid: true,
    status: 'perlu-dikerjakan',
    statusLabel: 'Perlu Dikerjakan',
    date: 'Hari ini, 10:24',
  },
  {
    id: '2',
    invoice: '#NK-8820',
    couple: 'Rian & Clarissa',
    phone: '0821-4433-2211',
    source: 'Via WA',
    packageType: 'VIP',
    packageName: 'Paket VIP',
    theme: 'Jawa Ningrat',
    total: 199000,
    totalFormatted: 'Rp 199.000',
    paymentMethod: 'BCA Manual',
    isPaid: false,
    status: 'menunggu-bukti',
    statusLabel: 'Cek Bukti',
    date: 'Hari ini, 09:12',
  },
  {
    id: '3',
    invoice: '#NK-8819',
    couple: 'Fajar & Nadia',
    phone: '0857-1122-3344',
    source: 'Form Web',
    packageType: 'Premium',
    packageName: 'Paket Premium',
    theme: 'Minimalist Ivory',
    total: 99000,
    totalFormatted: 'Rp 99.000',
    paymentMethod: 'QRIS',
    isPaid: true,
    status: 'sedang-dikerjakan',
    statusLabel: 'Dikerjakan (80%)',
    progressPercent: 80,
    date: 'Kemarin, 16:30',
  },
  {
    id: '4',
    invoice: '#NK-8818',
    couple: 'Kevin & Stephanie',
    phone: '0811-9900-8877',
    source: 'WhatsApp',
    packageType: 'VIP',
    packageName: 'Paket VIP',
    theme: 'Terracotta',
    total: 199000,
    totalFormatted: 'Rp 199.000',
    paymentMethod: 'Mandiri Transfer',
    isPaid: true,
    status: 'siap-kirim',
    statusLabel: 'Siap Kirim Link',
    date: 'Kemarin, 14:15',
  },
  {
    id: '5',
    invoice: '#NK-8815',
    couple: 'Bagus & Tari',
    phone: '0813-7766-5544',
    source: 'Form Web',
    packageType: 'Basic',
    packageName: 'Paket Basic',
    theme: 'Rustic Chic',
    total: 0,
    totalFormatted: 'Gratis',
    paymentMethod: 'Free Tier',
    isPaid: true,
    status: 'selesai',
    statusLabel: 'Selesai',
    date: '2 hari lalu',
  },
];

const WA_TEMPLATES = [
  "Halo Kak Rian & Clarissa, terima kasih telah memesan NikahKuy. Undangan Anda sedang dalam antrean pengerjaan tim atelier kami. Mohon ditunggu tautan preview draft estetikanya...",
  "Halo Kak Rian & Clarissa, pembayaran Anda untuk Paket VIP telah kami verifikasi lunas! Tim kami saat ini mulai menyiapkan tata letak dan audio undangan Anda.",
  "Halo Kak Rian & Clarissa, draf undangan online Anda sudah siap untuk direview! Silakan klik tautan pratinjau berikut untuk memeriksa detail acara."
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState<'all' | 'menunggu-bayar' | 'perlu-dikerjakan' | 'siap-review' | 'selesai'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  
  // Pending receipt widget verification state
  const [isReceiptVerified, setIsReceiptVerified] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // WhatsApp concierge quick template
  const [tplIndex, setTplIndex] = useState(0);

  // Notification menu state
  const [showNotification, setShowNotification] = useState(false);

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((item) => {
      // Tab filter
      if (activeTab === 'menunggu-bayar' && item.status !== 'menunggu-bukti') return false;
      if (activeTab === 'perlu-dikerjakan' && item.status !== 'perlu-dikerjakan') return false;
      if (activeTab === 'siap-review' && item.status !== 'siap-kirim') return false;
      if (activeTab === 'selesai' && item.status !== 'selesai') return false;

      // Status dropdown
      if (selectedStatus && item.status !== selectedStatus) return false;

      // Package dropdown
      if (selectedPackage && item.packageType.toLowerCase() !== selectedPackage.toLowerCase()) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchInvoice = item.invoice.toLowerCase().includes(query);
        const matchCouple = item.couple.toLowerCase().includes(query);
        const matchTheme = item.theme.toLowerCase().includes(query);
        if (!matchInvoice && !matchCouple && !matchTheme) return false;
      }

      return true;
    });
  }, [orders, activeTab, selectedStatus, selectedPackage, searchQuery]);

  const handleVerifyReceipt = () => {
    setIsReceiptVerified(true);
    setOrders((prev) =>
      prev.map((ord) =>
        ord.invoice === '#NK-8820'
          ? {
              ...ord,
              isPaid: true,
              status: 'perlu-dikerjakan',
              statusLabel: 'Perlu Dikerjakan',
            }
          : ord
      )
    );
  };

  const handleNextTemplate = () => {
    setTplIndex((prev) => (prev + 1) % WA_TEMPLATES.length);
  };

  return (
    <div className="bg-[#faf7f2] font-body text-[#1c1c1a] antialiased min-h-screen selection:bg-[#c2ecdb] selection:text-[#0f2922]">
      {/* Left Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-[#f6f3ef]/95 backdrop-blur-md z-50 flex flex-col justify-between border-r border-[#0f2922]/8 shadow-[0_1px_12px_rgba(15,41,34,0.03)] hidden md:flex">
        <div className="flex flex-col">
          {/* Brand Logo Header */}
          <div className="px-6 pt-7 pb-6 flex flex-col gap-1 border-b border-[#0f2922]/6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#0f2922] flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[#ffdea4] text-[18px]">favorite</span>
              </div>
              <span className="font-headline text-xl text-[#0f2922] font-semibold tracking-tight">NikahKuy</span>
            </Link>
            <div className="flex items-center justify-between pl-11">
              <span className="text-[11px] font-semibold text-[#755a24] uppercase tracking-[0.2em]">Atelier Studio</span>
              <span className="px-2 py-0.5 rounded-full bg-[#ffdb99]/70 text-[#795f28] text-[10px] font-semibold tracking-wider uppercase">Portal</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5 px-4 mt-6">
            <Link
              href="/admin/orders"
              className="group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 bg-[#0f2922] text-white font-medium shadow-[0_3px_10px_rgba(15,41,34,0.12)]"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                <span className="text-[14px]">Dashboard &amp; Antrean</span>
              </div>
            </Link>

            <Link
              href="#verifikasi"
              className="group flex items-center justify-between px-4 py-3 rounded-xl text-[#535d58] hover:bg-[#ebe8e4]/80 hover:text-[#1c1c1a] transition-all duration-150"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-[#717975]">verified</span>
                <span className="text-[14px]">Verifikasi Pembayaran</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdb99]/50 text-[#795f28] border border-[#755a24]/20 text-[11px] font-semibold tracking-wide">
                <span className={`w-1.5 h-1.5 rounded-full ${isReceiptVerified ? 'bg-emerald-600' : 'bg-[#755a24] animate-pulse'}`}></span>
                <span>{isReceiptVerified ? '0 Pending' : '4 Menunggu'}</span>
              </span>
            </Link>

            <Link
              href="/admin/builder"
              className="group flex items-center justify-between px-4 py-3 rounded-xl text-[#535d58] hover:bg-[#ebe8e4]/80 hover:text-[#1c1c1a] transition-all duration-150"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-[#717975]">auto_fix_high</span>
                <span className="text-[14px]">Invitation Editor</span>
              </div>
            </Link>

            <Link
              href="/katalog"
              className="group flex items-center justify-between px-4 py-3 rounded-xl text-[#535d58] hover:bg-[#ebe8e4]/80 hover:text-[#1c1c1a] transition-all duration-150"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-[#717975]">palette</span>
                <span className="text-[14px]">Katalog Tema</span>
              </div>
            </Link>

            <Link
              href="#klien"
              className="group flex items-center justify-between px-4 py-3 rounded-xl text-[#535d58] hover:bg-[#ebe8e4]/80 hover:text-[#1c1c1a] transition-all duration-150"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-[#717975]">group</span>
                <span className="text-[14px]">Daftar Klien &amp; Tamu</span>
              </div>
            </Link>

            <Link
              href="#wa-integrasi"
              className="group flex items-center justify-between px-4 py-3 rounded-xl text-[#535d58] hover:bg-[#ebe8e4]/80 hover:text-[#1c1c1a] transition-all duration-150"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-[#717975]">chat</span>
                <span className="text-[14px]">Integrasi WhatsApp</span>
              </div>
            </Link>
          </nav>
        </div>

        {/* User Profile Footer Card */}
        <div className="p-4 m-4 rounded-2xl bg-white border border-[#0f2922]/8 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-[#0f2922]/10 flex items-center justify-center text-[#0f2922] font-medium">
                <span className="material-symbols-outlined text-[20px]">person</span>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[13px] font-semibold truncate text-[#1c1c1a] leading-tight">Bagas Pratama</span>
              <span className="text-[11px] text-[#535d58] truncate">Lead Concierge</span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#f0edea] flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>Aktif
            </span>
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#ba1a1a] hover:text-[#ba1a1a]/80 transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">logout</span>Keluar
            </Link>
          </div>
        </div>
      </aside>

      {/* Main View Area */}
      <div className="md:pl-72">
        {/* Top Header Bar */}
        <header className="fixed top-0 left-0 md:left-72 right-0 h-16 bg-[#faf7f2]/85 backdrop-blur-md border-b border-[#0f2922]/8 z-40 flex items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[13px] text-[#535d58]">
              <span className="text-[#717975]">Atelier Admin</span>
              <span className="material-symbols-outlined text-[13px] text-[#c1c8c3]">chevron_right</span>
              <span className="text-[#0f2922] font-medium">Manajemen Pesanan</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative w-48 sm:w-80">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#717975] text-[18px]">search</span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-4 rounded-xl bg-white border border-[#0f2922]/8 text-[#1c1c1a] placeholder:text-[#717975] text-[13px] outline-none shadow-none focus:border-[#0f2922] focus:ring-1 focus:ring-[#0f2922] transition-all"
                placeholder="Cari invoice, calon pengantin..."
                type="text"
              />
            </div>

            {/* Notification Menu */}
            <div className="relative">
              <button
                onClick={() => setShowNotification(!showNotification)}
                aria-label="Notifikasi"
                className="relative p-2 rounded-xl text-[#535d58] hover:bg-[#ebe8e4] hover:text-[#1c1c1a] transition-all flex items-center justify-center"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#755a24] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#755a24]"></span>
                </span>
              </button>

              {showNotification && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-white border border-[#0f2922]/8 shadow-lg p-4 z-50 flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#0f2922]/6">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[17px] text-[#755a24]">notifications_active</span>
                      <span className="text-[13px] font-semibold text-[#0f2922] font-headline">Pemberitahuan</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#ffdb99]/60 text-[#755a24] text-[10px] font-semibold tracking-wide">3 Baru</span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <div className="p-2.5 rounded-xl bg-[#ffdb99]/15 border border-[#755a24]/20 flex flex-col gap-1 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-[#755a24] uppercase tracking-wider">Verifikasi Pembayaran</span>
                        <span className="text-[10px] text-[#717975]">8 mnt lalu</span>
                      </div>
                      <p className="text-[12px] text-[#1c1c1a] font-medium leading-snug">3 bukti transfer baru menunggu verifikasi admin.</p>
                      <span className="text-[11px] text-[#535d58]">#NK-8820 • Clarissa Wijaya (Rp 199.000)</span>
                    </div>
                    <div className="p-2 rounded-xl hover:bg-[#f6f3ef] transition-colors flex items-start gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0"></div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[12px] text-[#1c1c1a] leading-tight font-medium">Auto-approve invoice #NK-8821 berhasil diproses</span>
                        <span className="text-[10px] text-[#717975] mt-0.5">24 menit lalu</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowNotification(false)}
                    className="pt-2 border-t border-[#0f2922]/6 text-center text-[12px] font-medium text-[#755a24] hover:underline flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">verified</span>Tutup Notifikasi
                  </button>
                </div>
              )}
            </div>

            <Link
              href="/admin/builder"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0f2922] text-white text-[13px] font-medium hover:bg-[#20463a] transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span className="hidden sm:inline">+ Pesanan Baru</span>
            </Link>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="relative pt-20 w-full min-h-screen bg-[#faf7f2] px-4 sm:px-8 py-8">
          <div className="flex flex-col w-full gap-8 pb-12 max-w-[1440px] mx-auto">
            {/* 1. Refined Minimalist Header Banner */}
            <section className="rounded-2xl bg-white border border-[#0f2922]/8 shadow-sm p-6 sm:p-7">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex flex-col gap-1.5">
                  <div className="inline-flex items-center gap-2 mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span className="text-[11px] font-semibold text-[#755a24] uppercase tracking-widest">Atelier Concierge</span>
                  </div>
                  <h1 className="font-headline text-2xl lg:text-3xl text-[#0f2922] font-semibold tracking-tight">
                    Manajemen Pesanan
                  </h1>
                  <p className="text-[14px] text-[#535d58]">
                    Pantau antrean pesanan, verifikasi pembayaran, dan status undangan aktif.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => alert('Mengunduh rekapan pesanan format CSV...')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f6f3ef] text-[#1c1c1a] text-[13px] font-medium hover:bg-[#ebe8e4] border border-[#0f2922]/8 transition-colors shadow-none"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[17px] text-[#755a24]">download</span>
                    <span>Ekspor CSV</span>
                  </button>
                  <Link
                    href="/order"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0f2922] text-white text-[13px] font-medium hover:bg-[#20463a] transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    <span>+ Input Manual</span>
                  </Link>
                </div>
              </div>

              {/* Quick Filter Status Pills */}
              <div className="mt-6 pt-5 border-t border-[#0f2922]/6 flex items-center gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap flex items-center gap-2 transition-all ${
                    activeTab === 'all'
                      ? 'bg-[#0f2922] text-white'
                      : 'bg-[#f6f3ef] text-[#535d58] hover:bg-[#ebe8e4] border border-[#0f2922]/6'
                  }`}
                  type="button"
                >
                  <span>Semua Pesanan</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[11px] ${activeTab === 'all' ? 'bg-white/20 text-white' : 'bg-[#e5e2de] text-[#1c1c1a]'}`}>
                    {orders.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('menunggu-bayar')}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap flex items-center gap-2 transition-all ${
                    activeTab === 'menunggu-bayar'
                      ? 'bg-[#0f2922] text-white'
                      : 'bg-[#f6f3ef] text-[#535d58] hover:bg-[#ebe8e4] border border-[#0f2922]/6'
                  }`}
                  type="button"
                >
                  <span>Menunggu Bayar</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#ffdb99]/60 text-[#795f28] text-[11px] font-semibold">
                    {orders.filter((o) => o.status === 'menunggu-bukti').length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('perlu-dikerjakan')}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap flex items-center gap-2 transition-all ${
                    activeTab === 'perlu-dikerjakan'
                      ? 'bg-[#0f2922] text-white'
                      : 'bg-[#f6f3ef] text-[#535d58] hover:bg-[#ebe8e4] border border-[#0f2922]/6'
                  }`}
                  type="button"
                >
                  <span>Perlu Dikerjakan</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#c2ecdb]/80 text-[#0f2922] text-[11px] font-semibold">
                    {orders.filter((o) => o.status === 'perlu-dikerjakan').length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('siap-review')}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap flex items-center gap-2 transition-all ${
                    activeTab === 'siap-review'
                      ? 'bg-[#0f2922] text-white'
                      : 'bg-[#f6f3ef] text-[#535d58] hover:bg-[#ebe8e4] border border-[#0f2922]/6'
                  }`}
                  type="button"
                >
                  <span>Siap Kirim Link</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#ebe8e4] text-[#1c1c1a] text-[11px] font-semibold">
                    {orders.filter((o) => o.status === 'siap-kirim').length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('selesai')}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap flex items-center gap-2 transition-all ${
                    activeTab === 'selesai'
                      ? 'bg-[#0f2922] text-white'
                      : 'bg-[#f6f3ef] text-[#535d58] hover:bg-[#ebe8e4] border border-[#0f2922]/6'
                  }`}
                  type="button"
                >
                  <span>Selesai &amp; Publish</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#ebe8e4] text-[#1c1c1a] text-[11px] font-semibold">
                    {orders.filter((o) => o.status === 'selesai').length}
                  </span>
                </button>
              </div>
            </section>

            {/* 2. Balanced Stat Metric Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {/* Card 1 */}
              <div className="rounded-2xl bg-white p-6 border border-[#0f2922]/8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] font-semibold text-[#717975] uppercase tracking-wider">Pesanan Hari Ini</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline text-3xl text-[#0f2922] font-semibold">18</span>
                      <span className="text-[13px] text-[#535d58]">pesanan</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#0f2922]/5 flex items-center justify-center text-[#0f2922]">
                    <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                  </div>
                </div>
                <div className="mt-4 pt-3.5 flex items-center justify-between border-t border-[#0f2922]/6 text-[12px]">
                  <span className="inline-flex items-center gap-1 font-medium text-emerald-800">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span> +12% kemarin
                  </span>
                  <span className="text-[#717975]">Target: 20</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl bg-white p-6 border border-[#0f2922]/8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] font-semibold text-[#717975] uppercase tracking-wider">Verifikasi Bayar</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline text-3xl text-[#755a24] font-semibold">{isReceiptVerified ? '0' : '1'}</span>
                      <span className="text-[13px] text-[#535d58]">invoice</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#ffdb99]/40 flex items-center justify-center text-[#755a24]">
                    <span className="material-symbols-outlined text-[20px]">pending_actions</span>
                  </div>
                </div>
                <div className="mt-4 pt-3.5 flex items-center justify-between border-t border-[#0f2922]/6 text-[12px]">
                  <span className="px-2 py-0.5 rounded-full bg-[#ffdb99]/50 text-[#755a24] text-[11px] font-semibold">
                    {isReceiptVerified ? 'Rp 0' : 'Rp 199.000'}
                  </span>
                  <span className="text-[#717975]">Manual Transfer</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl bg-white p-6 border border-[#0f2922]/8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] font-semibold text-[#717975] uppercase tracking-wider">Dalam Pengerjaan</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline text-3xl text-[#0f2922] font-semibold">14</span>
                      <span className="text-[13px] text-[#535d58]">desain</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#20463a]/10 flex items-center justify-center text-[#0f2922]">
                    <span className="material-symbols-outlined text-[20px]">draw</span>
                  </div>
                </div>
                <div className="mt-4 pt-3.5 flex items-center justify-between border-t border-[#0f2922]/6 text-[12px]">
                  <div className="flex items-center gap-2">
                    <div className="w-14 h-1.5 rounded-full bg-[#ebe8e4] overflow-hidden">
                      <div className="h-full bg-[#0f2922] rounded-full" style={{ width: '72%' }}></div>
                    </div>
                    <span className="text-[11px] text-[#535d58]">SLA &lt; 4 Jam</span>
                  </div>
                  <span className="text-[11px] text-[#0f2922] font-medium">4 Tim Aktif</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="rounded-2xl bg-white p-6 border border-[#0f2922]/8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] font-semibold text-[#717975] uppercase tracking-wider">Undangan Aktif</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline text-3xl text-[#0f2922] font-semibold">1.420</span>
                      <span className="text-[13px] text-[#535d58]">tautan</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#ebe8e4] flex items-center justify-center text-[#0f2922]">
                    <span className="material-symbols-outlined text-[20px]">public</span>
                  </div>
                </div>
                <div className="mt-4 pt-3.5 flex items-center justify-between border-t border-[#0f2922]/6 text-[12px]">
                  <span className="text-[11px] text-[#535d58]">Konfirmasi RSVP</span>
                  <span className="text-[11px] text-[#755a24] font-semibold">94.2% Sukses</span>
                </div>
              </div>
            </section>

            {/* 3. Dual Columns Workflow */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Order Queue (65% ~ 8 cols) */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="rounded-2xl bg-white border border-[#0f2922]/8 shadow-sm p-6 sm:p-7 flex flex-col gap-5">
                  {/* Header & Action Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-0.5">
                      <h2 className="font-headline text-xl text-[#0f2922] font-semibold">
                        Antrean Pesanan &amp; Status
                      </h2>
                      <span className="text-[13px] text-[#535d58]">Daftar transaksi dan tahap produksi undangan saat ini</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedStatus('');
                          setSelectedPackage('');
                          setSearchQuery('');
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f6f3ef] text-[#1c1c1a] text-[12px] font-medium border border-[#0f2922]/8 hover:bg-[#ebe8e4] transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px] text-[#717975]">refresh</span>
                        <span>Reset</span>
                      </button>
                    </div>
                  </div>

                  {/* Filter Inputs with Balanced Heights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#717975] text-[17px]">search</span>
                      <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-9 pl-9 pr-3 rounded-xl bg-[#f6f3ef] border border-[#0f2922]/6 text-[13px] text-[#1c1c1a] placeholder:text-[#717975] outline-none focus:border-[#0f2922] focus:ring-1 focus:ring-[#0f2922] transition-all"
                        placeholder="Cari nama mempelai..."
                        type="text"
                      />
                    </div>
                    <div className="relative">
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full h-9 px-3 rounded-xl bg-[#f6f3ef] border border-[#0f2922]/6 text-[13px] text-[#1c1c1a] outline-none focus:border-[#0f2922] focus:ring-1 focus:ring-[#0f2922] appearance-none cursor-pointer"
                      >
                        <option value="">Semua Status</option>
                        <option value="perlu-dikerjakan">Perlu Dikerjakan</option>
                        <option value="sedang-dikerjakan">Sedang Dikerjakan</option>
                        <option value="menunggu-bukti">Menunggu Verifikasi</option>
                        <option value="siap-kirim">Siap Kirim Link</option>
                        <option value="selesai">Selesai &amp; Publish</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[#717975] text-[16px] pointer-events-none">expand_more</span>
                    </div>
                    <div className="relative">
                      <select
                        value={selectedPackage}
                        onChange={(e) => setSelectedPackage(e.target.value)}
                        className="w-full h-9 px-3 rounded-xl bg-[#f6f3ef] border border-[#0f2922]/6 text-[13px] text-[#1c1c1a] outline-none focus:border-[#0f2922] focus:ring-1 focus:ring-[#0f2922] appearance-none cursor-pointer"
                      >
                        <option value="">Semua Paket</option>
                        <option value="vip">VIP Exclusive (199rb)</option>
                        <option value="premium">Premium Atelier (99rb)</option>
                        <option value="basic">Basic Tier (Free)</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[#717975] text-[16px] pointer-events-none">expand_more</span>
                    </div>
                  </div>

                  {/* Refined Minimalist Table */}
                  <div className="overflow-x-auto -mx-6 sm:-mx-7">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="border-y border-[#0f2922]/8 bg-[#f6f3ef]/50 text-[11px] font-semibold text-[#717975] uppercase tracking-wider">
                          <th className="py-3 px-6">ID Invoice</th>
                          <th className="py-3 px-4">Calon Pengantin</th>
                          <th className="py-3 px-4">Paket &amp; Tema</th>
                          <th className="py-3 px-4">Total</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-6 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#0f2922]/6 text-[13px]">
                        {filteredOrders.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-[#717975]">
                              Tidak ada pesanan yang sesuai dengan filter.
                            </td>
                          </tr>
                        ) : (
                          filteredOrders.map((ord) => (
                            <tr
                              key={ord.id}
                              className={`hover:bg-[#f6f3ef]/50 transition-colors ${
                                ord.status === 'menunggu-bukti' ? 'bg-[#ffdb99]/10' : ''
                              }`}
                            >
                              <td className="py-4 px-6 font-semibold text-[#0f2922]">{ord.invoice}</td>
                              <td className="py-4 px-4">
                                <div className="flex flex-col">
                                  <span className="font-medium text-[#1c1c1a]">{ord.couple}</span>
                                  <span className="text-[12px] text-[#717975]">
                                    {ord.phone} • {ord.source}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex flex-col">
                                  <span className="font-medium text-[#1c1c1a]">{ord.packageName}</span>
                                  <span className="text-[11px] text-[#755a24] font-medium">{ord.theme}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex flex-col">
                                  <span className="font-semibold text-[#0f2922]">{ord.totalFormatted}</span>
                                  <span
                                    className={`text-[11px] font-medium ${
                                      ord.isPaid ? 'text-emerald-700' : 'text-[#755a24]'
                                    }`}
                                  >
                                    {ord.isPaid ? 'Lunas' : ord.paymentMethod}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                {ord.status === 'perlu-dikerjakan' && (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#c2ecdb]/60 text-[#0f2922] text-[11px] font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#0f2922]"></span>
                                    Perlu Dikerjakan
                                  </span>
                                )}

                                {ord.status === 'menunggu-bukti' && (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ffdb99] text-[#795f28] text-[11px] font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#755a24]"></span>
                                    Cek Bukti
                                  </span>
                                )}

                                {ord.status === 'sedang-dikerjakan' && (
                                  <div className="flex flex-col gap-1">
                                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#1c1c1a]">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#0f2922] animate-pulse"></span>
                                      Dikerjakan ({ord.progressPercent}%)
                                    </span>
                                    <div className="w-20 h-1 bg-[#ebe8e4] rounded-full overflow-hidden">
                                      <div
                                        className="bg-[#0f2922] h-full rounded-full"
                                        style={{ width: `${ord.progressPercent}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                )}

                                {ord.status === 'siap-kirim' && (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ffdad8]/60 text-[#42201f] text-[11px] font-medium">
                                    <span className="material-symbols-outlined text-[13px]">send</span>
                                    Siap Kirim Link
                                  </span>
                                )}

                                {ord.status === 'selesai' && (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f0edea] text-[#535d58] text-[11px] font-medium">
                                    <span className="material-symbols-outlined text-[13px] text-emerald-700">check_circle</span>
                                    Selesai
                                  </span>
                                )}
                              </td>
                              <td className="py-4 px-6 text-right">
                                {ord.status === 'perlu-dikerjakan' && (
                                  <Link
                                    href="/admin/builder"
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0f2922] text-white text-[12px] font-medium hover:bg-[#20463a] transition-colors"
                                  >
                                    <span>Buka Editor</span>
                                    <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                                  </Link>
                                )}

                                {ord.status === 'menunggu-bukti' && (
                                  <button
                                    onClick={() => setIsZoomOpen(true)}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#755a24] text-white text-[12px] font-medium hover:opacity-90 transition-opacity"
                                    type="button"
                                  >
                                    <span className="material-symbols-outlined text-[15px]">verified</span>
                                    <span>Cek Bukti</span>
                                  </button>
                                )}

                                {ord.status === 'sedang-dikerjakan' && (
                                  <Link
                                    href="/admin/builder"
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#f0edea] text-[#1c1c1a] text-[12px] font-medium hover:bg-[#ebe8e4] transition-colors"
                                  >
                                    <span className="material-symbols-outlined text-[15px]">edit</span>
                                    <span>Lanjutkan</span>
                                  </Link>
                                )}

                                {ord.status === 'siap-kirim' && (
                                  <button
                                    onClick={() =>
                                      alert(`Membuka dialog kirim pesan WhatsApp ke ${ord.couple} (${ord.phone})`)
                                    }
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#20463a] text-white text-[12px] font-medium hover:bg-[#0f2922] transition-colors"
                                    type="button"
                                  >
                                    <span className="material-symbols-outlined text-[15px] text-[#c2ecdb]">send</span>
                                    <span>Kirim WA</span>
                                  </button>
                                )}

                                {ord.status === 'selesai' && (
                                  <Link
                                    href="/"
                                    target="_blank"
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-[#0f2922] hover:bg-[#f0edea] text-[12px] font-medium transition-colors"
                                  >
                                    <span>Lihat</span>
                                    <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                                  </Link>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination / Minimalist Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#0f2922]/6 text-[12px] text-[#535d58]">
                    <span>Menampilkan {filteredOrders.length} dari 128 pesanan</span>
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1 rounded-lg bg-[#f6f3ef] text-[#535d58] border border-[#0f2922]/6 disabled:opacity-40"
                        disabled
                      >
                        <span className="material-symbols-outlined text-[17px]">chevron_left</span>
                      </button>
                      <span className="text-[12px] text-[#0f2922] font-medium px-2">Halaman 1 dari 26</span>
                      <button className="p-1 rounded-lg bg-[#f6f3ef] text-[#535d58] border border-[#0f2922]/6 hover:bg-[#ebe8e4] transition-colors">
                        <span className="material-symbols-outlined text-[17px]">chevron_right</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Verification & Concierge Widgets (35% ~ 4 cols) */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {/* Widget 1: Verifikasi Bukti Transfer */}
                <div className="rounded-2xl bg-white border border-[#0f2922]/8 shadow-sm p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#755a24] text-[20px]">payments</span>
                      <h3 className="font-headline text-lg text-[#0f2922] font-semibold">Verifikasi Pembayaran</h3>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold tracking-wide ${
                        isReceiptVerified
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-[#ffdb99]/60 text-[#795f28] border-[#755a24]/20'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${isReceiptVerified ? 'bg-emerald-600' : 'bg-[#755a24]'}`}
                      ></span>
                      {isReceiptVerified ? '0 Pending' : '1 Pending'}
                    </span>
                  </div>

                  <div className="px-3 py-2 rounded-xl bg-[#ffdb99]/20 border border-[#755a24]/25 flex items-center gap-2.5 text-[12px] text-[#1c1c1a]">
                    <span className="material-symbols-outlined text-[#755a24] text-[18px] flex-shrink-0">
                      hourglass_top
                    </span>
                    <span className="leading-tight text-[11px] text-[#535d58]">
                      <strong className="font-semibold text-[#755a24]">BCA Transfer</strong> • Diunggah 8 mnt lalu
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#f6f3ef] border border-[#0f2922]/6 flex flex-col gap-3.5">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-[#755a24] uppercase tracking-wider">
                            Verifikasi Bayar
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-[#ebe8e4] text-[#535d58] text-[10px] font-medium">
                            Paket VIP
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-xl font-headline font-semibold text-[#0f2922]">Rp 199.000</span>
                          <span
                            className={`text-[11px] font-medium px-1.5 py-0.5 rounded-full ${
                              isReceiptVerified
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-[#ffdb99]/40 text-[#755a24]'
                            }`}
                          >
                            {isReceiptVerified ? 'Lunas Terverifikasi' : 'Perlu Cek'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[12px] text-[#535d58] mt-0.5">
                          <span className="material-symbols-outlined text-[14px] text-[#717975]">account_balance</span>
                          <span>BCA • a/n Clarissa Wijaya</span>
                        </div>
                      </div>
                      <span className="text-[11px] text-[#717975] bg-white border border-[#0f2922]/6 px-2 py-0.5 rounded-md font-medium">
                        8 mnt lalu
                      </span>
                    </div>

                    <div
                      onClick={() => setIsZoomOpen(true)}
                      className="relative group rounded-xl overflow-hidden aspect-[16/10] bg-[#e5e2de] flex items-center justify-center border border-[#0f2922]/6 cursor-pointer"
                    >
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        alt="Bukti transfer m-banking pembayaran pesanan NikahKuy"
                        src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80"
                      />
                      <div className="absolute inset-0 bg-[#0f2922]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#0f2922] text-[12px] font-medium shadow-md">
                          <span className="material-symbols-outlined text-[15px]">zoom_in</span>Perbesar Bukti
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-0.5">
                      <button
                        onClick={handleVerifyReceipt}
                        disabled={isReceiptVerified}
                        className={`w-full py-2.5 px-4 rounded-xl text-[13px] font-medium transition-all flex items-center justify-center gap-2 shadow-sm ${
                          isReceiptVerified
                            ? 'bg-emerald-800 text-white opacity-80 cursor-default'
                            : 'bg-[#0f2922] text-white hover:bg-[#20463a]'
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[17px] text-[#c2ecdb]">verified_user</span>
                        <span>{isReceiptVerified ? 'Sudah Diverifikasi Lunas' : 'Konfirmasi Lunas'}</span>
                      </button>

                      <button
                        onClick={() =>
                          alert('Permintaan kirim ulang bukti bayar telah diteruskan ke WhatsApp klien.')
                        }
                        className="w-full py-2 px-4 rounded-xl bg-[#ebe8e4] text-[#1c1c1a] text-[12px] font-medium hover:bg-[#e5e2de] transition-colors flex items-center justify-center gap-1.5 border border-[#0f2922]/6"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[15px] text-[#755a24]">sms_failed</span>
                        <span>Minta Ulang Bukti</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Widget 2: WhatsApp Concierge */}
                <div className="rounded-2xl bg-white border border-[#0f2922]/8 shadow-sm p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#0f2922] text-[20px]">chat</span>
                      <h3 className="font-headline text-lg text-[#0f2922] font-semibold">WhatsApp Concierge</h3>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span> Ready
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-semibold text-[#717975] uppercase tracking-wider">
                        Tujuan Klien
                      </label>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f6f3ef] border border-[#0f2922]/6">
                        <span className="material-symbols-outlined text-[#717975] text-[17px]">account_circle</span>
                        <span className="text-[13px] font-medium text-[#1c1c1a]">Rian &amp; Clarissa</span>
                        <span className="text-[12px] text-[#717975] ml-auto">0821-4433-2211</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-semibold text-[#717975] uppercase tracking-wider">
                          Template Balasan
                        </label>
                        <button
                          type="button"
                          onClick={handleNextTemplate}
                          className="text-[11px] text-[#755a24] hover:underline"
                        >
                          Ganti ({tplIndex + 1}/{WA_TEMPLATES.length})
                        </button>
                      </div>
                      <div className="p-3 rounded-xl bg-[#f6f3ef] border-l-4 border-[#0f2922] text-[12px] text-[#1c1c1a] leading-relaxed border border-r-[#0f2922]/6 border-y-[#0f2922]/6">
                        “{WA_TEMPLATES[tplIndex]}”
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/6282144332211?text=${encodeURIComponent(WA_TEMPLATES[tplIndex])}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 w-full py-2.5 px-4 rounded-xl bg-[#0f2922] text-white text-[13px] font-medium hover:bg-[#20463a] transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[17px] text-[#ffdb99]">open_in_new</span>
                      <span>Buka WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Widget 3: Aktivitas Tim & Audit Log */}
                <div className="rounded-2xl bg-white border border-[#0f2922]/8 shadow-sm p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#717975] text-[18px]">history</span>
                      <h3 className="font-headline text-lg text-[#0f2922] font-semibold">Aktivitas Tim</h3>
                    </div>
                    <a className="text-[12px] text-[#755a24] hover:underline" href="#">
                      Lihat Semua
                    </a>
                  </div>
                  <div className="flex flex-col gap-4 relative before:absolute before:top-2 before:bottom-2 before:left-[13px] before:w-[1px] before:bg-[#f0edea]">
                    {/* Log 1 */}
                    <div className="flex items-start gap-3 relative">
                      <div className="w-7 h-7 rounded-full bg-[#c2ecdb]/80 flex items-center justify-center flex-shrink-0 z-10 text-[#0f2922]">
                        <span className="material-symbols-outlined text-[14px]">publish</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[12px] text-[#1c1c1a]">
                          <strong className="font-semibold text-[#0f2922]">Admin Sarah</strong> mempublikasikan{' '}
                          <span className="italic text-[#755a24] font-medium">nikahkuy.com/dimas-anindya</span>
                        </span>
                        <span className="text-[11px] text-[#717975]">12 menit yang lalu</span>
                      </div>
                    </div>

                    {/* Log 2 */}
                    <div className="flex items-start gap-3 relative">
                      <div className="w-7 h-7 rounded-full bg-[#ffdb99]/60 flex items-center justify-center flex-shrink-0 z-10 text-[#755a24]">
                        <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[12px] text-[#1c1c1a]">
                          Auto-approve invoice <strong className="font-semibold text-[#0f2922]">#NK-8821</strong> via QRIS
                        </span>
                        <span className="text-[11px] text-[#717975]">24 menit yang lalu</span>
                      </div>
                    </div>

                    {/* Log 3 */}
                    <div className="flex items-start gap-3 relative">
                      <div className="w-7 h-7 rounded-full bg-[#f0edea] flex items-center justify-center flex-shrink-0 z-10 text-[#535d58]">
                        <span className="material-symbols-outlined text-[14px]">edit_note</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[12px] text-[#1c1c1a]">
                          <strong className="font-semibold text-[#0f2922]">Bagas Pratama</strong> memperbarui layout Akad #NK-8819
                        </span>
                        <span className="text-[11px] text-[#717975]">1 jam yang lalu</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Modal Zoom Bukti Transfer */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-[#0f2922]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-6 border border-[#0f2922]/10">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0edea] mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#755a24] text-[20px]">verified</span>
                <h3 className="font-headline text-lg font-semibold text-[#0f2922]">Bukti Transfer #NK-8820</h3>
              </div>
              <button
                onClick={() => setIsZoomOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f0edea] flex items-center justify-center text-[#1c1c1a] hover:bg-[#ebe8e4] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#ebe8e4] mb-4">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80"
                alt="Detail Bukti Transfer"
              />
            </div>
            <div className="flex items-center justify-between text-[13px] text-[#535d58] mb-4">
              <span>
                Pengirim: <strong>Clarissa Wijaya</strong>
              </span>
              <span>
                Nominal: <strong className="text-[#0f2922] font-headline text-base">Rp 199.000</strong>
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  handleVerifyReceipt();
                  setIsZoomOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#0f2922] text-white text-[13px] font-medium hover:bg-[#20463a] transition-all"
              >
                Verifikasi &amp; Konfirmasi Lunas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
