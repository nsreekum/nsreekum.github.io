import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NS | Website",
  description: "Powered by Next JS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Nikhil Sreekumar</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} layout`}> {/* Add the 'layout' class */}
        <header>Nikhil Sreekumar</header>
        <Navbar/>
        <main className="main-content"> {/* Add a class to the main content */}
          {children}
        </main>
        <footer>
          <p>
            {new Date().getFullYear()} NS. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}