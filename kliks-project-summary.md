# KLIKS.HU — Full Project Summary
*Last updated: April 2026 — use this document to brief a new Claude session*

---

## 🧠 What This Project Is

Building **kliks.hu** — a Hungarian-language agency website for **Kliks Digital**, a boutique performance marketing agency run by **Ádám** (founder). The agency focuses on:
- **Paid ads** (Meta, Google, TikTok)
- **Creative/content strategy for ads**
- **Shopify development**

The Australian version of the agency is **kliks.com.au** (built on Shopify). kliks.hu is a standalone HTML file deployed (or to be deployed) on Vercel.

---

## 👤 Key People & Accounts

| Detail | Info |
|---|---|
| Founder | Ádám |
| Company (HU) | i.care recruitment Kft. |
| Company address | 4029 Debrecen, Csapó utca 50. |
| Main Gmail | wearekliks@gmail.com |
| Personal Gmail | adam.nagy.mm@gmail.com |
| AU agency site | kliks.com.au (on Shopify, hosted via Vercel for workwithadam.com.au) |
| HU domain | kliks.hu (registered at Microware) |
| AU domain | kliks.com.au (registered at VentraIP) |
| Vercel account | adam.nagy.mm@gmail.com |

---

## 🎨 Design & Brand

| Element | Detail |
|---|---|
| Purple | #644bff |
| Orange/red | #ff4315 |
| Background | #0e0d1a (dark) |
| Display font | Clash Display (via Fontshare) |
| Body font | Satoshi (via Fontshare) |
| Theme | Dark, bold, premium — NOT the cream/light theme of kliks.com.au |
| Tone | Casual, direct, cheeky, no corporate fluff — like a founder texting a mate |
| Language | Hungarian throughout |

---

## 📄 Website File

**Current file:** `kliks-hu.html`
- Single self-contained HTML file
- Adam's GIF photo embedded as base64 (optimised from 28MB to 5.9MB)
- Fonts loaded from Fontshare CDN
- Scroll animations via IntersectionObserver
- Hero has animated cycling text (hirdetésekkel / jobb kreatívokkal / Shopify-jal)

---

## ✅ Website Sections — COMPLETED

### 1. Nav
- Logo: KLIKS. (orange dot)
- Links: Szolgáltatások / Folyamat / Eredmények / Rólunk / Őszintén / Ingyenes konzultáció (orange CTA)

### 2. Hero
- Intro: *"Valószínűleg nem csak egy dolog a gond, ha itt vagy."*
- H1: *"Webshopoknak segítünk növekedni:"* + animated cycling word (hirdetésekkel / jobb kreatívokkal / Shopify-jal)
- Pills: "Butik ügynökség" + "Alapítóval dolgozol, nem juniorokkal"
- Services line: Hirdetések · Tartalom · Shopify
- Single orange CTA: "Ingyenes konzultáció →"

### 3. Stats Strip (4 blocks)
- 🌏 Ausztrál és Magyar partnerekkel dolgozunk
- 🧪 Saját márkáinkon is tesztelünk, nem csak a kliensekén
- 0 Zero kötöttség, nem kell minimális időszakra szerződnöd velünk
- 👤 Alapítóval dolgozol, nem juniorokkal

### 4. Mivel foglalkozunk (Services)
- Label: "Mivel foglalkozunk"
- H2: "Hirdetések és Shopify. Semmi más."
- Sub: "Konverziót optimalizálunk, minőségi forgalmat generálunk, majd skálázunk. Imádjuk."
- **Card 1 — Hirdetések:** Meta. Google. TikTok. Hozzák a látogatókat de nincs konverzió? (rhetorical questions + orange answer line)
- **Card 2 — Shopify fejlesztés:** Shopify fókuszú ügynökség vagyunk. (casual, punchy)
- **Card 3 — Hirdetési kreatív stratégia:** De mit mondasz? Mi állít meg 2 másodperc alatt?
- All bullet-free

### 5. Együttműködés menete (How it works)
- Label: "Együttműködés menete"
- Sub: "Nem húzzuk az időt. Már a stratégiai első hívásnál feltérképezzük..."
- 4 steps: 01 Audit / 02 A lista / 03 Megvalósítjuk / 04 Skálázzuk ami működik

### 6. Mit várhatsz reálisan (Results)
- Label: "Mit várhatsz reálisan"
- H2: "Nem ígérünk csodát. De ezeket igen."
- Sub: "Mivel óriási ad junkie a csapat, ezért az alábbiakra számíthatsz..."
- **2×2 grid of metric cards:** ROAS/POAS ↑ / CPA ↓ / Reach:Frequency ⚖ / CTR+Konverzió ↑
- **Wide AU advantage card** (purple tinted, full width): "Amit Ausztráliában már teszteltünk, Magyarországon már bevetésre készen fog állni" — explains the 6-18 month head start

