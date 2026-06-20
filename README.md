# Magasool — React Native (web) landing page

A static marketing site for **Magasool** (*Green · Fresh · Candor*) — an agricultural
brokerage platform that connects farmers, sales executives and buyers — built entirely
with React Native components rendered to the web via **Expo + react-native-web**.
It ships with **Farmer** and **Buyer** enquiry forms that save submissions straight
into **Google Forms** (and their linked Google Sheets) — no backend required.

## Run it

> Paste **one line at a time** — these are zsh commands, and zsh does not strip
> `#` comments in an interactive shell.

```bash
cd agriconnect
npm install
npm run web
```

It also runs natively, unchanged: `npm run ios` / `npm run android`.

## Build the static website

```bash
npx expo export -p web
npx serve dist
```

`dist/` is a self-contained static bundle you can host on any static host
(Netlify, Vercel, GitHub Pages, S3, …) — there's no server to deploy.

## Enquiry forms → Google Forms

Clicking **I'm a Farmer / I'm a Buyer** (hero and the bottom CTA) opens a modal form:

| Farmer form | Buyer form |
|---|---|
| Name, Phone, Address, City, Products sold, Farming land (cents), What you grow | Name, Address, Phone, Email, Products needed, Minimum quantity |

On submit, the site posts the answers directly to a **Google Form** (`mode: 'no-cors'`),
so every enquiry lands in that form's **Responses** sheet. Use two forms — one for
farmers, one for buyers — to keep them in separate sheets.

**Setup** (see the step-by-step header comment in [`src/forms/googleForms.ts`](src/forms/googleForms.ts)):

1. Create two Google Forms with the questions above. In each form's settings turn OFF
   *Require sign in* / *Limit to 1 response* so anyone can submit.
2. Form ⋮ → **Get pre-filled link**, type a unique dummy value in every box, copy the link.
3. From the link, copy the `formId` (the `1FAIpQL…` part) and each `entry.NNNNN` id into
   `GOOGLE_FORMS` in `src/forms/googleForms.ts` — or just send me the two pre-filled links.

Until the ids are filled in, the form shows a "not configured" message instead of submitting.

> The old email backend in `server/` is **no longer used** by the site. It's kept for
> reference — delete the `server/` folder if you don't want it.

## Structure

```
App.tsx                     FormModalProvider + ScrollView of all sections
src/
  theme.ts                  colors, spacing, radius, shadows
  data.ts                   page copy (steps, stats, testimonials…)
  hooks/useResponsive.ts    isMobile / isTablet / isDesktop breakpoints
  ui/                       Container, Button, SectionHeading, Logo
  forms/                    fields.ts, FormModal.tsx, FormModalProvider.tsx,
                            googleForms.ts  ← put your Google Form ids here
  sections/                 Header, Hero, HowItWorks, StatsBar,
                            WhyChoose, Testimonials, CTABanner, Footer
server/                     (legacy, unused) Express + nodemailer mail backend
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
