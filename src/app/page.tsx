import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Writing from "@/components/Writing";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-bg min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Writing />
      <Contact />
    </main>
  );
}
