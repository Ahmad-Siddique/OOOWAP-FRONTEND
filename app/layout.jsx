import "./globals.css";

import { Inter } from "next/font/google";
import { Providers } from "../redux/Provider";
import Header from "../components/header/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OOOWAP | Exchange your goods",
  description:
    "OOOWAP is a platform that allows you to exchange your goods for other goods.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
