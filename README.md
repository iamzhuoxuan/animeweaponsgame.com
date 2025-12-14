# Anime Weapons - Codes & Guide Website

A modern, responsive website for Anime Weapons codes, drop locations, and boss guides. Built with Next.js and Tailwind CSS.

## 🎮 About

This is an unofficial fan-made guide website for **Anime Weapons**, the Roblox action grinder by AlphaXnewera. The site provides:

- ✨ Active and expired Anime Weapons codes (potions, Emeralds, reset tokens)
- 🎯 Drop tables for weapons, accessories, avatars, and secret bosses
- 🗺️ Quick routes for hidden bosses and dungeon farming tips
- 📋 How to redeem codes with step-by-step instructions

## 🚀 Features

- **Code Tracker**: Updated list of working codes with one-click copy
- **Drop Wiki**: Weapons, accessories, avatars, and secret boss routes in one place
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **SEO Optimized**: Meta tags and descriptions tuned for Anime Weapons queries

## 🛠️ Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The development server runs at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section
│   ├── CodesSection.tsx    # Codes listing
│   ├── Features.tsx        # Game features
│   └── Footer.tsx          # Site footer
├── public/                 # Static assets
└── tailwind.config.ts      # Tailwind configuration
```

## 📝 Updating Codes

Edit the `gameCodes` array in `data/codes.ts` to add or retire codes. Rewards and categories surface in both the homepage and `/codes`.

## 🔗 Links

- [Play Anime Weapons on Roblox](https://www.roblox.com/games/79189799490564/Anime-Weapons)
- Game stats (Nov 2025): 22M+ visits, 87K+ favorites, ~32K active

## 📄 License

This is an unofficial fan-made website. Anime Weapons is created by AlphaXnewera on Roblox.

## 🤝 Contributing

Feel free to submit issues or pull requests to improve the website!

---

Made with ❤️ for the Anime Weapons community
