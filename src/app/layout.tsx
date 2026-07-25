import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gurfateh Josan | Full Stack Java Developer Portfolio",
  description: "Personal portfolio of Gurfateh Josan — Full Stack Java Developer based in Mohali, Punjab, India. Specializing in Java, Spring Boot, React, MySQL, and modern web architecture.",
  keywords: ["Gurfateh Josan", "Full Stack Java Developer", "Spring Boot", "React", "MySQL", "Java", "Web Developer", "Mohali", "Portfolio"],
  authors: [{ name: "Gurfateh Josan" }],
  openGraph: {
    title: "Gurfateh Josan — Full Stack Java Developer",
    description: "Building modern, scalable, and responsive web applications with Java, Spring Boot, React, and MySQL.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark scroll-smooth`}>
      <body className={`${inter.className} bg-[#121212] text-gray-100 antialiased selection:bg-blue-600 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
