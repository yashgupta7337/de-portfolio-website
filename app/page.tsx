import Nav from "@/components/Nav";
import ScrollRail from "@/components/ScrollRail";
import Hero from "@/components/Hero";
import ImpactStats from "@/components/ImpactStats";
import About from "@/components/About";
import Experience from "@/components/Experience";
import CaseStudies from "@/components/CaseStudies";
import Medallion from "@/components/Medallion";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Interests from "@/components/Interests";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Upcoming from "@/components/Upcoming";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <ScrollRail />
      <main>
        <Hero />
        <ImpactStats />
        <About />
        <Experience />
        <CaseStudies />
        <Medallion />
        <Skills />
        <Education />
        <Projects />
        <Interests />
        <Contact />
        <Upcoming />
      </main>
      <Footer />
    </>
  );
}
