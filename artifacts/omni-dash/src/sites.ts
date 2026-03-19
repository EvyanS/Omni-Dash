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

  // AI & Research
  { id: "chatgpt", name: "ChatGPT", url: "https://chat.openai.com", category: "AI & Research", description: "AI assistant by OpenAI", icon: "https://www.google.com/s2/favicons?sz=64&domain=chat.openai.com" },
  { id: "claude", name: "Claude", url: "https://claude.ai", category: "AI & Research", description: "AI assistant by Anthropic", icon: "https://www.google.com/s2/favicons?sz=64&domain=claude.ai" },
  { id: "perplexity", name: "Perplexity", url: "https://perplexity.ai", category: "AI & Research", description: "AI-powered search", icon: "https://www.google.com/s2/favicons?sz=64&domain=perplexity.ai" },
  { id: "gemini", name: "Gemini", url: "https://gemini.google.com", category: "AI & Research", description: "AI assistant by Google", icon: "https://www.google.com/s2/favicons?sz=64&domain=gemini.google.com" },
  { id: "copilot", name: "Microsoft Copilot", url: "https://copilot.microsoft.com", category: "AI & Research", description: "AI assistant by Microsoft", icon: "https://www.google.com/s2/favicons?sz=64&domain=copilot.microsoft.com" },

  // Reference
  { id: "wikipedia", name: "Wikipedia", url: "https://wikipedia.org", category: "Reference", description: "Free encyclopedia", icon: "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.org" },
  { id: "wolfram", name: "Wolfram Alpha", url: "https://wolframalpha.com", category: "Reference", description: "Computational knowledge", icon: "https://www.google.com/s2/favicons?sz=64&domain=wolframalpha.com" },
  { id: "archive", name: "Internet Archive", url: "https://archive.org", category: "Reference", description: "Digital library & Wayback Machine", icon: "https://www.google.com/s2/favicons?sz=64&domain=archive.org" },
  { id: "mdn", name: "MDN Web Docs", url: "https://developer.mozilla.org", category: "Reference", description: "Web development reference", icon: "https://www.google.com/s2/favicons?sz=64&domain=developer.mozilla.org" },

  // Creative
  { id: "canva", name: "Canva", url: "https://canva.com", category: "Creative", description: "Online design tool", icon: "https://www.google.com/s2/favicons?sz=64&domain=canva.com" },
  { id: "figma", name: "Figma", url: "https://figma.com", category: "Creative", description: "UI/UX design tool", icon: "https://www.google.com/s2/favicons?sz=64&domain=figma.com" },
  { id: "adobe", name: "Adobe Express", url: "https://express.adobe.com", category: "Creative", description: "Quick design tool", icon: "https://www.google.com/s2/favicons?sz=64&domain=express.adobe.com" },

  // Developer
  { id: "github", name: "GitHub", url: "https://github.com", category: "Developer", description: "Code hosting & collaboration", icon: "https://www.google.com/s2/favicons?sz=64&domain=github.com" },
  { id: "replit", name: "Replit", url: "https://replit.com", category: "Developer", description: "Online IDE", icon: "https://www.google.com/s2/favicons?sz=64&domain=replit.com" },
  { id: "stackoverflow", name: "Stack Overflow", url: "https://stackoverflow.com", category: "Developer", description: "Developer Q&A", icon: "https://www.google.com/s2/favicons?sz=64&domain=stackoverflow.com" },
  { id: "codesandbox", name: "CodeSandbox", url: "https://codesandbox.io", category: "Developer", description: "Online code editor", icon: "https://www.google.com/s2/favicons?sz=64&domain=codesandbox.io" },
  { id: "vercel", name: "Vercel", url: "https://vercel.com", category: "Developer", description: "Frontend deployment", icon: "https://www.google.com/s2/favicons?sz=64&domain=vercel.com" },
  { id: "netlify", name: "Netlify", url: "https://netlify.com", category: "Developer", description: "Web hosting & CI/CD", icon: "https://www.google.com/s2/favicons?sz=64&domain=netlify.com" },
];
