import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import StoreProvider from "@/app/StoreProvider";

const jetbrainsMono = JetBrains_Mono( {
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono"
} );

export const metadata = {
  title: "ChungLH Portfolio",
  description: "Hi! I'm Lin Hua Chung, a Frontend Developer specializing in modern web technologies. Check out my projects and skills!"
};

export default function RootLayout( { children } ) {
  return (
    <html lang="en">
      <body
        className={ jetbrainsMono.variable }
      >
        <StoreProvider>
          { children }
          <ToastContainer/>
        </StoreProvider>
      </body>
    </html>
  );
}
