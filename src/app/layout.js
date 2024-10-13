import { Afacad } from "next/font/google";
import "./globals.css";

const mainFont = Afacad({ subsets: ["latin"] });

export const metadata = {
  title: "Student Dashboard.ai",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${mainFont.className}`}
      >
        {children}
      </body>
    </html>
  );
}
