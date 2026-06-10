import Chrome from "@/components/site/Chrome";
import Hero from "@/components/site/Hero";
import Ticker from "@/components/site/Ticker";
import About from "@/components/site/About";
import Ventures from "@/components/site/Ventures";
import Projects from "@/components/site/Projects";
import Writing from "@/components/site/Writing";
import Now from "@/components/site/Now";
import Connect from "@/components/site/Connect";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg">
      <Chrome />
      <main className="xl:pl-[68px]">
        <Hero />
        <Ticker />
        <About />
        <Ventures />
        <Projects />
        <Writing />
        <Now />
        <Connect />
      </main>
    </div>
  );
}
