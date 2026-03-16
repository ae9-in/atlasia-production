import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import api, { AboutData, CTAData } from '../api';
import { LoadingScreen, SectionTitle } from '../components/Common';
import { Link } from 'react-router-dom';

export default function About() {
  const [loading, setLoading] = useState(true);
  const [about, setAbout] = useState<AboutData | null>(null);
  const [cta, setCta] = useState<CTAData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, ctaRes] = await Promise.all([
          api.get('/about'),
          api.get('/cta'),
        ]);
        setAbout(aboutRes.data);
        setCta(ctaRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingScreen />;

  const sections = [
    { title: "Who We Are", content: about?.whoWeAre },
    { title: "Why ATLASIA", content: about?.whyAtlasia },
    { title: "Our Approach", content: about?.approach },
    { title: "Our Vision", content: about?.vision },
    { title: "Our Mission", content: about?.mission },
  ];

  return (
    <div className="pt-20">
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="About ATLASIA" subtitle="Learn about our journey and the impact we create." />
          
          <div className="space-y-24">
            {sections.map((section, idx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
              >
                <div className="flex-1">
                  <h3 className="text-3xl font-display font-bold mb-6 text-mocha">{section.title}</h3>
                  <div className="gold-divider w-24 !my-6" />
                  <p className="text-xl text-taupe leading-relaxed font-light">
                    {section.content}
                  </p>
                </div>
                <div className="flex-1 w-full h-80 bg-mocha/5 rounded-[2rem] overflow-hidden">
                  <img
                    src={`https://picsum.photos/seed/about${idx}/800/600`}
                    alt={section.title}
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-mocha text-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">{cta?.heading}</h2>
          <Link to={cta?.buttonLink || '/'} className="btn-primary !bg-gold !text-mocha">
            {cta?.buttonText}
          </Link>
        </div>
      </section>
    </div>
  );
}
