import { Navigation } from '@/app/components/Navigation';
import { Hero } from '@/app/components/Hero';
import { About } from '@/app/components/About';
import { Experience } from '@/app/components/Experience';
import { Skills } from '@/app/components/Skills';
import { Contact } from '@/app/components/Contact';
import { Footer } from '@/app/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}