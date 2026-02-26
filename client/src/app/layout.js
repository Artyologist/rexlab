import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "../providers";
import Script from "next/script";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Rex Labs | Premium Audio Engineering & Production",
  description: "Professional mixing, mastering, and beat production services.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} antialiased selection:bg-purple-500 selection:text-white`}>
        <Providers>{children}</Providers>
        {/* <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
        /> */}
      </body>
    </html>
  );
}
