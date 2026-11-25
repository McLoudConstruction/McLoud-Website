import PageHero from '@/components/PageHero';
import ConsultationForm from '@/components/ConsultationForm';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Request a Free Estimate',
  description:
    'Request a free estimate from McLoud Construction for a remodel, accessibility project, basement, or commercial renovation anywhere in the Kansas City metro.',
  path: '/consultation',
});

export default function ConsultationPage() {
  return (
    <>
      <PageHero
        eyebrow="Let's Get Started"
        title="Request a Free Estimate"
        body="Tell us a bit about your project. We'll follow up to schedule your free consultation. No obligation."
        crumbs={[{ name: 'Free Estimate', href: '/consultation' }]}
      />

      <section className="mx-auto max-w-2xl px-6 py-20">
        <ConsultationForm />
      </section>
    </>
  );
}
