import { Github, Linkedin, Mail, FileDown } from "lucide-react";
import profileImage from "../../assets/816cce38ea06beccf64a13c02ed16a2a72daced0.png";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-64 h-64 rounded-2xl overflow-hidden border border-zinc-800">
              <img
                src={profileImage}
                alt="FJ Lessing"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="space-y-4">
              <p className="text-yellow-500 text-sm tracking-wider uppercase mb-0">
                Head of Development at BRAVE
              </p>
              <h1 className="text-5xl md:text-7xl mt-auto">
                <span className="text-4xl">Hi, I'm</span>
                <br />
                <span className="text-yellow-500">
                  FJ Lessing
                </span>
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl space-y-4 mb-6">
                I lead a talented team of developers in
                delivering cutting-edge software solutions.
                Passionate about full-stack development, mobile
                applications, and building scalable
                architectures.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-2 items-center">
              <a
                href="#contact"
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                Get in Touch
                <Mail className="w-4 h-4" />
              </a>
              {/*<a
                href="https://www.fjlessing.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-zinc-700 hover:border-yellow-500 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                View Portfolio
                <FileDown className="w-4 h-4" />
              </a>*/}
            </div>
            <div className="flex flex-wrap gap-4 mt-4 mb-2 items-center">
               <a
                 href="https://github.com/FJLessing"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-zinc-400 hover:text-yellow-500 transition-colors"
               >
                 <Github className="w-6 h-6" />
               </a>
               <a
                 href="https://www.linkedin.com/in/fj-lessing/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-zinc-400 hover:text-yellow-500 transition-colors"
               >
                 <Linkedin className="w-6 h-6" />
               </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
