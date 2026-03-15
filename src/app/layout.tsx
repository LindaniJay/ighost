
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import NavBar from "../components/NavBar";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IGHOST | Architecture of Culture",
  description:
    "IGHOST Edutainment NPC develops artists and communities through events, awards, camps, wellness support, women empowerment, and drug awareness.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${space.variable} antialiased`}>
        <div className="min-h-screen" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>
          <NavBar />
          <main>{children}</main>
          <footer className="mt-20 border-t border-[#d9dbdf] bg-[rgba(255,255,255,0.72)] backdrop-blur">
            <div className="app-shell py-12">
              <div className="glass-strip mb-8 rounded-2xl p-5 md:p-6">
                <div className="grid gap-4 md:grid-cols-[1.25fr_0.75fr] md:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Stay Updated</p>
                    <h3
                      className="mt-1 text-2xl font-semibold text-[#121522]"
                      style={{ fontFamily: "var(--font-space), sans-serif" }}
                    >
                      Events, Ambassador Calls, and IGHOST Updates
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      Follow new events, ambassador opportunities, and community activity from IGHOST Edutainment.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="name@example.com"
                      className="w-full rounded-full border border-[#d2d7e0] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#5f7695]"
                    />
                    <button type="button" className="btn-primary whitespace-nowrap px-4 py-2.5 text-xs uppercase tracking-[0.08em]">
                      Join
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p
                    className="text-sm font-semibold uppercase tracking-[0.12em] text-[#2e4f7a]"
                    style={{ fontFamily: "var(--font-space), sans-serif" }}
                  >
                    IGHOST Edutainment
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    A non-profit company founded in 2021 by Miss A. Mhlongo (iGhostikazi) to host,
                    support, and grow artists and youth nationally.
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.1em] text-[#5f7695]">
                    Ungaphiki Nathi, Phila Nathi
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Quick Links</p>
                  <div className="mt-3 grid gap-2 text-sm">
                    <Link href="/events" className="text-[#27303c] hover:text-[#2e4f7a]">Events</Link>
                    <Link href="/shop" className="text-[#27303c] hover:text-[#2e4f7a]">Shop</Link>
                    <Link href="/ambassadors" className="text-[#27303c] hover:text-[#2e4f7a]">Ambassadors</Link>
                    <Link href="/about" className="text-[#27303c] hover:text-[#2e4f7a]">About</Link>
                    <Link href="/contact" className="text-[#27303c] hover:text-[#2e4f7a]">Contact</Link>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Contact</p>
                  <div className="mt-3 grid gap-2 text-sm text-[#27303c]">
                    <a href="https://wa.me/27652523189" target="_blank" rel="noopener noreferrer" className="hover:text-[#2e4f7a]">
                      WhatsApp: +27 65 252 3189
                    </a>
                    <a href="mailto:info@ighost.co.za" className="hover:text-[#2e4f7a]">
                      info@ighost.co.za
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#2e4f7a]">
                      Instagram
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#2e4f7a]">
                      Facebook
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5f7695]">Focus Areas</p>
                  <p className="mt-3 text-sm text-muted">
                    Talent development, artists health, women empowerment, and drug awareness are
                    the four core areas described in the IGHOST presentation.
                  </p>
                  <Link href="/admin" className="mt-3 inline-flex rounded-full border border-[#d5dbe5] bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#2e4f7a] hover:border-[#8fa2bc]">
                    Admin Content Manager
                  </Link>
                </div>
              </div>

              <div className="soft-divider mt-8" />
              <div className="mt-4 pt-1 text-xs text-muted">
                Copyright {new Date().getFullYear()} IGHOST. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
