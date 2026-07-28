import { Navigation } from "@/app/components/Navigation";
import { Hero } from "@/app/components/Hero";
import { About } from "@/app/components/About";
import { Experience } from "@/app/components/Experience";
import { Skills } from "@/app/components/Skills";
import { Contact } from "@/app/components/Contact";
import { Footer } from "@/app/components/Footer";
import { Interests } from "@/app/components/Interests";
import { Seo, SITE_URL } from "@/app/components/Seo";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "FJ Lessing",
  jobTitle: "Head of Development",
  worksFor: {
    "@type": "Organization",
    name: "BRAVE Digital",
  },
  url: SITE_URL,
  sameAs: [
    "https://www.linkedin.com/in/fj-lessing/",
    "https://github.com/FJLessing",
  ],
  knowsAbout: [
    "Web Development",
    "Mobile Development",
    "React",
    "Vue.js",
    "Laravel",
    "Flutter",
    "AWS",
    "DevOps",
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black/90 text-white">
      <Seo
        title="FJ Lessing - Head of Development | Full-Stack Developer"
        description="FJ Lessing - Head of Development at BRAVE Digital. Expert in full-stack development, mobile apps, cloud architecture, and team leadership. Specialized in React, Vue, Laravel, Flutter, and DevOps."
        path="/"
        jsonLd={personJsonLd}
      />
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
