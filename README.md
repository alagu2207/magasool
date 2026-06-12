# Magasool — React Native (web) landing page

A static marketing site for **Magasool** (*Green · Fresh · Candor*) — an agricultural
brokerage platform that connects farmers, sales executives and buyers — built entirely
with React Native components rendered to the web via **Expo + react-native-web**.
It ships with **Farmer** and **Buyer** enquiry forms that email submissions through a
small **Node + nodemailer** backend.

## Run it

> Paste **one line at a time** — these are zsh commands, and zsh does not strip
> `#` comments in an interactive shell.

Terminal 1 — mail backend (Farmer/Buyer enquiries, runs on `http://localhost:3001`):

```bash
cd agriconnect/server
npm install
npm run dev
```

Terminal 2 — the website (dev server with hot reload):

```bash
cd agriconnect
npm install
npm run web
```

It also runs natively, unchanged: `npm run ios` / `npm run android`.

## Build the static website

Outputs a self-contained static bundle to `./dist`. Set `EXPO_PUBLIC_API_URL` to
your deployed mail API (it defaults to `http://localhost:3001`):

```bash
EXPO_PUBLIC_API_URL=https://api.yourdomain.com npx expo export -p web
npx serve dist
```

`dist/` is a self-contained static bundle you can host on any static host
(Netlify, Vercel, GitHub Pages, S3, …).

## Enquiry forms & email (SMTP)

Clicking **I'm a Farmer / I'm a Buyer** (hero and the bottom CTA) opens a modal form:

| Farmer form | Buyer form |
|---|---|
| Name, Phone, Address, City, Products sold, Farming land (cents), What you grow | Name, Address, Phone, Email, Products needed, Minimum quantity |

On submit the site `POST`s to `server`'s `/api/submit`, which **routes the email by type**:

- Farmer enquiries → `FARMER_NOTIFY_EMAIL`
- Buyer enquiries → `BUYER_NOTIFY_EMAIL`

Configure it (the `.env` is created for you; edit it to add SMTP creds + recipients):

```bash
cd server
cp .env.example .env
npm run dev
```

If `SMTP_HOST` is left blank the server runs in **dev mode** — submissions are logged
to the console (and the form still shows success) so you can develop without creds.
Set the `SMTP_*` vars (Gmail App Password, SendGrid, Mailgun, …) to send real mail.

## Structure

```
App.tsx                     FormModalProvider + ScrollView of all sections
src/
  theme.ts                  colors, spacing, radius, shadows
  data.ts                   page copy (steps, stats, testimonials…)
  config.ts                 API_URL (EXPO_PUBLIC_API_URL)
  hooks/useResponsive.ts    isMobile / isTablet / isDesktop breakpoints
  ui/                       Container, Button, SectionHeading, Logo
  forms/                    fields.ts, FormModal.tsx, FormModalProvider.tsx
  sections/                 Header, Hero, HowItWorks, StatsBar,
                            WhyChoose, Testimonials, CTABanner, Footer
server/                     Express + nodemailer mail backend (.env.example)
```

## Notes

- **Branding**: the in-page logo is a vector wordmark. The favicon/app icon at
  `assets/favicon.png` + `assets/icon.png` is an on-brand **placeholder** — replace
  both files with your real Magasool artwork (square PNG, ~512–1024px) to finish branding.
- **Responsive**: layouts reflow at `<768` (mobile) and `768–1023` (tablet); the
  navbar collapses to a hamburger menu on mobile.
- **Imagery**: people visuals use emoji on tinted gradient panels so the build stays
  dependency-free and renders offline. To use real photos, swap the gradient/emoji
  blocks for `<Image source={{ uri }} />` in `Hero.tsx` and `Testimonials.tsx`.
- Icons come from `@expo/vector-icons` (Ionicons + MaterialCommunityIcons).
