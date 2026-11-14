'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Silakan masukkan nama lengkap Anda.');
      return;
    }
    if (!contact.trim()) {
      setError('Silakan masukkan email atau nomor WhatsApp Anda.');
      return;
    }
    if (!password || password.length < 8) {
      setError('Kata sandi harus minimal 8 karakter.');
      return;
    }
    if (!agreeTerms) {
      setError('Anda harus menyetujui Ketentuan Layanan & Kebijakan Privasi.');
      return;
    }

    setIsLoading(true);
    try {
      // Simulasi panggilan endpoint register (NextAuth / Supabase / API backend)
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    } catch (err) {
      setError('Gagal membuat akun. Silakan coba kembali.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    console.log('Initiating Google OAuth register...');
  };

  return (
    <div className="min-h-screen bg-[#fcf9f5] font-sans text-[#1c1c1a] antialiased flex flex-col justify-between selection:bg-[#ffdea4] selection:text-[#261900]">
      
      {/* TOP HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fcf9f5]/85 backdrop-blur-xl border-b border-[#c1c8c3]/30 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-16 sm:h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-[#063025] flex items-center justify-center text-[#ffdea4] shadow-sm transition-transform duration-300 group-hover:scale-105">
              <span className="material-symbols-outlined text-[18px]">favorite</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#063025] leading-none">
                NikahKuy
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#755a24] font-semibold mt-0.5">
                Atelier
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#414845] hover:text-[#063025] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="w-full pt-20 sm:pt-24 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-10 py-10">
        <div className="w-full max-w-6xl mx-auto min-h-[720px] lg:min-h-[800px] flex flex-col lg:flex-row shadow-2xl rounded-3xl overflow-hidden bg-white border border-[#c1c8c3]/40">
          
          {/* ========================================= */}
          {/* LEFT PANEL: Visual Showcase & Mockup (45%)*/}
          {/* ========================================= */}
          <div className="w-full lg:w-[45%] relative bg-gradient-to-br from-[#063025] via-[#1d473b] to-[#063025] text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between overflow-hidden">
            
            {/* Ambient Gold Glows */}
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#c8aa6e]/15 blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-[#c2ecdb]/10 blur-2xl pointer-events-none" />

            {/* Top Brand Anchor */}
            <div className="relative z-10 flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-2 group transition-transform duration-300 hover:-translate-x-1"
              >
                <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-[#ffdea4] transition-colors group-hover:bg-white/20">
                  <span className="material-symbols-outlined text-[18px]">west</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl text-white font-bold tracking-wide leading-none">NikahKuy</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#ffdea4] mt-0.5 opacity-90">Atelier Suite</span>
                </div>
              </Link>
              <span className="text-[11px] font-bold tracking-widest uppercase bg-white/10 px-3 py-1 rounded-full text-[#ffdea4] backdrop-blur-md border border-white/10">
                Edisi 2026
              </span>
            </div>

            {/* Center: Floating Smartphone Mockup */}
            <div className="relative z-10 my-8 lg:my-0 flex justify-center items-center">
              <div className="relative w-[280px] sm:w-[310px] rounded-[42px] p-2.5 bg-gradient-to-b from-[#ffdea4]/30 via-white/10 to-transparent shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-md">
                
                {/* Smartphone Screen Frame */}
                <div className="w-full rounded-[34px] bg-[#fcf9f5] text-[#1c1c1a] overflow-hidden relative shadow-inner">
                  
                  {/* Status Bar */}
                  <div className="pt-2.5 px-5 pb-1.5 flex justify-between items-center text-[10px] text-[#717975]">
                    <span className="font-semibold text-[#063025]">09:41</span>
                    <div className="flex items-center gap-1 text-[12px]">
                      <span className="material-symbols-outlined text-[12px]">signal_cellular_alt</span>
                      <span className="material-symbols-outlined text-[12px]">wifi</span>
                      <span className="material-symbols-outlined text-[14px]">battery_full</span>
                    </div>
                  </div>

                  {/* Invitation Hero Image in Mockup */}
                  <div className="relative h-[200px] w-full overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlxL8U6xo8QBVNCMlfNrsEP2ScLFrT6neSaVEEIC_vQGUPeVbtvsX9paGV0SQ5HAk0N8k-5Go-rljAyvy4Gz63jFdX1ih2nRQR17dHhDMfNdYr-AxDjK75H-kpuD3GsLG2B7AkZCpuMZtGmGV0AEYh5x01pH6d2hwPuzeHQp26v55K3E7x5bLywYvGq_fhkOJ5yt9Jb42TXv0dhvrcrwZM4kyKV_CWHi8-4IFjNR0"
                      alt="Pratinjau Undangan Pernikahan Rama dan Shinta"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#063025]/90 via-[#063025]/30 to-transparent" />
                    
                    {/* Floating Title inside Mockup */}
                    <div className="absolute bottom-2.5 left-3 right-3 text-center">
                      <span className="text-[9px] uppercase tracking-widest text-[#ffdea4] font-bold">
                        Undangan Pernikahan
                      </span>
                      <h4 className="font-serif text-lg text-white italic font-bold tracking-wide mt-0.5 leading-tight">
                        Rama &amp; Shinta
                      </h4>
                      <p className="text-[10px] text-white/80 mt-0.5">Sabtu, 24 Oktober 2026</p>
                    </div>
                  </div>

                  {/* Invitation Content Snippet */}
                  <div className="p-3.5 bg-white flex flex-col gap-2.5">
                    {/* Countdown Timer in Mockup */}
                    <div className="flex items-center justify-between gap-1 py-1.5 px-2.5 rounded-xl bg-[#f6f3ef] border border-[#c1c8c3]/40">
                      <div className="flex flex-col items-center flex-1">
                        <span className="font-serif text-sm text-[#063025] font-bold leading-tight">42</span>
                        <span className="text-[8px] text-[#717975] uppercase tracking-wider">Hari</span>
                      </div>
                      <span className="text-[#755a24]/40 font-serif">:</span>
                      <div className="flex flex-col items-center flex-1">
                        <span className="font-serif text-sm text-[#063025] font-bold leading-tight">08</span>
                        <span className="text-[8px] text-[#717975] uppercase tracking-wider">Jam</span>
                      </div>
                      <span className="text-[#755a24]/40 font-serif">:</span>
                      <div className="flex flex-col items-center flex-1">
                        <span className="font-serif text-sm text-[#063025] font-bold leading-tight">19</span>
                        <span className="text-[8px] text-[#717975] uppercase tracking-wider">Menit</span>
                      </div>
                    </div>

                    {/* Features Row */}
                    <div className="flex items-center justify-around text-center py-0.5">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-[#ffdb99]/40 flex items-center justify-center text-[#755a24]">
                          <span className="material-symbols-outlined text-[13px]">event</span>
                        </div>
                        <span className="text-[8px] text-[#414845] mt-0.5">Akad &amp; Resepsi</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-[#ffdb99]/40 flex items-center justify-center text-[#755a24]">
                          <span className="material-symbols-outlined text-[13px]">location_on</span>
                        </div>
                        <span className="text-[8px] text-[#414845] mt-0.5">Peta Lokasi</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-[#ffdb99]/40 flex items-center justify-center text-[#755a24]">
                          <span className="material-symbols-outlined text-[13px]">volunteer_activism</span>
                        </div>
                        <span className="text-[8px] text-[#414845] mt-0.5">Kirim Kado</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Overlapping Floating RSVP Badge */}
                <div className="absolute -bottom-3 -right-3 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl flex items-center gap-2.5 border border-[#c1c8c3]/40">
                  <div className="w-8 h-8 rounded-full bg-[#063025] flex items-center justify-center text-[#ffdea4] shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                  </div>
                  <div className="flex flex-col pr-1">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9px] uppercase tracking-wider text-[#755a24] font-bold">
                        RSVP Terkini
                      </span>
                    </div>
                    <span className="text-xs text-[#063025] font-bold">342 Tamu Hadir</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Testimonial Social Proof */}
            <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-sm flex items-center gap-3.5 mt-6 border border-white/10">
              <div className="relative shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRV_q2BO5FRYnNpJQB5HwR93IktbYguguw7oTXcMWkJ1-HgE0ec85N9fOLq2nc2UgCmeow8nZ1jzmS-5sdQixZ6-GK50Cj7c-Z8vHsqlQvTgBRubSa9nE5YAcXmetTb0B2nJdlkhpaaIG39hDPsLvAkrJ-F7FwW46rbD4nKg2qZlJqb9S4c0RfW_hZNtYwCJX0thlpkfjKpXt6LMUoGEymvO7_IGz8E1pKBcaeK2o"
                  alt="Foto pengantin"
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#ffdb99] text-[#755a24] flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1 text-[#ffdea4] mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[13px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                  <span className="text-[10px] text-white/80 ml-1 font-bold">4.9 / 5.0</span>
                </div>
                <p className="text-xs text-white/90 italic leading-snug line-clamp-2">
                  &ldquo;Lebih dari 48.000+ pasangan telah membagikan momen bahagia mereka bersama NikahKuy.&rdquo;
                </p>
              </div>
            </div>

          </div>

          {/* ========================================= */}
          {/* RIGHT PANEL: Register Form (55%)          */}
          {/* ========================================= */}
          <div className="w-full lg:w-[55%] bg-[#fcf9f5] flex items-center justify-center p-8 sm:p-12 lg:p-16">
            <div className="w-full max-w-[420px] flex flex-col">
              
              {/* Header Text */}
              <div className="mb-6">
                <span className="text-xs text-[#755a24] font-bold uppercase tracking-widest block mb-2">
                  Registrasi Calon Pengantin
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#063025] tracking-tight">
                  Buat Akun NikahKuy
                </h1>
                <p className="text-sm text-[#414845] mt-2 leading-relaxed">
                  Mulai rancang undangan pernikahan digital elegan Anda dalam hitungan menit.
                </p>
              </div>

              {/* Status Alert Messages */}
              {error && (
                <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-red-600 shrink-0">error</span>
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-emerald-600 shrink-0">check_circle</span>
                  <span>Akun berhasil didaftarkan! Mengalihkan ke halaman masuk...</span>
                </div>
              )}

              {/* Google Social Signup */}
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="w-full py-3.5 px-4 rounded-2xl bg-white border border-[#c1c8c3]/60 shadow-xs hover:bg-[#f6f3ef] hover:border-[#c1c8c3] active:scale-[0.99] transition-all flex items-center justify-center gap-3 group"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.27 21.43 7.33 24 12 24z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.57H1.25C.45 8.16 0 9.98 0 12s.45 3.84 1.25 5.43l4.03-3.14z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.57 1.25 6.57l4.03 3.14c.95-2.83 3.6-4.96 6.72-4.96z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-sm font-semibold text-[#1c1c1a]">Daftar dengan Akun Google</span>
              </button>

              {/* Divider */}
              <div className="relative my-6 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-[1px] bg-[#c1c8c3]/40" />
                </div>
                <span className="relative z-10 px-4 bg-[#fcf9f5] text-xs text-[#717975] uppercase tracking-wider font-medium">
                  atau daftar dengan email
                </span>
              </div>

              {/* Form Input Fields */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* Field 1: Nama Lengkap */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="reg-fullname" className="text-xs font-semibold text-[#063025]">
                      Nama Lengkap
                    </label>
                    <span className="text-[11px] text-[#755a24] font-medium">Sesuai KTP / Panggilan</span>
                  </div>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-[#717975] pointer-events-none">
                      person
                    </span>
                    <input
                      id="reg-fullname"
                      name="fullname"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Contoh: Dimas & Anindya / Dimas Pratama"
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-white border border-[#c1c8c3]/70 text-[#1c1c1a] placeholder:text-[#717975]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#063025] focus:border-transparent transition-all shadow-xs"
                      required
                    />
                  </div>
                </div>

                {/* Field 2: Email atau Nomor WhatsApp */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="reg-contact" className="text-xs font-semibold text-[#063025]">
                    Email atau Nomor WhatsApp
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-[#717975] pointer-events-none">
                      alternate_email
                    </span>
                    <input
                      id="reg-contact"
                      name="contact"
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="nama@email.com atau 0812xxxx"
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-white border border-[#c1c8c3]/70 text-[#1c1c1a] placeholder:text-[#717975]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#063025] focus:border-transparent transition-all shadow-xs"
                      required
                    />
                  </div>
                </div>

                {/* Field 3: Kata Sandi */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="reg-password" className="text-xs font-semibold text-[#063025]">
                    Kata Sandi
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-[#717975] pointer-events-none">
                      lock
                    </span>
                    <input
                      id="reg-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimal 8 karakter sandi"
                      minLength={8}
                      className="w-full h-12 pl-11 pr-12 rounded-xl bg-white border border-[#c1c8c3]/70 text-[#1c1c1a] placeholder:text-[#717975]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#063025] focus:border-transparent transition-all shadow-xs"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                      className="absolute right-3 p-1.5 rounded-lg text-[#717975] hover:text-[#063025] transition-colors flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#717975] text-[11px] mt-0.5">
                    <span className="material-symbols-outlined text-[13px] text-[#755a24]">info</span>
                    <span>Minimal 8 karakter kombinasi huruf &amp; angka</span>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <label className="flex items-start gap-2.5 cursor-pointer mt-1 select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#063025] focus:ring-[#063025] border-gray-300"
                    required
                  />
                  <span className="text-xs text-[#414845] leading-relaxed">
                    Saya menyetujui{' '}
                    <Link href="/terms" className="text-[#063025] font-semibold underline underline-offset-2 hover:text-[#755a24]">
                      Ketentuan Layanan
                    </Link>{' '}
                    &amp;{' '}
                    <Link href="/privacy" className="text-[#063025] font-semibold underline underline-offset-2 hover:text-[#755a24]">
                      Kebijakan Privasi
                    </Link>{' '}
                    NikahKuy.
                  </span>
                </label>

                {/* Primary Submit CTA */}
                <button
                  type="submit"
                  disabled={isLoading || success}
                  className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#063025] via-[#1d473b] to-[#063025] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-xl hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-[#ffdea4] border-t-transparent rounded-full animate-spin" />
                      <span>Memproses Akun...</span>
                    </div>
                  ) : success ? (
                    <div className="flex items-center gap-2 text-[#ffdea4]">
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      <span>Akun Berhasil Dibuat!</span>
                    </div>
                  ) : (
                    <>
                      <span>Daftar Sekarang</span>
                      <span className="material-symbols-outlined text-[18px] text-[#ffdea4] transition-transform duration-300 group-hover:translate-x-1">
                        east
                      </span>
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Navigation Links */}
              <div className="flex flex-col items-center gap-4 mt-7 text-center">
                <p className="text-xs text-[#414845]">
                  Sudah punya akun NikahKuy?
                  <Link
                    href="/login"
                    className="text-[#063025] font-bold hover:text-[#755a24] transition-colors inline-flex items-center gap-0.5 ml-1.5"
                  >
                    <span>Masuk di sini</span>
                    <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                  </Link>
                </p>

                <div className="w-full max-w-[280px] h-[1px] bg-[#c1c8c3]/40" />

                {/* Direct WhatsApp Assist Pill */}
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-[#ffdb99]/30 hover:bg-[#ffdb99]/60 text-[#5b430e] transition-all shadow-xs group"
                >
                  <span className="material-symbols-outlined text-[17px] text-[#755a24]">support_agent</span>
                  <span className="text-xs font-medium">
                    Mau diproses admin langsung?{' '}
                    <span className="font-bold underline underline-offset-2 text-[#063025] group-hover:text-[#755a24]">
                      Pesan via WA →
                    </span>
                  </span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#f6f3ef] py-4 border-t border-[#c1c8c3]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#717975]">
          <span>© 2026 NikahKuy Atelier. Keanggunan Digital Indonesia.</span>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#755a24]">lock</span>
              Aman &amp; Terenkripsi
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#755a24]">shield</span>
              Privasi Pengantin Terjaga
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
