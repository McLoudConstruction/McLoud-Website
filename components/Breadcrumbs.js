import Link from 'next/link';
import { breadcrumbNode, graph, JsonLd } from '@/lib/schema';

// Visible breadcrumb trail plus matching BreadcrumbList structured data.
// `crumbs` is [{ name, href }], starting after Home; the last one is the
// current page.
export default function Breadcrumbs({ crumbs, className = '' }) {
  const all = [{ name: 'Home', href: '/' }, ...crumbs];
  return (
    <>
      <JsonLd data={graph(breadcrumbNode(all))} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-[0.1em] text-paper/75">
          {all.map((crumb, i) => {
            const last = i === all.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-paper/80">{crumb.name}</span>
                ) : (
                  <>
                    <Link href={crumb.href} className="hover:text-brass">{crumb.name}</Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
