import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Open_Sans } from 'next/font/google';
import { Suspense } from "react";
import AnalyticsProvider from "@/components/AnalyticsProvider";
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
        {/* Google Analytics script loader */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`${openSans.variable} antialiased`}>
        <Suspense fallback={null}>
          <AnalyticsProvider />
        </Suspense>
        <Header />

        <main className="max-w-7xl mx-auto p-4 pt-0 lg:p-0">{children}</main>

        <Footer />
      </body>
    </html>
  );
}