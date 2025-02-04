import "../../globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: 'ImgNext',
  description: 'ImgNext is a simple web application that aids in downloading product images for different brands more so related to running shoes and apparel.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex flex-1 flex-col items-center justify-between w-full">
          {children}
        </main>
      </body>
    </html>
  )
}
