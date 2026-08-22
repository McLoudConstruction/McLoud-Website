import PageHero from '@/components/PageHero';
import ConsultationForm from '@/components/ConsultationForm';

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
