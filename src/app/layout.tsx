import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                const storedTheme = localStorage.getItem("theme");
                const isDark = storedTheme
                  ? storedTheme === "dark"
                  : window.matchMedia("(prefers-color-scheme: dark)").matches;
                document.documentElement.classList.toggle("dark", isDark);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-theme-bg text-theme-text antialiased transition-colors`}
      >
        <div className="flex flex-grow flex-col bg-theme-surface/70 transition-colors">
          <Navbar />
          <main className="flex-grow px-2 md:px-0">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
