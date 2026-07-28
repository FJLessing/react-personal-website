import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';

const navLinks = [
  { name: 'About', hash: '#about' },
  { name: 'Experience', hash: '#experience' },
  { name: 'Skills', hash: '#skills' },
  { name: 'Contact', hash: '#contact' }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  // Section anchors only work on the home page; from other routes we
  // navigate back to "/" first and let the browser jump to the anchor.
  const anchorHref = (hash: string) => (pathname === '/' ? hash : `/${hash}`);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="text-xl text-white tracking-wider">
            FJ<span className="text-yellow-500">Lessing</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={anchorHref(link.hash)}
                className="text-zinc-400 hover:text-yellow-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/blog"
              className={pathname.startsWith('/blog')
                ? 'text-yellow-500 transition-colors'
                : 'text-zinc-400 hover:text-yellow-500 transition-colors'}
            >
              Blog
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={anchorHref(link.hash)}
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 hover:text-yellow-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Link
                to="/blog"
                onClick={() => setIsOpen(false)}
                className={pathname.startsWith('/blog')
                  ? 'text-yellow-500 transition-colors'
                  : 'text-zinc-400 hover:text-yellow-500 transition-colors'}
              >
                Blog
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
