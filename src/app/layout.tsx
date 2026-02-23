import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Europia International Clinic | Thẩm Mỹ & Chăm Sóc Sức Khỏe Cao Cấp",
  description: "Trải nghiệm dịch vụ y khoa và thẩm mỹ tiêu chuẩn quốc tế tại Europia. Công nghệ Châu Âu, bác sĩ đầu ngành.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
