export function About() {
  return (
    <section id="about" className="px-6 py-20">
      <div className="max-w-4xl mx-auto border border-zinc-800 rounded py-12 px-6 xl:px-12 bg-zinc-900">
        <h2 className="text-3xl md:text-4xl mb-12">
          About <span className="text-yellow-500">Me</span>
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-12">
          <div className="space-y-4 text-zinc-400 xl:col-span-2">
            <p>
              As the Head of Development at Brave Digital, I lead a talented
              team of developers in delivering cutting-edge software solutions
              for our diverse clientele. My primary responsibilities include
              scoping and architecting projects, overseeing developer growth and
              wellbeing, guiding technical strategy, and ensuring that we
              deliver high-quality products on time and within budget.
            </p>
            <p>
              I have extensive experience in full-stack development with
              Laravel, NodeJS, Vue, and React, as well as mobile app development
              with Flutter, React Native, and Swift. I also manage DevOps,
              including web servers, cloud infrastructure, and app deployment.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg text-white mb-2">Education</h3>
              <p className="text-zinc-400">BIS Multimedia</p>
              <p className="text-sm text-zinc-500">
                University of Pretoria, 2011-2016
              </p>
            </div>

            <div>
              <h3 className="text-lg text-white mb-2">Contact</h3>
              <p className="text-zinc-400">me@fjlessing.co.za</p>
              <p className="text-zinc-400">+27 83 233 6448</p>
            </div>

            <div>
              <h3 className="text-lg text-white mb-2">Code</h3>
              <p className="text-zinc-400">
                <a
                  href="https://github.com/FJLessing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-500 transition-colors"
                >
                  GitHub: <u>FJLessing</u>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
