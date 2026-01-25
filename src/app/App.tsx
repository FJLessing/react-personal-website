import { Navigation } from "@/app/components/Navigation";
import { Hero } from "@/app/components/Hero";
import { About } from "@/app/components/About";
import { Experience } from "@/app/components/Experience";
import { Skills } from "@/app/components/Skills";
import { Contact } from "@/app/components/Contact";
import { Footer } from "@/app/components/Footer";
import { Interests } from "./components/Interests";

export default function App() {
  return (
    <div className="min-h-screen bg-black/90 text-white">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Interests />
      <Contact />
      <Footer />
    </div>
  );
}
