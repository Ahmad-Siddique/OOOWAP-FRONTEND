import "./globals.css";

import { Roboto } from "next/font/google";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";

const font = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "OOOWAP | Exchange your goods",
  description:
    "OOOWAP is a platform that allows you to exchange your goods for other goods.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
