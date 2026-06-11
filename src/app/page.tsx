import Preloader from "@/components/v5/Preloader";
import Cursor from "@/components/v5/Cursor";
import Nav from "@/components/v5/Nav";
import Hero from "@/components/v5/Hero";
import VelocityMarquee from "@/components/v5/VelocityMarquee";
import Manifesto from "@/components/v5/Manifesto";
import Stats from "@/components/v5/Stats";
import Ventures from "@/components/v5/Ventures";
import Projects from "@/components/v5/Projects";
import Writing from "@/components/v5/Writing";
import Now from "@/components/v5/Now";
import Contact from "@/components/v5/Contact";

const domains = [
  "M&A",
  "Private Equity",
  "Manufacturing",
  "Financial Modelling",
  "NSE Equities",
  "Product",
  "Software Tools",
  "Family Business",
  "US Market Entry",
  "AI Tooling",
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-void">
      <Preloader />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <div className="border-y border-line">
          <VelocityMarquee items={domains} />
        </div>
        <Manifesto />
        <Stats />
        <Ventures />
        <Projects />
        <Writing />
        <Now />
        <Contact />
      </main>
    </div>
  );
}
