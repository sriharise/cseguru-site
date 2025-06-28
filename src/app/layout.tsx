import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Open_Sans } from 'next/font/google';
import "./globals.css";

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-open-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${openSans.variable} antialiased`}>
        <Header />

        <main className="max-w-7xl mx-auto p-4 pt-0 lg:p-0">{children}</main>

        <Footer />
      </body>
    </html>
  );
}