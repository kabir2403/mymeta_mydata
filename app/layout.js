import './globals.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata = {
  title: 'CricLive - Real-time Cricket Updates',
  description: 'Live cricket scores, news, and match schedules',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-emerald-950 text-white selection:bg-emerald-500 selection:text-white flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}