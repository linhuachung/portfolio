import {JetBrains_Mono} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import * as Toast from "@radix-ui/react-toast";

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
    variable: "--font-jetbrainsMono",
})

export const metadata = {
    title: "ChungLH Portfolio",
    description: "Hi! I'm Lin Hua Chung, a Frontend Developer specializing in modern web technologies. Check out my projects and skills!",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <Toast.Provider>
            <body
                className={jetbrainsMono.variable}
            >
            <Header/>
            <StairTransition/>
            <PageTransition>
                {children}
            </PageTransition>
            </body>
        </Toast.Provider>
        </html>
    );
}
