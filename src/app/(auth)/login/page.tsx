'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError('Silakan masukkan email atau nomor WhatsApp Anda.');
      return;
    }
    if (!password) {
      setError('Silakan masukkan kata sandi Anda.');
      return;
    }

    setIsLoading(true);
    // Simulasi autentikasi / integrasi backend Auth (NextAuth / Supabase / Firebase / API)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Redirect atau aksi login sukses
      window.location.href = '/portal/overview';
    } catch (err) {
      setError('Kombinasi akun dan kata sandi tidak sesuai.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Handler OAuth Google
    console.log('Initiating Google OAuth login...');
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
        <div className="w-full max-w-6xl mx-auto min-h-[680px] lg:min-h-[750px] flex flex-col lg:flex-row shadow-2xl rounded-3xl overflow-hidden bg-white border border-[#c1c8c3]/40">
          
          {/* ========================================= */}
          {/* LEFT PANEL: Visual Showcase & Brand (45%) */}
          {/* ========================================= */}
          <div className="w-full lg:w-[45%] relative bg-gradient-to-br from-[#063025] via-[#1d473b] to-[#063025] text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between overflow-hidden">
            
            {/* Decorative Background Glows */}
            <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#c8aa6e]/15 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#c2ecdb]/10 blur-2xl pointer-events-none" />

            {/* Top Branding Pill */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ffdea4] animate-pulse" />
                <span className="text-xs uppercase tracking-widest font-bold text-[#ffdea4]">
                  Portal Pasangan &amp; Tamu
                </span>
              </div>
              <span className="text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-[#ffdea4] backdrop-blur-md border border-white/10">
                Eksklusif
              </span>
            </div>

            {/* Center Copy & Perks */}
            <div className="relative z-10 my-10 lg:my-0 flex flex-col gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#755a24]/30 text-[#ffdea4] border border-[#ffdea4]/20">
                  <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider">Keanggunan Digital</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight font-semibold tracking-tight">
                  Satu Sentuhan,<br />
                  <span className="italic font-normal text-[#ffdea4]">Ribuan Pesona.</span>
                </h2>
                <p className="text-sm text-[#a7d1c1] max-w-sm leading-relaxed">
                  Kendali penuh rangkaian pesta pernikahan berkelas dalam satu genggaman atelier modern.
                </p>
              </div>

              {/* 3 Perks List */}
              <div className="flex flex-col gap-3">
                
                {/* Perk 1 */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-[#ffdea4]/20 text-[#ffdea4] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">edit_calendar</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="text-sm font-semibold text-white">Edit Konten Real-Time</h3>
                    <p className="text-xs text-[#a7d1c1] mt-0.5 leading-relaxed">
                      Perbarui jam akad, lokasi resepsi, dan lagu latar kapan saja tanpa cetak ulang.
                    </p>
                  </div>
                </div>

                {/* Perk 2 */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-[#ffdea4]/20 text-[#ffdea4] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">forward_to_inbox</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="text-sm font-semibold text-white">Sebar Link Tamu Tanpa Batas</h3>
                    <p className="text-xs text-[#a7d1c1] mt-0.5 leading-relaxed">
                      Kirim undangan ke ribuan kontak WhatsApp dengan generator sapaan nama personal.
                    </p>
                  </div>
                </div>

                {/* Perk 3 */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-[#ffdea4]/20 text-[#ffdea4] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">savings</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="text-sm font-semibold text-white">Rekap RSVP &amp; Amplop 0% Fee</h3>
                    <p className="text-xs text-[#a7d1c1] mt-0.5 leading-relaxed">
                      Pantau kepastian kehadiran tamu dan terima hadiah kasih langsung ke rekening Anda.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Social Proof */}
            <div className="relative z-10 pt-6 border-t border-white/15 flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-[#ffdea4] text-[#261900] text-[10px] font-bold flex items-center justify-center shadow">
                  NK
                </div>
                <div className="w-7 h-7 rounded-full bg-[#f0edea] text-[#063025] text-[10px] font-bold flex items-center justify-center shadow">
                  DA
                </div>
                <div className="w-7 h-7 rounded-full bg-[#20463a] text-[#ffdea4] text-[10px] font-bold flex items-center justify-center shadow border border-white/20">
                  MR
                </div>
              </div>
              <p className="text-xs text-[#a7d1c1] font-medium">
                Dipercaya oleh 48.000+ pasangan di seluruh Indonesia
              </p>
            </div>

          </div>

          {/* ========================================= */}
          {/* RIGHT PANEL: Login Form (55%)             */}
          {/* ========================================= */}
          <div className="w-full lg:w-[55%] bg-[#fcf9f5] flex items-center justify-center p-8 sm:p-12 lg:p-16">
            <div className="w-full max-w-[420px] flex flex-col">
              
              {/* Header Title */}
              <div className="mb-8">
                <span className="text-xs text-[#755a24] font-bold uppercase tracking-widest block mb-2">
                  Akses Dasbor
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#063025] tracking-tight">
                  Selamat Datang
                </h1>
                <p className="text-sm text-[#414845] mt-2 leading-relaxed">
                  Masuk untuk mengelola website undangan pernikahan, RSVP tamu, dan buku tamu digital Anda.
                </p>
              </div>

              {/* Error Alert Box */}
              {error && (
                <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-red-600 shrink-0">error</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Google OAuth Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3.5 px-4 rounded-2xl bg-white border border-[#c1c8c3]/60 shadow-xs hover:bg-[#f6f3ef] hover:border-[#c1c8c3] active:scale-[0.99] transition-all flex items-center justify-center gap-3 group"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-sm font-semibold text-[#1c1c1a]">Masuk dengan Akun Google</span>
              </button>

              {/* Divider */}
              <div className="relative my-6 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-[1px] bg-[#c1c8c3]/40" />
                </div>
                <span className="relative z-10 px-4 bg-[#fcf9f5] text-xs text-[#717975] uppercase tracking-wider font-medium">
                  atau dengan email / wa
                </span>
              </div>

              {/* Form Input Fields */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* Field 1: Identifier (Email / WA) */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="identifier" className="text-xs font-semibold text-[#063025]">
                    Email atau Nomor WhatsApp
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="identifier"
                      name="identifier"
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="nama@email.com atau 0812345..."
                      className="w-full h-12 px-4 rounded-xl bg-white border border-[#c1c8c3]/70 text-[#1c1c1a] placeholder:text-[#717975]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#063025] focus:border-transparent transition-all shadow-xs"
                      required
                    />
                    <span className="material-symbols-outlined absolute right-4 text-[#717975] pointer-events-none text-[20px]">
                      alternate_email
                    </span>
                  </div>
                </div>

                {/* Field 2: Password */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-xs font-semibold text-[#063025]">
                      Kata Sandi
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs font-semibold text-[#755a24] hover:text-[#063025] transition-colors"
                    >
                      Lupa kata sandi?
                    </Link>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan kata sandi Anda"
                      className="w-full h-12 pl-4 pr-12 rounded-xl bg-white border border-[#c1c8c3]/70 text-[#1c1c1a] placeholder:text-[#717975]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#063025] focus:border-transparent transition-all shadow-xs"
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
                </div>

                {/* Checkbox: Remember Me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      id="rememberMe"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-[#063025] focus:ring-[#063025] border-gray-300"
                    />
                    <span className="text-xs text-[#414845]">Ingat saya di perangkat ini</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#ffdea4] via-[#ffdb99] to-[#ffdea4] text-[#261900] font-bold text-sm shadow-md hover:shadow-lg hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-[#261900] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Masuk ke Dashboard</span>
                      <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>
              </form>

              {/* Footer / Register Link */}
              <div className="mt-8 text-center pt-2">
                <p className="text-xs text-[#414845]">
                  Belum punya akun NikahKuy?
                  <Link
                    href="/register"
                    className="text-[#063025] font-bold underline decoration-[#755a24] underline-offset-4 hover:text-[#755a24] transition-colors ml-1.5"
                  >
                    Daftar Gratis Sekarang
                  </Link>
                </p>
              </div>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center gap-1.5 text-[#717975] text-[11px] font-medium uppercase tracking-wider">
                <span className="material-symbols-outlined text-[15px] text-[#755a24]">verified_user</span>
                <span>Keamanan Enkripsi 256-Bit SSL</span>
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
