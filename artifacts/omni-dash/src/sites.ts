export interface Site {
  id: string;
  name: string;
  url: string;
  category: string;
  description: string;
  icon?: string;
  pinned?: boolean;
  custom?: boolean;
}

export const CATEGORIES = [
  "Favorites",
  "Google",
  "Microsoft",
  "Productivity",
  "AI & Research",
  "Reference",
  "Creative",
  "Developer",
  "Social",
  "Finance",
  "News & Media",
  "Learning",
  "Entertainment",
  "Shopping",
  "Travel",
  "Gaming",
];

export const DEFAULT_SITES: Site[] = [
  // Google
  { id: "gmail", name: "Gmail", url: "https://mail.google.com", category: "Google", description: "Email by Google", icon: "https://www.google.com/s2/favicons?sz=64&domain=mail.google.com" },
  { id: "gdrive", name: "Google Drive", url: "https://drive.google.com", category: "Google", description: "Cloud storage", icon: "https://www.google.com/s2/favicons?sz=64&domain=drive.google.com" },
  { id: "gdocs", name: "Google Docs", url: "https://docs.google.com", category: "Google", description: "Online document editor", icon: "https://www.google.com/s2/favicons?sz=64&domain=docs.google.com" },
  { id: "gsheets", name: "Google Sheets", url: "https://sheets.google.com", category: "Google", description: "Online spreadsheets", icon: "https://www.google.com/s2/favicons?sz=64&domain=sheets.google.com" },
  { id: "gslides", name: "Google Slides", url: "https://slides.google.com", category: "Google", description: "Online presentations", icon: "https://www.google.com/s2/favicons?sz=64&domain=slides.google.com" },
  { id: "gcalendar", name: "Google Calendar", url: "https://calendar.google.com", category: "Google", description: "Schedule & events", icon: "https://www.google.com/s2/favicons?sz=64&domain=calendar.google.com" },
  { id: "gmeet", name: "Google Meet", url: "https://meet.google.com", category: "Google", description: "Video conferencing", icon: "https://www.google.com/s2/favicons?sz=64&domain=meet.google.com" },
  { id: "gphotos", name: "Google Photos", url: "https://photos.google.com", category: "Google", description: "Photo storage", icon: "https://www.google.com/s2/favicons?sz=64&domain=photos.google.com" },
  { id: "gmaps", name: "Google Maps", url: "https://maps.google.com", category: "Google", description: "Navigation & maps", icon: "https://www.google.com/s2/favicons?sz=64&domain=maps.google.com" },
  { id: "youtube", name: "YouTube", url: "https://youtube.com", category: "Google", description: "Video platform", icon: "https://www.google.com/s2/favicons?sz=64&domain=youtube.com" },
  { id: "gtranslate", name: "Google Translate", url: "https://translate.google.com", category: "Google", description: "Language translation", icon: "https://www.google.com/s2/favicons?sz=64&domain=translate.google.com" },
  { id: "gkeep", name: "Google Keep", url: "https://keep.google.com", category: "Google", description: "Notes & reminders", icon: "https://www.google.com/s2/favicons?sz=64&domain=keep.google.com" },
  { id: "gforms", name: "Google Forms", url: "https://forms.google.com", category: "Google", description: "Online forms & surveys", icon: "https://www.google.com/s2/favicons?sz=64&domain=forms.google.com" },
  { id: "gclassroom", name: "Google Classroom", url: "https://classroom.google.com", category: "Google", description: "Learning platform", icon: "https://www.google.com/s2/favicons?sz=64&domain=classroom.google.com" },
  { id: "gsearch", name: "Google Search", url: "https://google.com", category: "Google", description: "Web search engine", icon: "https://www.google.com/s2/favicons?sz=64&domain=google.com" },
  { id: "gnotebooklm", name: "NotebookLM", url: "https://notebooklm.google.com", category: "Google", description: "AI research assistant", icon: "https://www.google.com/s2/favicons?sz=64&domain=notebooklm.google.com" },
  { id: "ganalytics", name: "Google Analytics", url: "https://analytics.google.com", category: "Google", description: "Web analytics platform", icon: "https://www.google.com/s2/favicons?sz=64&domain=analytics.google.com" },
  { id: "gearth", name: "Google Earth", url: "https://earth.google.com", category: "Google", description: "Explore the world in 3D", icon: "https://www.google.com/s2/favicons?sz=64&domain=earth.google.com" },

  // Microsoft
  { id: "outlook", name: "Outlook", url: "https://outlook.live.com", category: "Microsoft", description: "Email by Microsoft", icon: "https://www.google.com/s2/favicons?sz=64&domain=outlook.live.com" },
  { id: "onedrive", name: "OneDrive", url: "https://onedrive.live.com", category: "Microsoft", description: "Cloud storage", icon: "https://www.google.com/s2/favicons?sz=64&domain=onedrive.live.com" },
  { id: "word", name: "Word Online", url: "https://www.office.com/launch/word", category: "Microsoft", description: "Online word processor", icon: "https://www.google.com/s2/favicons?sz=64&domain=office.com" },
  { id: "excel", name: "Excel Online", url: "https://www.office.com/launch/excel", category: "Microsoft", description: "Online spreadsheets", icon: "https://www.google.com/s2/favicons?sz=64&domain=office.com" },
  { id: "powerpoint", name: "PowerPoint Online", url: "https://www.office.com/launch/powerpoint", category: "Microsoft", description: "Online presentations", icon: "https://www.google.com/s2/favicons?sz=64&domain=office.com" },
  { id: "teams", name: "Microsoft Teams", url: "https://teams.microsoft.com", category: "Microsoft", description: "Team collaboration", icon: "https://www.google.com/s2/favicons?sz=64&domain=teams.microsoft.com" },
  { id: "onenote", name: "OneNote Online", url: "https://www.onenote.com", category: "Microsoft", description: "Digital notebook", icon: "https://www.google.com/s2/favicons?sz=64&domain=onenote.com" },
  { id: "todo", name: "Microsoft To Do", url: "https://to-do.microsoft.com", category: "Microsoft", description: "Task manager", icon: "https://www.google.com/s2/favicons?sz=64&domain=to-do.microsoft.com" },
  { id: "bing", name: "Bing", url: "https://bing.com", category: "Microsoft", description: "Web search engine", icon: "https://www.google.com/s2/favicons?sz=64&domain=bing.com" },
  { id: "sharepoint", name: "SharePoint", url: "https://sharepoint.com", category: "Microsoft", description: "Team sites & intranets", icon: "https://www.google.com/s2/favicons?sz=64&domain=sharepoint.com" },
  { id: "azure", name: "Azure Portal", url: "https://portal.azure.com", category: "Microsoft", description: "Cloud computing platform", icon: "https://www.google.com/s2/favicons?sz=64&domain=portal.azure.com" },
  { id: "mscopilot", name: "Microsoft Copilot", url: "https://copilot.microsoft.com", category: "Microsoft", description: "AI assistant by Microsoft", icon: "https://www.google.com/s2/favicons?sz=64&domain=copilot.microsoft.com" },
  { id: "msedge", name: "Microsoft Edge", url: "https://www.microsoft.com/edge", category: "Microsoft", description: "Microsoft's web browser", icon: "https://www.google.com/s2/favicons?sz=64&domain=microsoft.com" },

  // Productivity
  { id: "notion", name: "Notion", url: "https://notion.so", category: "Productivity", description: "All-in-one workspace", icon: "https://www.google.com/s2/favicons?sz=64&domain=notion.so" },
  { id: "trello", name: "Trello", url: "https://trello.com", category: "Productivity", description: "Visual project boards", icon: "https://www.google.com/s2/favicons?sz=64&domain=trello.com" },
  { id: "slack", name: "Slack", url: "https://slack.com", category: "Productivity", description: "Team messaging", icon: "https://www.google.com/s2/favicons?sz=64&domain=slack.com" },
  { id: "zoom", name: "Zoom", url: "https://zoom.us", category: "Productivity", description: "Video meetings", icon: "https://www.google.com/s2/favicons?sz=64&domain=zoom.us" },
  { id: "linear", name: "Linear", url: "https://linear.app", category: "Productivity", description: "Issue tracker", icon: "https://www.google.com/s2/favicons?sz=64&domain=linear.app" },
  { id: "asana", name: "Asana", url: "https://asana.com", category: "Productivity", description: "Work management", icon: "https://www.google.com/s2/favicons?sz=64&domain=asana.com" },
  { id: "todoist", name: "Todoist", url: "https://todoist.com", category: "Productivity", description: "Task management", icon: "https://www.google.com/s2/favicons?sz=64&domain=todoist.com" },
  { id: "airtable", name: "Airtable", url: "https://airtable.com", category: "Productivity", description: "Database + spreadsheet", icon: "https://www.google.com/s2/favicons?sz=64&domain=airtable.com" },
  { id: "dropbox", name: "Dropbox", url: "https://dropbox.com", category: "Productivity", description: "File storage", icon: "https://www.google.com/s2/favicons?sz=64&domain=dropbox.com" },
  { id: "clickup", name: "ClickUp", url: "https://clickup.com", category: "Productivity", description: "Project management", icon: "https://www.google.com/s2/favicons?sz=64&domain=clickup.com" },
  { id: "monday", name: "Monday.com", url: "https://monday.com", category: "Productivity", description: "Work OS", icon: "https://www.google.com/s2/favicons?sz=64&domain=monday.com" },
  { id: "miro", name: "Miro", url: "https://miro.com", category: "Productivity", description: "Online whiteboard", icon: "https://www.google.com/s2/favicons?sz=64&domain=miro.com" },
  { id: "loom", name: "Loom", url: "https://loom.com", category: "Productivity", description: "Async video messaging", icon: "https://www.google.com/s2/favicons?sz=64&domain=loom.com" },

  // AI & Research
  { id: "chatgpt", name: "ChatGPT", url: "https://chat.openai.com", category: "AI & Research", description: "AI assistant by OpenAI", icon: "https://www.google.com/s2/favicons?sz=64&domain=chat.openai.com" },
  { id: "claude", name: "Claude", url: "https://claude.ai", category: "AI & Research", description: "AI assistant by Anthropic", icon: "https://www.google.com/s2/favicons?sz=64&domain=claude.ai" },
  { id: "perplexity", name: "Perplexity", url: "https://perplexity.ai", category: "AI & Research", description: "AI-powered search", icon: "https://www.google.com/s2/favicons?sz=64&domain=perplexity.ai" },
  { id: "gemini", name: "Gemini", url: "https://gemini.google.com", category: "AI & Research", description: "AI assistant by Google", icon: "https://www.google.com/s2/favicons?sz=64&domain=gemini.google.com" },
  { id: "midjourney", name: "Midjourney", url: "https://midjourney.com", category: "AI & Research", description: "AI image generation", icon: "https://www.google.com/s2/favicons?sz=64&domain=midjourney.com" },
  { id: "huggingface", name: "Hugging Face", url: "https://huggingface.co", category: "AI & Research", description: "AI model hub", icon: "https://www.google.com/s2/favicons?sz=64&domain=huggingface.co" },
  { id: "mistral", name: "Mistral", url: "https://mistral.ai", category: "AI & Research", description: "Open AI models", icon: "https://www.google.com/s2/favicons?sz=64&domain=mistral.ai" },
  { id: "gscholar", name: "Google Scholar", url: "https://scholar.google.com", category: "AI & Research", description: "Academic search", icon: "https://www.google.com/s2/favicons?sz=64&domain=scholar.google.com" },
  { id: "elicit", name: "Elicit", url: "https://elicit.org", category: "AI & Research", description: "AI research assistant", icon: "https://www.google.com/s2/favicons?sz=64&domain=elicit.org" },

  // Reference
  { id: "wikipedia", name: "Wikipedia", url: "https://wikipedia.org", category: "Reference", description: "Free encyclopedia", icon: "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.org" },
  { id: "wolfram", name: "Wolfram Alpha", url: "https://wolframalpha.com", category: "Reference", description: "Computational knowledge", icon: "https://www.google.com/s2/favicons?sz=64&domain=wolframalpha.com" },
  { id: "archive", name: "Internet Archive", url: "https://archive.org", category: "Reference", description: "Digital library & Wayback Machine", icon: "https://www.google.com/s2/favicons?sz=64&domain=archive.org" },
  { id: "mdn", name: "MDN Web Docs", url: "https://developer.mozilla.org", category: "Reference", description: "Web development reference", icon: "https://www.google.com/s2/favicons?sz=64&domain=developer.mozilla.org" },
  { id: "dictionary", name: "Dictionary.com", url: "https://dictionary.com", category: "Reference", description: "English dictionary & thesaurus", icon: "https://www.google.com/s2/favicons?sz=64&domain=dictionary.com" },
  { id: "britannica", name: "Britannica", url: "https://britannica.com", category: "Reference", description: "Encyclopedia Britannica", icon: "https://www.google.com/s2/favicons?sz=64&domain=britannica.com" },
  { id: "openlib", name: "Open Library", url: "https://openlibrary.org", category: "Reference", description: "Free book catalog", icon: "https://www.google.com/s2/favicons?sz=64&domain=openlibrary.org" },

  // Creative
  { id: "canva", name: "Canva", url: "https://canva.com", category: "Creative", description: "Online design tool", icon: "https://www.google.com/s2/favicons?sz=64&domain=canva.com" },
  { id: "figma", name: "Figma", url: "https://figma.com", category: "Creative", description: "UI/UX design tool", icon: "https://www.google.com/s2/favicons?sz=64&domain=figma.com" },
  { id: "adobe", name: "Adobe Express", url: "https://express.adobe.com", category: "Creative", description: "Quick design tool", icon: "https://www.google.com/s2/favicons?sz=64&domain=express.adobe.com" },
  { id: "firefly", name: "Adobe Firefly", url: "https://firefly.adobe.com", category: "Creative", description: "AI image generation by Adobe", icon: "https://www.google.com/s2/favicons?sz=64&domain=firefly.adobe.com" },
  { id: "behance", name: "Behance", url: "https://behance.net", category: "Creative", description: "Creative portfolios", icon: "https://www.google.com/s2/favicons?sz=64&domain=behance.net" },
  { id: "dribbble", name: "Dribbble", url: "https://dribbble.com", category: "Creative", description: "Design inspiration", icon: "https://www.google.com/s2/favicons?sz=64&domain=dribbble.com" },
  { id: "unsplash", name: "Unsplash", url: "https://unsplash.com", category: "Creative", description: "Free high-res stock photos", icon: "https://www.google.com/s2/favicons?sz=64&domain=unsplash.com" },
  { id: "pexels", name: "Pexels", url: "https://pexels.com", category: "Creative", description: "Free stock photos & video", icon: "https://www.google.com/s2/favicons?sz=64&domain=pexels.com" },
  { id: "pixlr", name: "Pixlr", url: "https://pixlr.com", category: "Creative", description: "Online photo editor", icon: "https://www.google.com/s2/favicons?sz=64&domain=pixlr.com" },

  // Developer
  { id: "github", name: "GitHub", url: "https://github.com", category: "Developer", description: "Code hosting & collaboration", icon: "https://www.google.com/s2/favicons?sz=64&domain=github.com" },
  { id: "replit", name: "Replit", url: "https://replit.com", category: "Developer", description: "Online IDE", icon: "https://www.google.com/s2/favicons?sz=64&domain=replit.com" },
  { id: "stackoverflow", name: "Stack Overflow", url: "https://stackoverflow.com", category: "Developer", description: "Developer Q&A", icon: "https://www.google.com/s2/favicons?sz=64&domain=stackoverflow.com" },
  { id: "codesandbox", name: "CodeSandbox", url: "https://codesandbox.io", category: "Developer", description: "Online code editor", icon: "https://www.google.com/s2/favicons?sz=64&domain=codesandbox.io" },
  { id: "vercel", name: "Vercel", url: "https://vercel.com", category: "Developer", description: "Frontend deployment", icon: "https://www.google.com/s2/favicons?sz=64&domain=vercel.com" },
  { id: "netlify", name: "Netlify", url: "https://netlify.com", category: "Developer", description: "Web hosting & CI/CD", icon: "https://www.google.com/s2/favicons?sz=64&domain=netlify.com" },
  { id: "npm", name: "npm", url: "https://npmjs.com", category: "Developer", description: "JavaScript package registry", icon: "https://www.google.com/s2/favicons?sz=64&domain=npmjs.com" },
  { id: "dockerhub", name: "Docker Hub", url: "https://hub.docker.com", category: "Developer", description: "Container image registry", icon: "https://www.google.com/s2/favicons?sz=64&domain=hub.docker.com" },
  { id: "postman", name: "Postman", url: "https://postman.com", category: "Developer", description: "API testing & design", icon: "https://www.google.com/s2/favicons?sz=64&domain=postman.com" },
  { id: "railway", name: "Railway", url: "https://railway.app", category: "Developer", description: "App deployment platform", icon: "https://www.google.com/s2/favicons?sz=64&domain=railway.app" },
  { id: "gitlab", name: "GitLab", url: "https://gitlab.com", category: "Developer", description: "DevOps platform", icon: "https://www.google.com/s2/favicons?sz=64&domain=gitlab.com" },
  { id: "supabase", name: "Supabase", url: "https://supabase.com", category: "Developer", description: "Open-source Firebase alternative", icon: "https://www.google.com/s2/favicons?sz=64&domain=supabase.com" },

  // Social
  { id: "twitter", name: "X (Twitter)", url: "https://x.com", category: "Social", description: "Microblogging & news", icon: "https://www.google.com/s2/favicons?sz=64&domain=x.com" },
  { id: "reddit", name: "Reddit", url: "https://reddit.com", category: "Social", description: "Community forums", icon: "https://www.google.com/s2/favicons?sz=64&domain=reddit.com" },
  { id: "linkedin", name: "LinkedIn", url: "https://linkedin.com", category: "Social", description: "Professional network", icon: "https://www.google.com/s2/favicons?sz=64&domain=linkedin.com" },
  { id: "instagram", name: "Instagram", url: "https://instagram.com", category: "Social", description: "Photo & video sharing", icon: "https://www.google.com/s2/favicons?sz=64&domain=instagram.com" },
  { id: "discord", name: "Discord", url: "https://discord.com", category: "Social", description: "Community voice & chat", icon: "https://www.google.com/s2/favicons?sz=64&domain=discord.com" },
  { id: "mastodon", name: "Mastodon", url: "https://mastodon.social", category: "Social", description: "Open-source social network", icon: "https://www.google.com/s2/favicons?sz=64&domain=mastodon.social" },
  { id: "pinterest", name: "Pinterest", url: "https://pinterest.com", category: "Social", description: "Visual discovery", icon: "https://www.google.com/s2/favicons?sz=64&domain=pinterest.com" },
  { id: "bluesky", name: "Bluesky", url: "https://bsky.app", category: "Social", description: "Decentralized social network", icon: "https://www.google.com/s2/favicons?sz=64&domain=bsky.app" },
  { id: "tiktok", name: "TikTok", url: "https://tiktok.com", category: "Social", description: "Short-form video", icon: "https://www.google.com/s2/favicons?sz=64&domain=tiktok.com" },

  // Finance
  { id: "gfinance", name: "Google Finance", url: "https://finance.google.com", category: "Finance", description: "Stocks & markets", icon: "https://www.google.com/s2/favicons?sz=64&domain=finance.google.com" },
  { id: "yahoofinance", name: "Yahoo Finance", url: "https://finance.yahoo.com", category: "Finance", description: "Financial news & data", icon: "https://www.google.com/s2/favicons?sz=64&domain=finance.yahoo.com" },
  { id: "coingecko", name: "CoinGecko", url: "https://coingecko.com", category: "Finance", description: "Crypto prices & data", icon: "https://www.google.com/s2/favicons?sz=64&domain=coingecko.com" },
  { id: "tradingview", name: "TradingView", url: "https://tradingview.com", category: "Finance", description: "Charts & trading analysis", icon: "https://www.google.com/s2/favicons?sz=64&domain=tradingview.com" },
  { id: "investopedia", name: "Investopedia", url: "https://investopedia.com", category: "Finance", description: "Financial education", icon: "https://www.google.com/s2/favicons?sz=64&domain=investopedia.com" },
  { id: "wise", name: "Wise", url: "https://wise.com", category: "Finance", description: "International transfers", icon: "https://www.google.com/s2/favicons?sz=64&domain=wise.com" },
  { id: "paypal", name: "PayPal", url: "https://paypal.com", category: "Finance", description: "Online payments", icon: "https://www.google.com/s2/favicons?sz=64&domain=paypal.com" },
  { id: "stripe", name: "Stripe Dashboard", url: "https://dashboard.stripe.com", category: "Finance", description: "Payment processing", icon: "https://www.google.com/s2/favicons?sz=64&domain=stripe.com" },

  // News & Media
  { id: "bbc", name: "BBC News", url: "https://bbc.com/news", category: "News & Media", description: "World news", icon: "https://www.google.com/s2/favicons?sz=64&domain=bbc.com" },
  { id: "reuters", name: "Reuters", url: "https://reuters.com", category: "News & Media", description: "International news wire", icon: "https://www.google.com/s2/favicons?sz=64&domain=reuters.com" },
  { id: "guardian", name: "The Guardian", url: "https://theguardian.com", category: "News & Media", description: "Independent journalism", icon: "https://www.google.com/s2/favicons?sz=64&domain=theguardian.com" },
  { id: "hackernews", name: "Hacker News", url: "https://news.ycombinator.com", category: "News & Media", description: "Tech & startup news", icon: "https://www.google.com/s2/favicons?sz=64&domain=news.ycombinator.com" },
  { id: "techcrunch", name: "TechCrunch", url: "https://techcrunch.com", category: "News & Media", description: "Technology news", icon: "https://www.google.com/s2/favicons?sz=64&domain=techcrunch.com" },
  { id: "theverge", name: "The Verge", url: "https://theverge.com", category: "News & Media", description: "Tech & culture", icon: "https://www.google.com/s2/favicons?sz=64&domain=theverge.com" },
  { id: "wired", name: "Wired", url: "https://wired.com", category: "News & Media", description: "Technology & culture", icon: "https://www.google.com/s2/favicons?sz=64&domain=wired.com" },
  { id: "npr", name: "NPR", url: "https://npr.org", category: "News & Media", description: "Public radio & news", icon: "https://www.google.com/s2/favicons?sz=64&domain=npr.org" },

  // Learning
  { id: "khanacademy", name: "Khan Academy", url: "https://khanacademy.org", category: "Learning", description: "Free online education", icon: "https://www.google.com/s2/favicons?sz=64&domain=khanacademy.org" },
  { id: "coursera", name: "Coursera", url: "https://coursera.org", category: "Learning", description: "Online university courses", icon: "https://www.google.com/s2/favicons?sz=64&domain=coursera.org" },
  { id: "edx", name: "edX", url: "https://edx.org", category: "Learning", description: "University courses online", icon: "https://www.google.com/s2/favicons?sz=64&domain=edx.org" },
  { id: "duolingo", name: "Duolingo", url: "https://duolingo.com", category: "Learning", description: "Language learning", icon: "https://www.google.com/s2/favicons?sz=64&domain=duolingo.com" },
  { id: "brilliant", name: "Brilliant", url: "https://brilliant.org", category: "Learning", description: "Math & science learning", icon: "https://www.google.com/s2/favicons?sz=64&domain=brilliant.org" },
  { id: "freecodecamp", name: "freeCodeCamp", url: "https://freecodecamp.org", category: "Learning", description: "Learn to code free", icon: "https://www.google.com/s2/favicons?sz=64&domain=freecodecamp.org" },
  { id: "udemy", name: "Udemy", url: "https://udemy.com", category: "Learning", description: "Online learning marketplace", icon: "https://www.google.com/s2/favicons?sz=64&domain=udemy.com" },
  { id: "mit-ocw", name: "MIT OpenCourseWare", url: "https://ocw.mit.edu", category: "Learning", description: "Free MIT course materials", icon: "https://www.google.com/s2/favicons?sz=64&domain=ocw.mit.edu" },
  { id: "codecademy", name: "Codecademy", url: "https://codecademy.com", category: "Learning", description: "Interactive coding lessons", icon: "https://www.google.com/s2/favicons?sz=64&domain=codecademy.com" },

  // Entertainment
  { id: "netflix", name: "Netflix", url: "https://netflix.com", category: "Entertainment", description: "Streaming movies & TV", icon: "https://www.google.com/s2/favicons?sz=64&domain=netflix.com" },
  { id: "spotify", name: "Spotify", url: "https://spotify.com", category: "Entertainment", description: "Music & podcasts", icon: "https://www.google.com/s2/favicons?sz=64&domain=spotify.com" },
  { id: "disneyplus", name: "Disney+", url: "https://disneyplus.com", category: "Entertainment", description: "Disney, Marvel & Star Wars", icon: "https://www.google.com/s2/favicons?sz=64&domain=disneyplus.com" },
  { id: "twitch", name: "Twitch", url: "https://twitch.tv", category: "Entertainment", description: "Live game streaming", icon: "https://www.google.com/s2/favicons?sz=64&domain=twitch.tv" },
  { id: "primevideo", name: "Prime Video", url: "https://primevideo.com", category: "Entertainment", description: "Amazon streaming", icon: "https://www.google.com/s2/favicons?sz=64&domain=primevideo.com" },
  { id: "soundcloud", name: "SoundCloud", url: "https://soundcloud.com", category: "Entertainment", description: "Music sharing & discovery", icon: "https://www.google.com/s2/favicons?sz=64&domain=soundcloud.com" },
  { id: "letterboxd", name: "Letterboxd", url: "https://letterboxd.com", category: "Entertainment", description: "Film reviews & diary", icon: "https://www.google.com/s2/favicons?sz=64&domain=letterboxd.com" },
  { id: "bandcamp", name: "Bandcamp", url: "https://bandcamp.com", category: "Entertainment", description: "Independent music", icon: "https://www.google.com/s2/favicons?sz=64&domain=bandcamp.com" },

  // Shopping
  { id: "amazon", name: "Amazon", url: "https://amazon.com", category: "Shopping", description: "Online marketplace", icon: "https://www.google.com/s2/favicons?sz=64&domain=amazon.com" },
  { id: "ebay", name: "eBay", url: "https://ebay.com", category: "Shopping", description: "Auction & marketplace", icon: "https://www.google.com/s2/favicons?sz=64&domain=ebay.com" },
  { id: "etsy", name: "Etsy", url: "https://etsy.com", category: "Shopping", description: "Handmade & vintage", icon: "https://www.google.com/s2/favicons?sz=64&domain=etsy.com" },
  { id: "aliexpress", name: "AliExpress", url: "https://aliexpress.com", category: "Shopping", description: "Global shopping", icon: "https://www.google.com/s2/favicons?sz=64&domain=aliexpress.com" },
  { id: "producthunt", name: "Product Hunt", url: "https://producthunt.com", category: "Shopping", description: "Discover new products", icon: "https://www.google.com/s2/favicons?sz=64&domain=producthunt.com" },
  { id: "ikea", name: "IKEA", url: "https://ikea.com", category: "Shopping", description: "Home furnishings", icon: "https://www.google.com/s2/favicons?sz=64&domain=ikea.com" },

  // Travel
  { id: "skyscanner", name: "Skyscanner", url: "https://skyscanner.com", category: "Travel", description: "Flight search", icon: "https://www.google.com/s2/favicons?sz=64&domain=skyscanner.com" },
  { id: "airbnb", name: "Airbnb", url: "https://airbnb.com", category: "Travel", description: "Accommodation worldwide", icon: "https://www.google.com/s2/favicons?sz=64&domain=airbnb.com" },
  { id: "kayak", name: "Kayak", url: "https://kayak.com", category: "Travel", description: "Travel deals", icon: "https://www.google.com/s2/favicons?sz=64&domain=kayak.com" },
  { id: "gflights", name: "Google Flights", url: "https://google.com/flights", category: "Travel", description: "Cheap flight search", icon: "https://www.google.com/s2/favicons?sz=64&domain=google.com" },
  { id: "tripadvisor", name: "Tripadvisor", url: "https://tripadvisor.com", category: "Travel", description: "Travel reviews", icon: "https://www.google.com/s2/favicons?sz=64&domain=tripadvisor.com" },
  { id: "booking", name: "Booking.com", url: "https://booking.com", category: "Travel", description: "Hotel reservations", icon: "https://www.google.com/s2/favicons?sz=64&domain=booking.com" },
  { id: "rome2rio", name: "Rome2rio", url: "https://rome2rio.com", category: "Travel", description: "Multi-modal trip planner", icon: "https://www.google.com/s2/favicons?sz=64&domain=rome2rio.com" },
  { id: "lonelyplanet", name: "Lonely Planet", url: "https://lonelyplanet.com", category: "Travel", description: "Travel guides", icon: "https://www.google.com/s2/favicons?sz=64&domain=lonelyplanet.com" },

  // Gaming
  { id: "steam", name: "Steam", url: "https://store.steampowered.com", category: "Gaming", description: "PC gaming platform", icon: "https://www.google.com/s2/favicons?sz=64&domain=steampowered.com" },
  { id: "itchio", name: "Itch.io", url: "https://itch.io", category: "Gaming", description: "Indie game marketplace", icon: "https://www.google.com/s2/favicons?sz=64&domain=itch.io" },
  { id: "epicgames", name: "Epic Games", url: "https://epicgames.com", category: "Gaming", description: "Game store", icon: "https://www.google.com/s2/favicons?sz=64&domain=epicgames.com" },
  { id: "chess", name: "Chess.com", url: "https://chess.com", category: "Gaming", description: "Online chess", icon: "https://www.google.com/s2/favicons?sz=64&domain=chess.com" },
  { id: "lichess", name: "Lichess", url: "https://lichess.org", category: "Gaming", description: "Free open-source chess", icon: "https://www.google.com/s2/favicons?sz=64&domain=lichess.org" },
  { id: "speedrun", name: "Speedrun.com", url: "https://speedrun.com", category: "Gaming", description: "Speedrunning records", icon: "https://www.google.com/s2/favicons?sz=64&domain=speedrun.com" },
  { id: "gamefaqs", name: "GameFAQs", url: "https://gamefaqs.gamespot.com", category: "Gaming", description: "Game guides & FAQs", icon: "https://www.google.com/s2/favicons?sz=64&domain=gamefaqs.gamespot.com" },
  { id: "howlongtobeat", name: "HowLongToBeat", url: "https://howlongtobeat.com", category: "Gaming", description: "Game completion times", icon: "https://www.google.com/s2/favicons?sz=64&domain=howlongtobeat.com" },
];
