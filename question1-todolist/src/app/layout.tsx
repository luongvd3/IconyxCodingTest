import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], display: "block" });

export const metadata: Metadata = {
  title: "To-Do List",
  description: "A task management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " min-w-[48rem]"}>
        <header>
          <TopNav className="h-20 border-b-4 border-green-800 bg-white" />
        </header>
        <section className='px-3 xl:grid xl:grid-cols-sidebar-content-miniCharts 2xl:grid-cols-lgSidebar-content-charts'>
          {/* Empty block for responsive ui */}
          <section className='overflow-auto bg-white xl:row-span-2 xl:overflow-visible'></section>
          {children}
          {/* Empty block for responsive ui */}
          <section className='w-full bg-white px-3 py-5 xl:h-full 2xl:px-8'></section>
        </section>
        <footer>
          <Footer className="bg-gray-50 xl:grid xl:grid-cols-sidebar-content-miniCharts 2xl:grid-cols-lgSidebar-content-charts" />
        </footer>
      </body>
    </html>
  );
}
