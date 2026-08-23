import PageHero from '@/components/PageHero';
import ConsultationForm from '@/components/ConsultationForm';

export const metadata = {
  title: 'Free Remodeling Estimate | McLoud Construction KC',
  description:
    'Schedule a free consultation with McLoud Construction. Tell us about your residential remodel or commercial buildout across the Kansas City metro.',
  alternates: { canonical: '/consultation' },
  openGraph: {
    title: 'Free Remodeling Estimate | McLoud Construction KC',
    description:
      'Schedule a free consultation with McLoud Construction. Tell us about your residential remodel or commercial buildout across the Kansas City metro.',
    url: '/consultation',
  },
};

export default function ConsultationPage() {
  return (
    <>
      <PageHero
        eyebrow="Let's Get Started"
        title="Request a Free Estimate"
        body="Tell us a bit about your project. We'll follow up to schedule your free consultation. No obligation."
      />

      <section className="mx-auto max-w-2xl px-6 py-20">
        <ConsultationForm />
      </section>
    </>
  );
}
