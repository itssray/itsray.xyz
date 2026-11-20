/*
  EDIT THIS FILE to customize your portfolio.
  Save it, commit to GitHub, and refresh your site.
  Add projects later by putting objects in the projects array.
*/
window.PORTFOLIO = {
  name: "ray",
  eyebrow: "solo developer",
  tagline: "turning ideas into things people love.",
  description: "building games & servers. ui specialist.",
  availability: "Available for commissioned & part time projects",
  location: "The Bahamas",
  initials: "R",
  pageTitle: "ray's world",
  // Discord user ID is public; never put your account token here.
  // Enable Discord Developer Mode, right-click your profile → Copy User ID.
  // Join the Lanyard Discord server so your presence is made available by Lanyard.
  discordUserId: "995129234127335444", // e.g. "123456789012345678" (must be YOUR ID)
  showDiscordActivity: true,
  // Replace built-in vector icons with your own white images in assets/icons/.
  // Example: { github: "assets/icons/github.svg", discord: "assets/icons/discord.png" }
  customIcons: {},
  // Original synthesized ambient background sound. No music file required.
  backgroundMusic: { enabled: true, volume: 0.22 },
  accent: "#b4e9ff",
  background: {
    color1: "#4d8793",
    color2: "#829d9a",
    color3: "#465b76"
  },
  socialLinks: [
    // Replace '#' with your real URLs. Links with '#' are hidden automatically.
    { label: "GitHub", url: "https://github.com/itssray", icon: "github" },
    { label: "Discord", url: "https://discord.com/users/995129234127335444", icon: "discord" },
    { label: "Roblox", url: "#", icon: "roblox" },
    { label: "Email", url: "#", icon: "mail" }
  ],
  skills: ["Plugin Development", "UI design", "Roblox / Luau"],
  projects: [
    // Example (remove the // at the beginning of the lines when ready):
    // { title: "My first project", description: "A short description of what I built.", tags: ["HTML", "CSS"], url: "https://github.com/yourname/project", color: "cyan" }
    { title: "SnowVanilla", description: "Clean minecraft server.", tags: ["Java"], url: "https://discord.gg/", color: "cyan" }
  ]
};
