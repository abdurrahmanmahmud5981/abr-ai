import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ["latin"] })


export const metadata: Metadata = {
  title: "Abrai - Mentor Of Your Career",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (


    <ClerkProvider appearance={{
      baseTheme: dark,
    }} >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.className} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* header */}
            <Header></Header>
            <main className="min-h-screen">
              {children}
            </main>
            <Toaster richColors />
            {/* footer */}
            <footer className="bg-muted/50 py-12 text-center">
              <div className="container mx-auto">
                <p className="text-sm text-gray-200">
                  © {new Date().getFullYear()} ABRAI. All rights reserved.
                </p>
              </div>

            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
