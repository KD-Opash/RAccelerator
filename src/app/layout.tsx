import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RAccelerator — GSPR RAC-Agent & MedTech Regulatory Intelligence",
  description:
    "Regulatory intelligence for EU MDR 2017/745 Class IIb medical device compliance — GSPR gap assessment, Annex VIII classification, and evidence traceability.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('raccelerator-theme');
                  var pref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var theme = saved ? saved : pref;
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
