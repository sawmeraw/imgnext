import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ImgNext - Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer position="bottom-left" newestOnTop={true} draggable pauseOnHover={false} theme="dark" transition={Bounce}></ToastContainer>
        <Navbar/>
      <main className="flex min-h-screen flex-col items-center justify-between ">
        {children}
      </main>
      </body>
    </html>
  );
}
