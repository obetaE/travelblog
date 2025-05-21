import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar"
import Footer from "@/components/Footer/Footer";
import { Merriweather } from "next/font/google";
import { AuthProvider } from "./Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const merriWeather = Merriweather({
  subsets: ["latin"],
  weight: [ "300", "400", "700", "900"]
});

export const metadata = {
  title: "Travel Vlogs",
  description: "Escape to a World of tranquility. Our luxurious night suites offer unparalleled comfort, elegance, and relaxation. Unwind in style in wake up refreshed.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${merriWeather.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <Navbar/>
        {children}
        <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