### 7. Rólunk (About)
- Label: "Rólunk"
- **Left:** Adam's animated GIF (retro TV static + b&w portrait on neon yellow) with founder label overlay
- **Right:** H2: "Tudom milyen az, amikor úgy érzed, megrekedtél."
- Copy: stagnation/frustration empathy → "Én is voltam ott." → quote block → practical value
- Quote: *"Mindent amit csinálunk, a saját üzleteimen teszteltem először..."*
- Chips: Alapítóvezérelt / Nincs kiszervezés / Nincs junior / Profitorientált skálázás / Nincs éves kötöttség

### 8. Kivel dolgozunk (Who we work with)
- H2: "Nem mindenkivel. És ezt komolyan mondjuk."
- **Left:** explanatory copy about the strategy call filtering process
- **Right card:** ✓ Akikkel szívesen dolgozunk / ✕ Akikkel valószínűleg nem passzolunk
- Minimum budget mentioned: 200-300k HUF/month ad spend
- Closing line: "Ha viszont azt látjuk, hogy tudunk érdemben hozzáadni, akkor beleadunk mindent."

### 9. Őszintén (Content/Tips section)
- Label: "Őszintén"
- H2: "Amit senki nem mond el a marketing ügynökségekről."
- **Article 01:** "Mit kérdezz meg minden marketing ügynökségtől — mielőtt bármit aláírsz"
- Key question: *"Üzemeltetnek saját vállalkozást?"*
- Advanced question: *"Tudnak mutatni egy kudarcot?"*
- Author footer: Ádám avatar + "több saját márkát üzemeltet Ausztráliában és Magyarországon"
- **Nav item exists** — this section is meant to grow into a series over time

### 10. CTA Section
- Label: "Elég volt a találgatásból"
- H2: "Mi legyen a következő lépés?"
- Sub: "30 perc, őszintén, nyomás nélkül. Megnézzük a számokat és elemzünk. Hívás után készítünk is egy auditot. Ígérjük, tanfolyamot nem fogunk árulni. 🙂"
- 4 checkmarks: Ingyenes audit / Nincs éves szerződés / Nincs junior, nincs kiszervezés / Tanfolyamot nem árulunk
- Orange CTA: "Foglalj egy ingyenes hívást →"

### 11. Kapcsolat (Contact)
- Label: "Beszéljünk"
- H2: "Csak pár kattintás, itt tudsz velünk kapcsolatba lépni."
- Sub: "24 órán belül igyekszünk visszajelezni a megkeresésedre."
- **Form fields:** Neved / Email / Webshop URL / "Mi okoz problémát, kihívást jelenleg?"
- Submit: "Elküldöm →"
- Microcopy: "Nem hívunk vissza értékesítési szkripttel. Ígérjük."
- **Right column:** "Nincs veszteni valód." / Ádám személyesen audit / Sydney-Debrecen / 4 contact detail rows

### 12. Footer
- KLIKS. logo / © 2025 Kliks Digital / Adatvédelem / ÁSZF / kliks.com.au 🇦🇺

---

## 📝 Legal Documents

### Adatvédelmi Tájékoztató — DRAFT ✅
- File: `kliks-adatvedelem-DRAFT.html`
- Company: i.care recruitment Kft., 4029 Debrecen, Csapó utca 50.
- Covers: contact form data, Calendly, Vercel hosting, IP/technical data
- Data processors listed: Calendly Inc., Vercel Inc.
- NAIH contact details included
- **Still needs:** cégjegyzékszám, adószám, Ádám's full name as képviselő, email address, cookie decision, form provider finalisation, effective date
- **Must be reviewed by a Hungarian lawyer before publishing**

### ÁSZF — NOT YET BUILT ❌
- Needs to be drafted

### Future legal additions (flagged, not urgent):
- GA4 data processing section
- Meta Pixel / remarketing section
- Google Ads Pixel section
- Newsletter/email marketing section
- Cookie consent banner (CookieYes or Cookiebot)

---

## 🌐 Deployment — NOT YET DONE ❌

### Plan:
- Host kliks.hu on **Vercel** (free Hobby plan, same account as workwithadam.com.au)
- Connect kliks.hu domain in Vercel dashboard → Settings → Domains
- Update DNS at Microware: change A record to Vercel's IP (`76.76.21.21`)
- Deploy the single HTML file

### GitHub → Shopify pipeline (for kliks.com.au AU site improvements):
- Shopify CLI + GitHub Actions → auto-deploys to draft theme
- Draft theme preview URL for QA
- Manual "Publish" in Shopify admin = go-live button
- `--allow-live false` flag prevents accidental live deploys

---

## 📅 Calendly — NOT YET DONE ❌

- Free plan is sufficient (1 event type = 30-min consultation, unlimited bookings)
- Connect Google Calendar → auto-generates Google Meet links
- Embed Calendly link into the "Foglalj egy ingyenes hívást →" CTA button
- Also add to nav CTA "Ingyenes konzultáció →"

---

## 📧 Email Setup

