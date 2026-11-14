'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminInvitationBuilderPage() {
  // Stepper state
  const [currentStep, setCurrentStep] = useState<number>(2); // 1: Tema & URL, 2: Data Mempelai, 3: Jadwal, 4: Galeri, 5: Amplop

  // Sidebar navigation active state
  const [activeNav, setActiveNav] = useState<'content' | 'event' | 'gallery' | 'gift' | 'theme' | 'settings'>('content');

  // Viewport mode inside preview
  const [viewportMode, setViewportMode] = useState<'mobile' | 'desktop'>('mobile');

  // Groom Profile State
  const [groomFullname, setGroomFullname] = useState('Rama Wijaya, S.T.');
  const [groomNickname, setGroomNickname] = useState('Rama');
  const [groomParents, setGroomParents] = useState('Bpk. Hendra Wijaya & Ibu Ratna Dewi');
  const [groomInstagram, setGroomInstagram] = useState('ramawijaya');
  const [groomPhoto, setGroomPhoto] = useState('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80');

  // Bride Profile State
  const [brideFullname, setBrideFullname] = useState('Shinta Lestari, S.Farm.');
  const [brideNickname, setBrideNickname] = useState('Shinta');
  const [brideParents, setBrideParents] = useState('Bpk. Bambang Irawan & Ibu Siti Aminah');
  const [brideInstagram, setBrideInstagram] = useState('shintalestari');
  const [bridePhoto, setBridePhoto] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');

  // Event & Guest Customization
  const [guestName, setGuestName] = useState('Budi Santoso & Partner');
  const [eventDate] = useState('Sabtu, 12 Desember 2026');

  // Countdown timer inside mobile phone canvas
  const [countdown, setCountdown] = useState({ days: 28, hours: 14, mins: 45, secs: 10 });

  // Publishing & feedback states
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsPublished(true);
      setTimeout(() => setIsPublished(false), 3000);
    }, 800);
  };

  const currentSlug = `${groomNickname.toLowerCase()}-${brideNickname.toLowerCase()}`.replace(/[^a-z0-9-]/g, '-');
  const monogram = `${groomNickname.charAt(0)}&${brideNickname.charAt(0)}`;

  return (
    <div className="bg-[#fcf9f5] font-body text-[#1c1c1a] antialiased min-h-screen">
      {/* Top Main Navigation Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-xl shadow-[0_1px_12px_rgba(6,48,37,0.06)] z-50">
        <div className="h-16 w-full px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/orders"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f0edea] hover:bg-[#ebe8e4] transition-colors text-[#414845] hover:text-[#1c1c1a]"
              title="Kembali ke Dashboard"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="font-headline text-base sm:text-lg text-[#063025] tracking-tight font-semibold">
                    Editor Undangan: {groomNickname} &amp; {brideNickname}
                  </h1>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#ffdb99] text-[#795f28]">
                    Draft
                  </span>
                </div>
                <span className="text-[12px] text-[#414845]">Pernikahan Tradisional Modern Adat Jawa</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f6f3ef]">
            <span className="material-symbols-outlined text-[#063025] text-[18px]">link</span>
            <span className="text-[13px] text-[#1c1c1a]">nikahkuy.id/</span>
            <span className="text-[13px] font-semibold text-[#063025]">{currentSlug}</span>
            <span className="inline-flex items-center gap-1 pl-2 text-[11px] text-[#063025] font-bold">
              <span className="material-symbols-outlined text-[#063025] text-[16px]">check_circle</span>
              Tersedia
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Draft berhasil disimpan!')}
              className="inline-flex items-center justify-center px-3.5 py-2 rounded-lg bg-[#f0edea] hover:bg-[#ebe8e4] text-[#1c1c1a] font-semibold text-[13px] transition-all gap-1.5"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span className="hidden sm:inline">Simpan Draft</span>
            </button>

            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-white font-semibold text-[13px] transition-all shadow-md gap-1.5 ${
                isPublished ? 'bg-emerald-700' : 'bg-[#063025] hover:bg-[#20463a]'
              }`}
              type="button"
            >
              {isPublishing ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                  <span>Menerbitkan...</span>
                </>
              ) : isPublished ? (
                <>
                  <span className="material-symbols-outlined text-[18px] text-[#c2ecdb]">done_all</span>
                  <span>Telah Diterbitkan!</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px] text-[#ffdea4]">send</span>
                  <span>Publish &amp; Kirim ke Klien</span>
                </>
              )}
            </button>

            <div className="w-8 h-8 rounded-full bg-[#063025] flex items-center justify-center ml-1">
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Slim Icon Sidebar Navigation */}
      <aside className="fixed left-0 top-16 bottom-0 w-20 bg-white shadow-[1px_0_12px_rgba(6,48,37,0.04)] z-40 flex flex-col items-center py-4 justify-between hidden md:flex border-r border-[#063025]/5">
        <nav className="w-full flex flex-col items-center gap-2 px-2">
          <button
            onClick={() => setActiveNav('content')}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all gap-1 ${
              activeNav === 'content'
                ? 'bg-[#20463a] text-white shadow-sm'
                : 'text-[#414845] hover:bg-[#ebe8e4] hover:text-[#1c1c1a]'
            }`}
            title="Konten & Mempelai"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">edit_note</span>
            <span className="text-[10px] font-bold">Konten</span>
          </button>

          <button
            onClick={() => setActiveNav('event')}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all gap-1 ${
              activeNav === 'event'
                ? 'bg-[#20463a] text-white shadow-sm'
                : 'text-[#414845] hover:bg-[#ebe8e4] hover:text-[#1c1c1a]'
            }`}
            title="Acara & Lokasi"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">event</span>
            <span className="text-[10px] font-bold">Acara</span>
          </button>

          <button
            onClick={() => setActiveNav('gallery')}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all gap-1 ${
              activeNav === 'gallery'
                ? 'bg-[#20463a] text-white shadow-sm'
                : 'text-[#414845] hover:bg-[#ebe8e4] hover:text-[#1c1c1a]'
            }`}
            title="Galeri & Musik"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">photo_library</span>
            <span className="text-[10px] font-bold">Galeri</span>
          </button>

          <button
            onClick={() => setActiveNav('gift')}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all gap-1 ${
              activeNav === 'gift'
                ? 'bg-[#20463a] text-white shadow-sm'
                : 'text-[#414845] hover:bg-[#ebe8e4] hover:text-[#1c1c1a]'
            }`}
            title="Amplop & RSVP"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">featured_seasonal_and_gifts</span>
            <span className="text-[10px] font-bold">Amplop</span>
          </button>

          <button
            onClick={() => setActiveNav('theme')}
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all gap-1 ${
              activeNav === 'theme'
                ? 'bg-[#20463a] text-white shadow-sm'
                : 'text-[#414845] hover:bg-[#ebe8e4] hover:text-[#1c1c1a]'
            }`}
            title="Desain & Font"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">palette</span>
            <span className="text-[10px] font-bold">Tema</span>
          </button>
        </nav>

        <div className="flex flex-col items-center gap-2 w-full px-2">
          <button
            onClick={() => setActiveNav('settings')}
            className="flex flex-col items-center justify-center w-14 h-14 rounded-xl text-[#414845] hover:bg-[#ebe8e4] hover:text-[#1c1c1a] transition-all gap-1"
            title="Pengaturan"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">tune</span>
            <span className="text-[10px] font-bold">Opsi</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Body */}
      <div className="md:pl-20">
        <main className="w-full pt-16 bg-[#fcf9f5] min-h-screen">
          <div className="w-full grid grid-cols-12 min-h-[calc(100vh-4rem)]">
            {/* LEFT PANE: Configuration Form & Stepper (7 of 12 cols ~ 58%) */}
            <div className="col-span-12 xl:col-span-7 flex flex-col p-6 lg:p-8 xl:pr-10 bg-[#fcf9f5]">
              {/* Stepper Navigation */}
              <nav className="w-full pb-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {/* Step 1: Completed */}
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#f0edea] hover:bg-[#ebe8e4] transition-all shrink-0 text-left"
                    type="button"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#063025] flex items-center justify-center text-white text-[11px]">
                      <span className="material-symbols-outlined text-[13px]">check</span>
                    </span>
                    <span className="text-[13px] font-semibold text-[#1c1c1a]">1. Tema &amp; URL</span>
                  </button>

                  <div className="w-4 h-0.5 bg-[#e5e2de] shrink-0"></div>

                  {/* Step 2: Active */}
                  <button
                    onClick={() => setCurrentStep(2)}
                    className={`group flex items-center gap-2 px-4 py-2 rounded-full shrink-0 text-left shadow-xs transition-all ${
                      currentStep === 2 ? 'bg-[#20463a] text-white' : 'bg-[#f0edea] text-[#1c1c1a]'
                    }`}
                    type="button"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#ffdea4] text-[#261900] flex items-center justify-center text-[11px] font-bold">
                      2
                    </span>
                    <span className="font-headline text-[14px] font-semibold tracking-tight">Data Mempelai</span>
                    <span className="w-2 h-2 rounded-full bg-[#ffdea4] animate-pulse ml-0.5"></span>
                  </button>

                  <div className="w-4 h-0.5 bg-[#e5e2de] shrink-0"></div>

                  {/* Step 3 */}
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#f6f3ef] hover:bg-[#f0edea] text-[#414845] transition-all shrink-0 text-left"
                    type="button"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#e5e2de] text-[#414845] flex items-center justify-center text-[11px] font-bold">
                      3
                    </span>
                    <span className="text-[13px] font-semibold">Jadwal &amp; Lokasi</span>
                  </button>

                  <div className="w-4 h-0.5 bg-[#e5e2de] shrink-0"></div>

                  {/* Step 4 */}
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#f6f3ef] hover:bg-[#f0edea] text-[#414845] transition-all shrink-0 text-left"
                    type="button"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#e5e2de] text-[#414845] flex items-center justify-center text-[11px] font-bold">
                      4
                    </span>
                    <span className="text-[13px] font-semibold">Galeri &amp; Musik</span>
                  </button>

                  <div className="w-4 h-0.5 bg-[#e5e2de] shrink-0"></div>

                  {/* Step 5 */}
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#f6f3ef] hover:bg-[#f0edea] text-[#414845] transition-all shrink-0 text-left"
                    type="button"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#e5e2de] text-[#414845] flex items-center justify-center text-[11px] font-bold">
                      5
                    </span>
                    <span className="text-[13px] font-semibold">Amplop &amp; RSVP</span>
                  </button>
                </div>
              </nav>

              {/* Section Header */}
              <div className="flex items-start justify-between mt-4 mb-6">
                <div>
                  <span className="text-[11px] text-[#755a24] uppercase tracking-wider block mb-1 font-bold">
                    Tahap 02 — Profil Utama
                  </span>
                  <h2 className="font-headline text-2xl lg:text-3xl text-[#063025] tracking-tight font-semibold">
                    Informasi Kedua Mempelai
                  </h2>
                  <p className="text-[14px] text-[#414845] mt-0.5">
                    Tuliskan identitas nama lengkap, silsilah keluarga, serta potret yang ditampilkan pada undangan digital.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f0edea] text-[#414845] text-[11px] font-bold shrink-0">
                  <span className="material-symbols-outlined text-[16px] text-[#063025]">auto_awesome</span>
                  <span>Pratinjau Otomatis</span>
                </div>
              </div>

              {/* Main Form Stack */}
              <div className="space-y-6">
                {/* SUB-CARD 1: Mempelai Pria (The Groom) */}
                <section className="rounded-2xl bg-white p-6 shadow-sm border border-[#063025]/5">
                  <div className="flex items-center justify-between pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#c2ecdb] flex items-center justify-center text-[#002118]">
                        <span className="material-symbols-outlined text-[18px]">man</span>
                      </div>
                      <div>
                        <h3 className="font-headline text-lg text-[#063025] font-semibold">Mempelai Pria</h3>
                        <p className="text-[12px] text-[#414845]">Calon pengantin kakung beserta garis keluarga</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#a6cfbf]/40 text-[#284e41] text-[11px] font-bold">
                      Wajib Diisi
                    </span>
                  </div>

                  {/* Photo Upload Dropzone & Thumbnail */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2 pb-5">
                    <div className="md:col-span-4 flex flex-col items-center justify-center p-3 rounded-xl bg-[#f6f3ef]">
                      <div className="w-24 h-28 rounded-lg overflow-hidden relative shadow-sm">
                        <img className="w-full h-full object-cover" alt="Groom portrait" src={groomPhoto} />
                        <div className="absolute bottom-1 right-1 bg-white/90 px-1.5 py-0.5 rounded text-[10px] font-bold text-[#063025] flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[10px]">photo_camera</span>
                          Foto
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-[#063025] mt-2">rama-portrait.jpg</span>
                      <span className="text-[11px] text-[#414845]">1.4 MB • Siap</span>
                    </div>

                    <div className="md:col-span-8 flex flex-col justify-center items-center p-5 rounded-xl bg-white border border-dashed border-[#c1c8c3] text-center">
                      <div className="w-10 h-10 rounded-full bg-[#f0edea] flex items-center justify-center text-[#063025] mb-2">
                        <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
                      </div>
                      <p className="text-[14px] font-semibold text-[#1c1c1a]">Unggah Foto Mempelai Pria</p>
                      <p className="text-[12px] text-[#414845] mt-0.5 mb-3">Format JPG atau PNG (Maksimal 5MB, rasio disarankan 3:4)</p>
                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer px-4 py-1.5 rounded-lg bg-[#f0edea] hover:bg-[#ebe8e4] text-[#1c1c1a] text-[12px] font-semibold transition-colors flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px]">add_photo_alternate</span>
                          <span>Ganti File</span>
                          <input
                            accept="image/*"
                            className="hidden"
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) setGroomPhoto(URL.createObjectURL(file));
                            }}
                          />
                        </label>
                        <button
                          onClick={() => setGroomPhoto('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80')}
                          className="px-3 py-1.5 rounded-lg bg-transparent hover:bg-[#f6f3ef] text-[#414845] text-[12px] font-semibold transition-colors"
                          type="button"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1c1c1a] mb-1.5" htmlFor="groom-fullname">
                        Nama Lengkap &amp; Gelar
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#f6f3ef] text-[#1c1c1a] text-[14px] font-medium focus:bg-white focus:ring-1 focus:ring-[#063025] focus:outline-none transition-all"
                        id="groom-fullname"
                        value={groomFullname}
                        onChange={(e) => setGroomFullname(e.target.value)}
                        type="text"
                      />
                      <span className="text-[11px] text-[#414845] mt-1 block">Akan ditampilkan pada header pembuka &amp; sampul</span>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-[#1c1c1a] mb-1.5" htmlFor="groom-nickname">
                        Nama Panggilan
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#f6f3ef] text-[#1c1c1a] text-[14px] font-medium focus:bg-white focus:ring-1 focus:ring-[#063025] focus:outline-none transition-all"
                        id="groom-nickname"
                        value={groomNickname}
                        onChange={(e) => setGroomNickname(e.target.value)}
                        type="text"
                      />
                      <span className="text-[11px] text-[#414845] mt-1 block">Digunakan pada monogram nama singkat</span>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[13px] font-semibold text-[#1c1c1a] mb-1.5" htmlFor="groom-parents">
                        Nama Ayah &amp; Ibu Kandung
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#f6f3ef] text-[#1c1c1a] text-[14px] font-medium focus:bg-white focus:ring-1 focus:ring-[#063025] focus:outline-none transition-all"
                        id="groom-parents"
                        value={groomParents}
                        onChange={(e) => setGroomParents(e.target.value)}
                        type="text"
                      />
                      <span className="text-[11px] text-[#414845] mt-1 block">Putra pertama dari keluarga besar Bpk. Hendra Wijaya</span>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[13px] font-semibold text-[#1c1c1a] mb-1.5" htmlFor="groom-instagram">
                        Akun Media Sosial (Instagram)
                      </label>
                      <div className="flex items-center rounded-lg bg-[#f6f3ef] px-3.5 focus-within:bg-white focus-within:ring-1 focus-within:ring-[#063025] transition-all">
                        <span className="text-[14px] text-[#414845] mr-1">@</span>
                        <input
                          className="w-full py-2.5 bg-transparent text-[#1c1c1a] text-[14px] focus:outline-none font-medium"
                          id="groom-instagram"
                          value={groomInstagram}
                          onChange={(e) => setGroomInstagram(e.target.value)}
                          type="text"
                        />
                        <span className="material-symbols-outlined text-[18px] text-[#414845]">open_in_new</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* SUB-CARD 2: Mempelai Wanita (The Bride) */}
                <section className="rounded-2xl bg-white p-6 shadow-sm border border-[#063025]/5">
                  <div className="flex items-center justify-between pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#ffdea4] flex items-center justify-center text-[#261900]">
                        <span className="material-symbols-outlined text-[18px]">woman</span>
                      </div>
                      <div>
                        <h3 className="font-headline text-lg text-[#063025] font-semibold">Mempelai Wanita</h3>
                        <p className="text-[12px] text-[#414845]">Calon pengantin putri beserta garis keluarga</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ffdb99] text-[#795f28] text-[11px] font-bold">
                      Wajib Diisi
                    </span>
                  </div>

                  {/* Photo Upload Dropzone & Thumbnail */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2 pb-5">
                    <div className="md:col-span-4 flex flex-col items-center justify-center p-3 rounded-xl bg-[#f6f3ef]">
                      <div className="w-24 h-28 rounded-lg overflow-hidden relative shadow-sm">
                        <img className="w-full h-full object-cover" alt="Bride portrait" src={bridePhoto} />
                        <div className="absolute bottom-1 right-1 bg-white/90 px-1.5 py-0.5 rounded text-[10px] font-bold text-[#755a24] flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[10px]">photo_camera</span>
                          Foto
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-[#063025] mt-2">shinta-portrait.jpg</span>
                      <span className="text-[11px] text-[#414845]">1.8 MB • Siap</span>
                    </div>

                    <div className="md:col-span-8 flex flex-col justify-center items-center p-5 rounded-xl bg-white border border-dashed border-[#c1c8c3] text-center">
                      <div className="w-10 h-10 rounded-full bg-[#f0edea] flex items-center justify-center text-[#063025] mb-2">
                        <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
                      </div>
                      <p className="text-[14px] font-semibold text-[#1c1c1a]">Unggah Foto Mempelai Wanita</p>
                      <p className="text-[12px] text-[#414845] mt-0.5 mb-3">Format JPG atau PNG (Maksimal 5MB, rasio disarankan 3:4)</p>
                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer px-4 py-1.5 rounded-lg bg-[#f0edea] hover:bg-[#ebe8e4] text-[#1c1c1a] text-[12px] font-semibold transition-colors flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px]">add_photo_alternate</span>
                          <span>Ganti File</span>
                          <input
                            accept="image/*"
                            className="hidden"
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) setBridePhoto(URL.createObjectURL(file));
                            }}
                          />
                        </label>
                        <button
                          onClick={() => setBridePhoto('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80')}
                          className="px-3 py-1.5 rounded-lg bg-transparent hover:bg-[#f6f3ef] text-[#414845] text-[12px] font-semibold transition-colors"
                          type="button"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1c1c1a] mb-1.5" htmlFor="bride-fullname">
                        Nama Lengkap &amp; Gelar
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#f6f3ef] text-[#1c1c1a] text-[14px] font-medium focus:bg-white focus:ring-1 focus:ring-[#063025] focus:outline-none transition-all"
                        id="bride-fullname"
                        value={brideFullname}
                        onChange={(e) => setBrideFullname(e.target.value)}
                        type="text"
                      />
                      <span className="text-[11px] text-[#414845] mt-1 block">Akan dicetak pada sampul depan dan pengantar doa</span>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-[#1c1c1a] mb-1.5" htmlFor="bride-nickname">
                        Nama Panggilan
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#f6f3ef] text-[#1c1c1a] text-[14px] font-medium focus:bg-white focus:ring-1 focus:ring-[#063025] focus:outline-none transition-all"
                        id="bride-nickname"
                        value={brideNickname}
                        onChange={(e) => setBrideNickname(e.target.value)}
                        type="text"
                      />
                      <span className="text-[11px] text-[#414845] mt-1 block">Digunakan pada monogram nama singkat</span>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[13px] font-semibold text-[#1c1c1a] mb-1.5" htmlFor="bride-parents">
                        Nama Ayah &amp; Ibu Kandung
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#f6f3ef] text-[#1c1c1a] text-[14px] font-medium focus:bg-white focus:ring-1 focus:ring-[#063025] focus:outline-none transition-all"
                        id="bride-parents"
                        value={brideParents}
                        onChange={(e) => setBrideParents(e.target.value)}
                        type="text"
                      />
                      <span className="text-[11px] text-[#414845] mt-1 block">Putri kedua dari keluarga besar Bpk. Bambang Irawan</span>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[13px] font-semibold text-[#1c1c1a] mb-1.5" htmlFor="bride-instagram">
                        Akun Media Sosial (Instagram)
                      </label>
                      <div className="flex items-center rounded-lg bg-[#f6f3ef] px-3.5 focus-within:bg-white focus-within:ring-1 focus-within:ring-[#063025] transition-all">
                        <span className="text-[14px] text-[#414845] mr-1">@</span>
                        <input
                          className="w-full py-2.5 bg-transparent text-[#1c1c1a] text-[14px] focus:outline-none font-medium"
                          id="bride-instagram"
                          value={brideInstagram}
                          onChange={(e) => setBrideInstagram(e.target.value)}
                          type="text"
                        />
                        <span className="material-symbols-outlined text-[18px] text-[#414845]">open_in_new</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Bottom Navigation Bar */}
                <div className="flex items-center justify-between pt-4 pb-12">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#f0edea] hover:bg-[#ebe8e4] text-[#1c1c1a] font-semibold text-[14px] transition-all gap-2"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    <span>Sebelumnya (Tema &amp; URL)</span>
                  </button>

                  <button
                    onClick={() => {
                      alert('Data profil kedua mempelai berhasil disimpan! Lanjut ke Step 3: Jadwal & Lokasi.');
                      setCurrentStep(3);
                    }}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#063025] hover:bg-[#20463a] text-white font-semibold text-[14px] transition-all shadow-md gap-2"
                    type="button"
                  >
                    <span>Simpan &amp; Lanjut ke Jadwal</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT PANE: Sticky Interactive Live Preview Canvas (5 of 12 cols ~ 42%) */}
            <div className="col-span-12 xl:col-span-5 bg-[#f6f3ef] p-6 lg:p-8 flex flex-col items-center xl:sticky xl:top-16 xl:h-[calc(100vh-4rem)] overflow-y-auto">
              {/* Preview Controls Header Bar */}
              <div className="w-full max-w-[400px] flex items-center justify-between mb-4 px-1">
                {/* Viewport Switcher */}
                <div className="inline-flex items-center p-1 rounded-full bg-white shadow-xs">
                  <button
                    onClick={() => setViewportMode('mobile')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold transition-all ${
                      viewportMode === 'mobile' ? 'bg-[#063025] text-white' : 'text-[#414845] hover:text-[#1c1c1a]'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">smartphone</span>
                    <span>Mobile</span>
                  </button>

                  <button
                    onClick={() => setViewportMode('desktop')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold transition-all ${
                      viewportMode === 'desktop' ? 'bg-[#063025] text-white' : 'text-[#414845] hover:text-[#1c1c1a]'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">laptop</span>
                    <span>Desktop</span>
                  </button>
                </div>

                {/* Utility Icons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => alert('Pratinjau telah disegarkan!')}
                    className="w-8 h-8 rounded-full bg-white hover:bg-[#f0edea] text-[#1c1c1a] flex items-center justify-center transition-colors shadow-xs"
                    title="Muat Ulang Pratinjau"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">refresh</span>
                  </button>
                  <Link
                    href="/"
                    target="_blank"
                    className="w-8 h-8 rounded-full bg-white hover:bg-[#f0edea] text-[#1c1c1a] flex items-center justify-center transition-colors shadow-xs"
                    title="Buka di Tab Baru"
                  >
                    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                  </Link>
                </div>
              </div>

              {/* Smartphone Realistic Mockup Canvas (iPhone 16 styling) */}
              <div className="w-[375px] sm:w-[390px] h-[780px] bg-[#31302e] rounded-[48px] p-3 shadow-2xl relative shrink-0">
                <div className="w-full h-full rounded-[38px] overflow-hidden bg-[#063025] text-white relative flex flex-col">
                  {/* Dynamic Island & Status Bar */}
                  <div className="absolute top-0 left-0 right-0 h-10 px-6 flex items-center justify-between z-30 pointer-events-none">
                    <span className="text-[12px] font-semibold text-white/90">09:41</span>
                    <div className="w-24 h-5 bg-black rounded-full mx-auto"></div>
                    <div className="flex items-center gap-1.5 text-white/90">
                      <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
                      <span className="material-symbols-outlined text-[14px]">wifi</span>
                      <span className="material-symbols-outlined text-[14px]">battery_full</span>
                    </div>
                  </div>

                  {/* Scrollable Invitation Body */}
                  <div className="flex-1 overflow-y-auto scrollbar-none pt-12 pb-8 px-5 flex flex-col items-center text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#063025] via-[#20463a]/80 to-[#063025] pointer-events-none"></div>
                    <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#755a24]/15 blur-2xl pointer-events-none"></div>
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#ffdea4]/10 blur-2xl pointer-events-none"></div>

                    <div className="relative z-10 w-full flex flex-col items-center">
                      {/* Monogram Seal */}
                      <div className="mt-4 mb-3 w-14 h-14 rounded-full bg-[#755a24]/20 flex items-center justify-center shadow-inner border border-[#ffdea4]/30">
                        <span className="font-headline text-lg text-[#ffdea4] tracking-widest italic">{monogram}</span>
                      </div>

                      {/* Ceremony Header Badge */}
                      <span className="text-[11px] text-[#e5c281] uppercase tracking-[0.2em] mb-2 font-semibold">
                        Walimatul Ursy
                      </span>

                      {/* Couple Title */}
                      <h1 className="font-headline text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                        The Wedding of<br />
                        <span className="text-[#ffdea4] italic">
                          {groomNickname} &amp; {brideNickname}
                        </span>
                      </h1>

                      {/* Date Capsule */}
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md my-4">
                        <span className="material-symbols-outlined text-[15px] text-[#ffdea4]">calendar_today</span>
                        <span className="text-[13px] text-white/90 font-medium">{eventDate}</span>
                      </div>

                      {/* Couple Featured Photo */}
                      <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden relative my-2 p-1 bg-gradient-to-b from-[#e5c281]/40 via-white/10 to-transparent shadow-xl">
                        <div className="w-full h-full rounded-[14px] overflow-hidden relative bg-[#20463a]">
                          <img
                            className="w-full h-full object-cover"
                            alt="Indonesian wedding couple"
                            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#063025]/90 via-transparent to-transparent"></div>
                          <div className="absolute bottom-3 left-3 right-3 text-left">
                            <p className="text-[14px] text-white font-semibold leading-snug">
                              {groomFullname.split(',')[0]} &amp; {brideFullname.split(',')[0]}
                            </p>
                            <p className="text-[12px] text-[#ffdea4]">Yogyakarta &amp; Surakarta</p>
                          </div>
                        </div>
                      </div>

                      {/* Guest Card */}
                      <div className="w-full mt-4 p-4 rounded-xl bg-white/10 backdrop-blur-md text-center border border-white/10">
                        <span className="text-[11px] text-white/70 block uppercase tracking-wider mb-1 font-semibold">
                          Kepada Yth. Bapak/Ibu/Saudara/i:
                        </span>
                        <p className="font-headline text-lg text-[#ffdea4] font-semibold tracking-tight">{guestName}</p>
                        <p className="text-[11px] text-white/80 mt-0.5">Mohon maaf bila ada kesalahan penulisan nama/gelar</p>
                      </div>

                      {/* CTA */}
                      <button
                        className="w-full mt-4 py-3 px-5 rounded-xl bg-[#ffdea4] text-[#261900] hover:bg-[#e5c281] transition-all font-bold text-[14px] shadow-lg flex items-center justify-center gap-2 group"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                          mail
                        </span>
                        <span>Buka Undangan</span>
                      </button>

                      {/* Segmented Countdown */}
                      <div className="w-full mt-5 pt-4">
                        <span className="text-[11px] text-[#e5c281] uppercase tracking-wider block mb-2 font-semibold">
                          Menuju Hari Bahagia
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/5">
                            <span className="font-headline text-xl text-[#ffdea4] block leading-none font-bold">
                              {countdown.days}
                            </span>
                            <span className="text-[11px] text-white/70">Hari</span>
                          </div>
                          <div className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/5">
                            <span className="font-headline text-xl text-[#ffdea4] block leading-none font-bold">
                              {countdown.hours}
                            </span>
                            <span className="text-[11px] text-white/70">Jam</span>
                          </div>
                          <div className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/5">
                            <span className="font-headline text-xl text-[#ffdea4] block leading-none font-bold">
                              {countdown.mins}
                            </span>
                            <span className="text-[11px] text-white/70">Menit</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="w-full h-5 flex justify-center items-center pb-2">
                    <div className="w-32 h-1 bg-white/40 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
