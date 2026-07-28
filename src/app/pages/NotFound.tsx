import { Link } from "react-router";
import { Navigation } from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import { Seo } from "@/app/components/Seo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black/90 text-white flex flex-col">
      <Seo
        title="Page Not Found | FJ Lessing"
        description="The page you are looking for does not exist."
        path="/404"
      />
      <Navigation />

      <main className="flex-1 flex items-center justify-center px-6 pt-24">
        <div className="text-center">
          <p className="text-6xl text-yellow-500 mb-4">404</p>
          <h1 className="text-2xl mb-4">Page not found</h1>
          <p className="text-zinc-400 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="text-yellow-500 border border-yellow-500 rounded px-6 py-3 hover:bg-yellow-500 hover:text-black transition-colors"
          >
            Back to home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
