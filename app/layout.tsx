import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const rubik = Rubik({ weight: "variable", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Huur een auto met MyWheels",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
