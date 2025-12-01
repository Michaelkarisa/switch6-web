// src/components/StreamSwitchLanding.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useMediaQuery } from 'usehooks-ts';

const StreamSwitchLanding = () => {
  const [splash, setSplash] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const scrollContainerRef = useRef(null);
  const featureRef = useRef(null);
  const pricingRef = useRef(null);
  const contactRef = useRef(null);

  const isMobile = useMediaQuery('(max-width: 768px)');

  // Splash screen
  useEffect(() => {
    const timer = setTimeout(() => setSplash(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll listener for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { name: 'Features', ref: featureRef },
        { name: 'Pricing', ref: pricingRef },
        { name: 'Contact', ref: contactRef },
      ];

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let closestSection = '';
      let minDistance = Infinity;

      sections.forEach(({ name, ref }) => {
        if (ref.current) {
          const top = ref.current.offsetTop;
          const distance = Math.abs(top - scrollPosition);
          if (distance < minDistance && top <= scrollPosition) {
            minDistance = distance;
            closestSection = name;
          }
        }
      });

      setActiveSection(closestSection);
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        const scrollAmount = e.key.includes('Page') ? 400 : 100;
        const direction = e.key === 'ArrowDown' || e.key === 'PageDown' ? 1 : -1;
        window.scrollBy({ top: direction * scrollAmount, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (ref) => {
    ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  const testimonials = [
    {
      name: 'Coach Michael',
      club: 'Nairobi FC',
      text: 'Transformed how we broadcast our matches. Our fans love watching from anywhere!',
      rating: 5,
    },
    {
      name: 'Sarah K.',
      club: 'Mombasa United',
      text: 'Setup took 5 minutes. Now we stream every match professionally.',
      rating: 5,
    },
    {
      name: 'David M.',
      club: 'Kisumu Warriors',
      text: 'Amazing quality and so affordable. Game changer for amateur clubs!',
      rating: 5,
    },
  ];

  const features = [
    {
      icon: '📱',
      title: 'Mobile-First Broadcasting',
      description: 'Turn your Android phone into a professional broadcasting studio instantly',
      color: 'text-purple-400',
    },
    {
      icon: '☁️',
      title: 'Cloud-Powered Processing',
      description: 'Advanced video processing handled by our powerful cloud servers',
      color: 'text-indigo-400',
    },
    {
      icon: '⚡',
      title: 'Lightning Setup',
      description: 'From download to live streaming in under 5 minutes - no technical expertise needed',
      color: 'text-purple-500',
    },
    {
      icon: '👥',
      title: 'Team Collaboration',
      description: 'Multiple cameras, seamless switching, professional overlays - all controlled by your team',
      color: 'text-purple-600',
    },
    {
      icon: '📺',
      title: 'Multi-Platform Streaming',
      description: 'Stream directly to Facebook Live, YouTube Live, and other major platforms',
      color: 'text-indigo-600',
    },
    {
      icon: '📊',
      title: 'Professional Controls',
      description: 'Match widgets, lineups, substitutions, replays, and advertisements - all at your fingertips',
      color: 'text-purple-700',
    },
  ];

  const stats = [
    { value: '5 min', label: 'Setup Time' },
    { value: '99%', label: 'Cost Savings' },
    { value: '24/7', label: 'Support' },
  ];

  const globalStats = [
    { value: '10,000+', label: 'Matches Streamed' },
    { value: '500+', label: 'Active Clubs' },
    { value: '50+', label: 'Countries' },
    { value: '1M+', label: 'Viewers Reached' },
  ];

  if (splash) {
    let splashImage = 'assets/splash2.webp';
    if (window.innerWidth < 700) splashImage = 'assets/splash.webp';
    if (window.innerWidth > 700) splashImage = 'assets/splash1.webp';

    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <img
          src={splashImage}
          alt="Splash"
          className="max-w-full max-h-full object-contain"
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: 'linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 50%, #0D0D0D 100%)',
      }}
    >
      {/* Navigation */}
      <motion.div
        className={`fixed top-0 left-0 right-0 z-50 py-3 backdrop-blur-md ${
          scrolled ? 'bg-black/70' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-white">Switch6</h1>

          {isMobile ? (
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? '✕' : '☰'}
            </button>
          ) : (
            <div className="flex items-center space-x-6">
              <NavButton
                text="Features"
                active={activeSection === 'Features'}
                onClick={() => scrollToSection(featureRef)}
              />
              <NavButton
                text="Pricing"
                active={activeSection === 'Pricing'}
                onClick={() => scrollToSection(pricingRef)}
              />
              <NavButton
                text="Contact"
                active={activeSection === 'Contact'}
                onClick={() => scrollToSection(contactRef)}
              />
              <Button
                onClick={() => (window.location.href = '/login')}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-16 right-4 z-40 bg-black/80 backdrop-blur-lg border border-white/30 rounded-lg p-4"
          >
            <div className="flex flex-col space-y-4">
              <NavButton text="Features" active={activeSection === 'Features'} onClick={() => scrollToSection(featureRef)} />
              <NavButton text="Pricing" active={activeSection === 'Pricing'} onClick={() => scrollToSection(pricingRef)} />
              <NavButton text="Contact" active={activeSection === 'Contact'} onClick={() => scrollToSection(contactRef)} />
              <Button
                onClick={() => (window.location.href = '/login')}
                className="bg-purple-600 hover:bg-purple-700 text-white w-full"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollable Content */}
      <div ref={scrollContainerRef} className="pt-20">
        {/* Hero */}
        <HeroSection stats={stats} />

        {/* Features */}
        <section ref={featureRef} className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-center text-white mb-4"
            >
              Everything You Need to Go Live
            </motion.h2>
            <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto">
              Professional broadcasting features that used to cost thousands, now in your pocket
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <FeatureCard key={idx} feature={feature} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="py-16 bg-black/20">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
              Trusted by Sports Clubs Worldwide
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {globalStats.map((stat, idx) => (
                <StatItem key={idx} stat={stat} large />
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-white mb-16"
            >
              What Our Clients Say
            </motion.h2>
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <TestimonialCard testimonial={testimonials[currentTestimonial]} />
            </motion.div>
            <div className="flex justify-center space-x-2">
              {testimonials.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === currentTestimonial ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section ref={pricingRef} className="py-20 px-4 md:px-8 bg-black/20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Simple, Transparent Pricing
            </motion.h2>
            <p className="text-gray-300 mb-16">Professional broadcasting at a fraction of the cost</p>
            <PricingCard />
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Ready to Transform Your Sports Broadcasting?
            </motion.h2>
            <p className="text-gray-300 mb-8">
              Join thousands of clubs already streaming professionally with Switch6
            </p>
            <Button
              onClick={() => (window.location.href = '/login')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-full"
            >
              Get Started
            </Button>
            <p className="text-gray-400 mt-4 text-sm">No setup fees • Cancel anytime • 24/7 support</p>
          </div>
        </section>

        {/* Footer */}
        <footer ref={contactRef} className="py-12 px-4 md:px-8 bg-black/30 text-center">
          <h3 className="text-xl font-bold text-white">Switch6</h3>
          <p className="text-gray-300 mt-2">Professional Sports Broadcasting Made Simple</p>
          <p className="text-gray-500 mt-6 text-sm">© 2025 Switch6. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

// --- Subcomponents ---
const NavButton = ({ text, active, onClick }) => (
  <button
    onClick={onClick}
    className={`text-sm font-medium transition-colors ${
      active ? 'text-amber-400' : 'text-white/90 hover:text-white'
    }`}
  >
    {text}
  </button>
);

const HeroSection = ({ stats }) => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    {/* Floating circles */}
    {[...Array(6)].map((_, i) => (
      <FloatingCircle key={i} index={i} />
    ))}

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="text-center max-w-4xl mx-auto px-4"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
        Transform Your Sports Broadcasting
      </h1>
      <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
        Turn any Android phone into a professional live streaming studio. Broadcast your matches with cinematic quality,
        professional overlays, and seamless multi-camera switching.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
        <Button
          onClick={() => (window.location.href = '/login')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-full flex items-center"
        >
          Get Started
          <span className="ml-2">→</span>
        </Button>
        <Button variant="outline" className="border-white/50 text-white hover:bg-white/10">
          Watch Demo
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
        {stats.map((stat, idx) => (
          <StatItem key={idx} stat={stat} />
        ))}
      </div>
    </motion.div>
  </section>
);

const FloatingCircle = ({ index }) => {
  const positions = [
    { top: '10%', left: '5%' },
    { top: '20%', right: '10%' },
    { bottom: '25%', left: '15%' },
    { bottom: '20%', right: '8%' },
    { top: '40%', left: '25%' },
    { top: '50%', right: '20%' },
  ];
  const pos = positions[index];

  return (
    <motion.div
      className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 bg-white/10"
      style={{ ...pos }}
      animate={{
        x: [0, Math.sin(index) * 40, 0],
        y: [0, Math.cos(index) * 30, 0],
      }}
      transition={{
        duration: 6 + index,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

const StatItem = ({ stat, large = false }) => (
  <div className="py-2">
    <div className={`font-bold text-white ${large ? 'text-4xl' : 'text-2xl'}`}>{stat.value}</div>
    <div className="text-gray-400 text-sm">{stat.label}</div>
  </div>
);

const FeatureCard = ({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all"
  >
    <div className="w-12 h-12 rounded-lg bg-black/20 flex items-center justify-center mb-4">
      <span className={`text-2xl ${feature.color}`}>{feature.icon}</span>
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
    <p className="text-gray-300 text-sm">{feature.description}</p>
  </motion.div>
);

const TestimonialCard = ({ testimonial }) => (
  <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
    <CardContent className="p-6">
      <div className="flex justify-center mb-4">
        {'★'.repeat(testimonial.rating)}
      </div>
      <p className="text-gray-200 italic mb-6">"{testimonial.text}"</p>
      <div>
        <div className="font-bold text-white">{testimonial.name}</div>
        <div className="text-gray-400">{testimonial.club}</div>
      </div>
    </CardContent>
  </Card>
);

const PricingCard = () => (
  <Card className="bg-white/10 backdrop-blur-sm border border-purple-400/50 rounded-2xl p-8 max-w-md mx-auto">
    <h3 className="text-2xl font-bold text-white mb-2">Pro Plan</h3>
    <div className="flex items-baseline mb-6">
      <span className="text-5xl font-bold text-white">$1</span>
      <span className="text-gray-400 ml-2">/month</span>
    </div>
    <p className="text-gray-400 mb-6">+ 50 KSH per additional match</p>
    <ul className="space-y-3 mb-8 text-left">
      {[
        'Up to 8 matches per month',
        'Professional overlays & controls',
        'Multi-platform streaming',
        'Cloud video processing',
        'Real-time scene switching',
        'Web dashboard access',
        '24/7 customer support',
      ].map((item, i) => (
        <li key={i} className="flex items-start">
          <span className="text-green-400 mr-2">✓</span>
          <span className="text-gray-200">{item}</span>
        </li>
      ))}
    </ul>
    <Button
      onClick={() => (window.location.href = '/login')}
      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-full"
    >
      Get Started
    </Button>
  </Card>
);

export default StreamSwitchLanding;