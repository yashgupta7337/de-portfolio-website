import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ImpactStats from "@/components/ImpactStats";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Interests from "@/components/Interests";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ImpactStats />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Projects />
        <Interests />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
