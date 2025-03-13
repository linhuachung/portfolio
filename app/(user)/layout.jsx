import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";


export default function RootLayout({children}) {
    return (
        <>
            <Header/>
            <StairTransition/>
            <PageTransition>
                {children}
            </PageTransition>
        </>
    );
}
