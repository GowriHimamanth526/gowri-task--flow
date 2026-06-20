import { ArrowRight, Zap, CheckCircle, Users, Zap as ZapIcon, BarChart3, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import DemoModal from '@/components/DemoModal';
import { useLocation } from 'wouter';
import { useState } from 'react';

export default function Home() {
  const [, navigate] = useLocation();
  const [demoOpen, setDemoOpen] = useState(false);

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const handleWatchDemo = () => {
    setDemoOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen pt-24 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 w-fit">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                  Introducing TaskFlow Pro v2.0
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight" style={{ fontFamily: 'Geist' }}>
                  Streamline Your
                  <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Workflow
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-foreground/70 max-w-xl leading-relaxed">
                  Boost productivity with intelligent task management. TaskFlow Pro helps teams collaborate seamlessly and deliver faster.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-base hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 ease-out"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  onClick={handleWatchDemo}
                  variant="outline"
                  size="lg"
                  className="rounded-xl font-semibold text-base hover:bg-secondary transition-all"
                >
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                <div>
                  <p className="text-2xl font-bold">50K+</p>
                  <p className="text-sm text-foreground/60">Active Users</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">99.9%</p>
                  <p className="text-sm text-foreground/60">Uptime</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">24/7</p>
                  <p className="text-sm text-foreground/60">Support</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative h-96 md:h-full min-h-96">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663384572712/cmFMDcVdbmkj63oMVbQ4ma/taskflow-hero-visual-B3U2GMaQgzkqreKxFowt5c.webp"
                alt="TaskFlow Dashboard"
                className="w-full h-full object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Geist' }}>
              Powerful Features for Teams
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Everything you need to manage tasks, collaborate with your team, and achieve your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: 'Smart Task Management',
                description: 'Organize tasks with custom fields, priorities, and dependencies. Never miss a deadline again.'
              },
              {
                icon: Users,
                title: 'Team Collaboration',
                description: 'Work together seamlessly with real-time updates, comments, and @mentions.'
              },
              {
                icon: BarChart3,
                title: 'Advanced Analytics',
                description: 'Track progress with detailed reports and insights into team productivity.'
              },
              {
                icon: Clock,
                title: 'Time Tracking',
                description: 'Monitor time spent on tasks and optimize your team\'s workflow efficiency.'
              },
              {
                icon: ZapIcon,
                title: 'Automation',
                description: 'Automate repetitive tasks and workflows to save time and reduce errors.'
              },
              {
                icon: Users,
                title: 'Integrations',
                description: 'Connect with your favorite tools and streamline your entire workflow.'
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-border hover:shadow-lg transition-all duration-300"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-foreground/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Geist' }}>
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Choose the perfect plan for your team. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: 'Free',
                description: 'Perfect for individuals',
                features: ['Up to 5 projects', 'Basic task management', 'Mobile app access', 'Community support']
              },
              {
                name: 'Professional',
                price: '$29',
                period: '/month',
                description: 'For growing teams',
                features: ['Unlimited projects', 'Advanced analytics', 'Team collaboration', 'Priority support', 'Custom fields'],
                highlighted: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                description: 'For large organizations',
                features: ['Everything in Pro', 'Advanced security', 'Dedicated support', 'Custom integrations', 'SLA guarantee']
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl border transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xl scale-105'
                    : 'bg-white dark:bg-slate-800 border-border hover:shadow-lg'
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={plan.highlighted ? 'text-blue-100' : 'text-foreground/60'}>{plan.description}</p>
                <div className="my-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className={plan.highlighted ? 'text-blue-100' : 'text-foreground/60'}>{plan.period}</span>}
                </div>
                <Button
                  onClick={() => plan.name !== 'Starter' ? navigate(`/payment?plan=${plan.name}`) : handleGetStarted()}
                  className={`w-full mb-6 ${
                    plan.highlighted
                      ? 'bg-white text-blue-600 hover:bg-gray-100'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Get Started
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog & Resources Section */}
      <section id="blog" className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-border">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-16 gap-4">
            <Badge variant="outline" className="text-blue-600 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20">Industry Insights</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'Geist' }}>
              Engineering & Productivity
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl">
              Data-driven strategies and technical deep dives from the TaskFlow research team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              {
                category: 'Engineering',
                title: 'Agile at Scale: Managing 100+ Member Engineering Teams',
                excerpt: 'An analysis of velocity metrics from 500 enterprise teams. Learn how cross-functional PODs outperform traditional siloed engineering hierarchies by 42%.',
                date: 'Oct 12, 2024',
                readTime: '8 min read',
                author: 'Dr. Sarah Chen',
                role: 'VP of Engineering'
              },
              {
                category: 'Productivity',
                title: 'The Psychology of Deep Work: Quantifying Context Switching',
                excerpt: 'Our telemetry data shows engineers lose an average of 23 minutes of focus time after a single notification context switch. Here is how to prevent it.',
                date: 'Oct 08, 2024',
                readTime: '12 min read',
                author: 'Marcus Vance',
                role: 'Lead Researcher'
              },
              {
                category: 'AI & Future',
                title: 'Why the Future of PM is AI-Assisted, Not AI-Automated',
                excerpt: 'Examining the limitations of LLMs in complex stakeholder management. We explore the hybrid approach of AI handling scheduling while humans handle strategy.',
                date: 'Sep 29, 2024',
                readTime: '6 min read',
                author: 'Elena Rostova',
                role: 'Chief Product Officer'
              },
              {
                category: 'Architecture',
                title: 'Microservices vs Monolith: A Data-Backed Perspective for 2024',
                excerpt: 'When to migrate and when to stay. Evaluating infrastructure overhead versus developer velocity using case studies from 50 high-growth startups.',
                date: 'Sep 15, 2024',
                readTime: '10 min read',
                author: 'David Kim',
                role: 'Principal Architect'
              },
              {
                category: 'Leadership',
                title: 'Measuring Developer Experience (DevEx) Beyond Lines of Code',
                excerpt: 'Traditional productivity metrics are flawed. Discover the 5 actionable DevEx pillars that actively reduce burnout and improve deployment frequency.',
                date: 'Aug 22, 2024',
                readTime: '7 min read',
                author: 'Jessica Lin',
                role: 'Director of Engineering'
              },
              {
                category: 'Security',
                title: 'Zero Trust Authorization in Distributed Systems',
                excerpt: 'A comprehensive guide to implementing granular, context-aware access controls across micro-frontends without degrading the user experience.',
                date: 'Aug 05, 2024',
                readTime: '14 min read',
                author: 'Omar Hassan',
                role: 'Head of Security'
              },
              {
                category: 'Productivity',
                title: 'Asynchronous Communication: The Cure for Meeting Fatigue',
                excerpt: 'How our engineering team eliminated 60% of recurring meetings by adopting strict asynchronous documentation and automated status reporting.',
                date: 'Jul 18, 2024',
                readTime: '5 min read',
                author: 'Rachel Moore',
                role: 'Staff Engineer'
              },
              {
                category: 'DevOps',
                title: 'Optimizing CI/CD Pipelines for Sub-Minute Builds',
                excerpt: 'A technical breakdown of how we utilized distributed caching, aggressive parallelization, and dependency pruning to reduce build times by 85%.',
                date: 'Jul 02, 2024',
                readTime: '9 min read',
                author: 'Alex Mercer',
                role: 'DevOps Lead'
              }
            ].map((article, index) => (
              <div
                key={index}
                className="group flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-800 border border-border hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md">{article.category}</span>
                  <span className="text-[11px] text-foreground/50 font-medium">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">{article.title}</h3>
                <p className="text-sm text-foreground/70 mb-6 flex-grow leading-relaxed line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border mt-auto">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500">
                    {article.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-none mb-1">{article.author}</p>
                    <p className="text-[11px] text-foreground/60 leading-none">{article.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white dark:bg-slate-950">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight" style={{ fontFamily: 'Geist' }}>
                Let's build something incredible together.
              </h2>
              <p className="text-lg text-foreground/70 mb-10 leading-relaxed">
                Whether you're looking for an enterprise plan, need custom integrations, or just want to see how TaskFlow Pro can streamline your team's workflow, our experts are here to help.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email Us</h4>
                    <a href="mailto:gowrihemanthsanagasetty@gmail.com" className="text-muted-foreground hover:text-blue-600 transition-colors break-all">gowrihemanthsanagasetty@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Call Us</h4>
                    <a href="tel:7842239728" className="text-muted-foreground hover:text-blue-600 transition-colors leading-relaxed">7842239728</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 md:p-10 border border-border shadow-2xl shadow-blue-500/5">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully! Our team will contact you shortly.'); }}>
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">First Name</label>
                    <input required className="w-full h-12 px-4 rounded-xl border border-border bg-white dark:bg-slate-950 focus:ring-2 focus:ring-blue-600 outline-none transition-all" placeholder="Jane" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Last Name</label>
                    <input required className="w-full h-12 px-4 rounded-xl border border-border bg-white dark:bg-slate-950 focus:ring-2 focus:ring-blue-600 outline-none transition-all" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Work Email</label>
                  <input type="email" required className="w-full h-12 px-4 rounded-xl border border-border bg-white dark:bg-slate-950 focus:ring-2 focus:ring-blue-600 outline-none transition-all" placeholder="jane@company.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Company Size</label>
                  <select className="w-full h-12 px-4 rounded-xl border border-border bg-white dark:bg-slate-950 focus:ring-2 focus:ring-blue-600 outline-none transition-all text-foreground">
                    <option value="1-50">1 - 50 employees</option>
                    <option value="51-200">51 - 200 employees</option>
                    <option value="201-1000">201 - 1,000 employees</option>
                    <option value="1000+">1,000+ employees</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">How can we help?</label>
                  <textarea required className="w-full p-4 rounded-xl border border-border bg-white dark:bg-slate-950 focus:ring-2 focus:ring-blue-600 outline-none transition-all min-h-[120px] resize-none" placeholder="Tell us about your team's needs..."></textarea>
                </div>
                <Button type="submit" className="w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl mt-2">
                  Contact Sales
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  By submitting this form, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">TaskFlow Pro</h4>
              <p className="text-gray-400 mb-4">Intelligent task management for modern teams.</p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>
                  <a href="mailto:gowrihemanthsanagasetty@gmail.com" className="hover:text-white transition flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    gowrihemanthsanagasetty<br/>@gmail.com
                  </a>
                </p>
                <p>
                  <a href="tel:7842239728" className="hover:text-white transition flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    7842239728
                  </a>
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="mailto:gowrihemanthsanagasetty@gmail.com" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TaskFlow Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

