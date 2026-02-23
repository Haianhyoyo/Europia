import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Welcome from '@/components/Welcome';
import Services from '@/components/Services';
import ConsultationForm from '@/components/ConsultationForm';
import Testimonials from '@/components/Testimonials';
import NewsAndFaq from '@/components/NewsAndFaq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

import { readDB } from '@/lib/db';

export default async function Home() {
  const db = await readDB();
  const { services, news, websiteSettings, faqs, testimonials } = db;

  return (
    <main className="min-h-screen">
      <Navbar settings={websiteSettings} />
      <Hero settings={websiteSettings} />
      <Welcome settings={websiteSettings} />
      <Services services={services} />

      {/* Middle Banner / CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px]"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">Vẻ Đẹp Tái Sinh</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Kết hợp giữa y học hiện đại và gu thẩm mỹ tinh tế, chúng tôi giúp bạn đánh thức vẻ đẹp tiềm ẩn.</p>
          <div className="inline-block bg-white text-primary px-8 py-4 rounded-2xl font-bold shadow-2xl hover:bg-slate-50 transition-colors">
            Khám phá quy trình tại {websiteSettings.brandName || "Europia"}
          </div>
        </div>
      </section>

      <Testimonials testimonials={testimonials} />
      <ConsultationForm settings={websiteSettings} services={services} />
      <NewsAndFaq news={news} faqs={faqs} />
      <Contact settings={websiteSettings} />
      <Footer settings={websiteSettings} />
    </main>
  );
}
