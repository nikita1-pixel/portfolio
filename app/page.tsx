import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import Manifesto from "@/components/Manifesto";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
