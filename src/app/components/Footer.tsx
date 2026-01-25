import { Github, Linkedin, Mail, Coffee } from "lucide-react";

export function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-zinc-800 bg-zinc-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6">
            <a
              href="https://github.com/FJLessing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-yellow-500 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.fjlessing.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-yellow-500 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:me@fjlessing.co.za"
              className="text-zinc-400 hover:text-yellow-500 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <p className="text-zinc-500 text-sm flex items-center gap-2">
            Made with{" "}
            <Coffee className="w-4 h-4 text-yellow-500 fill-current" />{" "}
            {new Date().getFullYear().toString()}
          </p>
        </div>
      </div>
    </footer>
  );
}
