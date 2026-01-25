export function Interests() {
  return (
    <div className="max-w-4xl mx-auto border border-zinc-800  bg-zinc-900 rounded">
      <h2 className="text-3xl md:text-4xl m-12">
        Recent <span className="text-yellow-500">Interests</span>
      </h2>
      <div className="space-y-4 m-12">
        <p className="text-zinc-400">
          I love continually developing my knowledge and experimenting with new
          technologies. This section is updated as I tackle new things and
          hopefully succeed at some of them.
        </p>
      </div>
      <div className="md:flex flex-wrap">
        <div className="p-12 md:pr-6 border border-zinc-800 md:basis-1/2">
          <h3 className="text-lg text-white mb-2">
            Learning <span className="text-yellow-600">Go</span>
          </h3>
          <p className="text-zinc-400 mb-2">
            I am currently pursuing learing Go through boot.dev, as an
            alternative to Dart that has a bit wider application and community
            support. I love the idea of a fast, cross-platform, strongly typed
            language where concurrency isn't black magic, and with a decent
            standard library.
          </p>
          <p className="text-zinc-400">
            After doing some server applications and microservices, and maybe
            some TUI's I am planning on trying to tackle Godot and make some
            small games.
          </p>
        </div>
        <div className="p-12 md:pr-6 border border-zinc-800 md:basis-1/2">
          <h3 className="text-lg text-white mb-2">
            Electronics and <span className="text-yellow-600">3D printing</span>{" "}
            experiments
          </h3>
          <p className="text-zinc-400 mb-2">
            I've graduated from my keyboard building hobby into using my 3d
            printer and electronics to build little products and toys using my
            3d printer and CAD.
          </p>
          <p className="text-zinc-400">
            I've moved from using and customsing other people's models to
            setting myself the goal of modelling and building my own electronics
            projects, like a bluetooth speaker, and a small synthesizer.
          </p>
        </div>
        <div className="p-12 border border-zinc-800 md:col-span-2">
          <h3 className="text-lg text-white mb-2">
            <span className="text-yellow-600">AI agentic</span> spec driven
            development
          </h3>
          <p className="text-zinc-400 mb-2">
            AI has become a daily part of life for developers and I've been
            trying to find ways to make the tools a little more predictable and
            efficient. I've been experimenting with different tools and
            frameworks to figure out the best ways of getting the AI to do what
            I need, and to do it well.
          </p>
          <p className="text-zinc-400">
            I've been refining the process of providing context through
            experimentation and learning from the community, and practicing this
            with personal projects in my homelab or on my desktop that I would
            otherwise never have had the time for.
          </p>
        </div>
      </div>
    </div>
  );
}
