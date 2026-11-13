# NikahKuy Design System Specification
**Version:** 2.0 (Craft & Polish via UI/UX Pro Max)  
**Industry:** Wedding & Nuptial Tech (SaaS Platform)  
**Style Archetype:** Soft Nuptial Luxury & Romantic Editorial  

---

## 1. Brand Essence & Mood

| Attribute | Specification |
|---|---|
| **Tone & Voice** | Sakral, Hangat, Elegan, Romantis, Terpercaya (*Warm, Reverent, Sophisticated*) |
| **Visual Metaphor** | Kertas linen gading bertekstur, sentuhan foil emas prada, dedaunan botani hijau zamrud, dan tipografi kaligrafi klasik |
| **Target Audience** | Calon pengantin Indonesia (Gen-Z & Milenial) yang menginginkan undangan pernikahan digital praktis tanpa kehilangan kehormatan adat |

---

## 2. Color Palette & Semantic Tokens

Berdasarkan profil **Wedding/Event Planning & Luxury Brand** (UI/UX Pro Max):

```
Primary (Deep Emerald):        #063025   (Text/Buttons/Headers - Keagungan & Kesakralan)
Primary Container:             #1D473B   (Subtle card backdrops & elevated badges)
Primary Fixed / Dim:           #C2ECDB / #A6CFBF (High-contrast badges & highlights)

Secondary (Antique Gold):       #755A24   (Aksen teks, divider, status, bintang rating)
Secondary Light / Fixed:       #FFDEA4   (Pill badges, highlight buttons, icons)
Secondary Container:           #FFDB99   (Soft champagne container backgrounds)

Tertiary (Romantic Blush):     #42201F   (Accent hangat, floral hints)
Tertiary Fixed:                #FFDAD8   (Soft warm rose highlights)

Surface (Ivory Alabaster):     #FCF9F5   (Base background, clean & warm paper feel)
Surface Low / Container:       #F6F3EF / #F0EDEA (Card surfaces & section separation)
Surface Lowest:                #FFFFFF   (Clean card highlights)
On-Surface (Dark Charcoal):    #1C1C1A   (Maximum contrast body text, WCAG 4.5:1+)
On-Surface Variant (Muted):    #414845   (Secondary copy & supporting text)
Outline Variant (Hairline):    #C1C8C3   (Borders & dividers)
```

---

## 3. Typography Hierarchy

| Role | Font Family | Weights | Usage |
|---|---|---|---|
| **Display / Headlines** | `Playfair Display`, serif | 500, 600, 700 (Italic) | Hero H1, Section Titles, Couple Names |
| **UI Body / Controls** | `Plus Jakarta Sans`, sans-serif | 400, 500, 600, 700 | Paragraf, Navigasi, Tombol CTA, Label |
| **Romantic Accent** | `Alex Brush`, cursive | 400 | "The Wedding of", "Walimatul 'Urs", Monogram |

### Typography Scale
- **Display Lg:** `54px` (Line height: `64px`, Tracking: `-0.02em`)
- **Headline Lg:** `40px` (Line height: `48px`, Tracking: `-0.01em`)
- **Headline Md:** `28px` (Line height: `36px`, Weight: `500`)
- **Headline Sm:** `22px` (Line height: `30px`, Weight: `600`)
- **Title Lg:** `20px` (Line height: `28px`, Weight: `600`)
- **Title Md:** `16px` (Line height: `24px`, Weight: `600`)
- **Body Lg:** `18px` (Line height: `28px`, Weight: `400`)
- **Body Md:** `15px` (Line height: `24px`, Weight: `400`)
- **Body Sm:** `13px` (Line height: `20px`, Weight: `400`)
- **Label Md / Sm:** `13px / 11px` (Letter spacing: `0.04em - 0.08em`, Uppercase)

---

## 4. Interaction & Motion Principles (Emil Kowalski Philosophy)

1. **Context-Aware Micro-Interactions:**
   - Tombol utama dilengkapi efek berkilau lembut (*shimmer effect*) yang berjalan periodik secara anggun tanpa mengganggu.
   - Kartu template dan layanan memiliki transisi hover halus (`translateY(-6px)` dengan bayangan lembut bergradasi zamrud `rgba(6, 48, 37, 0.12)`).
2. **Sensory Feedback:**
   - Pemutar sampel audio interaktif dengan visualizer gelombang suara (*equalizer soundbars*).
   - Indikator live status ("Simulasi RSVP" dengan feedback instan ke toast notification).
   - Ticker countdown real-time yang terus menghitung mundur secara presisi setiap detik.
3. **Modal Dialog:**
   - Pratinjau *Live Demo* tema terbuka dengan animasi fade dan backdrop blur tanpa reflow layout.

---

## 5. Accessibility (WCAG 2.2 AA Compliance)

- [x] **Color Contrast:** Rasio teks terhadap latar belakang dijamin minimal 4.5:1 untuk normal text dan 3:1 untuk large text.
- [x] **Hit Target Size:** Semua kontrol sentuh dan tombol memiliki luas sentuh minimal 44×44px.
- [x] **User Zoom Freedom:** Menghapus `maximum-scale=1.0, user-scalable=no` pada viewport meta tag untuk mendukung pembaca difabel low-vision.
- [x] **Focus Indicator:** Menambahkan visible focus rings (`:focus-visible`) setebal 2px dengan offset 3px.
- [x] **Semantic HTML & Aria:** Menggunakan semantic tags (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`, `<details>`) lengkap dengan `aria-label`, `aria-expanded`, dan `aria-selected`.
- [x] **Skip to Content:** Dilengkapi tautan navigasi pintas aksesibilitas untuk pengguna pembaca layar (screen reader) dan keyboard navigation.
