import { SKILL_CATEGORIES } from '../constants';

export function Skills() {
  return (
    <section id="skills" className="px-6 py-20">
      <div className="max-w-4xl mx-auto border border-zinc-800 rounded p-12">
        <h2 className="text-3xl md:text-4xl mb-12">
          Skills & <span className="text-yellow-500">Technologies</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((category, index) => (
            <div 
              key={index}
              className="space-y-4"
            >
              <h3 className="text-xl text-white">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span 
                    key={i}
                    className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded hover:bg-yellow-500 hover:text-white transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}