### kliks.com.au emails
| Address | Method | Status |
|---|---|---|
| adam@kliks.com.au | VentraIP real mailbox | ✅ Exists |
| hello@kliks.com.au | VentraIP alias → wearekliks@gmail.com | ❌ Not yet set up |

**To do:**
- VIPcontrol → Email Hosting → Manage → Manage Aliases → Add `hello` → `wearekliks@gmail.com`
- Remove the ImprovMX records from kliks.com.au DNS (they were added by mistake — the email-hosting.net.au MX records should stay)

### kliks.hu emails
| Address | Method | Status |
|---|---|---|
| hello@kliks.hu | ImprovMX → wearekliks@gmail.com | ❌ Not yet set up |
| adam@kliks.hu | ImprovMX → wearekliks@gmail.com | ❌ Not yet set up |

**To do:**
- Add kliks.hu to ImprovMX
- Get MX records from ImprovMX
- Add MX records in Microware DNS for kliks.hu
- Handle SPF record (combine with existing if needed)

### Gmail "Send as" — NOT YET SET UP ❌
All four addresses need to be added as "Send as" in Gmail settings:
- hello@kliks.hu
- adam@kliks.hu  
- hello@kliks.com.au
- adam@kliks.com.au

**Method:** Gmail Settings → Accounts and Import → Send mail as → Add email → use Gmail SMTP (smtp.gmail.com / port 587) with a Gmail App Password (generated in Google Account → Security → App Passwords). This is free.

### tapetabarlang.hu (separate project — Ádám's wallpaper bar brand)
- ImprovMX: hello@tapetabarlang.hu → tapetabarlang@gmail.com ✅ MX records added, SPF combined
- Gmail "Send as" for hello@tapetabarlang.hu: partially set up, needs Gmail App Password to complete

---

## 🔮 Future / Later Items

### Tracking (action plan ready, not urgent):
1. Install **Google Tag Manager** first (handles all pixels via one snippet)
2. **GA4** via GTM
3. **Meta Pixel** via GTM (+ cookie consent banner needed)
4. **Google Ads conversion tracking** via GTM
5. **Newsletter** — platform TBD (Klaviyo if Shopify connected, Mailchimp standalone)
6. Update Adatvédelmi tájékoztató for each addition
7. Add cookie consent banner (CookieYes free tier)

### Content:
- Real case study numbers (current metrics are placeholders)
- Client logos strip
- More "Őszintén" articles (section designed to grow)
- Blog/content section

### AU site (kliks.com.au) improvements:
- Popup fix (delay to exit-intent in Klaviyo)
- Nav rename (remove "Hire our agency" and "More")
- Stats strip + case study block (via Replo or Sections Pro)
- Scroll animations (3-4 hours dev work or migrate to HTML)
- Founder photo
- Footer redesign

---

## 🗣️ Copy Voice & Tone Notes

- **No em dashes (—)** — Ádám specifically doesn't like them, use commas instead
- **No bullet points** in service cards — all prose
- **Casual Hungarian** — sounds like a founder texting, not an agency pitch deck
- **No "Ennyi"** — was removed from headlines
- **"Profitorientált skálázás"** is the chip (not "Csak ami a bevételt mozgatja")
- Key phrases to keep: "Mellébeszélés nélkül" / "Tanfolyamot nem árulunk" / "Nincs veszteni valód"
- The "Kivel dolgozunk" section is important — not everyone is taken on, minimum 200-300k HUF/month ad spend

---

## 🛠️ Tech Stack

| Layer | Tool |
|---|---|
| Website | Single HTML file (Clash Display + Satoshi fonts) |
| Hosting | Vercel (free Hobby plan) |
| Domain HU | Microware (kliks.hu) |
| Domain AU | VentraIP (kliks.com.au) |
| AU site | Shopify |
| Email forwarding HU | ImprovMX (free) |
| Email forwarding AU | VentraIP email hosting (paid, existing) |
| Outgoing email | Gmail "Send as" via Gmail SMTP (free) |
| Booking | Calendly (free, 1 event type) |
| Analytics | GA4 (future) |
| Tag management | Google Tag Manager (future) |

---

## ⚡ Priority Order for Next Session

1. **Set up Calendly** — create account, 30-min event, connect Google Calendar, get booking link
2. **Update CTA buttons** — replace `#kapcsolat` href with Calendly link
3. **Deploy to Vercel** — push kliks-hu.html, connect kliks.hu domain in Vercel, update Microware DNS
4. **ImprovMX for kliks.hu** — add domain, add MX records to Microware
5. **Gmail Send as** — set up all 4 addresses using Gmail App Password
6. **VentraIP alias** — add hello@kliks.com.au alias in email hosting panel
7. **ÁSZF draft** — write the Hungarian terms of service document
8. **Adatvédelmi finalisation** — fill in cégjegyzékszám, adószám, effective date

---

*End of summary — copy this entire document into a new Claude chat to continue the project.*
