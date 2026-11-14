'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  // Step 1 State: Identifier & Channel
  const [identifier, setIdentifier] = useState('rama.wijaya@nikahkuy.id');
  const [otpChannel, setOtpChannel] = useState<'wa' | 'email'>('wa');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [step1Success, setStep1Success] = useState(false);

  // Step 2 State: 6-Digit OTP
  const [otp, setOtp] = useState<string[]>(['7', '4', '2', '9', '', '']);
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  // Step 2 State: New Passwords & Visibility
  const [newPassword, setNewPassword] = useState('AsmaraNusantara2025#');
  const [confirmPassword, setConfirmPassword] = useState('AsmaraNusantara2025#');
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // Resend Countdown Timer (54s)
  const [timeLeft, setTimeLeft] = useState(54);
  const [canResend, setCanResend] = useState(false);

  // Submission & Feedback States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // OTP Auto-focus & Backspace handler
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next box
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pastedData[i] || '';
      }
      setOtp(newOtp);
      otpInputs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const clearOtp = () => {
    setOtp(['', '', '', '', '', '']);
    otpInputs.current[0]?.focus();
  };

  // Password Strength Evaluation
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSymbol = /[^A-Za-z0-9]/.test(newPassword);
  const hasLength = newPassword.length >= 8;
  const strengthScore = [hasUppercase, hasNumber, hasSymbol, hasLength].filter(Boolean).length;

  // Handlers
  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSendingOtp(true);
    setTimeout(() => {
      setIsSendingOtp(false);
      setStep1Success(true);
      setTimeLeft(60);
      setCanResend(false);
      otpInputs.current[4]?.focus();
    }, 900);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setErrorMsg('Harap lengkapi 6 digit kode OTP verifikasi.');
      return;
    }
    if (newPassword.length < 8) {
      setErrorMsg('Kata sandi baru harus minimal 8 karakter.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsResetSuccess(true);
      setTimeout(() => {
        window.location.href = '/login';
      }, 2500);
    }, 1200);
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimeLeft(60);
    setCanResend(false);
    clearOtp();
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
        <div className="flex flex-col w-full max-w-6xl mx-auto py-2 sm:py-4">
          
          {/* Editorial Breadcrumb / Sub-bar Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-[#c1c8c3]/40">
            <div className="flex items-center gap-2 text-xs text-[#717975]">
              <span className="text-[#755a24] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#755a24] animate-pulse" />
                Atelier Security Protocol
              </span>
              <span>/</span>
              <span className="text-[#414845] font-medium">Pemulihan Akun Pengantin &amp; Mitra</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#063025] bg-[#ebe8e4] px-3.5 py-1 rounded-full shadow-xs w-fit">
              <span className="material-symbols-outlined text-[15px] text-[#755a24]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
              <span className="font-semibold">256-Bit End-to-End Encryption</span>
            </div>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-red-600 shrink-0">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* DUAL WORKSPACE GRID (5 Cols / 7 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ========================================= */}
            {/* LEFT COLUMN: Step 1 - Request OTP (5 Cols)*/}
            {/* ========================================= */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#c1c8c3]/40 relative overflow-hidden transition-all duration-300">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#ffdea4]/30 rounded-full blur-2xl pointer-events-none" />

                {/* Back Link & Step Tag */}
                <div className="flex items-center justify-between mb-6">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#063025] hover:text-[#755a24] transition-colors group"
                  >
                    <span className="material-symbols-outlined text-[16px] transition-transform group-hover:-translate-x-1">
                      arrow_back
                    </span>
                    <span>Ke Halaman Masuk</span>
                  </Link>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-[#f0edea] rounded-full text-[#755a24]">
                    Langkah 01
                  </span>
                </div>

                {/* Icon Badge */}
                <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-[#f0edea] flex items-center justify-center text-[#063025] mb-4 shadow-xs">
                  <span className="material-symbols-outlined text-[24px] text-[#755a24]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    key
                  </span>
                </div>

                {/* Heading & Copy */}
                <h1 className="font-serif text-2xl font-bold text-[#063025] tracking-tight mb-1.5">
                  Atur Ulang Kata Sandi
                </h1>
                <p className="text-xs text-[#414845] mb-6 leading-relaxed">
                  Masukkan alamat email atau nomor WhatsApp yang terdaftar pada undangan digital Anda. Kami akan mengirimkan token verifikasi rahasia.
                </p>

                {/* Form Input */}
                <form onSubmit={handleRequestOtp} className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label htmlFor="identifierInput" className="text-xs font-bold text-[#1c1c1a] uppercase tracking-wider">
                        Email atau Nomor WhatsApp
                      </label>
                      <span className="text-[10px] text-[#755a24] font-semibold">Tersinkronisasi</span>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#717975]">
                        <span className="material-symbols-outlined text-[19px]">contact_mail</span>
                      </div>
                      <input
                        id="identifierInput"
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="nama@email.com atau 0812xxxx"
                        required
                        className="w-full bg-[#f6f3ef] text-[#1c1c1a] rounded-xl pl-11 pr-4 py-3 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#063025] transition-all placeholder:text-[#717975]/60 border border-[#c1c8c3]/50"
                      />
                    </div>
                    <p className="text-[11px] text-[#717975] mt-1.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-[#755a24]">info</span>
                      Contoh: +628123456789 atau email akun atelier Anda.
                    </p>
                  </div>

                  {/* Channel Radio Selection */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] text-[#717975] uppercase tracking-wider font-bold">Kirim Kode Melalui:</span>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f0edea] cursor-pointer hover:bg-[#ffdea4]/20 transition-colors border border-transparent has-[:checked]:border-[#755a24] has-[:checked]:bg-[#ffdea4]/20">
                        <input
                          type="radio"
                          name="otp_channel"
                          value="wa"
                          checked={otpChannel === 'wa'}
                          onChange={() => setOtpChannel('wa')}
                          className="accent-[#063025] w-4 h-4"
                        />
                        <span className="text-xs font-semibold text-[#063025] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-[#755a24]">chat</span> WhatsApp
                        </span>
                      </label>
                      <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f0edea] cursor-pointer hover:bg-[#ffdea4]/20 transition-colors border border-transparent has-[:checked]:border-[#755a24] has-[:checked]:bg-[#ffdea4]/20">
                        <input
                          type="radio"
                          name="otp_channel"
                          value="email"
                          checked={otpChannel === 'email'}
                          onChange={() => setOtpChannel('email')}
                          className="accent-[#063025] w-4 h-4"
                        />
                        <span className="text-xs font-semibold text-[#063025] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-[#755a24]">mail</span> Email
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isSendingOtp}
                    className="w-full mt-3 py-3.5 px-6 rounded-xl bg-[#755a24] hover:bg-[#5b430e] text-white font-bold text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                  >
                    {isSendingOtp ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>{step1Success ? 'Kirim Ulang Kode' : 'Kirim Kode Verifikasi'}</span>
                        <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                          arrow_forward
                        </span>
                      </>
                    )}
                  </button>
                </form>

                {/* Trust Mini-Card inside Step 1 */}
                <div className="mt-6 p-3 bg-[#f6f3ef] rounded-2xl flex items-center gap-3 border border-[#c1c8c3]/40">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#755a24] shrink-0 shadow-xs">
                    <span className="material-symbols-outlined text-[18px]">celebration</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-[#063025] font-bold">Resepsi Rama &amp; Shinta</div>
                    <div className="text-[11px] text-[#717975] truncate">Terjadwal 24 Oktober 2026 • 420 Undangan</div>
                  </div>
                </div>

              </div>

              {/* Quick WhatsApp Support Link */}
              <div className="mt-4 text-center">
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#755a24] hover:underline font-medium"
                >
                  <span className="material-symbols-outlined text-[15px]">support_agent</span>
                  <span>Butuh bantuan langsung? Hubungi Tim CS WhatsApp 24/7</span>
                </a>
              </div>
            </div>

            {/* ========================================= */}
            {/* RIGHT COLUMN: Step 2 - OTP & Password (7 Cols) */}
            {/* ========================================= */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-xl border border-[#c1c8c3]/40 relative overflow-hidden transition-all duration-300">
                
                {/* Header & Step Indicator */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#c1c8c3]/30">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e5c281] animate-ping" />
                    <span className="text-[10px] uppercase tracking-widest text-[#755a24] font-bold">
                      Langkah 02: Validasi Keamanan
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#ebe8e4] px-3 py-1 rounded-full text-xs text-[#063025]">
                    <span className="material-symbols-outlined text-[14px] text-[#755a24]">schedule</span>
                    <span>
                      {canResend ? (
                        <button
                          type="button"
                          onClick={handleResend}
                          className="font-bold text-[#755a24] underline hover:text-[#5b430e]"
                        >
                          Kirim ulang sekarang
                        </button>
                      ) : (
                        <>
                          Kirim ulang dalam{' '}
                          <span className="font-bold text-[#755a24] font-mono">
                            {timeLeft < 10 ? `00:0${timeLeft}` : `00:${timeLeft}`}
                          </span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <h2 className="font-serif text-2xl font-bold text-[#063025] tracking-tight mb-1">
                  Verifikasi Kode OTP &amp; Password Baru
                </h2>
                <p className="text-xs text-[#414845] mb-6 leading-relaxed">
                  Masukkan 6 digit kode keamanan yang kami kirimkan ke WhatsApp/Email Anda:{' '}
                  <span className="font-semibold text-[#063025]">+62 812 •••• 9821</span>.
                </p>

                {/* OTP 6-Digit Grid */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-[#1c1c1a] uppercase tracking-wider">
                      6-Digit Kode Verifikasi (OTP)
                    </label>
                    <button
                      type="button"
                      onClick={clearOtp}
                      className="text-[11px] text-[#717975] hover:text-[#755a24] transition-colors underline"
                    >
                      Bersihkan
                    </button>
                  </div>

                  <div className="grid grid-cols-6 gap-2 sm:gap-3 max-w-[380px]">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpInputs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={handleOtpPaste}
                        className="w-full aspect-square text-center font-serif text-lg font-bold rounded-xl bg-[#f6f3ef] text-[#063025] focus:bg-white focus:ring-2 focus:ring-[#063025] border border-[#c1c8c3]/60 transition-all outline-none shadow-xs"
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-2.5 text-xs">
                    <span className="text-[#717975]">Tidak menerima kode via WhatsApp?</span>
                    <button
                      type="button"
                      onClick={handleResend}
                      className="text-[#755a24] hover:text-[#5b430e] font-semibold transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[15px]">sync</span>
                      <span>Kirim via SMS / Email</span>
                    </button>
                  </div>
                </div>

                {/* New Password Creation Form */}
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Kata Sandi Baru */}
                    <div>
                      <label htmlFor="newPassword" className="block text-xs font-bold text-[#1c1c1a] uppercase tracking-wider mb-1.5">
                        Kata Sandi Baru
                      </label>
                      <div className="relative">
                        <input
                          id="newPassword"
                          type={showPassword1 ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Min. 8 karakter"
                          required
                          className="w-full bg-[#f6f3ef] text-[#1c1c1a] rounded-xl pl-4 pr-11 py-3 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#063025] transition-all border border-[#c1c8c3]/60 shadow-xs"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword1(!showPassword1)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#717975] hover:text-[#063025]"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {showPassword1 ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Konfirmasi Kata Sandi Baru */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-xs font-bold text-[#1c1c1a] uppercase tracking-wider mb-1.5">
                        Konfirmasi Sandi Baru
                      </label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          type={showPassword2 ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Ulangi kata sandi baru"
                          required
                          className="w-full bg-[#f6f3ef] text-[#1c1c1a] rounded-xl pl-4 pr-11 py-3 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#063025] transition-all border border-[#c1c8c3]/60 shadow-xs"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword2(!showPassword2)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#717975] hover:text-[#063025]"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {showPassword2 ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Password Strength Meter */}
                  <div className="bg-[#f6f3ef] p-3 rounded-2xl border border-[#c1c8c3]/40">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] text-[#717975] uppercase tracking-wider font-bold">
                        Kekuatan Kata Sandi
                      </span>
                      <span className="text-xs text-[#755a24] font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-[#755a24]">check_circle</span>
                        {strengthScore === 4
                          ? 'Sangat Kuat & Aman'
                          : strengthScore === 3
                          ? 'Kuat'
                          : strengthScore === 2
                          ? 'Cukup'
                          : 'Lemah'}
                      </span>
                    </div>

                    {/* Progress Bars */}
                    <div className="grid grid-cols-4 gap-1.5 h-1.5 rounded-full overflow-hidden">
                      <div className={`rounded-full transition-colors ${strengthScore >= 1 ? 'bg-[#755a24]' : 'bg-[#c1c8c3]/40'}`} />
                      <div className={`rounded-full transition-colors ${strengthScore >= 2 ? 'bg-[#755a24]' : 'bg-[#c1c8c3]/40'}`} />
                      <div className={`rounded-full transition-colors ${strengthScore >= 3 ? 'bg-[#755a24]' : 'bg-[#c1c8c3]/40'}`} />
                      <div className={`rounded-full transition-colors ${strengthScore >= 4 ? 'bg-[#755a24]' : 'bg-[#c1c8c3]/40'}`} />
                    </div>

                    {/* Rule indicators */}
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-[#717975]">
                      <span className={hasUppercase ? 'text-[#755a24] font-bold' : ''}>✓ Huruf Besar</span>
                      <span className={hasSymbol ? 'text-[#755a24] font-bold' : ''}>✓ Simbol (#)</span>
                      <span className={hasNumber ? 'text-[#755a24] font-bold' : ''}>✓ Angka</span>
                      <span className={hasLength ? 'text-[#755a24] font-bold' : ''}>✓ &gt; 8 Karakter</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || isResetSuccess}
                      className="w-full sm:w-auto flex-1 py-3.5 px-8 rounded-xl bg-[#063025] hover:bg-[#1d473b] text-white font-bold text-xs tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[18px] text-[#ffdea4]">lock_reset</span>
                          <span>Simpan Password Baru</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setNewPassword('');
                        setConfirmPassword('');
                      }}
                      className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-[#f0edea] text-[#414845] hover:bg-[#ebe8e4] font-semibold text-xs transition-colors"
                    >
                      Bersihkan
                    </button>
                  </div>
                </form>

                {/* Success Feedback Alert */}
                {isResetSuccess && (
                  <div className="mt-5 p-4 rounded-2xl bg-[#063025] text-white flex items-center justify-between shadow-xl animate-fadeIn border border-[#ffdea4]/30">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#ffdea4] text-[24px]">verified</span>
                      <div>
                        <p className="text-xs font-bold">Kata Sandi Berhasil Diperbarui!</p>
                        <p className="text-[11px] text-[#a7d1c1]">Mengalihkan otomatis ke halaman login...</p>
                      </div>
                    </div>
                    <Link
                      href="/login"
                      className="px-4 py-2 bg-[#755a24] hover:bg-[#5b430e] text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      Masuk Sekarang
                    </Link>
                  </div>
                )}

              </div>
            </div>

          </div>

          {/* Reassuring Editorial Footnote & Security Badges */}
          <div className="mt-8 pt-6 border-t border-[#c1c8c3]/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#717975]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#755a24]">encrypted</span>
                <span>Proteksi Sesi Aktif</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#755a24]">sync_saved_locally</span>
                <span>Data Undangan Terproteksi Cadangan Cloud</span>
              </div>
            </div>
            <div className="text-center md:text-right">
              <span>Mengalami kendala pemulihan? </span>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-[#755a24] font-bold hover:underline">
                Chat WhatsApp Konsultan NikahKuy
              </a>
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
