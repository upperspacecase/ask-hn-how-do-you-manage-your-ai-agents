import { Footer } from "@/components/Footer";
import { Landing } from "@/components/Landing";
import { LogoStrip } from "@/components/LogoStrip";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Landing />
      <LogoStrip />
      <Footer />
    </main>
  );
}
