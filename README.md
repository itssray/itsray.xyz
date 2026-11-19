# Liquid Glass Portfolio

A modern, responsive, static developer portfolio inspired by the supplied screenshot, with a **click-to-enter intro**, animated gradient background, liquid-glass card, social buttons, Projects/About/Contact modals, and a friendly empty-projects state.

**No npm, build step, backend, database, or paid hosting required.**

## Edit your portfolio

Open **`config.js`**. Change the values at the top:

| Setting | What it changes |
| --- | --- |
| `name` | The name on the website |
| `eyebrow` | Text above the profile |
| `tagline` | The short bio on the front card |
| `description` | Your About Me text |
| `availability` | Your current availability |
| `location` | Location shown in About Me |
| `socialLinks` | Your social icons and Contact links |
| `skills` | The list in About Me |
| `projects` | Projects shown inside the Projects pop-up |
| `accent`, `background` | Site colors |

For example, add this inside the `projects: [ ... ]` array:

```js
{
  title: "My First Website",
  description: "A personal experiment with modern web design.",
  tags: ["HTML", "CSS", "JavaScript"],
  url: "https://github.com/yourname/my-first-website",
  color: "violet" // cyan, violet, or green
},
```

To add a social link, replace `"#"` with the full URL. Email links use the format `mailto:you@example.com`. Links left as `"#"` are hidden.

Change layout, glass effect, mobile design, animation, and fonts in `style.css`. Change popup behavior and interactions in `script.js`.

## Free GitHub Pages deployment (website only)

1. Create a new **public** repository on GitHub, for example `my-portfolio`.
2. Click **Add file → Upload files** and upload `index.html`, `style.css`, `script.js`, `config.js`, `favicon.svg` (and optionally this README). Upload the files **at the repository root**, not inside a folder.
3. Commit your changes.
4. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**. Choose `main` and `/ (root)`, then **Save**.
5. Your site is published at `https://YOUR-USERNAME.github.io/my-portfolio/` once GitHub Pages completes deployment.

To edit later, open `config.js` in your repository, click the pencil icon, make changes, and commit. GitHub Pages will publish the updated version.

If you own a domain, you can add it under **Settings → Pages → Custom domain** and configure your DNS with your registrar.

## Notes

- Everything here is static and works on GitHub Pages.
- Your `config.js` and site source code are public; **never put passwords, secret API keys, or private data here**.
- Fonts are served from Google Fonts; system font fallbacks are provided.
- Respects reduced-motion settings and includes keyboard interactions.

## Custom domain: itsray.xyz

This repo includes `CNAME` containing `itsray.xyz`. In **GitHub → repository → Settings → Pages**, configure **Custom domain** = `itsray.xyz`.

At Namecheap → **Domain List → Manage → Advanced DNS**, set the root (`@`) A records to GitHub Pages:

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | YOUR-GITHUB-USERNAME.github.io |

Replace YOUR-GITHUB-USERNAME with your actual GitHub username. Remove conflicting `@` and `www` records, but preserve email MX/TXT records. Enable **Enforce HTTPS** after GitHub's certificate is issued.

## Live Discord / Spotify display

**Works on GitHub Pages without running a bot or backend:** the site reads your public presence data from [Lanyard](https://github.com/Phineas/lanyard). Discord doesn't provide a public browser API for arbitrary users' presence.

1. Join the [Lanyard Discord server](https://discord.gg/lanyard) and stay in it. Lanyard's bot makes your Discord presence available. This makes your activity accessible to others; only connect if you're comfortable with that.
2. In Discord, open **User Settings → Advanced → Developer Mode**, then right-click your own profile and select **Copy User ID**.
3. Edit `discordUserId: ""` in `config.js` to your numeric ID (in quotes).
4. Enable Discord's activity display and connect Spotify in Discord if you want Spotify activity to appear; it may not be available if activity is hidden or the service is disconnected.
5. Commit the files. Your avatar, presence and available Spotify activity refresh automatically about every 20 seconds.

When you don't have a Discord user ID configured, the Discord block is hidden. If Lanyard cannot return presence, the site shows **Presence unavailable**, not a fake online state. When there is no Spotify playback, it may show your other public Discord activity, or show no activity card.

**Security & privacy:** Do not insert a Discord token, bot token, client secret, or Spotify token into static files. Your Discord ID is publicly visible and Lanyard's API allows other people to view the status and activity you choose to expose. You can disable `showDiscordActivity` or remove your ID to stop displaying it here.

## Custom white icons

You can use the built-in vector icons for now. To replace them, upload transparent white SVGs, PNGs, or WebP images to `assets/icons/`. In `config.js`, set:

```js
customIcons: {
  discord: "assets/icons/discord.svg",
  github: "assets/icons/github.svg",
  gamepad: "assets/icons/roblox.svg",
  mail: "assets/icons/mail.svg"
},
```

Icons that are not supplied keep their built-in vectors. Recommended optional white icons: **Discord, GitHub, Roblox, Spotify, YouTube, Telegram**. Only upload platforms you actually link to.
