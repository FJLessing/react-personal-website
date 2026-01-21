import { ExternalLink, Github } from 'lucide-react';
import { PROJECTS } from '../constants';

export function Projects() {
  return (
    <section id="projects" className="px-6 py-20 bg-zinc-900/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl mb-12">
          Featured <span className="text-yellow-500">Projects</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <div 
              key={index}
              className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-yellow-500 transition-all hover:transform hover:scale-[1.02]"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl text-white">{project.title}</h3>
                  <div className="flex gap-3">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-yellow-500 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a 
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-yellow-500 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                
                <p className="text-zinc-400 text-sm">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-xs bg-zinc-800 text-zinc-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}