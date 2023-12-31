import "./globals.scss";
import "../styles/header.scss";
import "../styles/todoList.scss";
import "../styles/login.scss";
import "../styles/profile.scss";
import { Inter } from "next/font/google";
import Header from "./header";
import { ContextProvider } from "@latest/components/client/client";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dear Todo",
  description: "Generated by DearTodo App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <>
            <Header />
            {children}
          </>
        </ContextProvider>
      </body>
    </html>
  );
}
