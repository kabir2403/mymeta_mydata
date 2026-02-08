import './globals.css'

export const metadata = {
  title: 'Accessibility AI',
  description: 'AI-powered website accessibility checks',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-slate-900 text-white">{children}</body>
    </html>
  )
}