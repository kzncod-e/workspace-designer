import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "monis.rent — Workspace Designer | Build Your Bali Office",
  description:
    "Interactive workspace builder for digital nomads and startups in Bali. Customize ergonomic desks, chairs, ultrawide monitors, and lighting with instant monthly rental pricing and zero deposit delivery.",
  keywords: [
    "monis.rent",
    "workspace designer",
    "Bali office rental",
    "standing desk rental",
    "ergonomic chair rental Bali",
    "digital nomad workstation",
    "Canggu coworking setup",
  ],
  openGraph: {
    title: "monis.rent — Workspace Designer",
    description: "Build your dream workspace in Bali and rent it with free villa delivery.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-emerald-500/20 selection:text-emerald-900 dark:selection:text-emerald-300`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <TooltipProvider delay={200}>
          {children}
          <Toaster position="bottom-right" richColors />
        </TooltipProvider>
      </body>
    </html>
  );
}
