import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
              <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Solvezyo logo" className="h-8 w-8" />
          <Link href="/" className="text-xl font-bold cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Solvezyo
          </Link>
        </div>
            <p className="text-muted-foreground text-sm mb-6">
              Your comprehensive collection of 70+ professional tools across 35 categories. Convert, calculate, edit and optimize with ease.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/writing" className="text-muted-foreground hover:text-primary transition">Writing Tools</Link></li>
              <li><Link href="/category/developer" className="text-muted-foreground hover:text-primary transition">Developer Tools</Link></li>
              <li><Link href="/category/design" className="text-muted-foreground hover:text-primary transition">Design Tools</Link></li>
              <li><Link href="/category/seo" className="text-muted-foreground hover:text-primary transition">SEO & Marketing</Link></li>
              <li><Link href="/categories" className="text-muted-foreground hover:text-primary transition">All Categories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition">Blog</Link></li>
              <li><Link href="/docs" className="text-muted-foreground hover:text-primary transition">Documentation</Link></li>
              <li><Link href="/api" className="text-muted-foreground hover:text-primary transition">API</Link></li>
              <li><Link href="/changelog" className="text-muted-foreground hover:text-primary transition">Changelog</Link></li>
              <li><Link href="/status" className="text-muted-foreground hover:text-primary transition">Status</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition">About Us</Link></li>
              <li><Link href="/author" className="text-muted-foreground hover:text-primary transition">About the Author</Link></li>
              <li><Link href="/careers" className="text-muted-foreground hover:text-primary transition">Careers</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition">Terms of Service</Link></li>
              <li><Link href="/dmca" className="text-muted-foreground hover:text-primary transition">DMCA Policy</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Solvezyo. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition">Privacy</Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition">Terms</Link>
            <Link href="/disclaimer" className="text-muted-foreground hover:text-primary transition">Disclaimer</Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-primary transition">Cookies</Link>
            <Link href="/sitemap" className="text-muted-foreground hover:text-primary transition">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
