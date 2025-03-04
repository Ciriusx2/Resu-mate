import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
//import "@radix-ui/themes/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Resu Mate",
  description: "One stop solution for all your resume needs.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className} max-w-screen-2xl mx-auto pt-20 bg-gradient-to-r from-indigo-500 to-indigo-800`}>
            <div className="grid-background"></div>

            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            <footer className="py-3">
              <div className="px-3 text-center text-gray-200">
                <p>&#169; ResuMate Rights are reserverd 2025.</p>
              </div>
            </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
