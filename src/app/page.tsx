import Nav from "@/components/v4/Nav";
import Hero from "@/components/v4/Hero";
import Marquee from "@/components/v4/Marquee";
import About from "@/components/v4/About";
import Ventures from "@/components/v4/Ventures";
import Projects from "@/components/v4/Projects";
import Writing from "@/components/v4/Writing";
import Now from "@/components/v4/Now";
import Contact from "@/components/v4/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-paper">
      <Nav />
      <main>
        <Hero />
        <Marquee variant="red" />
        <About />
        <Ventures />
        <Projects />
        <Writing />
        <Now />
        <Marquee variant="ink" />
        <Contact />
      </main>
    </div>
  );
}
