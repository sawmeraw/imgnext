import "../../globals.css";

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
      <body>{children}</body>
    </html>
  )
}
