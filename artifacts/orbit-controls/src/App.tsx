import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowRight, Check, ChevronRight, CircuitBoard, ClipboardCheck, Clock3, Factory, FileCheck2, Gauge, Globe2, Mail, MapPin, Menu, Microscope, Phone, ShieldCheck, Sparkles, Wrench, X, Zap } from 'lucide-react';
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
    setProperty('og:site_name', 'WETS AI');
  }, [description, title]);
  return null;
}

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container-wide header-inner">
        <Link href="/" className="brand" data-testid="link-brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true" />
          <span><span className="brand-word">WETS AI</span><span className="brand-sub">PRECISION / POWER / PROOF</span></span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => <Link key={item.href} href={item.href} className={`nav-link ${location === item.href ? 'active' : ''}`} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}
        </nav>
        <Link href="/contact" className="header-cta" data-testid="link-header-quote">Request a quote <ArrowRight size={14} /></Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} data-testid="button-mobile-menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && <nav className="mobile-menu" aria-label="Mobile navigation">{navItems.map((item) => <Link key={item.href} href={item.href} className="nav-link" onClick={() => setOpen(false)} data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}</nav>}
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-wide footer-grid">
        <div>
          <Link href="/" className="brand" data-testid="link-footer-brand"><span className="brand-mark" aria-hidden="true" /><span><span className="brand-word">WETS AI</span><span className="brand-sub">PRECISION / POWER / PROOF</span></span></Link>
          <p className="footer-copy">Custom control panels for the machines that keep North American industry moving.</p>
        </div>
        <div><div className="footer-heading">Navigate</div><div className="footer-links">{navItems.map((item) => <Link key={item.href} href={item.href} data-testid={`link-footer-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}</div></div>
        <div><div className="footer-heading">Capabilities</div><div className="footer-links"><Link href="/control-panel#build">Build-to-print</Link><Link href="/control-panel#engineering">Panel engineering</Link><Link href="/control-panel#testing">Testing & validation</Link></div></div>
        <div><div className="footer-heading">Connect</div><div className="footer-links"><a href="mailto:info@wets.ai" data-testid="link-footer-email">info@wets.ai</a><a href="tel:+13617650825" data-testid="link-footer-phone">+1 (361) 765-0825</a><span className="muted">8614 Fairbanks N Houston Rd, Houston, TX 77064</span></div></div>
      </div>
      <div className="container-wide footer-bottom"><span>© 2026 WETS AI, All rights reserved.</span><span>UL 508A SHOP · BUILT IN THE USA</span></div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="site-shell"><Header />{children}<Footer /></div>;
}

function PanelVisual() {
  return (
    <div className="control-visual" aria-label="Technical illustration of an industrial control panel">
      <img className="panel-photo" src={`${import.meta.env.BASE_URL}images/control-panel-hero.png`} alt="Open industrial control panel with PLC modules and routed wiring" />
      <span className="visual-meta mono">WETS / P-0427 / REV 06</span>
      <div className="panel-frame">
        <span className="panel-cap">WETS AI // 480V MCC</span>
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
  const items = ['UL 508A SHOP', 'BUILD-TO-PRINT', 'NORTH AMERICA', 'TESTED BEFORE SHIPMENT', 'PLC + VFD INTEGRATION', 'DOCUMENTED DELIVERABLES'];
  return <div className="ticker"><div className="ticker-track">{[...items, ...items].map((item, i) => <span className="ticker-item" key={`${item}-${i}`}>{item}</span>)}</div></div>;
}

function Stats() {
  return <div className="stats-grid" data-testid="stats-grid">
    <div className="stat"><div className="stat-value">20<span style={{ color: 'hsl(var(--primary))' }}>+</span></div><div className="stat-label">Years of Experience</div></div>
    <div className="stat"><div className="stat-value">2</div><div className="stat-label">Countries · USA & Canada</div></div>
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
    <Seo title="WETS AI | Custom Control Panels, Built to Run" description="WETS AI manufactures custom UL 508A electrical control panels for OEMs, system integrators, and machine builders across North America." />
    <main>
      <section className="hero"><div className="container-wide hero-grid"><div className="hero-copy"><div className="eyebrow">Control panel manufacturing / North America</div><h1><>Custom Control<br />Panel &amp; Industrial<br /><em>Automation</em></></h1><p className="hero-lede">Precision-built electrical control panels for OEMs, system integrators, machine builders, and industrial automation teams across North America.</p><div className="hero-actions"><Link href="/contact" className="button-primary" data-testid="link-hero-quote">Request a Quote <ArrowRight size={15} /></Link><Link href="/control-panel" className="button-secondary" data-testid="link-hero-capabilities">Explore Capabilities <ChevronRight size={15} /></Link></div><div className="hero-note"><span className="pulse-dot" /><span><strong>Shop status:</strong> accepting Q3 production schedules</span></div></div><PanelVisual /></div></section>
      <Ticker />
      <section className="section"><div className="container-wide"><div className="section-header"><div><div className="eyebrow">A better handoff</div><h2 className="section-title display">The panel is where<br />intent becomes <span style={{ color: 'hsl(var(--primary))' }}>motion.</span></h2></div><p className="section-intro">Your machine is only as reliable as the details inside its enclosure. We make those details visible, repeatable, and ready for the field.</p></div><div className="feature-grid"><article className="feature-panel large"><span className="corner-mark">01 / 03</span><div className="feature-kicker"><b>01</b> / CONTROL WITHOUT COMPROMISE</div><h3>One partner from drawing release to dock delivery.</h3><p>We fit into the way your team works—receiving your design intent, making the right questions visible, and returning a tested assembly that is ready for installation.</p><ul className="feature-list"><li><Check size={15} /> UL 508A listed panel shop</li><li><Check size={15} /> Build-to-print and design assist</li><li><Check size={15} /> Complete test documentation</li></ul></article><div className="feature-grid" style={{ gridTemplateColumns: '1fr', gap: '22px' }}><article className="feature-panel"><span className="corner-mark">02 / 03</span><CircuitBoard className="service-icon" size={27} /><h3 style={{ fontSize: 21, marginTop: 22 }}>Built for your architecture.</h3><p>PLC, VFD, safety, motion, and power distribution in one coordinated build.</p></article><article className="feature-panel"><span className="corner-mark">03 / 03</span><ClipboardCheck className="service-icon" size={27} /><h3 style={{ fontSize: 21, marginTop: 22 }}>Proof travels with it.</h3><p>Every shipment leaves with the labels, drawings, and test record your team needs.</p></article></div></div></div></section>
      <section className="section-tight dark-band"><div className="container-wide"><Stats /></div></section>
      <section className="section"><div className="container-wide"><div className="section-header"><div><div className="eyebrow">The WETS AI method</div><h2 className="section-title display">A calm process.<br />A precise result.</h2></div><p className="section-intro">No black boxes. No surprises at commissioning. Our four-stage method keeps the work moving and the accountability clear.</p></div><Process /></div></section>
      <section className="section dark-band"><div className="container-wide"><div className="section-header"><div><div className="eyebrow">Industries we serve</div><h2 className="section-title display">Built for<br />real production.</h2></div><p className="section-intro">Manufacturing support for teams building, integrating, operating, and maintaining industrial equipment.</p></div><div className="industry-cloud">{['Original Equipment Manufacturers','System Integrators','Industrial End Users','Manufacturing','Food & Beverage','Packaging','Material Handling','Water & Wastewater','Oil & Gas','Mining','Renewable Energy','Automotive','Pharmaceutical','Chemical Processing'].map((industry) => <span key={industry}>{industry}</span>)}</div></div></section>
      <section className="section"><div className="container-wide"><div className="section-header"><div><div className="eyebrow">Quality you can trust</div><h2 className="section-title display">Proof in every<br />detail.</h2></div><p className="section-intro">Clear checkpoints protect installation quality, documentation accuracy, and commissioning readiness.</p></div><div className="service-grid">{['Accurate Component Installation','Clean Wire Routing','Proper Torque Verification','Electrical Testing','Documentation Review','Final Quality Inspection'].map((item, i) => <article className="service-card" key={item}><span className="card-index">0{i + 1}</span><ShieldCheck className="service-icon" size={24} /><h3>{item}</h3><p>Verified against project documentation before release.</p></article>)}</div></div></section>      <section className="quote-strip blueprint-band"><div className="container-wide"><div className="eyebrow">Bring us the hard part</div><h2 className="display">Tell us what the machine needs to do.</h2><p>Send a drawing, an I/O list, or simply the problem you need solved. We will help define the next right step.</p><Link href="/contact" className="button-primary" data-testid="link-home-contact">Talk to the shop <ArrowRight size={15} /></Link></div></section>
    </main>
  </Shell>;
}

function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy: string }) {
  return <section className="page-intro"><div className="container-wide"><div className="eyebrow">{eyebrow}</div><h1 className="display">{title}</h1><p>{copy}</p></div></section>;
}

function About() {
  const values = [['Customer-focused partnership','Production support that fits your team and your schedule.'],['Precision manufacturing','Documented, repeatable builds with clean execution.'],['Quality without compromise','Defined checks before every release.'],['Scalable production','Prototype, pilot run, and repeat production support.']];
  const qa = ['Component verification','Wire and terminal inspection','Torque verification','Electrical continuity testing','Documentation review','Final visual inspection'];
  return <Shell><Seo title="About WETS AI | Control Panel Manufacturing Partner" description="WETS AI is a precision control-panel manufacturing partner for OEMs, integrators, and automation teams." /><main><PageIntro eyebrow="About WETS AI / Manufacturing partner" title={<>Built for teams<br />building <span style={{ color: 'hsl(var(--primary))' }}>what&apos;s next.</span></>} copy="WETS AI provides dependable control-panel manufacturing for teams that need capacity, consistency, and a partner who understands the production floor." /><section className="section"><div className="container-wide about-split"><div><div className="eyebrow">Trusted custom manufacturing</div><h2 className="section-title display">Your drawings.<br />Our <span style={{ color: 'hsl(var(--primary))' }}>discipline.</span></h2><div className="trust-chips"><span>Consistent quality</span><span>Clear communication</span><span>Dependable delivery</span></div></div><div><p>WETS AI helps OEMs, system integrators, and automation teams turn released designs into installation-ready electrical assemblies. We support your work without competing for it.</p><p>From one specialized enclosure to repeatable production at scale, we focus on accurate builds, practical communication, and confident handoffs.</p><div className="hero-actions"><Link href="/contact" className="button-primary">Partner With WETS AI <ArrowRight size={15} /></Link><Link href="/control-panel" className="button-secondary">Explore Capabilities <ChevronRight size={15} /></Link></div></div></div></section><section className="section-tight dark-band"><div className="container-wide"><Stats /></div></section><section className="section"><div className="container-wide about-split"><img className="about-photo" src={`${import.meta.env.BASE_URL}images/control-panel-hero.png`} alt="Precision-built electrical control panel" /><div><div className="eyebrow">Manufacturing excellence</div><h2 className="section-title display">Experience that<br />stays <span style={{ color: 'hsl(var(--primary))' }}>hands-on.</span></h2><p>Our North American manufacturing footprint combines responsive collaboration with processes made for production repeatability.</p><ul className="feature-list"><li><Check size={16} /> Build-to-print support</li><li><Check size={16} /> Prototype through production</li><li><Check size={16} /> Documentation-led quality control</li></ul></div></div></section><section className="section dark-band"><div className="container-wide"><div className="section-header"><div><div className="eyebrow">Why companies choose WETS AI</div><h2 className="section-title display">A partner, not<br />another <span style={{ color: 'hsl(var(--primary))' }}>vendor.</span></h2></div><p className="section-intro">Manufacturing support that makes every release easier to manage.</p></div><div className="service-grid">{values.map(([title, copy], i) => <article className="service-card" key={title}><span className="card-index">0{i + 1} / 04</span><ShieldCheck className="service-icon" size={25} /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section><section className="section"><div className="container-wide"><div className="section-header"><div><div className="eyebrow">From release to shipment</div><h2 className="section-title display">A documented<br /><span style={{ color: 'hsl(var(--primary))' }}>manufacturing path.</span></h2></div><p className="section-intro">Clear milestones carry every project from technical review to a tested, installation-ready panel.</p></div><Process /></div></section><section className="section-tight blueprint-band"><div className="container-wide about-split"><div><div className="eyebrow">QA / Pre-ship</div><h2 className="section-title display">Quality, made<br /><span style={{ color: 'hsl(var(--primary))' }}>visible.</span></h2></div><ul className="feature-list" style={{ marginTop: 0 }}>{qa.map((item) => <li key={item}><ClipboardCheck size={17} /> {item}</li>)}</ul></div></section><section className="section"><div className="container-wide about-split"><div><div className="eyebrow">USA & Canada coverage</div><h2 className="section-title display">North American<br /><span style={{ color: 'hsl(var(--primary))' }}>manufacturing reach.</span></h2></div><div><p>WETS AI supports customers across the United States and Canada with flexible production planning, responsive support, and practical supply-chain coordination.</p><ul className="feature-list"><li><Globe2 size={17} /> Faster, more predictable delivery</li><li><Factory size={17} /> Flexible production capacity</li><li><Wrench size={17} /> Local manufacturing expertise</li></ul></div></div></section><section className="quote-strip blueprint-band"><div className="container-wide"><div className="eyebrow">Our mission</div><h2 className="display">Helping you build<br />better systems.</h2><p>We make reliable, precision-manufactured control panels so your team can keep building with confidence.</p><Link href="/contact" className="button-primary">Partner With WETS AI <ArrowRight size={15} /></Link></div></section></main></Shell>;
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
  return <Shell><Seo title="Control Panel Manufacturing | WETS AI" description="WETS AI manufactures precision industrial control panels for OEMs, system integrators, and automation teams." /><main><PageIntro eyebrow="Custom industrial control panel manufacturing" title={<>Precision-built panels<br />for <span style={{ color: 'hsl(var(--primary))' }}>production.</span></>} copy="WETS AI manufactures custom electrical control panels for OEMs, system integrators, and automation teams—from one-off prototypes through high-volume production." /><section className="section"><div className="container-wide about-split"><div><div className="eyebrow">Custom panel build / Ready</div><h2 className="section-title display">Built to your<br /><span style={{ color: 'hsl(var(--primary))' }}>exact requirements.</span></h2><div className="trust-chips"><span>Quality</span><span>Reliability</span><span>Performance</span></div><div className="hero-actions"><Link href="/contact" className="button-primary">Request a Quote <ArrowRight size={15} /></Link><Link href="/about" className="button-secondary">About Our Team <ChevronRight size={15} /></Link></div></div><img className="about-photo" src={`${import.meta.env.BASE_URL}images/control-panel-hero.png`} alt="Custom industrial electrical control panel" /></div></section><section className="section dark-band"><div className="container-wide"><div className="section-header"><div><div className="eyebrow">Our capabilities</div><h2 className="section-title display">Panels built for<br /><span style={{ color: 'hsl(var(--primary))' }}>real operations.</span></h2></div><p className="section-intro">A broad range of custom panel manufacturing capabilities, assembled to meet the needs of different industrial applications.</p></div><div className="service-grid">{panels.map(([title, copy], i) => <article className="service-card" key={title}><span className="card-index">0{i + 1} / 06</span><CircuitBoard className="service-icon" size={25} /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section><section className="section blueprint-band"><div className="container-wide about-split"><div><div className="eyebrow">Build-to-print documentation</div><h2 className="section-title display">Every panel,<br />built to your <span style={{ color: 'hsl(var(--primary))' }}>documents.</span></h2><p className="section-intro" style={{ marginTop: 20 }}>Project changes stay visible and approved before manufacturing continues.</p></div><ul className="feature-list" style={{ marginTop: 0 }}>{documents.map((item) => <li key={item}><FileCheck2 size={17} /> {item}</li>)}</ul></div></section><section className="section"><div className="container-wide about-split"><div><div className="eyebrow">Quality at every stage</div><h2 className="section-title display">Installation-ready.<br /><span style={{ color: 'hsl(var(--primary))' }}>Reliable from day one.</span></h2><p className="section-intro" style={{ marginTop: 20 }}>Inspection and testing are integrated through assembly—not added as an afterthought.</p></div><ul className="feature-list" style={{ marginTop: 0 }}>{quality.map((item) => <li key={item}><ClipboardCheck size={17} /> {item}</li>)}</ul></div></section><section className="section-tight dark-band"><div className="container-wide"><div className="section-header"><div><div className="eyebrow">Industries we serve</div><h2 className="section-title display">Dependable panels<br />across <span style={{ color: 'hsl(var(--primary))' }}>industry.</span></h2></div><p className="section-intro">Control-panel manufacturing for applications where reliable operations are non-negotiable.</p></div><div className="industry-cloud">{['Manufacturing','Food & Beverage','Packaging','Material Handling','Water & Wastewater','Oil & Gas','Mining','Renewable Energy','Automotive','Pharmaceutical','Chemical Processing','Industrial Automation'].map((item) => <span key={item}>{item}</span>)}</div></div></section><section className="section"><div className="container-wide about-split"><div><div className="eyebrow">Prototype to production</div><h2 className="section-title display">Support at every<br /><span style={{ color: 'hsl(var(--primary))' }}>project stage.</span></h2></div><div><p>Whether you are validating a new machine or increasing production capacity, every panel gets disciplined manufacturing attention.</p><ul className="feature-list"><li><Factory size={17} /> Prototype builds and validation units</li><li><Factory size={17} /> Pilot and low-volume production</li><li><Factory size={17} /> High-volume and ongoing production support</li></ul></div></div></section><section className="quote-strip blueprint-band"><div className="container-wide"><div className="eyebrow">Request a quote</div><h2 className="display">Looking for a reliable<br />panel partner?</h2><p>Send drawings or project requirements. WETS AI will help define the right manufacturing path.</p><div className="hero-actions"><Link href="/contact" className="button-primary">Request a Quote <ArrowRight size={15} /></Link><Link href="/about" className="button-secondary">Learn About Us <ChevronRight size={15} /></Link></div></div></section></main></Shell>;
}
function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', project: '', quantity: '', timeline: '', testing: '', details: '' });
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  const reset = () => { setSubmitted(false); setForm({ name: '', company: '', email: '', phone: '', project: '', quantity: '', timeline: '', testing: '', details: '' }); };
  return <Shell><Seo title="Contact WETS AI | Request a Quote" description="Contact WETS AI for custom industrial control-panel manufacturing and automation support." /><main><PageIntro eyebrow="Contact WETS AI / Request a quote" title={<>Bring us the<br /><span style={{ color: 'hsl(var(--primary))' }}>next challenge.</span></>} copy="Have a project, drawing package, or automation question? Our team is ready to help define the next practical step." /><section className="section"><div className="container-wide"><div className="contact-card-grid"><article className="feature-panel"><Phone className="service-icon" size={25} /><div className="feature-kicker">PHONE</div><h3>Talk to our team</h3><a href="tel:+13617650825">+1 (361) 765-0825</a></article><article className="feature-panel"><Mail className="service-icon" size={25} /><div className="feature-kicker">EMAIL</div><h3>Send project details</h3><a href="mailto:info@wets.ai">info@wets.ai</a></article><article className="feature-panel"><MapPin className="service-icon" size={25} /><div className="feature-kicker">LOCATION</div><h3>Houston, Texas</h3><p>8614 Fairbanks N Houston Rd<br />Houston, TX 77064</p></article><article className="feature-panel"><Clock3 className="service-icon" size={25} /><div className="feature-kicker">HOURS</div><h3>Weekday support</h3><p>Monday–Friday<br />8:00 AM–5:00 PM</p></article></div></div></section><section className="section-tight dark-band"><div className="container-wide contact-grid"><div><div className="eyebrow">Request a quote</div><h2 className="section-title display">Tell us what<br />you&apos;re <span style={{ color: 'hsl(var(--primary))' }}>building.</span></h2><p className="section-intro" style={{ marginTop: 20 }}>Share enough to begin. We will follow up with the technical questions that matter.</p><div className="quote-guidance"><strong>For an accurate quote, include:</strong><ul className="feature-list"><li><FileCheck2 size={16} /> Drawings, schematics, or I/O list</li><li><ClipboardCheck size={16} /> Quantity and target delivery</li><li><ShieldCheck size={16} /> Required testing or certifications</li></ul></div></div><div className="form-frame">{submitted ? <div className="success-state"><Check size={27} /><h3>Request received.</h3><p>Thanks, {form.name || 'there'}. WETS AI will review your information and follow up soon.</p><button type="button" className="button-secondary" onClick={reset}>Send another request</button></div> : <form onSubmit={submit}><div className="form-grid"><div className="field"><label htmlFor="name">Full name</label><input id="name" required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="First and last name" /></div><div className="field"><label htmlFor="company">Company</label><input id="company" required value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="Company or team" /></div><div className="field"><label htmlFor="email">Email address</label><input id="email" required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@company.com" /></div><div className="field"><label htmlFor="phone">Phone</label><input id="phone" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+1 (000) 000-0000" /></div><div className="field"><label htmlFor="quantity">Quantity required</label><input id="quantity" value={form.quantity} onChange={(e) => update('quantity', e.target.value)} placeholder="e.g. 25 panels" /></div><div className="field"><label htmlFor="timeline">Delivery timeline</label><input id="timeline" value={form.timeline} onChange={(e) => update('timeline', e.target.value)} placeholder="Target date or lead time" /></div><div className="field full"><label htmlFor="project">Panel type</label><select id="project" required value={form.project} onChange={(e) => update('project', e.target.value)}><option value="" disabled>Select an option</option><option value="plc">PLC control panel</option><option value="motor">Motor control panel</option><option value="vfd">VFD control panel</option><option value="hmi">HMI / operator interface</option><option value="power">Power distribution</option><option value="other">Other project</option></select></div><div className="field full"><label htmlFor="testing">Special testing / certification</label><input id="testing" value={form.testing} onChange={(e) => update('testing', e.target.value)} placeholder="Testing, FAT, or certification needs" /></div><div className="field full"><label htmlFor="details">Project description</label><textarea id="details" required value={form.details} onChange={(e) => update('details', e.target.value)} placeholder="Tell us about the application, controls, voltage, or other requirements." /></div></div><button type="submit" className="button-primary form-submit">Submit Project Brief <ArrowRight size={15} /></button></form>}</div></div></section><section className="section"><div className="container-wide"><div className="section-header"><div><div className="eyebrow">Frequently asked questions</div><h2 className="section-title display">Clear answers,<br /><span style={{ color: 'hsl(var(--primary))' }}>right away.</span></h2></div></div><div className="faq-grid">{[['What do you need for a quote?','Drawings, a bill of materials, panel layout, quantities, and timing help us quote accurately. A project description is enough to start.'],['Can you build from customer drawings?','Yes. Build-to-print manufacturing is a core WETS AI capability.'],['Do you support prototype and production builds?','Yes. We support prototypes, pilot runs, repeat orders, and high-volume production.'],['Do you ship throughout North America?','We support customers across the United States and Canada.']].map(([q,a]) => <article className="feature-panel" key={q}><h3>{q}</h3><p>{a}</p></article>)}</div></div></section></main></Shell>;
}
function Router() {
  return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home} /><Route path="/about" component={About} /><Route path="/control-panel" component={ControlPanel} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;