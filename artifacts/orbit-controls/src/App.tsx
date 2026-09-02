import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowRight, Check, ChevronRight, CircuitBoard, ClipboardCheck, Clock3, Factory, FileCheck2, Gauge, Globe2, Mail, MapPin, Menu, Microscope, Moon, Phone, ShieldCheck, Sparkles, Sun, Wrench, X, Zap } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Link, Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/control-panel', label: 'Control Panel' },
  { href: '/contact', label: 'Contact Us' },
];

function Seo({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    const setProperty = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('description', description);
    setProperty('og:title', title);
    setProperty('og:description', description);
    setProperty('og:type', 'website');
    setProperty('og:site_name', 'Optimize Controls');
  }, [description, title]);
  return null;
}


function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return window.localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      data-testid="button-theme-toggle"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container-wide header-inner">
        <Link href="/" className="brand" data-testid="link-brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true" />
          <span><span className="brand-word">Optimize Controls</span><span className="brand-sub">PRECISION / POWER / PROOF</span></span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => <Link key={item.href} href={item.href} className={`nav-link ${location === item.href ? 'active' : ''}`} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}
        </nav>
        <div className="header-actions"><ThemeToggle /><Link href="/contact" className="header-cta" data-testid="link-header-quote">Request a quote <ArrowRight size={14} /></Link></div>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} data-testid="button-mobile-menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && <nav className="mobile-menu" aria-label="Mobile navigation">{navItems.map((item) => <Link key={item.href} href={item.href} className="nav-link" onClick={() => setOpen(false)} data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}</nav>}
    </header>
  );
}

