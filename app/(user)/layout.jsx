import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import { LINKS } from "@/constants/route";

export default function RootLayout( { children } ) {
  return (
    <>
      <Header
        links={ LINKS }
      />
      <StairTransition/>
      <PageTransition>
        { children }
      </PageTransition>
    </>
  );
}
