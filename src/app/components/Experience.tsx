import { EXPERIENCES } from '../constants';

export function Experience() {
  return (
    <section id="experience" className="px-6 py-20 bg-zinc-900/50">
      <div className="max-w-4xl mx-auto border border-zinc-800 rounded p-12">
        <h2 className="text-3xl md:text-4xl mb-12">
          Work <span className="text-yellow-500">Experience</span>
        </h2>
        
        <div className="space-y-12">
          {EXPERIENCES.map((exp, index) => (
            <div 
              key={index}
              className="relative pl-8 border-l-2 border-zinc-800"
            >
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-yellow-500"></div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl text-white">{exp.role}</h3>
                  <p className="text-yellow-500">{exp.company}</p>
                  <p className="text-sm text-zinc-500">{exp.period}</p>
                </div>
                
                <p className="text-zinc-400">{exp.description}</p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.tech.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-sm bg-zinc-800 text-zinc-300 rounded"
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