# Accessibility AI

An AI-powered website accessibility checker built with Next.js. Analyze any website or HTML snippet for WCAG compliance issues and get AI-driven remediation suggestions.

## Features

- 🤖 **AI-Powered Analysis** — Uses OpenAI to detect accessibility issues
- 🔍 **URL or HTML Support** — Analyze live websites or paste HTML directly
- 📊 **Severity Indicators** — Color-coded issues (critical/major/minor)
- 📥 **Export Reports** — Download accessibility audit as JSON
- 🎨 **Beautiful UI** — Modern, responsive design with Tailwind CSS
- ⚡ **Instant Fallback** — Works without OpenAI key (shows sample issues)

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Create .env.local with your OpenAI key (optional)
echo "OPENAI_API_KEY=sk-..." > .env.local

# Start dev server
npm run dev
```

Open http://localhost:3000/accessibility in your browser.

### Deploy to Vercel (Free & Easy)

1. **Push code to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/accessibility-ai.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your repo and click "Import"
   - Click "Deploy" — that's it! ✨

3. **Optional: Add OpenAI API key**
   - In Vercel Dashboard → Settings → Environment Variables
   - Add `OPENAI_API_KEY=sk-...`
   - Redeploy

Your app is now live at `https://your-project.vercel.app`

## Environment Variables

For local development, create `.env.local`:

```env
OPENAI_API_KEY=sk-your-key-here
```

Without an API key, the tool returns sample issues for testing.

## API Usage

Analyze a website or HTML:

```bash
curl -X POST http://localhost:3000/api/accessibility/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}' \
  | jq .
```

Response example:
```json
{
  "issues": [
    {
      "id": "a11y-1",
      "severity": "critical",
      "selector": "img:not([alt])",
      "description": "Image elements missing `alt` attributes are not accessible to screen readers.",
      "suggestion": "Add descriptive `alt` text to images or `role=\"presentation\"` if purely decorative.",
      "wcag": "1.1.1"
    }
  ]
}
```

## Project Structure

```
app/
├── api/
│   └── accessibility/
│       └── analyze/route.js       # AI analysis endpoint
├── components/
│   ├── AccessibilityTool.jsx      # Main UI component
│   ├── Header.jsx                 # Navigation header
│   ├── Footer.jsx                 # Footer
│   └── Homepage.jsx               # Landing page
├── accessibility/page.js          # Tool page
├── layout.js                       # Root layout with Tailwind CDN
└── page.js                         # Home page
package.json
.env.local                          # Environment variables (local only)
.vercelignore                       # Vercel deployment ignore file
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI:** React 18, Tailwind CSS (CDN)
- **AI:** OpenAI Node.js SDK
- **Hosting:** Vercel (recommended)

## Usage Tips

- **Live websites:** Enter a public URL to scan for accessibility issues
- **HTML snippets:** Paste HTML to analyze a page fragment
- **Fallback mode:** Works without OpenAI key (returns sample issues for testing)
- **Export reports:** Click "Export JSON" to download the audit as a file

## Troubleshooting

**"Cannot fetch URL"**
- Ensure the website is publicly accessible
- Some sites block automated requests

**"No API key configured"**
- Add `OPENAI_API_KEY` to `.env.local` (local) or Vercel Environment Variables (production)
- Without it, sample issues are returned for testing

**Port already in use**
- Run on a different port: `npm run dev -- -p 3001`

## Next Steps

- Add authentication for production use
- Persist audit history to a database (PostgreSQL, MongoDB, etc.)
- Generate detailed remediation guides
- Schedule periodic scans for websites
- Integrate with CI/CD pipelines

## License

MIT

## Support

For issues or feature requests, open a GitHub issue.

## 🤝 Contributing

Feel free to modify and customize for your needs. The system is designed to be self-improving!

---

**Built with**: Next.js 14 • React 18 • OpenAI GPT-4 • Tailwind CSS

**Status**: Active development with daily AI improvements 🚀
