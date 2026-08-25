import Link from 'next/link';
import Image from 'next/image';
import ObfuscatedEmail from './ObfuscatedEmail';

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-6">
          <div>
            <Image src="/logo.png" alt="McLoud Construction" width={185} height={80} className="h-16 w-auto" />
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-paper/70">
              Quality work, honest communication. Locally owned, serving the Kansas City metro.
            </p>
          </div>

          <div>
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-brass">Navigate</div>
            <ul className="mt-4 space-y-2 font-body text-sm text-paper/80">
              <li><Link href="/residential" className="hover:text-brass">Residential</Link></li>
              <li><Link href="/commercial" className="hover:text-brass">Commercial</Link></li>
              <li><Link href="/about" className="hover:text-brass">About</Link></li>
              <li><Link href="/faq" className="hover:text-brass">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-brass">Get in Touch</div>
            <ul className="mt-4 space-y-2 font-body text-sm text-paper/80">
              <li><ObfuscatedEmail user="info" domain="mcloudconstruction.com" className="hover:text-brass" /></li>
              <li><Link href="/consultation" className="hover:text-brass">Schedule a Consultation</Link></li>
              <li className="text-paper/50">Monday to Friday, 8am to 5pm</li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-brass">Existing Clients</div>
            <ul className="mt-4 space-y-2 font-body text-sm text-paper/80">
              <li><a href="https://jobs.mcloudconstruction.com/customerportal" className="hover:text-brass">Client Portal Login</a></li>
              <li className="text-paper/50">Track your project, documents, and invoices</li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-brass">Subcontractors</div>
            <ul className="mt-4 space-y-2 font-body text-sm text-paper/80">
              <li><a href="https://jobs.mcloudconstruction.com/subcontractor-apply" className="hover:text-brass">Apply to Work With Us</a></li>
              <li className="text-paper/50">Join our network of trade partners</li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-brass">Service Area</div>
            <p className="mt-4 font-body text-sm leading-relaxed text-paper/80">
              Greater Kansas City metro, including communities throughout both Missouri and Kansas.
            </p>
          </div>
        </div>

        <div className="tick-rule mt-12" />
        <div className="mt-6 flex flex-col items-start justify-between gap-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-paper/40 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} McLoud Contracting, LLC</span>
          <a href="https://www.instagram.com/mcloud.construction/" aria-label="McLoud Construction on Instagram" className="hover:text-brass">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
              <circle cx="12" cy="12" r="4.3" />
              <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
