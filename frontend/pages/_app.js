import '../styles/globals.css'
import { Inter, Space_Grotesk } from "next/font/google";
import VisitorTracker from "../features/visitors/frontend/VisitorTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-sans: ${inter.style.fontFamily};
          --font-display: ${spaceGrotesk.style.fontFamily};
        }
      `}</style>
      <VisitorTracker />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
