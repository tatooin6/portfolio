import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tato Portfolio",
  description:
    "Full stack web developer with experience in TypeScript, React.js and agile methodologies. Specialized in frontend with Next.js and backend development with Node.js and Docker. I have worked on projects such as ticket management applications with sockets and online exam platforms. Currently, I develop satellite image analysis solutions at the Bolivian Space Agency. Always looking to create efficient and user-friendly interfaces, with a focus on code quality and user experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
