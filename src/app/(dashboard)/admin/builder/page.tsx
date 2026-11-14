'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminBuilderPage() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'mempelai' | 'acara' | 'galeri' | 'slug'>('mempelai');

  // Slug State
  const [slug, setSlug] = useState('rian-clarissa');
  const [copiedLink, setCopiedLink] = useState(false);

  // Bride State
  const [brideName, setBrideName] = useState('Clarissa Wijaya, S.Farm');
  const [brideNick, setBrideNick] = useState('Clarissa');
  const [brideIg, setBrideIg] = useState('clarissawjy');
  const [brideParents, setBrideParents] = useState('Putri kedua dari Bpk. Hendra Wijaya & Ibu Ratna Dewi');

  // Groom State
  const [groomName, setGroomName] = useState('Rian Pratama, S.T.');
  const [groomNick, setGroomNick] = useState('Rian');
  const [groomIg, setGroomIg] = useState('rianpratama');
  const [groomParents, setGroomParents] = useState('Putra pertama dari Bpk. Bambang Irawan & Ibu Siti Aminah');

  // Events State
  const [akadDate, setAkadDate] = useState('Sabtu, 28 November 2026');
  const [akadTime, setAkadTime] = useState('08.00 - 10.00 WIB');
  const [akadVenue, setAkadVenue] = useState('Masjid Raya Al-Ikhlas, Jakarta Selatan');

  const [resepsiDate, setResepsiDate] = useState('Sabtu, 28 November 2026');
  const [resepsiTime, setResepsiTime] = useState('11.00 - 14.00 WIB');
  const [resepsiVenue, setResepsiVenue] = useState('The Glass House Ballroom, Senayan, Jakarta Pusat');

  // Interactive Modules Toggles
  const [rsvpEnabled, setRsvpEnabled] = useState(true);
  const [envelopeEnabled, setEnvelopeEnabled] = useState(true);
  const [storyEnabled, setStoryEnabled] = useState(true);
  const [countdownEnabled, setCountdownEnabled] = useState(true);

  // Publishing State
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Countdown timer inside mobile phone preview
  const [timeLeft, setTimeLeft] = useState({ days: 42, hours: 14, mins: 38, secs: 20 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    setSlug(clean);
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(`https://nikahkuy.com/${slug}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsPublished(true);
      setTimeout(() => setIsPublished(false), 3000);
    }, 900);
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Draf undangan berhasil disimpan!');
    }, 500);
  };

  const waMessage = `Halo Kak ${groomNick} & ${brideNick}, undangan pernikahan digital Anda telah selesai diterbitkan oleh tim NikahKuy Atelier. Tautan resmi Anda: https://nikahkuy.com/${slug}`;

  return (
    <div className="bg-[#fcf9f5] font-body text-[#1c1c1a] antialiased min-h-screen">
      {/* Left Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-screen w-60 bg-[#f6f3ef] z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] hidden md:flex">
        <div className="flex flex-col">
          {/* Brand Header */}
          <div className="h-16 px-6 flex items-center gap-2 border-b border-[#063025]/5">
            <div className="w-8 h-8 rounded-lg bg-[#20463a] flex items-center justify-center text-white font-headline text-lg font-bold">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-lg text-[#063025] tracking-tight leading-none font-bold">
                NikahKuy
              </span>
              <span className="text-[10px] text-[#755a24] uppercase tracking-widest leading-none mt-1 font-semibold">
                Admin Suite
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-3">
            <p className="px-2 py-1 text-[11px] text-[#414845] uppercase tracking-wider font-bold">Manajemen</p>
            <nav className="mt-1 flex flex-col gap-1">
              <Link
                href="/admin/orders"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-[#414845] hover:bg-[#ebe8e4] hover:text-[#1c1c1a] transition-colors text-[13px]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">space_dashboard</span>
                  <span>Dashboard &amp; Antrean</span>
                </div>
              </Link>

              <Link
                href="/admin/orders"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-[#414845] hover:bg-[#ebe8e4] hover:text-[#1c1c1a] transition-colors text-[13px]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Verifikasi Pembayaran</span>
                </div>
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-[#755a24] text-white text-[10px] font-bold leading-none">
                  4
                </span>
              </Link>

              <Link
                href="/admin/builder"
                className="flex items-center justify-between px-3 py-2 transition-colors bg-[#20463a] text-white font-semibold rounded-lg text-[13px]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">edit_document</span>
                  <span>Invitation Editor</span>
                </div>
              </Link>

              <Link
                href="/katalog"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-[#414845] hover:bg-[#ebe8e4] hover:text-[#1c1c1a] transition-colors text-[13px]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">style</span>
                  <span>Katalog Tema</span>
                </div>
              </Link>

              <Link
                href="#rekening"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-[#414845] hover:bg-[#ebe8e4] hover:text-[#1c1c1a] transition-colors text-[13px]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">account_balance</span>
                  <span>Pengaturan Rekening</span>
                </div>
              </Link>
            </nav>
          </div>
        </div>

        {/* User Card */}
        <div className="p-4">
          <div className="bg-white p-3 rounded-xl shadow-sm flex items-center justify-between gap-2 border border-[#c1c8c3]/30">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#063025] flex-shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[18px]">person</span>
              </div>
              <div className="flex flex-col truncate">
                <span className="text-[13px] font-semibold text-[#1c1c1a] truncate leading-tight">Bagas Pratama</span>
                <span className="text-[11px] text-[#755a24] truncate">Lead Concierge</span>
              </div>
            </div>
            <Link
              href="/login"
              className="text-[#414845] hover:text-[#ba1a1a] transition-colors p-1 rounded-lg flex items-center justify-center"
              title="Logout"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="md:pl-60">
        {/* Top Header Bar */}
        <header className="fixed top-0 left-0 md:left-60 right-0 h-16 bg-[#fcf9f5]/80 backdrop-blur-xl shadow-sm z-40 px-6 sm:px-10 flex items-center justify-between border-b border-[#063025]/5">
          <div className="flex items-center gap-2 text-[#414845] text-[13px] min-w-0">
            <Link href="/admin/orders" className="hover:text-[#063025] transition-colors cursor-pointer whitespace-nowrap">
              Admin Portal
            </Link>
            <span className="text-[#c1c8c3]">/</span>
            <span className="hover:text-[#063025] transition-colors cursor-pointer whitespace-nowrap">Editor Undangan</span>
            <span className="text-[#c1c8c3]">/</span>
            <span className="text-[#063025] font-semibold truncate">
              #NK-8820 ({groomNick} &amp; {brideNick})
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[#414845] text-[18px]">search</span>
              <input
                className="bg-white text-[#1c1c1a] pl-9 pr-4 py-2 rounded-lg text-[13px] placeholder:text-[#717975] focus:outline-none shadow-xs w-48 sm:w-64 transition-all border border-[#ebe8e4]"
                placeholder="Cari pesanan, klien..."
                type="search"
              />
            </div>
            <div className="flex items-center gap-1">
              <button
                className="relative p-2 text-[#414845] hover:text-[#1c1c1a] hover:bg-[#f0edea] transition-colors rounded-lg"
                title="Notifikasi"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#755a24]"></span>
              </button>
            </div>
            <div className="h-6 w-px bg-[#c1c8c3]/60"></div>
            <div className="flex items-center gap-2 pl-1 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-[#063025] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-[18px]">person</span>
              </div>
              <span className="text-[13px] text-[#1c1c1a] font-semibold hidden md:inline">Bagas P.</span>
            </div>
          </div>
        </header>

        {/* Main Workspace Body */}
        <main className="w-full pt-20 px-4 sm:px-10 pb-12 bg-[#fcf9f5] min-h-screen">
          <div className="flex flex-col w-full">
            {/* Top Command & Action Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6">
              <div className="flex flex-col gap-1 min-w-0 max-w-3xl">
                <div className="flex items-center gap-1.5 text-[#414845] text-[11px] uppercase tracking-wider font-semibold">
                  <span>Admin Console</span>
                  <span className="text-[#755a24]">/</span>
                  <span>Manajemen Pesanan</span>
                  <span className="text-[#755a24]">/</span>
                  <span className="text-[#063025] font-bold">Editor Undangan #NK-8820</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-headline text-3xl sm:text-4xl text-[#063025] tracking-tight leading-tight font-semibold">
                    Editor Undangan Digital
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c2ecdb] text-[#063025] text-[11px] font-bold shadow-xs shrink-0">
                    <span className="w-2 h-2 rounded-full bg-[#406659]"></span>Draft v1.2
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#ffdb99] text-[#795f28] text-[11px] font-semibold">
                    Tema: Jawa Ningrat VIP
                  </span>
                </div>
                <p className="text-[14px] text-[#414845] leading-normal mt-0.5">
                  Kustomisasi data calon mempelai, jadwal prosesi sakral, kurasi multimedia, dan konfigurasi slug domain resmi klien.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-start lg:self-center">
                <button
                  onClick={handleSaveDraft}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#f0edea] text-[#1c1c1a] font-semibold text-[14px] hover:bg-[#ebe8e4] transition-colors shadow-xs border border-[#c1c8c3]/40"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#414845]">save</span>
                  <span>{isSaving ? 'Menyimpan...' : 'Simpan Draft'}</span>
                </button>

                <button
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold text-[14px] shadow-md transition-all ${
                    isPublished ? 'bg-[#406659]' : 'bg-[#063025] hover:bg-[#20463a]'
                  }`}
                  type="button"
                >
                  {isPublishing ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                      <span>Memproses...</span>
                    </>
                  ) : isPublished ? (
                    <>
                      <span className="material-symbols-outlined text-[18px] text-[#c2ecdb]">check_circle</span>
                      <span>Berhasil Diterbitkan!</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px] text-[#ffdea4]">rocket_launch</span>
                      <span>Publish &amp; Kirim Tautan</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Workspace Grid: 60% Form Atelier vs 40% Live Preview & Handover Panel */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              {/* LEFT CONFIGURATION COLUMN (7 Cols ~ 58-60%) */}
              <div className="xl:col-span-7 flex flex-col gap-6">
                {/* Stage Navigation Tabs */}
                <nav className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-[#f0edea] rounded-xl shadow-inner border border-[#ebe8e4]">
                  <button
                    onClick={() => setActiveTab('mempelai')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-[14px] font-semibold transition-all ${
                      activeTab === 'mempelai'
                        ? 'bg-white text-[#063025] shadow-xs'
                        : 'text-[#414845] hover:text-[#1c1c1a] hover:bg-[#ebe8e4]/60'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#755a24]">favorite</span>
                    <span className="truncate">1. Data Mempelai</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('acara')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-[14px] font-semibold transition-all ${
                      activeTab === 'acara'
                        ? 'bg-white text-[#063025] shadow-xs'
                        : 'text-[#414845] hover:text-[#1c1c1a] hover:bg-[#ebe8e4]/60'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                    <span className="truncate">2. Rangkaian Acara</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('galeri')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-[14px] font-semibold transition-all ${
                      activeTab === 'galeri'
                        ? 'bg-white text-[#063025] shadow-xs'
                        : 'text-[#414845] hover:text-[#1c1c1a] hover:bg-[#ebe8e4]/60'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">photo_library</span>
                    <span className="truncate">3. Galeri &amp; Musik</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('slug')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-[14px] font-semibold transition-all ${
                      activeTab === 'slug'
                        ? 'bg-white text-[#063025] shadow-xs'
                        : 'text-[#414845] hover:text-[#1c1c1a] hover:bg-[#ebe8e4]/60'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">link</span>
                    <span className="truncate">4. Tautan &amp; Slug</span>
                  </button>
                </nav>

                {/* SECTION 1: DOMAIN & SLUG IDENTIFIER */}
                <section className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm flex flex-col gap-4 border border-[#c1c8c3]/30">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#f0edea] flex items-center justify-center text-[#755a24] shrink-0">
                        <span className="material-symbols-outlined text-[20px]">public</span>
                      </div>
                      <div className="min-w-0">
                        <h2 className="font-headline text-lg sm:text-xl text-[#063025] font-semibold leading-tight truncate">
                          Domain &amp; Tautan Kustom
                        </h2>
                        <p className="text-[13px] text-[#414845]">Konfigurasi URL publik yang disematkan dalam undangan QR &amp; WA blast.</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#c2ecdb]/50 text-[#063025] text-[11px] font-bold shrink-0">
                      <span className="material-symbols-outlined text-[16px] text-[#406659]">verified</span>
                      Tersedia &amp; Siap Pakai
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[13px] text-[#1c1c1a] font-semibold">Custom Slug Undangan</label>
                      <span className="text-[11px] text-[#717975]">Dapat diubah kapan saja sebelum final</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-[#f6f3ef] rounded-lg p-1.5 border border-[#c1c8c3]/30 focus-within:bg-white focus-within:border-[#063025]/40 transition-all gap-1.5">
                      <span className="text-[14px] text-[#755a24] font-semibold pl-3 select-none py-1 sm:py-0">
                        nikahkuy.com/
                      </span>
                      <input
                        className="flex-1 bg-transparent py-1.5 px-2 text-[#1c1c1a] font-semibold text-[14px] focus:outline-none min-w-0"
                        value={slug}
                        onChange={handleSlugChange}
                        type="text"
                      />
                      <button
                        onClick={handleCopyLink}
                        className="px-3.5 py-1.5 rounded-lg bg-white text-[#414845] hover:text-[#063025] hover:bg-[#f0edea] text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#c1c8c3]/40 shrink-0 shadow-xs"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {copiedLink ? 'check' : 'content_copy'}
                        </span>
                        <span>{copiedLink ? 'Tersalin' : 'Salin Slug'}</span>
                      </button>
                    </div>
                    <p className="text-[12px] text-[#717975]">
                      Tautan ini bersifat unik dan akan digunakan sebagai akses portal tamu undangan.
                    </p>
                  </div>
                </section>

                {/* SECTION 2: DATA MEMPELAI LENGKAP */}
                <section className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm flex flex-col gap-4 border border-[#c1c8c3]/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#f0edea] flex items-center justify-center text-[#755a24] shrink-0">
                        <span className="material-symbols-outlined text-[20px]">group</span>
                      </div>
                      <div>
                        <h2 className="font-headline text-lg sm:text-xl text-[#063025] font-semibold leading-tight">
                          Data Calon Mempelai
                        </h2>
                        <p className="text-[13px] text-[#414845]">Informasi silsilah keluarga dan akun media sosial kedua mempelai.</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#ffdea4]/40 text-[#5b430e] text-[11px] uppercase tracking-wider font-bold">
                      Step 1 of 4
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                    {/* Mempelai Wanita Card */}
                    <div className="p-4 rounded-xl bg-[#f6f3ef] flex flex-col justify-between gap-4 border border-[#c1c8c3]/30 h-full">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between pb-2 border-b border-[#c1c8c3]/30">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#ffdb99] flex items-center justify-center text-[#755a24]">
                              <span className="material-symbols-outlined text-[16px]">female</span>
                            </div>
                            <h3 className="font-headline text-base text-[#063025] font-semibold">Mempelai Wanita</h3>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#f0edea] text-[11px] text-[#414845] font-medium">
                            The Bride
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] text-[#414845] uppercase tracking-wide font-bold">
                            Nama Lengkap &amp; Gelar
                          </label>
                          <input
                            className="w-full bg-white px-3 py-2 rounded-lg text-[#1c1c1a] font-semibold text-[14px] border border-[#c1c8c3]/40 focus:outline-none focus:border-[#063025] transition-colors"
                            value={brideName}
                            onChange={(e) => setBrideName(e.target.value)}
                            type="text"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] text-[#414845] uppercase tracking-wide font-bold">Panggilan</label>
                            <input
                              className="w-full bg-white px-3 py-2 rounded-lg text-[#1c1c1a] font-semibold text-[14px] border border-[#c1c8c3]/40 focus:outline-none focus:border-[#063025] transition-colors"
                              value={brideNick}
                              onChange={(e) => setBrideNick(e.target.value)}
                              type="text"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] text-[#414845] uppercase tracking-wide font-bold">Instagram</label>
                            <div className="relative flex items-center">
                              <span className="absolute left-3 text-[#717975] text-[13px] font-semibold select-none">@</span>
                              <input
                                className="w-full bg-white pl-7 pr-3 py-2 rounded-lg text-[#1c1c1a] font-semibold text-[14px] border border-[#c1c8c3]/40 focus:outline-none focus:border-[#063025] transition-colors"
                                value={brideIg}
                                onChange={(e) => setBrideIg(e.target.value)}
                                type="text"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 pt-1">
                        <label className="text-[11px] text-[#414845] uppercase tracking-wide font-bold">
                          Keterangan Orang Tua
                        </label>
                        <textarea
                          className="w-full bg-white px-3 py-2 rounded-lg text-[#1c1c1a] text-[13px] border border-[#c1c8c3]/40 focus:outline-none focus:border-[#063025] resize-none transition-colors"
                          rows={2}
                          value={brideParents}
                          onChange={(e) => setBrideParents(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Mempelai Pria Card */}
                    <div className="p-4 rounded-xl bg-[#f6f3ef] flex flex-col justify-between gap-4 border border-[#c1c8c3]/30 h-full">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between pb-2 border-b border-[#c1c8c3]/30">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#20463a]/20 flex items-center justify-center text-[#063025]">
                              <span className="material-symbols-outlined text-[16px]">male</span>
                            </div>
                            <h3 className="font-headline text-base text-[#063025] font-semibold">Mempelai Pria</h3>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#f0edea] text-[11px] text-[#414845] font-medium">
                            The Groom
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] text-[#414845] uppercase tracking-wide font-bold">
                            Nama Lengkap &amp; Gelar
                          </label>
                          <input
                            className="w-full bg-white px-3 py-2 rounded-lg text-[#1c1c1a] font-semibold text-[14px] border border-[#c1c8c3]/40 focus:outline-none focus:border-[#063025] transition-colors"
                            value={groomName}
                            onChange={(e) => setGroomName(e.target.value)}
                            type="text"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] text-[#414845] uppercase tracking-wide font-bold">Panggilan</label>
                            <input
                              className="w-full bg-white px-3 py-2 rounded-lg text-[#1c1c1a] font-semibold text-[14px] border border-[#c1c8c3]/40 focus:outline-none focus:border-[#063025] transition-colors"
                              value={groomNick}
                              onChange={(e) => setGroomNick(e.target.value)}
                              type="text"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[11px] text-[#414845] uppercase tracking-wide font-bold">Instagram</label>
                            <div className="relative flex items-center">
                              <span className="absolute left-3 text-[#717975] text-[13px] font-semibold select-none">@</span>
                              <input
                                className="w-full bg-white pl-7 pr-3 py-2 rounded-lg text-[#1c1c1a] font-semibold text-[14px] border border-[#c1c8c3]/40 focus:outline-none focus:border-[#063025] transition-colors"
                                value={groomIg}
                                onChange={(e) => setGroomIg(e.target.value)}
                                type="text"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 pt-1">
                        <label className="text-[11px] text-[#414845] uppercase tracking-wide font-bold">
                          Keterangan Orang Tua
                        </label>
                        <textarea
                          className="w-full bg-white px-3 py-2 rounded-lg text-[#1c1c1a] text-[13px] border border-[#c1c8c3]/40 focus:outline-none focus:border-[#063025] resize-none transition-colors"
                          rows={2}
                          value={groomParents}
                          onChange={(e) => setGroomParents(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* SECTION 3: RANGKAIAN ACARA UTAMA */}
                <section className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm flex flex-col gap-4 border border-[#c1c8c3]/30">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#f0edea] flex items-center justify-center text-[#755a24] shrink-0">
                        <span className="material-symbols-outlined text-[20px]">event_available</span>
                      </div>
                      <div>
                        <h2 className="font-headline text-lg sm:text-xl text-[#063025] font-semibold leading-tight">
                          Rangkaian Acara Utama
                        </h2>
                        <p className="text-[13px] text-[#414845]">Detail penjadwalan akad nikah serta resepsi perayaan.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => alert('Membuka dialog tambah sesi prosesi baru (Siraman / Ngunduh Mantu)')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f0edea] text-[#063025] text-[12px] font-semibold hover:bg-[#ebe8e4] transition-colors border border-[#c1c8c3]/40 shadow-xs"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_circle</span>
                      <span>Tambah Sesi</span>
                    </button>
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* Event 1: Akad Nikah */}
                    <div className="p-4 rounded-xl bg-[#f6f3ef] flex flex-col gap-3 border border-[#c1c8c3]/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#755a24]"></span>
                          <h3 className="font-headline text-base text-[#063025] font-semibold">1. Akad Nikah / Pemberkatan</h3>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#ffdb99] text-[#795f28] text-[11px] font-bold">
                          Sesi Sakral
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] text-[#414845] uppercase tracking-wide font-bold">
                            Hari &amp; Tanggal
                          </label>
                          <div className="relative flex items-center">
                            <span className="material-symbols-outlined absolute left-3 text-[#755a24] text-[18px]">
                              calendar_today
                            </span>
                            <input
                              className="w-full bg-white pl-10 pr-3 py-2 rounded-lg text-[#1c1c1a] font-semibold text-[13px] border border-[#c1c8c3]/40 focus:outline-none focus:border-[#063025] transition-colors"
                              value={akadDate}
                              onChange={(e) => setAkadDate(e.target.value)}
                              type="text"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] text-[#414845] uppercase tracking-wide font-bold">
                            Waktu Pelaksanaan
                          </label>
                          <div className="relative flex items-center">
                            <span className="material-symbols-outlined absolute left-3 text-[#755a24] text-[18px]">
                              schedule
                            </span>
                            <input
                              className="w-full bg-white pl-10 pr-3 py-2 rounded-lg text-[#1c1c1a] font-semibold text-[13px] border border-[#c1c8c3]/40 focus:outline-none focus:border-[#063025] transition-colors"
                              value={akadTime}
                              onChange={(e) => setAkadTime(e.target.value)}
                              type="text"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] text-[#414845] uppercase tracking-wide font-bold">
                          Tempat &amp; Alamat
                        </label>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                          <input
                            className="flex-1 bg-white px-3 py-2 rounded-lg text-[#1c1c1a] font-semibold text-[13px] border border-[#c1c8c3]/40 focus:outline-none focus:border-[#063025] transition-colors min-w-0"
                            value={akadVenue}
                            onChange={(e) => setAkadVenue(e.target.value)}
                            type="text"
                          />
                          <button
                            onClick={() => alert('Membuka Google Maps Venue Selector')}
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-[#063025] hover:bg-[#f0edea] border border-[#c1c8c3]/40 transition-colors text-[12px] font-semibold shrink-0 shadow-xs"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px] text-[#406659]">pin_drop</span>
                            <span>Sematkan Maps</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Event 2: Resepsi Pernikahan */}
                    <div className="p-4 rounded-xl bg-[#f6f3ef] flex flex-col gap-3 border border-[#c1c8c3]/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#063025]"></span>
                          <h3 className="font-headline text-base text-[#063025] font-semibold">2. Resepsi Pernikahan</h3>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#c2ecdb] text-[#063025] text-[11px] font-bold">
                          Perayaan Agung
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] text-[#414845] uppercase tracking-wide font-bold">
                            Hari &amp; Tanggal
                          </label>
                          <div className="relative flex items-center">
                            <span className="material-symbols-outlined absolute left-3 text-[#755a24] text-[18px]">
                              calendar_today
                            </span>
                            <input
                              className="w-full bg-white pl-10 pr-3 py-2 rounded-lg text-[#1c1c1a] font-semibold text-[13px] border border-[#c1c8c3]/40 focus:outline-none focus:border-[#063025] transition-colors"
                              value={resepsiDate}
                              onChange={(e) => setResepsiDate(e.target.value)}
                              type="text"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] text-[#414845] uppercase tracking-wide font-bold">
                            Waktu Pelaksanaan
                          </label>
                          <div className="relative flex items-center">
                            <span className="material-symbols-outlined absolute left-3 text-[#755a24] text-[18px]">
                              schedule
                            </span>
                            <input
                              className="w-full bg-white pl-10 pr-3 py-2 rounded-lg text-[#1c1c1a] font-semibold text-[13px] border border-[#c1c8c3]/40 focus:outline-none focus:border-[#063025] transition-colors"
                              value={resepsiTime}
                              onChange={(e) => setResepsiTime(e.target.value)}
                              type="text"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] text-[#414845] uppercase tracking-wide font-bold">
                          Tempat &amp; Alamat
                        </label>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                          <input
                            className="flex-1 bg-white px-3 py-2 rounded-lg text-[#1c1c1a] font-semibold text-[13px] border border-[#c1c8c3]/40 focus:outline-none focus:border-[#063025] transition-colors min-w-0"
                            value={resepsiVenue}
                            onChange={(e) => setResepsiVenue(e.target.value)}
                            type="text"
                          />
                          <button
                            onClick={() => alert('Membuka Google Maps Venue Selector')}
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-[#063025] hover:bg-[#f0edea] border border-[#c1c8c3]/40 transition-colors text-[12px] font-semibold shrink-0 shadow-xs"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px] text-[#406659]">pin_drop</span>
                            <span>Sematkan Maps</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* SECTION 4: FITUR & MODUL AKTIF */}
                <section className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm flex flex-col gap-4 border border-[#c1c8c3]/30">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#f0edea] flex items-center justify-center text-[#755a24] shrink-0">
                      <span className="material-symbols-outlined text-[20px]">toggle_on</span>
                    </div>
                    <div>
                      <h2 className="font-headline text-lg sm:text-xl text-[#063025] font-semibold leading-tight">
                        Fitur &amp; Modul Interaktif
                      </h2>
                      <p className="text-[13px] text-[#414845]">Aktifkan modul khusus untuk dipasang pada halaman publik undangan.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    {/* Toggle 1: RSVP */}
                    <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#f6f3ef] border border-[#c1c8c3]/30">
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div className="w-8 h-8 rounded-lg bg-[#f0edea] flex items-center justify-center text-[#755a24] shrink-0">
                          <span className="material-symbols-outlined text-[20px]">mark_email_read</span>
                        </div>
                        <div className="min-w-0">
                          <span className="text-[13px] text-[#1c1c1a] font-semibold block leading-tight truncate">
                            Buku Tamu &amp; RSVP
                          </span>
                          <span className="text-[11px] text-[#717975] truncate block">Konfirmasi kehadiran via web</span>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                          checked={rsvpEnabled}
                          onChange={(e) => setRsvpEnabled(e.target.checked)}
                          className="sr-only peer"
                          type="checkbox"
                        />
                        <div className="w-11 h-6 bg-[#ebe8e4] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#063025]"></div>
                      </label>
                    </div>

                    {/* Toggle 2: Digital Envelope */}
                    <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#f6f3ef] border border-[#c1c8c3]/30">
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div className="w-8 h-8 rounded-lg bg-[#f0edea] flex items-center justify-center text-[#755a24] shrink-0">
                          <span className="material-symbols-outlined text-[20px]">payments</span>
                        </div>
                        <div className="min-w-0">
                          <span className="text-[13px] text-[#1c1c1a] font-semibold block leading-tight truncate">
                            Amplop Digital &amp; Hadiah
                          </span>
                          <span className="text-[11px] text-[#717975] truncate block">Nomor rekening &amp; QRIS statis</span>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                          checked={envelopeEnabled}
                          onChange={(e) => setEnvelopeEnabled(e.target.checked)}
                          className="sr-only peer"
                          type="checkbox"
                        />
                        <div className="w-11 h-6 bg-[#ebe8e4] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#063025]"></div>
                      </label>
                    </div>

                    {/* Toggle 3: Love Story */}
                    <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#f6f3ef] border border-[#c1c8c3]/30">
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div className="w-8 h-8 rounded-lg bg-[#f0edea] flex items-center justify-center text-[#755a24] shrink-0">
                          <span className="material-symbols-outlined text-[20px]">auto_stories</span>
                        </div>
                        <div className="min-w-0">
                          <span className="text-[13px] text-[#1c1c1a] font-semibold block leading-tight truncate">
                            Kisah Cinta (Love Story)
                          </span>
                          <span className="text-[11px] text-[#717975] truncate block">Timeline perjalanan asmara</span>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                          checked={storyEnabled}
                          onChange={(e) => setStoryEnabled(e.target.checked)}
                          className="sr-only peer"
                          type="checkbox"
                        />
                        <div className="w-11 h-6 bg-[#ebe8e4] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#063025]"></div>
                      </label>
                    </div>

                    {/* Toggle 4: Countdown */}
                    <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#f6f3ef] border border-[#c1c8c3]/30">
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div className="w-8 h-8 rounded-lg bg-[#f0edea] flex items-center justify-center text-[#755a24] shrink-0">
                          <span className="material-symbols-outlined text-[20px]">hourglass_top</span>
                        </div>
                        <div className="min-w-0">
                          <span className="text-[13px] text-[#1c1c1a] font-semibold block leading-tight truncate">
                            Countdown Mundur
                          </span>
                          <span className="text-[11px] text-[#717975] truncate block">Penghitung mundur hari-H</span>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                          checked={countdownEnabled}
                          onChange={(e) => setCountdownEnabled(e.target.checked)}
                          className="sr-only peer"
                          type="checkbox"
                        />
                        <div className="w-11 h-6 bg-[#ebe8e4] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#063025]"></div>
                      </label>
                    </div>
                  </div>
                </section>
              </div>

              {/* RIGHT PREVIEW & HANDOVER COLUMN (5 Cols ~ 40-42%) */}
              <div className="xl:col-span-5 flex flex-col gap-6 sticky top-20">
                {/* Device Header / Live Mobile Preview Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-sm border border-[#c1c8c3]/30">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#406659]"></span>
                    <span className="text-[13px] text-[#063025] font-semibold">
                      Live Preview: <span className="text-[#755a24]">Jawa Ningrat VIP</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="px-2 py-0.5 rounded-lg bg-[#f0edea] text-[#414845] text-[11px]">390 x 844 px</span>
                    <Link
                      href="/"
                      target="_blank"
                      className="p-1 rounded-lg text-[#414845] hover:text-[#063025] hover:bg-[#f0edea] transition-colors"
                      title="Buka Tab Baru"
                    >
                      <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                    </Link>
                  </div>
                </div>

                {/* Realistic Smartphone Mockup */}
                <div className="flex justify-center w-full">
                  <div className="w-[360px] sm:w-[380px] bg-[#063025] rounded-[44px] p-3 shadow-2xl relative">
                    {/* Dynamic Island Slot */}
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#20463a]/80 rounded-full z-30 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-[#063025] mr-3"></div>
                      <div className="w-8 h-1.5 rounded-full bg-[#063025]/60"></div>
                    </div>

                    {/* Phone Inner Screen Display */}
                    <div className="w-full bg-[#fdfbf7] rounded-[34px] overflow-hidden relative flex flex-col min-h-[640px] max-h-[660px] select-none">
                      <div className="relative h-full flex flex-col justify-between p-6 overflow-y-auto">
                        {/* Background Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#1b3d32]/90 via-[#0d261e]/70 to-[#061e17]/95 z-10"></div>
                        <img
                          className="absolute inset-0 w-full h-full object-cover object-center z-0"
                          alt="Bride & Groom"
                          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                        />

                        {/* Top Monogram & Names */}
                        <div className="relative z-20 flex flex-col items-center text-center pt-8">
                          <div className="w-12 h-12 rounded-full border border-[#ffdea4]/40 bg-[#063025]/40 backdrop-blur-md flex items-center justify-center mb-3">
                            <span className="font-headline text-lg text-[#ffdea4] tracking-widest">
                              {groomNick.charAt(0)}&amp;{brideNick.charAt(0)}
                            </span>
                          </div>
                          <span className="text-[11px] uppercase tracking-[0.25em] text-[#e5c281] font-bold">
                            Walimatul Ursy
                          </span>
                          <h4 className="font-headline text-2xl sm:text-3xl text-white mt-1 tracking-tight leading-tight">
                            {groomNick} &amp; {brideNick}
                          </h4>
                          <p className="text-[13px] text-white/80 italic mt-1 font-headline">{akadDate}</p>
                        </div>

                        {/* Couple Vignette Frame */}
                        <div className="relative z-20 my-4 flex flex-col items-center">
                          <div className="relative w-44 h-56 rounded-2xl p-1 bg-gradient-to-b from-[#ffdea4]/40 via-[#ffdea4]/10 to-transparent shadow-xl">
                            <div className="w-full h-full rounded-[14px] overflow-hidden bg-[#20463a]">
                              <img
                                className="w-full h-full object-cover"
                                alt="Romantic couple"
                                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
                              />
                            </div>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#063025]/90 border border-[#ffdea4]/30 backdrop-blur-md text-[#ffdea4] text-[11px] whitespace-nowrap shadow-md">
                              The Wedding Celebration
                            </div>
                          </div>
                        </div>

                        {/* Bottom CTA & Countdown */}
                        <div className="relative z-20 flex flex-col gap-3 pb-2">
                          {countdownEnabled && (
                            <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-around text-center">
                              <div className="flex flex-col">
                                <span className="font-headline text-lg text-white leading-none">{timeLeft.days}</span>
                                <span className="text-[9px] text-[#ffdea4] uppercase tracking-wider">Hari</span>
                              </div>
                              <span className="text-[#ffdea4]/40">:</span>
                              <div className="flex flex-col">
                                <span className="font-headline text-lg text-white leading-none">{timeLeft.hours}</span>
                                <span className="text-[9px] text-[#ffdea4] uppercase tracking-wider">Jam</span>
                              </div>
                              <span className="text-[#ffdea4]/40">:</span>
                              <div className="flex flex-col">
                                <span className="font-headline text-lg text-white leading-none">{timeLeft.mins}</span>
                                <span className="text-[9px] text-[#ffdea4] uppercase tracking-wider">Menit</span>
                              </div>
                            </div>
                          )}

                          <button
                            className="w-full py-3 rounded-xl bg-[#ffdea4] text-[#261900] font-bold text-[14px] shadow-lg hover:bg-[#e5c281] transition-all flex items-center justify-center gap-2"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[20px]">mail</span>
                            <span>Buka Undangan</span>
                          </button>
                        </div>

                        {/* Home indicator bar */}
                        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full z-30"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Handover Action Box (Bottom Right) */}
                <section className="bg-white p-6 rounded-2xl shadow-sm flex flex-col gap-3 border border-[#c1c8c3]/30">
                  <div className="flex items-center justify-between pb-2 border-b border-[#c1c8c3]/30">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#ffdb99] flex items-center justify-center text-[#755a24]">
                        <span className="material-symbols-outlined text-[18px]">send</span>
                      </div>
                      <h3 className="font-headline text-base text-[#063025] font-semibold">Serah Terima ke Klien</h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ffdb99] text-[#795f28] text-[11px] font-bold">
                      WhatsApp Ready
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-[#f6f3ef] px-3 py-2.5 rounded-lg border border-[#c1c8c3]/30">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] text-[#717975]">Tautan Aktif Publik</span>
                      <span className="text-[14px] text-[#063025] font-semibold truncate">nikahkuy.com/{slug}</span>
                    </div>
                    <button
                      onClick={handleCopyLink}
                      className="p-2 rounded-lg bg-white text-[#414845] hover:text-[#063025] transition-colors border border-[#c1c8c3]/30 shadow-xs shrink-0 ml-2"
                      title="Salin Tautan"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {copiedLink ? 'check' : 'content_copy'}
                      </span>
                    </button>
                  </div>

                  <a
                    href={`https://wa.me/6282144332211?text=${encodeURIComponent(waMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] text-[13px] font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs border border-[#25D366]/30"
                  >
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                    <span className="truncate">Kirim Tautan Jadi ke WA Klien (0821-4433-2211)</span>
                  </a>
                  <p className="text-[11px] text-[#717975] text-center leading-relaxed">
                    Pesan otomatis mencakup tautan resmi, barcode QR tamu, dan kredensial akses dasbor RSVP.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
