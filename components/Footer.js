import Link from 'next/link';
import Image from 'next/image';
import ObfuscatedEmail from './ObfuscatedEmail';
import Tagline from './Tagline';
import { SERVICE_AREAS, phoneDisplay, phoneHref } from '@/lib/siteConfig';
import { HUBS, HOMEOWNER_NAV, ACCESSIBILITY_NAV, PROPERTY_MANAGER_NAV } from '@/lib/projectOptions';

// One column per kind of customer, each headed by a link to its hub page.
const MENUS = [
  { ...HUBS.homeowners, links: HOMEOWNER_NAV },
  { ...HUBS.accessibility, links: ACCESSIBILITY_NAV.filter(link => link.href !== HUBS.accessibility.href) },
  { ...HUBS.propertyManagers, links: PROPERTY_MANAGER_NAV },
];

export default function Footer() {
  const phone = phoneDisplay();
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <Image src="/mcloud-logo.png" alt="McLoud Construction" width={176} height={64} className="h-16 w-auto" />
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-paper/70">
              Quality work, honest communication. Locally owned, serving the Kansas City metro.
            </p>
            <Tagline
              tone="dark"
              className="mt-4 font-display text-xl font-bold uppercase leading-tight tracking-tight"
            />
          </div>

          {MENUS.map(menu => (
            <div key={menu.href}>
              <Link href={menu.href} className="font-mono text-xs uppercase tracking-[0.12em] text-brass hover:underline">
                {menu.label}
              </Link>
              <ul className="mt-4 space-y-2 font-body text-sm text-paper/80">
                {menu.links.map(link => (
                  <li key={link.href}><Link href={link.href} className="hover:text-brass">{link.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <div className="font-mono text-xs uppercase tracking-[0.12em] text-brass">Company</div>
            <ul className="mt-4 space-y-2 font-body text-sm text-paper/80">
              <li><Link href="/about" className="hover:text-brass">About</Link></li>
              <li><Link href="/faq" className="hover:text-brass">FAQ</Link></li>
              <li><Link href="/financing" className="hover:text-brass">Financing</Link></li>
              <li><Link href="/consultation" className="hover:text-brass">Free Estimate</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-[0.12em] text-brass">Get in Touch</div>
            <ul className="mt-4 space-y-2 font-body text-sm text-paper/80">
              {phone && <li><a href={phoneHref()} className="hover:text-brass">{phone}</a></li>}
              <li><ObfuscatedEmail user="info" domain="mcloudconstruction.com" label="Email Us" className="hover:text-brass" /></li>
              <li><Link href="/consultation" className="hover:text-brass">Request a Free Estimate</Link></li>
              <li className="text-paper/75">Monday to Friday, 8am to 5pm</li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-[0.12em] text-brass">Existing Clients</div>
            <ul className="mt-4 space-y-2 font-body text-sm text-paper/80">
              <li><a href="https://jobs.mcloudconstruction.com/customerportal" className="hover:text-brass">Client Portal Login</a></li>
              <li className="text-paper/75">Track your project, documents, and invoices</li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-[0.12em] text-brass">Subcontractors</div>
            <ul className="mt-4 space-y-2 font-body text-sm text-paper/80">
              <li><a href="https://jobs.mcloudconstruction.com/subcontractor-apply" className="hover:text-brass">Apply to Work With Us</a></li>
              <li className="text-paper/75">Join our network of trade partners</li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-[0.12em] text-brass">Service Area</div>
            <p className="mt-4 font-body text-sm leading-relaxed text-paper/80">
              Greater Kansas City metro, including communities throughout both Missouri and Kansas.
            </p>
            <p className="mt-3 font-body text-xs leading-relaxed text-paper/75">
              {Object.values(SERVICE_AREAS).flat().join(' · ')}
            </p>
          </div>
        </div>

        <div className="tick-rule mt-12" />
        <div className="mt-6 flex flex-col items-start justify-between gap-2 font-mono text-xs uppercase tracking-[0.1em] text-paper/75 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} McLoud Contracting, LLC · Doing business as McLoud Construction</span>
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