function Footer() {
  const [currentPath] = useLocation();
  return (
    <footer className="site-footer">
      <div className="container-wide footer-grid">
        <div>
          <Link href="/" className="brand" data-testid="link-footer-brand"><span className="brand-mark" aria-hidden="true" /><span><span className="brand-word">Optimize Controls</span><span className="brand-sub">PRECISION / POWER / PROOF</span></span></Link>
          <p className="footer-copy">Custom control panels for the machines that keep North American industry moving.</p>
        </div>
        <div><div className="footer-heading">Navigate</div><div className="footer-links">{navItems.map((item) => <Link key={item.href} href={item.href} data-active={currentPath === item.href ? 'true' : undefined} data-testid={`link-footer-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}</div></div>
        <div><div className="footer-heading">Capabilities</div><div className="footer-links"><Link href="/control-panel#build">Build-to-print</Link><Link href="/control-panel#engineering">Panel engineering</Link><Link href="/control-panel#testing">Testing & validation</Link></div></div>
        <div><div className="footer-heading">Connect</div><div className="footer-links"><a href="mailto:info@optimizecontrols.com" data-testid="link-footer-email">info@optimizecontrols.com</a><a href="tel:+13617650825" data-testid="link-footer-phone">+1 (361) 765-0825</a><span className="muted">13826 Trailville Dr, Houston, TX 77077</span></div></div>
      </div>
      <div className="container-wide footer-bottom"><span>Â© 2026 Optimize Controls, All rights reserved.</span><span>UL 508A SHOP Â· BUILT IN THE USA</span></div>
    </footer>
  );
}


function ScrollToHash() {
  const [location] = useLocation();

  useEffect(() => {
    window.setTimeout(() => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.getElementById(decodeURIComponent(hash));
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }, [location]);

  return null;
}
function Shell({ children }: { children: ReactNode }) {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('main > .section, main > .section-tight, main > .quote-strip, main > .page-intro'));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    document.documentElement.classList.add('motion-ready');
    targets.forEach((target) => observer.observe(target));
    return () => { observer.disconnect(); document.documentElement.classList.remove('motion-ready'); };
  }, []);
  return <div className="site-shell"><ScrollToHash /><Header />{children}<Footer /></div>;
}

function PanelVisual() {
  return (
    <div className="control-visual" aria-label="Technical illustration of an industrial control panel">
      <img className="panel-photo" src={`${import.meta.env.BASE_URL}images/control-panel-hero.png`} alt="Open industrial control panel with PLC modules and routed wiring" />
      <span className="visual-meta mono">OC / P-0427 / REV 06</span>
      <div className="panel-frame">
        <span className="panel-cap">OPTIMIZE / 480V MCC</span>
        <div className="panel-studs">
          <div className="panel-box"><div className="panel-leds"><i className="led on" /><i className="led" /><i className="led on" /></div><div className="breaker" /><span className="wire" /></div>
          <div className="panel-box"><div className="gauge" /><div className="panel-leds"><i className="led on" /><i className="led on" /></div></div>
          <div className="panel-box"><div className="breaker" /><div className="panel-leds"><i className="led" /><i className="led on" /><i className="led" /></div></div>
          <div className="panel-box"><div className="gauge" /><div className="panel-leds"><i className="led on" /><i className="led" /></div></div>
        </div>
        <span className="panel-label">SERIAL 24-OC-9182 &nbsp; | &nbsp; TESTED 11.04.24</span>
      </div>
      <span className="visual-tag">FIG. A / <span>FIELD-READY ENCLOSURE</span></span>
    </div>
  );
}

function Ticker() {
  const items = ['UL 508A SHOP', 'BUILD-TO-PRINT', 'NORTH AMERICA', 'TESTED BEFORE SHIPMENT', 'DOCUMENTED DELIVERABLES'];
  return <div className="ticker"><div className="ticker-track">{[...items, ...items].map((item, i) => <span className="ticker-item" key={`${item}-${i}`}>{item}</span>)}</div></div>;
}

function Stats() {
  return <div className="stats-grid" data-testid="stats-grid">
    <div className="stat"><div className="stat-value">20<span style={{ color: 'hsl(var(--primary))' }}>+</span></div><div className="stat-label">Years of Experience</div></div>
    <div className="stat"><div className="stat-value">2</div><div className="stat-label">Countries Â· USA & Canada</div></div>
    <div className="stat"><div className="stat-value">100<span style={{ color: 'hsl(var(--accent))' }}>%</span></div><div className="stat-label">Panels Tested Before Shipment</div></div>
    <div className="stat"><div className="stat-value">UL<span style={{ color: 'hsl(var(--primary))' }}> 508A</span></div><div className="stat-label">Certified Panel Shop</div></div>
  </div>;
}

function Process({ compact = false }: { compact?: boolean }) {
  const steps = [
    ['01', 'Project Review & Quotation', 'We review drawings, requirements, quantities, and delivery expectations.'],
    ['02', 'Procurement & Planning', 'Components, schedule, and build plan align before assembly begins.'],
    ['03', 'Panel Assembly', 'Disciplined assembly, labelling, wiring, and documentation.'],
    ['04', 'Testing & QA', 'Visual, torque, continuity, and functional checks before release.'],
  ];
  return <div className={`process-grid ${compact ? 'compact-process' : ''}`}>{steps.map(([number, name, copy]) => <div className="process-step" key={number}><span className="process-number">{number}</span><div className="process-line" /><h3>{name}</h3><p>{copy}</p></div>)}</div>;
}

function Home() {
  return <Shell>
    <Seo title="Optimize Controls | Custom Control Panels, Built to Run" description="Optimize Controls manufactures custom UL 508A electrical control panels for OEMs, system integrators, and machine builders." />
    <main>
      <section className="hero"><div className="container-wide hero-grid"><div className="hero-copy"><div className="eyebrow">UL 508 Custom Control Panel Manufacturing</div><h1><>Custom Control<br />Panel &amp; Industrial<br /><em>Automation</em></></h1><p className="hero-lede">At Optimize Controls we build custom control panels using well-known and proven hardware. We will design a control system based on your needs, either for a completely new facility or to integrate into an existing one. These control panels will provide you with efficient process control, safety, and reliability. We are a group of Chemical and Instrument engineers with experience in different industriesâ€”Oil & Gas, Chemical, Municipal water treatment. We can help you generate Controls Narrative, Cause & Effect and eventually arrive at fully functioning and safe ladder logic suited to your needs in a modern style.</p><div className="hero-actions"><Link href="/contact" className="button-primary" data-testid="link-hero-quote">Request a Quote <ArrowRight size={15} /></Link><Link href="/control-panel" className="button-secondary" data-testid="link-hero-capabilities">Explore Capabilities <ChevronRight size={15} /></Link></div></div><PanelVisual /></div></section>
      <Ticker />
      <section className="section"><div className="container-wide"><div className="section-header"><div><div className="eyebrow">Manufacturing services</div><h2 className="section-title display">Control Panel<br />Manufacturing Services</h2></div><p className="section-intro">Precision-built panels manufactured exactly to your engineering drawings â€” assembled, wired, tested, and inspected for dependable, long-term performance.</p></div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginTop: '48px' }}><article style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))', display: 'flex', flexDirection: 'column', gap: 0 }}><img src={`${import.meta.env.BASE_URL}images/site-panel-full.jpg`} alt="Custom control panels" style={{ width: '100%', height: '200px', objectFit: 'cover' }} /><div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}><h3 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>Custom Control Panels</h3><p style={{ margin: 0, color: 'hsl(var(--muted-foreground))' }}>Precision-built panels manufactured exactly to your engineering drawings and specifications. Every panel is assembled, wired, tested, and inspected for dependable performance and long-term reliability.</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto', paddingTop: '16px' }}><span style={{ fontSize: '12px', padding: '6px 12px', backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))', borderRadius: '20px' }}>OEM Equipment</span><span style={{ fontSize: '12px', padding: '6px 12px', backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))', borderRadius: '20px' }}>Industrial Machinery</span><span style={{ fontSize: '12px', padding: '6px 12px', backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))', borderRadius: '20px' }}>Process Automation</span></div></div></article><article style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))', display: 'flex', flexDirection: 'column', gap: 0 }}><img src={`${import.meta.env.BASE_URL}images/site-outdoor-full.jpg`} alt="High-volume panel production" style={{ width: '100%', height: '200px', objectFit: 'cover' }} /><div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}><h3 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>High-Volume Panel Production</h3><p style={{ margin: 0, color: 'hsl(var(--muted-foreground))' }}>Need hundreds of identical panels delivered consistently? Our scalable manufacturing process is designed to support OEM production volumes. From pilot production to full-scale manufacturing, we become an extension of your production team.</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto', paddingTop: '16px' }}><span style={{ fontSize: '12px', padding: '6px 12px', backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))', borderRadius: '20px' }}>Consistent Build Quality</span><span style={{ fontSize: '12px', padding: '6px 12px', backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))', borderRadius: '20px' }}>Faster Turnaround</span><span style={{ fontSize: '12px', padding: '6px 12px', backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))', borderRadius: '20px' }}>Complete Traceability</span></div></div></article><article style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))', display: 'flex', flexDirection: 'column', gap: 0 }}><img src={`${import.meta.env.BASE_URL}images/site-wiring-detail.jpg`} alt="Industrial labelling and engraving" style={{ width: '100%', height: '200px', objectFit: 'cover' }} /><div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}><h3 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>Industrial Labelling &amp; Engraving</h3><p style={{ margin: 0, color: 'hsl(var(--muted-foreground))' }}>Professional identification is critical for safety, maintenance, and compliance. Labels are produced to meet UL and CSA requirements, components accurately tagged, and nomenclature clearly marked for durability in demanding industrial environments.</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto', paddingTop: '16px' }}><span style={{ fontSize: '12px', padding: '6px 12px', backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))', borderRadius: '20px' }}>Component Labels</span><span style={{ fontSize: '12px', padding: '6px 12px', backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))', borderRadius: '20px' }}>Wire Identification</span><span style={{ fontSize: '12px', padding: '6px 12px', backgroundColor: 'hsl(var(--secondary))', color: 'hsl(var(--secondary-foreground))', borderRadius: '20px' }}>Safety Labels</span></div></div></article></div></div></section>
      <section className="section-tight dark-band"><div className="container-wide"><Stats /></div></section>

      {/* Built on more than 20 years */}
      <section className="section">
        <div className="container-wide about-split">
          <div>
            <div className="eyebrow">Proven experience</div>
            <h2 className="section-title display">Built on More Than 20 Years<br />of Manufacturing Excellence</h2>
            <p>Decades on shop floor translate into disciplined builds and on‑time delivery. Clean wiring. Clear labels. Proper torque. Documented checks. Panels that install fast and run reliably.</p>
          </div>
          <img className="about-photo" src={`${import.meta.env.BASE_URL}images/site-wiring-detail.jpg`} alt="Clean wiring and organized terminals" />
        </div>
      </section>

      {/* Manufacturing partner cards */}
      <section className="section" style={{ background:'hsl(var(--secondary))' }}>
        <div className="container-wide">
          <div style={{ textAlign:'center', marginBottom:32 }}>
            <div style={{ display:'inline-block', padding:'8px 12px', border:'1px solid hsl(var(--primary))', borderRadius:999, font:'700 10px var(--app-font-mono)', letterSpacing:'.1em', textTransform:'uppercase', color:'hsl(var(--primary))' }}>More than a supplier</div>
            <h2 className="section-title display" style={{ marginTop:12 }}>A Manufacturing Partner, Not Just a Supplier</h2>
            <p className="section-intro" style={{ margin:'12px auto 0', maxWidth:680 }}>We become a practical extension of your production team — consistent in quality, clear in timing, invested in your project success.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
            <article className="feature-panel"><div className="feature-kicker">Customer‑focused Partnership</div><h3>Support that fits schedule</h3><p>Capacity where needed, communication that keeps work moving, and dependable delivery.</p><div className="corner-mark">01</div><img src={`${import.meta.env.BASE_URL}images/site-outdoor-full.jpg`} alt="Outdoor panel install" style={{ position:'absolute', inset:0, opacity:.16, objectFit:'cover', pointerEvents:'none' }} /></article>
            <article className="feature-panel"><div className="feature-kicker">Precision Manufacturing</div><h3>Repeatable builds, clean execution</h3><p>Documented steps, consistent workmanship, labelled terminations, and verified fasteners.</p><div className="corner-mark">02</div><img src={`${import.meta.env.BASE_URL}images/site-panel-full.jpg`} alt="Panel interior" style={{ position:'absolute', inset:0, opacity:.16, objectFit:'cover', pointerEvents:'none' }} /></article>
            <article className="feature-panel"><div className="feature-kicker">Quality Without Compromise</div><h3>Defined checks before release</h3><p>Visual, continuity, and torque verification with documentation before shipment.</p><div className="corner-mark">03</div><img src={`${import.meta.env.BASE_URL}images/site-hmi-siemens.jpg`} alt="HMI Siemens" style={{ position:'absolute', inset:0, opacity:.16, objectFit:'cover', pointerEvents:'none' }} /></article>
          </div>
        </div>
      </section>

      {/* Process + QA */}
      <section className="section">
        <div className="container-wide">
          <div style={{ textAlign:'center', marginBottom:34 }}>
            <div style={{ display:'inline-block', padding:'8px 12px', border:'1px solid hsl(var(--primary))', borderRadius:999, font:'700 10px var(--app-font-mono)', letterSpacing:'.1em', textTransform:'uppercase', color:'hsl(var(--primary))' }}>How we build</div>
            <h2 className="section-title display" style={{ marginTop:12 }}>Our Manufacturing Process</h2>
            <p className="section-intro" style={{ margin:'12px auto 0', maxWidth:680 }}>A documented, repeatable workflow — from project review through testing — so every panel arrives installation‑ready.</p>
          </div>
          <div className="process-grid compact-process">
            {[
              ['01','Project Review & Quotation','We review drawings, requirements, quantities, and delivery expectations.'],
              ['02','Procurement & Planning','Components, schedule, and build plan align before assembly begins.'],
              ['03','Panel Assembly','Disciplined assembly, labelling, wiring, and documentation.'],
              ['04','Testing & QA','Visual, torque, continuity, and functional checks before release.'],
            ].map(([num,name,copy]) => (
              <article className="feature-panel" key={num} style={{ minHeight: 'auto' }}>
                <div className="feature-kicker">STEP {num}</div>
                <h3 style={{ margin:'10px 0 6px' }}>{name}</h3>
                <p style={{ margin:0 }}>{copy}</p>
              </article>
            ))}
          </div>
          <div className="form-frame" style={{ marginTop:22 }}>
            <div className="feature-kicker">Our Quality‑Assurance Process Includes</div>
            <ul className="feature-list">
              {['Component verification','Wire and terminal inspection','Torque verification','Electrical continuity testing','Documentation review','Final visual inspection'].map((item) => (
                <li key={item}><Check size={14} /> {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* North American footprint */}
      <section className="section">
        <div className="container-wide about-split">
          <div>
            <div className="eyebrow">Our footprint</div>
            <h2 className="section-title display">A North American<br />Manufacturing Footprint</h2>
            <p className="section-intro">Panels built for harsh, real‑world conditions across industries — installed, commissioned, and supported across USA & Canada.</p>
            <div className="quote-guidance" style={{ borderLeftColor:'hsl(var(--primary))' }}>
              <ul className="feature-list" style={{ marginTop:0 }}>
                {['Industrial facilities and OEMs','Reliable supply‑chain alignment','Documented deliverables','Flexible capacity for spikes','Field & factory test support'].map((item) => (
                  <li key={item}><Check size={14} /> {item}</li>
                ))}
              </ul>
            </div>
          </div>
          <img className="about-photo" src={`${import.meta.env.BASE_URL}images/img-pump-station.jpeg`} alt="Pump station equipment" />
        </div>
      </section>

      {/* Capability cloud */}
      <section className="section" style={{ background:'hsl(var(--secondary))' }}>
        <div className="container-wide" style={{ textAlign:'center' }}>
          <div style={{ display:'inline-block', padding:'8px 12px', border:'1px solid hsl(var(--primary))', borderRadius:999, font:'700 10px var(--app-font-mono)', letterSpacing:'.1em', textTransform:'uppercase', color:'hsl(var(--primary))' }}>Beyond panels</div>
          <h2 className="section-title display" style={{ marginTop:12 }}>More Than Quality Control Panels</h2>
          <div className="industry-cloud" style={{ justifyContent:'center', marginTop:18 }}>
            {['Instrumentation wiring','Drives & soft starts','Skids & pump stations','Clean terminations','Operator interface','Panel documentation','Field termination support','UL 508A','Procurement support','Factory testing','North America service','Clear communication cadence'].map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="quote-strip blueprint-band">
        <div className="container-wide">
          <h2 className="display">Helping You Build Better Systems</h2>
          <p>Bring drawings and requirements. We deliver a disciplined, repeatable build — tested and documented — so your commissioning goes faster.</p>
          <div className="hero-actions" style={{ justifyContent:'center' }}>
            <Link href="/contact" className="button-primary">Partner With Us <ArrowRight size={15} /></Link>
            <Link href="/control-panel" className="button-secondary">View Capabilities <ChevronRight size={15} /></Link>
          </div>
        </div>
      </section>
      <section className="section"><div className="container-wide"><div style={{ textAlign: 'center', marginBottom: '48px' }}><div style={{ display: 'inline-block', padding: '8px 16px', border: '1px solid hsl(var(--primary))', borderRadius: '20px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', color: 'hsl(var(--primary))', marginBottom: '24px' }}>HOW IT WORKS</div><h2 className="section-title display" style={{ marginBottom: '16px' }}>Our Manufacturing<br />Process</h2><p style={{ fontSize: '14px', color: 'hsl(var(--muted-foreground))', maxWidth: '700px', margin: '0 auto' }}>A documented, repeatable workflow â€” so every panel arrives installation-ready and performs reliably from day one.</p></div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '40px', position: 'relative' }}><article style={{ backgroundColor: 'hsl(var(--secondary))', borderRadius: '12px', padding: '24px 20px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '12px' }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', border: '2px solid hsl(var(--primary))', borderRadius: '8px', fontSize: '13px', fontWeight: 700, color: 'hsl(var(--primary))' }}>01</div><h3 style={{ fontSize: '16px', fontWeight: 600, margin: '8px 0 0 0', lineHeight: 1.3 }}>Project Review &<br />Quotation</h3><p style={{ margin: 0, color: 'hsl(var(--muted-foreground))', fontSize: '13px', lineHeight: 1.4 }}>We review your drawings, schematics, BOM, and technical requirements, then evaluate component availability and timelines to provide an accurate quotation.</p></article><article style={{ backgroundColor: 'hsl(var(--secondary))', borderRadius: '12px', padding: '24px 20px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '12px' }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', border: '2px solid hsl(var(--primary))', borderRadius: '8px', fontSize: '13px', fontWeight: 700, color: 'hsl(var(--primary))' }}>02</div><h3 style={{ fontSize: '16px', fontWeight: 600, margin: '8px 0 0 0', lineHeight: 1.3 }}>Procurement &<br />Planning</h3><p style={{ margin: 0, color: 'hsl(var(--muted-foreground))', fontSize: '13px', lineHeight: 1.4 }}>Our procurement specialists source materials from trusted manufacturers while production scheduling ensures an efficient workflow and on-time delivery.</p></article><article style={{ backgroundColor: 'hsl(var(--secondary))', borderRadius: '12px', padding: '24px 20px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '12px' }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', border: '2px solid hsl(var(--primary))', borderRadius: '8px', fontSize: '13px', fontWeight: 700, color: 'hsl(var(--primary))' }}>03</div><h3 style={{ fontSize: '16px', fontWeight: 600, margin: '8px 0 0 0', lineHeight: 1.3 }}>Panel Assembly</h3><p style={{ margin: 0, color: 'hsl(var(--muted-foreground))', fontSize: '13px', lineHeight: 1.4 }}>Skilled technicians assemble each panel to your specifications using standardized procedures â€” with in-process quality inspections at every stage of the build.</p></article><article style={{ backgroundColor: 'hsl(var(--secondary))', borderRadius: '12px', padding: '24px 20px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '12px' }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', border: '2px solid hsl(var(--primary))', borderRadius: '8px', fontSize: '13px', fontWeight: 700, color: 'hsl(var(--primary))' }}>04</div><h3 style={{ fontSize: '16px', fontWeight: 600, margin: '8px 0 0 0', lineHeight: 1.3 }}>Testing & QA</h3><p style={{ margin: 0, color: 'hsl(var(--muted-foreground))', fontSize: '13px', lineHeight: 1.4 }}>Every panel undergoes comprehensive inspection and functional testing before shipment. Factory Acceptance Testing (FAT) is available upon request.</p></article></div></div></section>
      <section className="section"><div className="container-wide"><div style={{ textAlign: 'center', marginBottom: '48px' }}><div style={{ display: 'inline-block', padding: '8px 16px', border: '1px solid hsl(var(--primary))', borderRadius: '20px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', color: 'hsl(var(--primary))', marginBottom: '24px' }}>WHO WE SERVE</div><h2 className="section-title display" style={{ marginBottom: '16px' }}>Industries We Serve</h2><p style={{ fontSize: '16px', color: 'hsl(var(--muted-foreground))', maxWidth: '700px', margin: '0 auto' }}>From single custom panels to ongoing OEM production, we support automation teams across North America.</p></div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginTop: '48px' }}><article style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))', cursor: 'pointer', transition: 'all 0.3s ease', transform: 'translateY(0)', boxShadow: '0 2px 8px hsla(var(--foreground), 0.08)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 24px hsla(var(--foreground), 0.15)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px hsla(var(--foreground), 0.08)'; }}><img src={`${import.meta.env.BASE_URL}images/site-mud238-panel.jpg`} alt="Original Equipment Manufacturers" style={{ width: '100%', height: '240px', objectFit: 'cover' }} /><div style={{ padding: '28px' }}><h3 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 12px 0' }}>Original Equipment Manufacturers</h3><p style={{ margin: 0, color: 'hsl(var(--muted-foreground))', fontSize: '14px', lineHeight: 1.5 }}>We partner with OEMs looking to outsource control panel manufacturing while maintaining the highest standards of quality, consistency, and production efficiency.</p></div></article><article style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))', cursor: 'pointer', transition: 'all 0.3s ease', transform: 'translateY(0)', boxShadow: '0 2px 8px hsla(var(--foreground), 0.08)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 24px hsla(var(--foreground), 0.15)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px hsla(var(--foreground), 0.08)'; }}><img src={`${import.meta.env.BASE_URL}images/site-hmi-siemens.jpg`} alt="System Integrators" style={{ width: '100%', height: '240px', objectFit: 'cover' }} /><div style={{ padding: '28px' }}><h3 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 12px 0' }}>System Integrators</h3><p style={{ margin: 0, color: 'hsl(var(--muted-foreground))', fontSize: '14px', lineHeight: 1.5 }}>Engineering and automation companies trust us to build control panels so their teams can stay focused on programming, system design, commissioning, and customer support.</p></div></article><article style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))', cursor: 'pointer', transition: 'all 0.3s ease', transform: 'translateY(0)', boxShadow: '0 2px 8px hsla(var(--foreground), 0.08)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 24px hsla(var(--foreground), 0.15)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px hsla(var(--foreground), 0.08)'; }}><img src={`${import.meta.env.BASE_URL}images/img-pump-station.jpeg`} alt="Industrial End Users" style={{ width: '100%', height: '240px', objectFit: 'cover' }} /><div style={{ padding: '28px' }}><h3 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 12px 0' }}>Industrial End Users</h3><p style={{ margin: 0, color: 'hsl(var(--muted-foreground))', fontSize: '14px', lineHeight: 1.5 }}>We manufacture custom control panels for manufacturing plants, utilities, processing facilities, and industrial operations requiring dependable electrical control systems built specifically for their equipment.</p></div></article></div><div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid hsl(var(--border))' }}>{['Manufacturing', 'Food & Beverage', 'Packaging', 'Material Handling', 'Water & Wastewater', 'Oil & Gas', 'Mining', 'Renewable Energy', 'Automotive', 'Pharmaceutical', 'Chemical Processing'].map((industry) => <span key={industry} style={{ padding: '8px 16px', border: '1px solid hsl(var(--border))', borderRadius: '20px', fontSize: '13px', color: 'hsl(var(--muted-foreground))' }}>{industry}</span>)}</div></div></section>
      <section className="section quality-showcase"><div className="container-wide quality-showcase-grid"><div className="quality-copy"><div className="eyebrow quality-eyebrow">WHY CHOOSE US</div><h2 className="section-title display">Built on Experience.<br />Driven by Quality.</h2><p>For more than two decades, our team has been helping customers deliver reliable automation systems through precisely manufactured control panels. When you partner with us, you gain more than a panel shop — you gain a dependable manufacturing partner committed to your success.</p><div className="quality-reasons">{['UL 508A Certified Manufacturing','Customer-Supplied Design Builds','Rigorous Quality Control & Testing','High-Volume Production Capabilities','Fast, Reliable Lead Times','Experienced Manufacturing Team','Clear Project Communication','North American Manufacturing','Flexible Production Capacity','Competitive Pricing Without Compromising Quality'].map((item) => <div className="quality-reason" key={item}><Check size={16} /><span>{item}</span></div>)}</div></div><div className="quality-panel-wrap"><p className="quality-panel-intro">Every control panel undergoes comprehensive inspection and testing before shipment. Our standardized manufacturing process ensures:</p><div className="quality-card"><div className="quality-card-head"><strong>Quality You Can Trust</strong><span>QC · INSP / 100%</span></div><div className="quality-card-list">{['Accurate Component Installation','Clean Wire Routing','Proper Torque Verification','Electrical Testing','Documentation Review','Final Quality Inspection'].map((item) => <div className="quality-check" key={item}><Check size={14} /><span>{item}</span></div>)}</div><div className="quality-result">THE RESULT IS A PANEL THAT ARRIVES INSTALLATION-READY AND PERFORMS RELIABLY IN THE FIELD.</div></div></div></div></section>      <section className="quote-strip blueprint-band"><div className="container-wide"><h2 className="display">Tell us about your project</h2><Link href="/contact" className="button-primary" data-testid="link-home-contact">Contact Us <ArrowRight size={15} /></Link></div></section>
    </main>
  </Shell>;
}

function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy: string }) {
  return <section className="page-intro"><div className="container-wide"><div className="eyebrow">{eyebrow}</div><h1 className="display">{title}</h1><p>{copy}</p></div></section>;
}

function About() {
  const values = [['Customer-focused partnership','Production support that fits your team and your schedule.'],['Precision manufacturing','Documented, repeatable builds with clean execution.'],['Quality without compromise','Defined checks before every release.'],['Scalable production','Prototype, pilot run, and repeat production support.']];
  const qa = ['Component verification','Wire and terminal inspection','Torque verification','Electrical continuity testing','Documentation review','Final visual inspection'];
  return <Shell>
    <Seo title="About Optimize Controls | Control Panel Manufacturing Partner" description="Optimize Controls is a precision control-panel manufacturing partner for OEMs, integrators, and automation teams." />
    <main>
      <section className="section">
        <div className="container-wide about-split">
          <div>
            <div style={{ display:'inline-block', padding:'8px 12px', border:'1px solid hsl(var(--primary))', borderRadius:'999px', font:'700 10px var(--app-font-mono)', letterSpacing:'.1em', textTransform:'uppercase', color:'hsl(var(--primary))', marginBottom:'14px' }}>About Optimize Controls</div>
            <h1 className="display" style={{ margin:'6px 0 18px 0', lineHeight:.95, fontSize:'clamp(42px, 5.6vw, 86px)' }}>Your Trusted Partner<br />for Custom Control Panel<br />Manufacturing</h1>
            <p>At Optimize Controls, we believe exceptional control panel manufacturing starts with strong partnerships. Since our founding, we&apos;ve focused on helping OEMs, system integrators, and industrial automation companies outsource their panel production with complete confidence.</p>
            <p>We don&apos;t compete with our customers — we support them. By becoming an extension of your team, we help you increase production capacity, reduce lead times, and deliver high-quality automation systems on schedule.</p>
            <p>Whether you require a single custom panel or hundreds of production-ready assemblies, our experienced team is committed to delivering consistent quality, responsive communication, and dependable service from start to finish.</p>
            <div className="hero-actions">
              <Link href="/contact" className="button-primary">Partner With Us <ArrowRight size={15} /></Link>
              <Link href="/control-panel" className="button-secondary">Explore Our Capabilities <ChevronRight size={15} /></Link>
            </div>
            <div className="trust-chips"><span>Consistent quality</span><span>Responsive communication</span><span>Dependable service</span></div>
          </div>
          <div>
            <div style={{ position:'relative', border:'1px solid hsl(var(--card-border))', borderRadius:'14px', overflow:'hidden', boxShadow:'var(--card-shadow)', background:'hsl(var(--card))' }}>
              <img className="about-photo" src={`${import.meta.env.BASE_URL}images/img-about-us.jpeg`} alt="About Optimize Controls" />
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px', marginTop:'12px' }}>
              <article style={{ border:'1px solid hsl(var(--card-border))', background:'hsl(var(--card))', padding:'16px', borderRadius:'10px', display:'grid', placeItems:'start', gap:'8px' }}>
                <ClipboardCheck size={18} style={{ color:'hsl(var(--primary))' }} />
                <div style={{ font: '700 18px Inter, sans-serif', letterSpacing:'-.03em' }}>20<span style={{ color:'hsl(var(--primary))' }}>+</span></div>
                <div style={{ font:'10px var(--app-font-mono)', color:'hsl(var(--muted-foreground))', letterSpacing:'.1em', textTransform:'uppercase' }}>Years · Experience</div>
              </article>
              <article style={{ border:'1px solid hsl(var(--card-border))', background:'hsl(var(--card))', padding:'16px', borderRadius:'10px', display:'grid', placeItems:'start', gap:'8px' }}>
                <Globe2 size={18} style={{ color:'hsl(var(--primary))' }} />
                <div style={{ font: '700 18px Inter, sans-serif', letterSpacing:'-.03em' }}>North America</div>
                <div style={{ font:'10px var(--app-font-mono)', color:'hsl(var(--muted-foreground))', letterSpacing:'.1em', textTransform:'uppercase' }}>USA & Canada</div>
              </article>
              <article style={{ border:'1px solid hsl(var(--card-border))', background:'hsl(var(--card))', padding:'16px', borderRadius:'10px', display:'grid', placeItems:'start', gap:'8px' }}>
                <FileCheck2 size={18} style={{ color:'hsl(var(--primary))' }} />
                <div style={{ font: '700 18px Inter, sans-serif', letterSpacing:'-.03em' }}>Build to Print</div>
                <div style={{ font:'10px var(--app-font-mono)', color:'hsl(var(--muted-foreground))', letterSpacing:'.1em', textTransform:'uppercase' }}>Your Specs</div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight dark-band"><div className="container-wide"><Stats /></div></section>
    </main>
  </Shell>;
}
const services = [
  { icon: <CircuitBoard size={27} />, title: 'Custom control panels', copy: 'Complete electrical assemblies for machines, skids, process lines, and specialized equipment. Designed around the way your operators and technicians work.' },
  { icon: <Factory size={27} />, title: 'High-volume panel production', copy: 'Have a released drawing set? We turn it into a consistent, traceable build with the care and speed your production schedule demands.' },
  { icon: <Zap size={27} />, title: 'Industrial labelling & engraving', copy: 'Clean integration of breakers, disconnects, starters, VFDs, soft starts, and power distribution for demanding industrial environments.' },
  { icon: <Gauge size={27} />, title: 'PLC & VFD panels', copy: 'PLC, HMI, remote I/O, network hardware, and controls architecture assembled as one coherent, documented system.' },
  { icon: <ShieldCheck size={27} />, title: 'Safety systems', copy: 'Safety relays, E-stops, guarding, and interlocks laid out with a practical eye for access, testing, and future service.' },
  { icon: <Microscope size={27} />, title: 'Test & validation', copy: 'Point-to-point checks, torque verification, visual inspection, and functional simulation before your panel is cleared to ship.' },
];

function ControlPanel() {
  const panels = [['PLC Control Panels','Automation-ready enclosures for PLCs, remote I/O, communications, and supporting control hardware.'],['Motor Control Panels','Organized motor control assemblies for pumps, fans, conveyors, compressors, and industrial equipment.'],['VFD Control Panels','Drive panels built for dependable speed control, maintenance access, and process performance.'],['HMI & Operator Interface Panels','Operator stations with HMIs, pushbuttons, selector switches, indicators, and safety devices.'],['Power Distribution Panels','Documented power distribution built around your electrical requirements and project standards.'],['Junction & Terminal Panels','Clearly identified terminals and clean field-wiring interfaces for easier installation and service.']];
  const documents = ['Electrical Schematics','Wiring Diagrams','Bill of Materials','Panel Layout Drawings','Customer Standards','Engineering Specifications'];
  const quality = ['Component verification','Wire identification and routing','Torque verification','Electrical continuity testing','Functional testing when specified','Documentation review','Final visual inspection'];
  return <Shell><Seo title="Control Panel Manufacturing | Optimize Controls" description="Optimize Controls manufactures precision industrial control panels for OEMs, system integrators, and automation teams." /><main><PageIntro eyebrow="Custom industrial control panel manufacturing" title={<>Precision-built panels<br />for <span style={{ color: 'hsl(var(--primary))' }}>production.</span></>} copy="Optimize Controls manufactures custom electrical control panels for OEMs, system integrators, and automation teamsâ€”from one-off prototypes through high-volume production." /><section id="build" className="section"><div className="container-wide about-split"><div><div className="eyebrow">Custom panel build / Ready</div><h2 className="section-title display">Built to your<br /><span style={{ color: 'hsl(var(--primary))' }}>exact requirements.</span></h2><div className="trust-chips"><span>Quality</span><span>Reliability</span><span>Performance</span></div><div className="hero-actions"><Link href="/contact" className="button-primary">Request a Quote <ArrowRight size={15} /></Link><Link href="/about" className="button-secondary">About Our Team <ChevronRight size={15} /></Link></div></div><img className="about-photo" src={`${import.meta.env.BASE_URL}images/control-panel-hero.png`} alt="Custom industrial electrical control panel" /></div></section><section id="engineering" className="section dark-band"><div className="container-wide"><div className="section-header"><div><div className="eyebrow">Our capabilities</div><h2 className="section-title display">Panels built for<br /><span style={{ color: 'hsl(var(--primary))' }}>real operations.</span></h2></div><p className="section-intro">A broad range of custom panel manufacturing capabilities, assembled to meet the needs of different industrial applications.</p></div><div className="service-grid">{panels.map(([title, copy], i) => <article className="service-card" key={title}><span className="card-index">0{i + 1} / 06</span><CircuitBoard className="service-icon" size={25} /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section><section className="section blueprint-band"><div className="container-wide about-split"><div><div className="eyebrow">Build-to-print documentation</div><h2 className="section-title display">Every panel,<br />built to your <span style={{ color: 'hsl(var(--primary))' }}>documents.</span></h2><p className="section-intro" style={{ marginTop: 20 }}>Project changes stay visible and approved before manufacturing continues.</p></div><ul className="feature-list" style={{ marginTop: 0 }}>{documents.map((item) => <li key={item}><FileCheck2 size={17} /> {item}</li>)}</ul></div></section><section id="testing" className="section"><div className="container-wide about-split"><div><div className="eyebrow">Quality at every stage</div><h2 className="section-title display">Installation-ready.<br /><span style={{ color: 'hsl(var(--primary))' }}>Reliable from day one.</span></h2><p className="section-intro" style={{ marginTop: 20 }}>Inspection and testing are integrated through assemblyâ€”not added as an afterthought.</p></div><ul className="feature-list" style={{ marginTop: 0 }}>{quality.map((item) => <li key={item}><ClipboardCheck size={17} /> {item}</li>)}</ul></div></section><section className="section-tight dark-band"><div className="container-wide"><div className="section-header"><div><div className="eyebrow">Industries we serve</div><h2 className="section-title display">Dependable panels<br />across <span style={{ color: 'hsl(var(--primary))' }}>industry.</span></h2></div><p className="section-intro">Control-panel manufacturing for applications where reliable operations are non-negotiable.</p></div><div className="industry-cloud">{['Manufacturing','Food & Beverage','Packaging','Material Handling','Water & Wastewater','Oil & Gas','Mining','Renewable Energy','Automotive','Pharmaceutical','Chemical Processing','Industrial Automation'].map((item) => <span key={item}>{item}</span>)}</div></div></section><section className="section"><div className="container-wide about-split"><div><div className="eyebrow">Prototype to production</div><h2 className="section-title display">Support at every<br /><span style={{ color: 'hsl(var(--primary))' }}>project stage.</span></h2></div><div><p>Whether you are validating a new machine or increasing production capacity, every panel gets disciplined manufacturing attention.</p><ul className="feature-list"><li><Factory size={17} /> Prototype builds and validation units</li><li><Factory size={17} /> Pilot and low-volume production</li><li><Factory size={17} /> High-volume and ongoing production support</li></ul></div></div></section><section className="quote-strip blueprint-band"><div className="container-wide"><div className="eyebrow">Request a quote</div><h2 className="display">Looking for a reliable<br />panel partner?</h2><p>Send drawings or project requirements. WETS AI will help define the right manufacturing path.</p><div className="hero-actions"><Link href="/contact" className="button-primary">Request a Quote <ArrowRight size={15} /></Link><Link href="/about" className="button-secondary">Learn About Us <ChevronRight size={15} /></Link></div></div></section></main></Shell>;
}
function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', project: '', quantity: '', timeline: '', testing: '', details: '' });
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  const reset = () => { setSubmitted(false); setForm({ name: '', company: '', email: '', phone: '', project: '', quantity: '', timeline: '', testing: '', details: '' }); };
  return <Shell><Seo title="Contact Optimize Controls | Request a Quote" description="Contact Optimize Controls for custom industrial control-panel manufacturing and automation support." /><main><PageIntro eyebrow="Contact Optimize Controls / Request a quote" title={<>Bring us the<br /><span style={{ color: 'hsl(var(--primary))' }}>next challenge.</span></>} copy="Call us to discuss your needs." /><section className="section"><div className="container-wide"><div className="contact-card-grid"><article className="feature-panel"><Phone className="service-icon" size={25} /><div className="feature-kicker">PHONE</div><h3>Talk to our team</h3><a href="tel:+13617650825">+1 (361) 765-0825</a></article><article className="feature-panel"><Mail className="service-icon" size={25} /><div className="feature-kicker">EMAIL</div><h3>Send project details</h3><a href="mailto:info@optimizecontrols.com">info@optimizecontrols.com</a></article><article className="feature-panel"><MapPin className="service-icon" size={25} /><div className="feature-kicker">LOCATION</div><h3>Houston, Texas</h3><p>13826 Trailville Dr<br />Houston, TX 77077</p></article><article className="feature-panel"><Clock3 className="service-icon" size={25} /><div className="feature-kicker">HOURS</div><h3>Weekday support</h3><p>Mondayâ€“Friday<br />8:00 AMâ€“5:00 PM</p></article></div></div></section><section className="section-tight dark-band"><div className="container-wide contact-grid"><div><div className="eyebrow">Request a quote</div><h2 className="section-title display">Tell us what<br />you&apos;re <span style={{ color: 'hsl(var(--primary))' }}>building.</span></h2><p className="section-intro" style={{ marginTop: 20 }}>Share enough to begin. We will follow up with the technical questions that matter.</p><div className="quote-guidance"><strong>For an accurate quote, include:</strong><ul className="feature-list"><li><FileCheck2 size={16} /> Drawings, schematics, or I/O list</li><li><ClipboardCheck size={16} /> Quantity and target delivery</li><li><ShieldCheck size={16} /> Required testing or certifications</li></ul></div></div><div className="form-frame">{submitted ? <div className="success-state"><Check size={27} /><h3>Request received.</h3><p>Thanks, {form.name || 'there'}. WETS AI will review your information and follow up soon.</p><button type="button" className="button-secondary" onClick={reset}>Send another request</button></div> : <form onSubmit={submit}><div className="form-grid"><div className="field"><label htmlFor="name">Full name</label><input id="name" required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="First and last name" /></div><div className="field"><label htmlFor="company">Company</label><input id="company" required value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="Company or team" /></div><div className="field"><label htmlFor="email">Email address</label><input id="email" required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@company.com" /></div><div className="field"><label htmlFor="phone">Phone</label><input id="phone" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+1 (000) 000-0000" /></div><div className="field"><label htmlFor="quantity">Quantity required</label><input id="quantity" value={form.quantity} onChange={(e) => update('quantity', e.target.value)} placeholder="e.g. 25 panels" /></div><div className="field"><label htmlFor="timeline">Delivery timeline</label><input id="timeline" value={form.timeline} onChange={(e) => update('timeline', e.target.value)} placeholder="Target date or lead time" /></div><div className="field full"><label htmlFor="project">Panel type</label><select id="project" required value={form.project} onChange={(e) => update('project', e.target.value)}><option value="" disabled>Select an option</option><option value="plc">PLC control panel</option><option value="motor">Motor control panel</option><option value="vfd">VFD control panel</option><option value="hmi">HMI / operator interface</option><option value="power">Power distribution</option><option value="other">Other project</option></select></div><div className="field full"><label htmlFor="testing">Special testing / certification</label><input id="testing" value={form.testing} onChange={(e) => update('testing', e.target.value)} placeholder="Testing, FAT, or certification needs" /></div><div className="field full"><label htmlFor="details">Project description</label><textarea id="details" required value={form.details} onChange={(e) => update('details', e.target.value)} placeholder="Tell us about the application, controls, voltage, or other requirements." /></div></div><button type="submit" className="button-primary form-submit">Submit Project Brief <ArrowRight size={15} /></button></form>}</div></div></section><section className="section"><div className="container-wide"><div className="section-header"><div><div className="eyebrow">Frequently asked questions</div><h2 className="section-title display">Clear answers,<br /><span style={{ color: 'hsl(var(--primary))' }}>right away.</span></h2></div></div><div className="faq-grid">{[['What do you need for a quote?','Drawings, a bill of materials, panel layout, quantities, and timing help us quote accurately. A project description is enough to start.'],['Can you build from customer drawings?','Yes. Build-to-print manufacturing is a core WETS AI capability.'],['Do you support prototype and production builds?','Yes. We support prototypes, pilot runs, repeat orders, and high-volume production.'],['Do you ship throughout North America?','We support customers across the United States and Canada.']].map(([q,a]) => <article className="feature-panel" key={q}><h3>{q}</h3><p>{a}</p></article>)}</div></div></section></main></Shell>;
}
function Router() {
  return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home} /><Route path="/about" component={About} /><Route path="/control-panel" component={ControlPanel} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
