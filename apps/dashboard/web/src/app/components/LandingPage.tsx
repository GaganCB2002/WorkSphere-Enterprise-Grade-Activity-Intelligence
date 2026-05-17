'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, ShieldCheck, Zap, BarChart3, Monitor, Camera, Timer, Bell, Play, 
  CheckCircle2, Users, Star, Globe, Cpu, Lock, ChevronDown, Mail, MessageSquare, 
  Terminal, Activity, Phone, MapPin, Menu, X, ArrowLeft, Briefcase, TrendingUp,
  Network, Rocket, Scale, Eye, FileText, Search, Database, Layers
} from 'lucide-react';

interface LandingPageProps {
  onStartLogin: () => void;
}

type MarketingView = 'landing' | 'product' | 'features' | 'solutions' | 'resources' | 'privacy' | 'terms' | 'security';

export default function LandingPage({ onStartLogin }: LandingPageProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeView, setActiveView] = useState<MarketingView>('landing');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: MarketingView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const luxuryFeatures = [
    {
      title: "Precision Analytics",
      description: "Engineered for high-performance teams. Gain millisecond-level insights into your workflow velocity.",
      icon: Cpu,
      color: "text-blue-400",
      bg: "bg-blue-950/50 border border-blue-800/50"
    },
    {
      title: "Secure Infrastructure",
      description: "Enterprise-grade encryption protecting your most sensitive intellectual property with military-grade protocols.",
      icon: ShieldCheck,
      color: "text-emerald-400",
      bg: "bg-emerald-950/50 border border-emerald-800/50"
    },
    {
      title: "Global Connectivity",
      description: "Seamlessly synchronize your global workforce across time zones with our unified command center.",
      icon: Globe,
      color: "text-indigo-400",
      bg: "bg-indigo-950/50 border border-indigo-800/50"
    },
    {
      title: "AI-Driven Insights",
      description: "Predictive modeling and behavioral analysis to stay ahead of performance bottlenecks.",
      icon: Zap,
      color: "text-amber-400",
      bg: "bg-amber-950/50 border border-amber-800/50"
    }
  ];

  const faqs = [
    { title: 'How does live monitoring impact privacy?', answer: 'We employ advanced anonymization protocols and behavioral focus to ensure compliance with global privacy regulations while maintaining transparency.' },
    { title: 'Can I integrate with existing SSO?', answer: 'Yes, our enterprise grade allows for seamless SAML 2.0 and OIDC integration with Okta, Azure AD, and more.' },
    { title: 'What is the deployment timeframe?', answer: 'Our cloud-native infrastructure allows for instant activation. On-premise deployments typically take 2-4 business days.' },
  ];

  const resources = [
    { title: 'Documentation', icon: Terminal, text: 'Technical specifications for developers.' },
    { title: 'API Reference', icon: Globe, text: 'Custom endpoint integration guides.' },
    { title: 'Security Whitepaper', icon: Lock, text: 'Deep dive into our encryption standards.' },
    { title: 'System Status', icon: Activity, text: 'Live infrastructure performance tracking.' },
  ];

  const solutions = [
    { title: 'Collaboration', icon: MessageSquare, text: 'Real-time chat and internal mail system integrated directly into your workflow.', color: 'bg-blue-950/50 text-blue-400 border border-blue-800/50' },
    { title: 'Conferencing', icon: Monitor, text: 'Ultra-low latency video meetings with automated transcription and action items.', color: 'bg-purple-950/50 text-purple-400 border border-purple-800/50' },
    { title: 'Security', icon: Lock, text: 'Advanced role-based access control with biometric and multi-factor authentication.', color: 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/50' },
  ];

  const benefits = [
    {
      title: "Workforce Intelligence",
      text: "Transform raw behavioral data into actionable strategic insights. Predict attrition before it happens.",
      metric: "35%",
      sub: "Retention Increase"
    },
    {
      title: "Operational Velocity",
      text: "Eliminate administrative bottlenecks with automated workflows for payroll, recruitment, and onboarding.",
      metric: "2.4x",
      sub: "Efficiency Multiplier"
    },
    {
      title: "Security Sovereignty",
      text: "Full control over your data with enterprise-grade encryption and bespoke role-based access control.",
      metric: "99.9%",
      sub: "Security Rating"
    }
  ];

  const mainFeaturesList = [
    {
      title: "Real-time Chat Engine",
      icon: MessageSquare,
      desc: "Ultra-low latency communication for the high-velocity enterprise. Our Socket.io implementation ensures sub-50ms message delivery across the globe.",
      details: ["Persistent channel history", "Direct & Group threads", "Rich media embedding", "Biometric-locked conversations"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000"
    },
    {
      title: "Isolated Mail System",
      icon: Mail,
      desc: "A proprietary internal mailing protocol designed for sensitive corporate communication. Eliminate phishing risks with a 100% closed-loop ecosystem.",
      details: ["Threaded intelligence", "Automatic compliance tagging", "Zero-attachment latency", "Departmental filtering"],
      image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=2000"
    },
    {
      title: "Aura Meet (Video)",
      icon: Monitor,
      desc: "High-definition WebRTC conferencing with integrated session intelligence. Automated minutes, transcription, and action item extraction.",
      details: ["4K low-latency streaming", "Live AI transcription", "Virtual boardrooms", "One-click screen sharing"],
      image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=2000"
    },
    {
      title: "Precision Alerts",
      icon: Bell,
      desc: "A cognitive-aware notification system that prioritizes signal over noise. Intelligent grouping and critical path highlighting.",
      details: ["Cross-platform push", "Custom event triggers", "Priority-based filtering", "Historical audit logs"],
      image: "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?auto=format&fit=crop&q=80&w=2000"
    }
  ];

  const enterpriseSpecs = [
    { title: "Role-Based Hubs", icon: Layers, text: "Bespoke dashboards for HR, Tech, and Execs." },
    { title: "Data Sovereignty", icon: Database, text: "On-premise or private cloud deployment options." },
    { title: "Military Security", icon: Lock, text: "AES-256 at rest, TLS 1.3 in transit." },
    { title: "Infinite Scaling", icon: Cpu, text: "Microservices architecture for zero-downtime scaling." }
  ];

  const detailedSolutionsList = [
    {
      title: "Enterprise HR Lifecycle",
      icon: ShieldCheck,
      desc: "Architected for high-scale organizations. From autonomous recruitment pipelines to biometric onboarding, we manage the entire employee journey with industrial precision.",
      features: ["AI-Assisted ATS", "One-Click Compliance", "Automated Payroll Sync", "Executive Reporting"],
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
    },
    {
      title: "Team Collaboration Hub",
      icon: Users,
      desc: "Synchronize your global workforce in a unified command center. Integrated real-time chat, internal mail, and HD video conferencing engineered for zero friction.",
      features: ["Persistent Chat Channels", "Encrypted Mail Protocol", "Aura Meet (WebRTC)", "Cross-Team Presence"],
      image: "https://images.unsplash.com/photo-1522071823991-b99c223a7097?auto=format&fit=crop&q=80&w=2000"
    },
    {
      title: "Performance & Productivity",
      icon: TrendingUp,
      desc: "Gain surgical insights into your team's velocity. Our telemetry engine tracks development activity and operational output to predict attrition and optimize growth.",
      features: ["Skill Gap Analysis", "Velocity Tracking", "Behavioral Insights", "Predictive Analytics"],
      image: "https://images.unsplash.com/photo-1551288049-bbbda5366a71?auto=format&fit=crop&q=80&w=2000"
    }
  ];

  const useCases = [
    { sector: "FinTech & Banking", icon: ShieldCheck, text: "Securing highly sensitive workforce data with military-grade encryption and strict regulatory compliance automations." },
    { sector: "Global Tech Scales", icon: Rocket, text: "Synchronizing distributed engineering teams across 12+ time zones with real-time telemetry and unified presence." },
    { sector: "Creative Agencies", icon: Monitor, text: "Optimizing project velocity and creative output through integrated collaboration and cognitive-aware notifications." }
  ];

  const knowledgeCategories = [
    { title: 'Technical Docs', icon: Terminal, count: '124 Articles' },
    { title: 'System Status', icon: Activity, count: 'Live Telemetry' },
    { title: 'Security Labs', icon: Lock, count: 'Compliance' },
    { title: 'API Reference', icon: Globe, count: 'v4.0 Spec' }
  ];

  const privacySections = [
    { title: "Data Collection", icon: Eye, content: "We collect information that you provide directly to us when you create an account, such as your name, email address, and company details. We also collect technical data including your IP address and browser type to ensure secure access." },
    { title: "Data Usage", icon: FileText, content: "Your data is used solely to provide and improve WorkSphere services. This includes authentication, personalized dashboard telemetry, and critical system notifications. We never sell your personal information to third parties." },
    { title: "Data Protection", icon: Lock, content: "We implement military-grade AES-256 encryption for all data at rest and TLS 1.3 for data in transit. Our infrastructure is hosted in SOC 2 Type II compliant data centers with 24/7 monitoring." },
    { title: "Cookies & Tracking", icon: ShieldCheck, content: "We use essential cookies to maintain your session and security. Performance cookies help us understand how users interact with our platform to optimize the high-velocity experience." }
  ];

  const termsSections = [
    { title: "Acceptance of Terms", icon: Scale, content: "By accessing or using WorkSphere, you agree to be bound by these Terms of Service. If you are using our services on behalf of an organization, you agree to these terms for that organization and represent that you have the authority to bind that entity." },
    { title: "User Responsibilities", icon: Users, content: "Users are responsible for maintaining the confidentiality of their credentials and for all activities that occur under their account. You must notify us immediately of any unauthorized use of your account or any other breach of security." },
    { title: "Service Usage Rules", icon: Zap, content: "WorkSphere is designed for professional enterprise management. You agree not to misuse our services, interfere with our networks, or attempt to circumvent our security protocols. High-velocity telemetry must not be used for illegal monitoring." },
    { title: "Intellectual Property", icon: ShieldCheck, content: "All content, features, and functionality of WorkSphere are the exclusive property of WorkSphere Global. Our trademarks and brand identity may not be used in connection with any product or service without prior written consent." }
  ];

  const securitySections = [
    { title: "Encryption Standards", icon: Lock, content: "All data is protected with military-grade AES-256 encryption at rest and TLS 1.3 for all data in transit. We use hardware security modules (HSMs) to manage encryption keys with the highest tier of protection." },
    { title: "Infrastructure Security", icon: Cpu, content: "Our infrastructure is hosted on isolated virtual private clouds (VPCs) with zero-trust networking principles. We employ automated intrusion detection systems and regular 3rd-party penetration testing." },
    { title: "Data Sovereignty", icon: Database, content: "Enterprise clients have the option for on-premise or private cloud deployment, ensuring total control over data residency and compliance with local regulatory requirements." },
    { title: "Continuous Monitoring", icon: Activity, content: "We provide 24/7 security telemetry monitoring. Any anomaly is immediately flagged by our AI-driven security core, ensuring sub-second response times to potential threats." }
  ];

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: '#020617', color: 'white', fontFamily: 'Inter, system-ui, sans-serif', overflowX: 'hidden' }}>
      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: isScrolled ? 'rgba(15, 23, 42, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.5)' : 'none',
        padding: isScrolled ? '1rem 2rem' : '1.5rem 2rem'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand */}
          <div 
            onClick={() => handleNavClick('landing')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          >
            <div style={{ height: '40px', width: '40px', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)' }}>
              <Zap size={20} color="white" />
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.04em', color: 'white' }}>
              Work<span style={{ color: '#3b82f6' }}>Sphere</span>
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="hidden md:flex">
            <button onClick={() => handleNavClick('product')} style={{ background: 'transparent', border: 'none', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: activeView === 'product' ? '#3b82f6' : '#94a3b8', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = activeView === 'product' ? '#3b82f6' : '#94a3b8'}>Product</button>
            <button onClick={() => handleNavClick('features')} style={{ background: 'transparent', border: 'none', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: activeView === 'features' ? '#3b82f6' : '#94a3b8', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = activeView === 'features' ? '#3b82f6' : '#94a3b8'}>Features</button>
            <button onClick={() => handleNavClick('solutions')} style={{ background: 'transparent', border: 'none', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: activeView === 'solutions' ? '#3b82f6' : '#94a3b8', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = activeView === 'solutions' ? '#3b82f6' : '#94a3b8'}>Solutions</button>
            <button onClick={() => handleNavClick('resources')} style={{ background: 'transparent', border: 'none', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: activeView === 'resources' ? '#3b82f6' : '#94a3b8', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = activeView === 'resources' ? '#3b82f6' : '#94a3b8'}>Resources</button>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="hidden md:flex">
            <button 
              onClick={onStartLogin}
              style={{ background: 'transparent', border: 'none', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#3b82f6', cursor: 'pointer', padding: '0.5rem 1rem', borderRadius: '12px', transition: 'all 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              Login
            </button>
            <button 
              onClick={onStartLogin}
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: 'white', border: 'none', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', padding: '0.8rem 1.75rem', borderRadius: '50px', cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)', transition: 'all 0.2s' }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(59, 130, 246, 0.6)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(59, 130, 246, 0.4)'; }}
            >
              Explore Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem' }}>
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div style={{ background: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }} className="md:hidden">
            <button onClick={() => handleNavClick('product')} style={{ background: 'transparent', border: 'none', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: activeView === 'product' ? '#3b82f6' : 'white', textAlign: 'left', padding: '0.5rem 0' }}>Product</button>
            <button onClick={() => handleNavClick('features')} style={{ background: 'transparent', border: 'none', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: activeView === 'features' ? '#3b82f6' : 'white', textAlign: 'left', padding: '0.5rem 0' }}>Features</button>
            <button onClick={() => handleNavClick('solutions')} style={{ background: 'transparent', border: 'none', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: activeView === 'solutions' ? '#3b82f6' : 'white', textAlign: 'left', padding: '0.5rem 0' }}>Solutions</button>
            <button onClick={() => handleNavClick('resources')} style={{ background: 'transparent', border: 'none', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: activeView === 'resources' ? '#3b82f6' : 'white', textAlign: 'left', padding: '0.5rem 0' }}>Resources</button>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0.5rem 0' }}></div>
            <button onClick={onStartLogin} style={{ background: 'transparent', border: 'none', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: '#3b82f6', textAlign: 'left', padding: '0.5rem 0' }}>Login</button>
            <button onClick={onStartLogin} style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: 'white', border: 'none', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', padding: '0.8rem', borderRadius: '12px', textAlign: 'center' }}>Explore Now</button>
          </div>
        )}
      </nav>

      {/* VIEW: LANDING */}
      {activeView === 'landing' && (
        <>
          {/* Hero Section */}
          <section style={{ 
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            padding: '8rem 2rem 4rem', position: 'relative', overflow: 'hidden', background: '#020617'
          }}>
            {/* Cinematic Background Image */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(2,6,23,0.75), rgba(2,6,23,0.9), #020617)', zIndex: 2 }} />
              <div 
                style={{ 
                  position: 'absolute', inset: 0, 
                  backgroundImage: `url('/hero.png'), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')`, 
                  backgroundSize: 'cover', backgroundPosition: 'center', 
                  filter: 'grayscale(100%)', opacity: 0.35 
                }} 
              />
              {/* Animated Glows */}
              <div style={{ position: 'absolute', top: '20%', left: '10%', width: '500px', height: '500px', background: 'rgba(59, 130, 246, 0.15)', borderRadius: '50%', filter: 'blur(150px)', pointerEvents: 'none', zIndex: 3 }}></div>
              <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '500px', height: '500px', background: 'rgba(0, 229, 143, 0.1)', borderRadius: '50%', filter: 'blur(150px)', pointerEvents: 'none', zIndex: 3 }}></div>
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', zIndex: 10, position: 'relative' }}>
              <div style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.25rem', 
                background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '50px', 
                fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3em', 
                color: '#3b82f6', marginBottom: '2.5rem', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.15)'
              }}>
                <Star size={14} fill="#3b82f6" color="#3b82f6" />
                The Pinnacle of Workforce Engineering
              </div>

              <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', fontWeight: 950, letterSpacing: '-0.04em', lineHeight: 0.95, textTransform: 'uppercase', color: 'white', marginBottom: '2rem' }}>
                Performance <br />
                <span style={{ color: '#3b82f6' }}>Redefined.</span>
              </h1>

              <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: '#94a3b8', maxWidth: '760px', margin: '0 auto 3.5rem', lineHeight: 1.7, fontWeight: 500 }}>
                Precision-engineered tools for the modern enterprise. Monitor, analyze, and optimize your global talent with surgical accuracy.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1.25rem' }}>
                <button 
                  onClick={onStartLogin}
                  style={{ 
                    padding: '1.2rem 2.75rem', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: 'white', border: 'none', 
                    borderRadius: '50px', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', 
                    letterSpacing: '0.2em', cursor: 'pointer', boxShadow: '0 15px 30px -10px rgba(59, 130, 246, 0.5)',
                    display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'; }}
                >
                  Start Your Journey
                  <ArrowRight size={16} />
                </button>
                <button 
                  onClick={onStartLogin}
                  style={{ 
                    padding: '1.2rem 2.75rem', background: 'rgba(255, 255, 255, 0.05)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '50px', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', 
                    letterSpacing: '0.2em', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
                >
                  <Play size={16} fill="white" />
                  Experience Demo
                </button>
              </div>
            </div>
          </section>

          {/* Product Showcase */}
          <section style={{ padding: '8rem 2rem', background: '#090d16', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 950, letterSpacing: '-0.03em', textTransform: 'uppercase', color: 'white', marginBottom: '1.25rem' }}>
                  The Interface of Tomorrow
                </h2>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
                  A visual masterpiece designed for maximum cognitive efficiency and aesthetic pleasure.
                </p>
              </div>

              <div style={{ 
                background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '36px', 
                padding: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)', position: 'relative', overflow: 'hidden' 
              }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #020617, transparent)', opacity: 0.4, zIndex: 10, pointerEvents: 'none' }} />
                <img 
                  src="/hero-product.png" 
                  alt="Product Preview" 
                  style={{ width: '100%', borderRadius: '24px', objectFit: 'cover', display: 'block', position: 'relative', zIndex: 5 }}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1551288049-bbbda5366a71?auto=format&fit=crop&q=80&w=2000";
                  }}
                />
                <div style={{ position: 'absolute', top: '3rem', left: '3rem', zIndex: 20, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {['Real-time Telemetry', 'AI Behavioral Analysis', 'Predictive Attrition'].map((tag) => (
                    <div key={tag} style={{ padding: '0.75rem 1.5rem', background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' }}>
                      <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 10px #3b82f6' }} />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section style={{ padding: '8rem 2rem', background: '#020617' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'flex-end', marginBottom: '6rem' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#3b82f6', marginBottom: '1rem' }}>Engineering Specs</p>
                  <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 950, letterSpacing: '-0.04em', lineHeight: 0.95, textTransform: 'uppercase', color: 'white', margin: 0 }}>
                    Built for <br />
                    <span style={{ color: '#3b82f6' }}>Precision.</span>
                  </h2>
                </div>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                  Every pixel, every data point, and every interaction has been meticulously engineered to provide the ultimate management experience.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {luxuryFeatures.map((f, i) => (
                  <div 
                    key={f.title}
                    onClick={() => handleNavClick('features')}
                    style={{ 
                      background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '32px', padding: '3rem 2.5rem',
                      cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)', position: 'relative', overflow: 'hidden'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(59, 130, 246, 0.2)'; e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.5)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }}
                  >
                    <div style={{ height: '64px', width: '64px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem' }} className={f.bg}>
                      <f.icon size={32} className={f.color} />
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: '1rem', letterSpacing: '-0.02em' }}>{f.title}</h3>
                    <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.6, margin: 0, marginBottom: '2.5rem' }}>{f.description}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#3b82f6' }}>
                      Learn More <ArrowRight size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Advanced Modules Section */}
          <section style={{ padding: '8rem 2rem', background: '#090d16', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 950, letterSpacing: '-0.03em', textTransform: 'uppercase', color: 'white', marginBottom: '1.25rem' }}>
                  Unified Command Center
                </h2>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>
                  One system. Every module. Total control over your enterprise communication and operations.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                {solutions.map((item, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleNavClick('solutions')}
                    style={{ 
                      background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '36px', padding: '3.5rem 3rem',
                      cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(59, 130, 246, 0.2)'; e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.5)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }}
                  >
                    <div style={{ height: '72px', width: '72px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem' }} className={item.color.split(' ')[0]}>
                      <item.icon size={36} className={item.color.split(' ')[1]} />
                    </div>
                    <h4 style={{ fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>{item.title}</h4>
                    <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Resources & FAQ */}
          <section style={{ padding: '8rem 2rem', background: '#020617' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '6rem' }}>
              {/* FAQ */}
              <div>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 950, letterSpacing: '-0.03em', textTransform: 'uppercase', color: 'white', marginBottom: '3rem' }}>
                  Knowledge <br />
                  <span style={{ color: '#3b82f6' }}>Base.</span>
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {faqs.map((faq, i) => {
                    const isOpen = activeFaq === i;
                    return (
                      <div key={i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1.5rem' }}>
                        <button 
                          onClick={() => setActiveFaq(isOpen ? null : i)}
                          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                        >
                          <span style={{ fontSize: '1.15rem', fontWeight: 800, color: isOpen ? '#3b82f6' : 'white', textTransform: 'uppercase', transition: 'color 0.2s' }}>{faq.title}</span>
                          <ChevronDown size={20} color="#94a3b8" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }} />
                        </button>
                        {isOpen && (
                          <p style={{ marginTop: '1rem', fontSize: '1rem', color: '#94a3b8', lineHeight: 1.6, margin: '1rem 0 0', animation: 'fadeIn 0.3s ease-out' }}>
                            {faq.answer}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Resources Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                {resources.map((res, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleNavClick('resources')}
                    style={{ 
                      background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '28px', padding: '2.5rem 2rem',
                      cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 10px 25px -10px rgba(0,0,0,0.5)'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 15px 35px -10px rgba(59,130,246,0.2)'; e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px -10px rgba(0,0,0,0.5)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }}
                  >
                    <res.icon size={28} color="#3b82f6" style={{ marginBottom: '1.5rem' }} />
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'white', marginBottom: '0.75rem' }}>{res.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>{res.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section style={{ padding: '10rem 2rem', background: '#090d16', textAlign: 'center', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
              <h2 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 950, letterSpacing: '-0.04em', textTransform: 'uppercase', color: 'white', marginBottom: '2rem', lineHeight: 0.95 }}>
                Join the <br />
                <span style={{ color: '#3b82f6' }}>Elite.</span>
              </h2>
              <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: '#94a3b8', marginBottom: '3.5rem', lineHeight: 1.7, fontWeight: 500 }}>
                Experience the pinnacle of workforce intelligence. Engineered for leaders who demand perfection.
              </p>
              <button 
                onClick={onStartLogin}
                style={{ 
                  padding: '1.4rem 3.5rem', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: 'white', border: 'none', 
                  borderRadius: '50px', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', 
                  letterSpacing: '0.25em', cursor: 'pointer', boxShadow: '0 20px 40px -10px rgba(59, 130, 246, 0.4)',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)'; e.currentTarget.style.boxShadow = '0 25px 50px -10px rgba(59, 130, 246, 0.6)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'; e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(59, 130, 246, 0.4)'; }}
              >
                Start Free Trial
              </button>
            </div>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', filter: 'blur(150px)', pointerEvents: 'none' }}></div>
          </section>
        </>
      )}

      {/* VIEW: PRODUCT */}
      {activeView === 'product' && (
        <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
          {/* Hero Section */}
          <section style={{ padding: '4rem 2rem 6rem', maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.4rem 1.25rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#3b82f6', marginBottom: '2.5rem' }}>
                  System Engineering v2.0
                </div>
                <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 950, letterSpacing: '-0.04em', lineHeight: 0.95, textTransform: 'uppercase', color: 'white', marginBottom: '2rem' }}>
                  Industrial <br />
                  <span style={{ color: '#3b82f6' }}>Integrity.</span>
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '3rem', fontWeight: 500 }}>
                  WorkSphere is a high-performance operating system designed for the complexities of the modern global enterprise. We've replaced legacy friction with precision-engineered automation.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
                  <button onClick={onStartLogin} style={{ padding: '1.2rem 2.75rem', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: 'white', border: 'none', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer', boxShadow: '0 15px 30px -10px rgba(59, 130, 246, 0.5)', transition: 'all 0.2s' }}>
                    Launch Instance
                  </button>
                  <button onClick={() => handleNavClick('resources')} style={{ padding: '1.2rem 2.75rem', background: 'rgba(255, 255, 255, 0.05)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s' }}>
                    <Play size={16} fill="white" /> Technical Specs
                  </button>
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '36px', padding: '1rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }}>
                  <img src="https://images.unsplash.com/photo-1551288049-bbbda5366a71?auto=format&fit=crop&q=80&w=2000" alt="System Analysis" style={{ width: '100%', borderRadius: '28px', objectFit: 'cover', aspectRatio: '4/3' }} onError={(e) => { e.currentTarget.src = '/hero-product.png'; }} />
                </div>
                <div style={{ position: 'absolute', bottom: '-2rem', left: '-2rem', background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '28px', padding: '2rem', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ height: '56px', width: '56px', borderRadius: '20px', background: 'rgba(0, 229, 143, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Activity size={28} color="#00e58f" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#94a3b8' }}>Live Status</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white' }}>OPTIMIZED</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section style={{ padding: '8rem 2rem', background: '#090d16', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8rem' }}>
              {benefits.map((b, i) => (
                <div key={b.title} style={{ display: 'flex', flexDirection: i % 2 === 1 ? 'row-reverse' : 'row', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
                  <div style={{ flex: '1 1 400px' }}>
                    <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 950, textTransform: 'uppercase', color: 'white', marginBottom: '1.5rem', lineHeight: 1 }}>{b.title}</h3>
                    <p style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '2.5rem' }}>{b.text}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      {['Automated Decision Support', 'Predictive Modeling', 'Unified Governance'].map((item) => (
                        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ height: '32px', width: '32px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CheckCircle2 size={18} color="#3b82f6" />
                          </div>
                          <span style={{ fontSize: '1rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ flex: '1 1 400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '48px', padding: '5rem 4rem', textAlign: 'center', width: '100%', maxWidth: '500px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                      <div style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', fontWeight: 950, color: '#3b82f6', lineHeight: 0.9, marginBottom: '1rem' }}>{b.metric}</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.25em', color: '#94a3b8' }}>{b.sub}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section style={{ padding: '8rem 2rem', background: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'white', textAlign: 'center' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 950, textTransform: 'uppercase', marginBottom: '2rem', lineHeight: 1 }}>Upgrade Your Infrastructure.</h2>
              <p style={{ fontSize: '1.3rem', color: '#94a3b8', marginBottom: '3.5rem', fontWeight: 500 }}>Deploy the world's most advanced workforce operating system today.</p>
              <button onClick={onStartLogin} style={{ padding: '1.4rem 3.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.25em', cursor: 'pointer', boxShadow: '0 20px 40px -10px rgba(59, 130, 246, 0.4)', transition: 'all 0.2s' }}>
                Initialize Deployment
              </button>
            </div>
          </section>
        </div>
      )}

      {/* VIEW: FEATURES */}
      {activeView === 'features' && (
        <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
          {/* Hero Header */}
          <section style={{ padding: '4rem 2rem 6rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', color: '#3b82f6', marginBottom: '1.5rem' }}>Core Capabilities</p>
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', fontWeight: 950, textTransform: 'uppercase', color: 'white', marginBottom: '2rem', lineHeight: 0.95 }}>
              The Feature <br />
              <span style={{ color: '#3b82f6' }}>Manifesto.</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#94a3b8', lineHeight: 1.7, fontWeight: 500 }}>
              We didn't just build features. We engineered a seamless interface between human potential and enterprise efficiency.
            </p>
          </section>

          {/* Main Features Detail */}
          <section style={{ padding: '6rem 2rem', background: '#090d16', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8rem' }}>
              {mainFeaturesList.map((f, i) => (
                <div key={f.title} style={{ display: 'flex', flexDirection: i % 2 === 1 ? 'row-reverse' : 'row', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
                  <div style={{ flex: '1 1 400px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
                      <div style={{ height: '56px', width: '56px', borderRadius: '20px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                        <f.icon size={28} />
                      </div>
                      <h3 style={{ fontSize: '2.2rem', fontWeight: 950, textTransform: 'uppercase', color: 'white', margin: 0 }}>{f.title}</h3>
                    </div>
                    <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '2.5rem' }}>{f.desc}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem', marginBottom: '3rem' }}>
                      {f.details.map((detail) => (
                        <div key={detail} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <CheckCircle2 size={18} color="#3b82f6" />
                          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#cbd5e1' }}>{detail}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={onStartLogin} style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#3b82f6', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      Learn More <ArrowRight size={16} />
                    </button>
                  </div>
                  <div style={{ flex: '1 1 400px' }}>
                    <div style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '36px', padding: '1rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                      <img src={f.image} alt={f.title} style={{ width: '100%', borderRadius: '28px', objectFit: 'cover', aspectRatio: '16/9' }} onError={(e) => { e.currentTarget.src = '/hero-product.png'; }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Enterprise Specs Section */}
          <section style={{ padding: '8rem 2rem', background: '#020617' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 950, textTransform: 'uppercase', color: 'white', marginBottom: '1.5rem' }}>Enterprise Specifications</h2>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>Underneath the aesthetic surface lies a foundation of industrial-grade engineering.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem' }}>
                {enterpriseSpecs.map((s, i) => (
                  <div key={i} style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '32px', padding: '3.5rem 2.5rem', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}>
                    <s.icon size={36} color="#3b82f6" style={{ marginBottom: '2rem' }} />
                    <h4 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: '1rem' }}>{s.title}</h4>
                    <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* UI CTA */}
          <section style={{ padding: '8rem 2rem', background: '#0f172a', color: 'white', textAlign: 'center' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 950, textTransform: 'uppercase', marginBottom: '2rem', lineHeight: 1 }}>Engineered for <span style={{ color: '#3b82f6' }}>Scale.</span></h2>
              <p style={{ fontSize: '1.3rem', color: '#94a3b8', marginBottom: '3.5rem', fontWeight: 500 }}>Ready to transition your organization to the high-performance tier?</p>
              <button onClick={onStartLogin} style={{ padding: '1.4rem 3.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.25em', cursor: 'pointer', boxShadow: '0 20px 40px -10px rgba(59, 130, 246, 0.4)', transition: 'all 0.2s' }}>
                Initialize Setup
              </button>
            </div>
          </section>
        </div>
      )}

      {/* VIEW: SOLUTIONS */}
      {activeView === 'solutions' && (
        <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
          {/* Hero Header */}
          <section style={{ padding: '4rem 2rem 6rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', color: '#3b82f6', marginBottom: '1.5rem' }}>Strategic Frameworks</p>
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', fontWeight: 950, textTransform: 'uppercase', color: 'white', marginBottom: '2rem', lineHeight: 0.95 }}>
              Precision <br />
              <span style={{ color: '#3b82f6' }}>Solutions.</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#94a3b8', lineHeight: 1.7, fontWeight: 500 }}>
              Tailored ecosystems engineered to solve the most complex organizational challenges for the world's most demanding enterprises.
            </p>
          </section>

          {/* Main Solutions Grid */}
          <section style={{ padding: '6rem 2rem', background: '#090d16', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8rem' }}>
              {detailedSolutionsList.map((s, i) => (
                <div key={s.title} style={{ display: 'flex', flexDirection: i % 2 === 1 ? 'row-reverse' : 'row', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
                  <div style={{ flex: '1 1 400px' }}>
                    <div style={{ height: '64px', width: '64px', borderRadius: '20px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', marginBottom: '2.5rem' }}>
                      <s.icon size={32} />
                    </div>
                    <h3 style={{ fontSize: '2.5rem', fontWeight: 950, textTransform: 'uppercase', color: 'white', marginBottom: '1.5rem', lineHeight: 1 }}>{s.title}</h3>
                    <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '2.5rem' }}>{s.desc}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem', marginBottom: '3.5rem' }}>
                      {s.features.map((f) => (
                        <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#3b82f6' }} />
                          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={onStartLogin} style={{ padding: '1.2rem 2.75rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer', boxShadow: '0 15px 30px -10px rgba(59, 130, 246, 0.5)' }}>
                      Learn More
                    </button>
                  </div>
                  <div style={{ flex: '1 1 400px' }}>
                    <div style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '36px', padding: '1rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                      <img src={s.image} alt={s.title} style={{ width: '100%', borderRadius: '28px', objectFit: 'cover', aspectRatio: '4/3' }} onError={(e) => { e.currentTarget.src = '/hero-product.png'; }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sector Focus */}
          <section style={{ padding: '8rem 2rem', background: '#020617' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 950, textTransform: 'uppercase', color: 'white', marginBottom: '1.5rem' }}>Sector Focus</h2>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>Industry-specific configurations designed for specialized operational requirements.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                {useCases.map((u, i) => (
                  <div key={i} onClick={onStartLogin} style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '36px', padding: '3.5rem 3rem', cursor: 'pointer', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)', transition: 'all 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }}>
                    <div style={{ height: '64px', width: '64px', borderRadius: '20px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', marginBottom: '2.5rem' }}>
                      <u.icon size={32} />
                    </div>
                    <h4 style={{ fontSize: '1.6rem', fontWeight: 950, textTransform: 'uppercase', color: 'white', marginBottom: '1.25rem' }}>{u.sector}</h4>
                    <p style={{ fontSize: '1.05rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '2.5rem' }}>{u.text}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#3b82f6' }}>
                      Explore Solution <ArrowRight size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* VIEW: RESOURCES */}
      {activeView === 'resources' && (
        <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
          {/* Hero Search */}
          <section style={{ padding: '4rem 2rem 6rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', color: '#3b82f6', marginBottom: '1.5rem' }}>Developer Knowledge Hub</p>
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', fontWeight: 950, textTransform: 'uppercase', color: 'white', marginBottom: '3rem', lineHeight: 0.95 }}>
              The Insight <br />
              <span style={{ color: '#3b82f6' }}>Repository.</span>
            </h1>

            <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '50px', padding: '0.5rem 1.5rem', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}>
                <Search size={22} color="#94a3b8" style={{ marginRight: '1rem' }} />
                <input 
                  type="text" 
                  placeholder="Search technical specifications..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '1.1rem', color: 'white', padding: '1rem 0' }}
                />
              </div>
            </div>
          </section>

          {/* Categories Grid */}
          <section style={{ padding: '6rem 2rem', background: '#090d16', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem' }}>
                {knowledgeCategories.map((c, i) => (
                  <div key={i} onClick={onStartLogin} style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '32px', padding: '3.5rem 2.5rem', cursor: 'pointer', boxShadow: '0 10px 25px -10px rgba(0,0,0,0.5)', transition: 'all 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }}>
                    <c.icon size={32} color="#3b82f6" style={{ marginBottom: '2rem' }} />
                    <h4 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: '0.75rem' }}>{c.title}</h4>
                    <p style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#94a3b8', margin: 0 }}>{c.count}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Deep Dive */}
          <section style={{ padding: '8rem 2rem', background: '#020617' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 950, textTransform: 'uppercase', color: 'white', marginBottom: '4rem', textAlign: 'center' }}>Operational FAQ</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {faqs.map((faq, i) => {
                  const isOpen = activeFaq === i;
                  return (
                    <div key={i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1.5rem' }}>
                      <button 
                        onClick={() => setActiveFaq(isOpen ? null : i)}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                      >
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: isOpen ? '#3b82f6' : 'white', textTransform: 'uppercase', transition: 'color 0.2s' }}>{faq.title}</span>
                        <ChevronDown size={22} color="#94a3b8" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }} />
                      </button>
                      {isOpen && (
                        <p style={{ marginTop: '1.25rem', fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.7, margin: '1rem 0 0', animation: 'fadeIn 0.3s ease-out' }}>
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Support CTA */}
          <section style={{ padding: '8rem 2rem', background: '#0f172a', color: 'white', textAlign: 'center' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <Zap size={48} color="#3b82f6" style={{ margin: '0 auto 2rem' }} />
              <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 950, textTransform: 'uppercase', marginBottom: '2rem', lineHeight: 1 }}>Need Industrial Support?</h2>
              <p style={{ fontSize: '1.3rem', color: '#94a3b8', marginBottom: '3.5rem', fontWeight: 500 }}>Our global engineering team is available 24/7 for mission-critical deployment assistance.</p>
              <button onClick={onStartLogin} style={{ padding: '1.4rem 3.5rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.25em', cursor: 'pointer', boxShadow: '0 20px 40px -10px rgba(59, 130, 246, 0.4)', transition: 'all 0.2s' }}>
                Connect to Engineering
              </button>
            </div>
          </section>
        </div>
      )}

      {/* VIEW: PRIVACY */}
      {activeView === 'privacy' && (
        <div style={{ paddingTop: '8rem', paddingBottom: '8rem', maxWidth: '900px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <button onClick={() => handleNavClick('landing')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#94a3b8', cursor: 'pointer', marginBottom: '4rem' }}>
            <ArrowLeft size={16} /> Back to Home
          </button>
          <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 950, textTransform: 'uppercase', color: 'white', marginBottom: '1.5rem', lineHeight: 0.95 }}>
            Privacy <br />
            <span style={{ color: '#3b82f6' }}>Policy.</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '5rem', fontWeight: 500 }}>
            Last Updated: April 2026. Your privacy is the cornerstone of our trust-based enterprise infrastructure.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {privacySections.map((s) => (
              <div key={s.title} style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '36px', padding: '3.5rem 3rem', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
                  <div style={{ height: '56px', width: '56px', borderRadius: '20px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                    <s.icon size={28} />
                  </div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 950, textTransform: 'uppercase', color: 'white', margin: 0 }}>{s.title}</h3>
                </div>
                <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: TERMS */}
      {activeView === 'terms' && (
        <div style={{ paddingTop: '8rem', paddingBottom: '8rem', maxWidth: '900px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <button onClick={() => handleNavClick('landing')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#94a3b8', cursor: 'pointer', marginBottom: '4rem' }}>
            <ArrowLeft size={16} /> Back to Home
          </button>
          <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 950, textTransform: 'uppercase', color: 'white', marginBottom: '1.5rem', lineHeight: 0.95 }}>
            Terms & <br />
            <span style={{ color: '#3b82f6' }}>Conditions.</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '5rem', fontWeight: 500 }}>
            Last Updated: April 2026. Defining the framework for enterprise-grade excellence.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {termsSections.map((s) => (
              <div key={s.title} style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '36px', padding: '3.5rem 3rem', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
                  <div style={{ height: '56px', width: '56px', borderRadius: '20px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                    <s.icon size={28} />
                  </div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 950, textTransform: 'uppercase', color: 'white', margin: 0 }}>{s.title}</h3>
                </div>
                <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: SECURITY */}
      {activeView === 'security' && (
        <div style={{ paddingTop: '8rem', paddingBottom: '8rem', maxWidth: '900px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <button onClick={() => handleNavClick('landing')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#94a3b8', cursor: 'pointer', marginBottom: '4rem' }}>
            <ArrowLeft size={16} /> Back to Home
          </button>
          <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 950, textTransform: 'uppercase', color: 'white', marginBottom: '1.5rem', lineHeight: 0.95 }}>
            Security <br />
            <span style={{ color: '#3b82f6' }}>Framework.</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '5rem', fontWeight: 500 }}>
            Last Updated: April 2026. Engineered for absolute data integrity and protection.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {securitySections.map((s) => (
              <div key={s.title} style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '36px', padding: '3.5rem 3rem', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
                  <div style={{ height: '56px', width: '56px', borderRadius: '20px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                    <s.icon size={28} />
                  </div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 950, textTransform: 'uppercase', color: 'white', margin: 0 }}>{s.title}</h3>
                </div>
                <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ background: '#020617', color: 'white', padding: '6rem 2rem 3rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '4rem', marginBottom: '6rem' }}>
            {/* Brand & Contact */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ height: '36px', width: '36px', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={18} color="white" />
                </div>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.04em', color: 'white' }}>
                  Work<span style={{ color: '#3b82f6' }}>Sphere</span>
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 700 }}>
                  <Mail size={16} color="#3b82f6" /> nexus@worksphere.com
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 700 }}>
                  <Phone size={16} color="#3b82f6" /> +1 (888) AURA-OPS
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 700 }}>
                  <MapPin size={16} color="#3b82f6" /> Global HQ &bull; Silicon Valley
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.25em', color: '#64748b', marginBottom: '2rem' }}>Ecosystem</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button onClick={() => handleNavClick('features')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600, textAlign: 'left', cursor: 'pointer', padding: 0 }} onMouseOver={(e) => e.currentTarget.style.color = '#3b82f6'} onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}>Capabilities</button>
                <button onClick={() => handleNavClick('product')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600, textAlign: 'left', cursor: 'pointer', padding: 0 }} onMouseOver={(e) => e.currentTarget.style.color = '#3b82f6'} onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}>Analytics</button>
                <button onClick={() => handleNavClick('security')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600, textAlign: 'left', cursor: 'pointer', padding: 0 }} onMouseOver={(e) => e.currentTarget.style.color = '#3b82f6'} onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}>Security</button>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.25em', color: '#64748b', marginBottom: '2rem' }}>Platform</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button onClick={() => handleNavClick('features')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600, textAlign: 'left', cursor: 'pointer', padding: 0 }} onMouseOver={(e) => e.currentTarget.style.color = '#3b82f6'} onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}>Features</button>
                <button onClick={() => handleNavClick('solutions')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600, textAlign: 'left', cursor: 'pointer', padding: 0 }} onMouseOver={(e) => e.currentTarget.style.color = '#3b82f6'} onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}>Solutions</button>
                <button onClick={() => handleNavClick('resources')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600, textAlign: 'left', cursor: 'pointer', padding: 0 }} onMouseOver={(e) => e.currentTarget.style.color = '#3b82f6'} onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}>Resources</button>
                <button onClick={onStartLogin} style={{ background: 'transparent', border: 'none', color: '#3b82f6', fontSize: '0.9rem', fontWeight: 700, textAlign: 'left', cursor: 'pointer', padding: 0 }} onMouseOver={(e) => e.currentTarget.style.color = '#60a5fa'} onMouseOut={(e) => e.currentTarget.style.color = '#3b82f6'}>Contact Nexus</button>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.25em', color: '#64748b', marginBottom: '2rem' }}>Governance</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button onClick={() => handleNavClick('privacy')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600, textAlign: 'left', cursor: 'pointer', padding: 0 }} onMouseOver={(e) => e.currentTarget.style.color = '#3b82f6'} onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}>Privacy Policy</button>
                <button onClick={() => handleNavClick('terms')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600, textAlign: 'left', cursor: 'pointer', padding: 0 }} onMouseOver={(e) => e.currentTarget.style.color = '#3b82f6'} onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}>Terms of Service</button>
                <button onClick={() => handleNavClick('security')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600, textAlign: 'left', cursor: 'pointer', padding: 0 }} onMouseOver={(e) => e.currentTarget.style.color = '#3b82f6'} onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}>Compliance</button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', paddingTop: '3rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            <div>© 2026 WorkSphere Global Infrastructure &bull; All Rights Reserved</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#00e58f' }}>
              <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#00e58f', boxShadow: '0 0 10px #00e58f' }} />
              All Systems Operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
