import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowRight, Check, ChevronRight, CircuitBoard, ClipboardCheck, Factory, FileCheck2, Gauge, Globe2, Mail, MapPin, Menu, Microscope, Phone, ShieldCheck, Sparkles, Wrench, X, Zap } from 'lucide-react';
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
  { href: '/contact', label: 'Request a Quote' },
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
    setProperty('og:site_name', 'Orbit Controls');
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
          <span><span className="brand-word">ORBIT CONTROLS</span><span className="brand-sub">PRECISION / POWER / PROOF</span></span>
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
          <Link href="/" className="brand" data-testid="link-footer-brand"><span className="brand-mark" aria-hidden="true" /><span><span className="brand-word">ORBIT CONTROLS</span><span className="brand-sub">PRECISION / POWER / PROOF</span></span></Link>
          <p className="footer-copy">Custom control panels for the machines that keep North American industry moving.</p>
        </div>
        <div><div className="footer-heading">Navigate</div><div className="footer-links">{navItems.map((item) => <Link key={item.href} href={item.href} data-testid={`link-footer-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}</div></div>
        <div><div className="footer-heading">Capabilities</div><div className="footer-links"><Link href="/control-panel#build">Build-to-print</Link><Link href="/control-panel#engineering">Panel engineering</Link><Link href="/control-panel#testing">Testing & validation</Link></div></div>
        <div><div className="footer-heading">Connect</div><div className="footer-links"><a href="mailto:projects@orbitcontrols.com" data-testid="link-footer-email">projects@orbitcontrols.com</a><a href="tel:+13617650825" data-testid="link-footer-phone">+1 (361) 765-0825</a><span className="muted">North America / Central Time</span></div></div>
      </div>
      <div className="container-wide footer-bottom"><span>© 2026 ORBIT CONTROLS LLC, All rights reserved.</span><span>UL 508A SHOP · BUILT IN THE USA</span></div>
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
      <span className="visual-meta mono">OC / P-0427 / REV 06</span>
      <div className="panel-frame">
        <span className="panel-cap">ORBIT CONTROLS // 480V MCC</span>
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
    <Seo title="Orbit Controls | Custom Control Panels, Built to Run" description="Orbit Controls manufactures custom UL 508A electrical control panels for OEMs, system integrators, and machine builders across North America." />
    <main>
      <section className="hero"><div className="container-wide hero-grid"><div className="hero-copy"><div className="eyebrow">Control panel manufacturing / North America</div><h1><>Custom Control<br />Panel &amp; Industrial<br /><em>Automation</em></></h1><p className="hero-lede">Precision-built electrical control panels for OEMs, system integrators, machine builders, and industrial automation teams across North America.</p><div className="hero-actions"><Link href="/contact" className="button-primary" data-testid="link-hero-quote">Request a Quote <ArrowRight size={15} /></Link><Link href="/control-panel" className="button-secondary" data-testid="link-hero-capabilities">Explore Capabilities <ChevronRight size={15} /></Link></div><div className="hero-note"><span className="pulse-dot" /><span><strong>Shop status:</strong> accepting Q3 production schedules</span></div></div><PanelVisual /></div></section>
      <Ticker />
      <section className="section"><div className="container-wide"><div className="section-header"><div><div className="eyebrow">A better handoff</div><h2 className="section-title display">The panel is where<br />intent becomes <span style={{ color: 'hsl(var(--primary))' }}>motion.</span></h2></div><p className="section-intro">Your machine is only as reliable as the details inside its enclosure. We make those details visible, repeatable, and ready for the field.</p></div><div className="feature-grid"><article className="feature-panel large"><span className="corner-mark">01 / 03</span><div className="feature-kicker"><b>01</b> / CONTROL WITHOUT COMPROMISE</div><h3>One partner from drawing release to dock delivery.</h3><p>We fit into the way your team works—receiving your design intent, making the right questions visible, and returning a tested assembly that is ready for installation.</p><ul className="feature-list"><li><Check size={15} /> UL 508A listed panel shop</li><li><Check size={15} /> Build-to-print and design assist</li><li><Check size={15} /> Complete test documentation</li></ul></article><div className="feature-grid" style={{ gridTemplateColumns: '1fr', gap: '22px' }}><article className="feature-panel"><span className="corner-mark">02 / 03</span><CircuitBoard className="service-icon" size={27} /><h3 style={{ fontSize: 21, marginTop: 22 }}>Built for your architecture.</h3><p>PLC, VFD, safety, motion, and power distribution in one coordinated build.</p></article><article className="feature-panel"><span className="corner-mark">03 / 03</span><ClipboardCheck className="service-icon" size={27} /><h3 style={{ fontSize: 21, marginTop: 22 }}>Proof travels with it.</h3><p>Every shipment leaves with the labels, drawings, and test record your team needs.</p></article></div></div></div></section>
      <section className="section-tight dark-band"><div className="container-wide"><Stats /></div></section>
      <section className="section"><div className="container-wide"><div className="section-header"><div><div className="eyebrow">The Orbit method</div><h2 className="section-title display">A calm process.<br />A precise result.</h2></div><p className="section-intro">No black boxes. No surprises at commissioning. Our four-stage method keeps the work moving and the accountability clear.</p></div><Process /></div></section>
      <section className="section dark-band"><div className="container-wide"><div className="section-header"><div><div className="eyebrow">Industries we serve</div><h2 className="section-title display">Built for<br />real production.</h2></div><p className="section-intro">Manufacturing support for teams building, integrating, operating, and maintaining industrial equipment.</p></div><div className="industry-cloud">{['Original Equipment Manufacturers','System Integrators','Industrial End Users','Manufacturing','Food & Beverage','Packaging','Material Handling','Water & Wastewater','Oil & Gas','Mining','Renewable Energy','Automotive','Pharmaceutical','Chemical Processing'].map((industry) => <span key={industry}>{industry}</span>)}</div></div></section>
      <section className="section"><div className="container-wide"><div className="section-header"><div><div className="eyebrow">Quality you can trust</div><h2 className="section-title display">Proof in every<br />detail.</h2></div><p className="section-intro">Clear checkpoints protect installation quality, documentation accuracy, and commissioning readiness.</p></div><div className="service-grid">{['Accurate Component Installation','Clean Wire Routing','Proper Torque Verification','Electrical Testing','Documentation Review','Final Quality Inspection'].map((item, i) => <article className="service-card" key={item}><span className="card-index">0{i + 1}</span><ShieldCheck className="service-icon" size={24} /><h3>{item}</h3><p>Verified against project documentation before release.</p></article>)}</div></div></section>      <section className="quote-strip blueprint-band"><div className="container-wide"><div className="eyebrow">Bring us the hard part</div><h2 className="display">Tell us what the machine needs to do.</h2><p>Send a drawing, an I/O list, or simply the problem you need solved. We will help define the next right step.</p><Link href="/contact" className="button-primary" data-testid="link-home-contact">Talk to the shop <ArrowRight size={15} /></Link></div></section>
    </main>
  </Shell>;
}

function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy: string }) {
  return <section className="page-intro"><div className="container-wide"><div className="eyebrow">{eyebrow}</div><h1 className="display">{title}</h1><p>{copy}</p></div></section>;
}

function About() {
  return <Shell><Seo title="About Orbit Controls | Manufacturing Excellence" description="Meet Orbit Controls, a disciplined control-panel manufacturing partner for North American OEMs and automation teams." /><main><PageIntro eyebrow="Our standard / Manufacturing excellence" title={<>Precision is a <span style={{ color: 'hsl(var(--primary))' }}>habit.</span></>} copy="We are a control-panel manufacturing partner built for teams who care about what happens after the drawing is released. Our shop brings engineering rigor and hands-on craftsmanship to every build." /><section className="section"><div className="container-wide about-split"><div><div className="eyebrow">The Orbit point of view</div><h2 className="section-title display">Make the invisible<br />work visible.</h2></div><div><p>Good panels do not call attention to themselves. They make a machine predictable: clean wireways, readable labels, serviceable layouts, and a test record that removes doubt.</p><p>Orbit Controls was founded around that simple belief. We pair a practical shop floor with the documentation discipline of a larger integrator, so your team gets a partner that can move quickly without cutting corners.</p><div className="manifesto">“A panel should feel inevitable when you open the door.”</div></div></div></section><section className="section-tight dark-band"><div className="container-wide"><Stats /></div></section><section className="section"><div className="container-wide"><div className="section-header"><div><div className="eyebrow">How we got here</div><h2 className="section-title display">Built by the<br />work itself.</h2></div><p className="section-intro">Our capabilities grew alongside the machines our customers build. Every new standard came from a real field lesson.</p></div><div className="timeline"><div className="timeline-row"><span className="timeline-year">2008</span><h3>Orbit opens its doors</h3><p>A small, focused panel shop begins serving machine builders across the Midwest.</p></div><div className="timeline-row"><span className="timeline-year">2013</span><h3>UL 508A certification</h3><p>Our shop formalizes the documentation and inspection practice that still anchors every build.</p></div><div className="timeline-row"><span className="timeline-year">2019</span><h3>Test lab comes online</h3><p>Dedicated functional testing gives customers a clearer handoff and fewer commissioning hours.</p></div><div className="timeline-row"><span className="timeline-year">Today</span><h3>One connected standard</h3><p>OEMs, integrators, and builders use Orbit as a reliable extension of their production floor.</p></div></div></div></section><section className="section blueprint-band"><div className="container-wide"><div className="about-split"><div><div className="eyebrow">What we protect</div><h2 className="section-title display">Your reputation<br />ships with us.</h2></div><ul className="feature-list" style={{ marginTop: 0 }}><li><ShieldCheck size={17} /> Safety and code compliance</li><li><FileCheck2 size={17} /> Revision-controlled documentation</li><li><Wrench size={17} /> Serviceable, field-ready layouts</li><li><Globe2 size={17} /> Reliable North American support</li></ul></div></div></section></main></Shell>;
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
  return <Shell><Seo title="Control Panel Manufacturing | Orbit Controls" description="Explore Orbit Controls capabilities: custom UL 508A panels, build-to-print manufacturing, automation integration, and tested-before-shipment assemblies." /><main><PageIntro eyebrow="Capabilities / Control panel manufacturing" title={<>The right work,<br /><span style={{ color: 'hsl(var(--primary))' }}>inside the box.</span></>} copy="From a single prototype to a repeatable production run, Orbit Controls brings engineering clarity and shop-floor discipline to the parts your machine cannot do without." /><section className="section-tight" id="build"><div className="container-wide"><div className="service-grid">{services.map((service, i) => <article className="service-card" key={service.title} data-testid={`card-service-${i}`}><span className="card-index">0{i + 1} / 06</span><span className="service-icon">{service.icon}</span><h3>{service.title}</h3><p>{service.copy}</p></article>)}</div></div></section><section className="section" id="engineering"><div className="container-wide capability-layout"><div><div className="eyebrow">Shop intelligence</div><h2 className="section-title display">Details that<br />earn trust.</h2><p className="section-intro" style={{ marginTop: 24 }}>Our build standard is not a thick binder of promises. It is the small, observable decisions made consistently by a team that knows what the field will ask of a panel.</p></div><div className="capability-list"><div className="capability-row"><strong>Enclosures</strong><span>NEMA 1, 3R, 4, 4X, 12, 13 / floor and wall mount</span><ChevronRight size={15} /></div><div className="capability-row"><strong>Voltage</strong><span>120V through 600V / single and three-phase</span><ChevronRight size={15} /></div><div className="capability-row"><strong>Controls</strong><span>Allen-Bradley, Siemens, Schneider, Omron, and open platform</span><ChevronRight size={15} /></div><div className="capability-row"><strong>Documents</strong><span>Schematics, BOMs, panel layouts, labels, test records</span><ChevronRight size={15} /></div><div className="capability-row"><strong>Materials</strong><span>Copper bus, DIN rail, wire duct, ferrules, and rated hardware</span><ChevronRight size={15} /></div></div></div></section><section className="section-tight dark-band" id="testing"><div className="container-wide"><div className="section-header"><div><div className="eyebrow">Before it leaves</div><h2 className="section-title display">Tested is a<br />deliverable.</h2></div><p className="section-intro">A finished panel is more than a neat interior. Our release checks are designed to make the first hour on your floor feel uneventful.</p></div><Process compact /></div></section><section className="quote-strip"><div className="container-wide"><Sparkles size={25} color="hsl(var(--primary))" /><h2 className="display">Have a panel in mind?</h2><p>We can review your current drawings, help scope an assembly, or quote the next build in your production schedule.</p><Link href="/contact" className="button-primary" data-testid="link-capabilities-contact">Request a quote <ArrowRight size={15} /></Link></div></section></main></Shell>;
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', project: '', quantity: '', timeline: '', testing: '', details: '' });
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  return <Shell><Seo title="Contact Orbit Controls | Request a Quote" description="Talk with Orbit Controls about your next custom control panel, build-to-print assembly, or automation project. Request a quote today." /><main><PageIntro eyebrow="Start a conversation / Request a quote" title={<>Let's make the<br /><span style={{ color: 'hsl(var(--primary))' }}>next move.</span></>} copy="Tell us what you are building and where the panel fits. A few details are enough to start—we will follow up with the right questions, not a generic sales script." /><section className="section"><div className="container-wide contact-grid"><div><div className="eyebrow">The shop door is open</div><h2 className="section-title display">Talk to people<br />who build them.</h2><div className="contact-details"><div className="contact-item"><Mail size={17} /><div><small>Email</small><a href="mailto:projects@orbitcontrols.com" data-testid="link-contact-email">projects@orbitcontrols.com</a></div></div><div className="contact-item"><Phone size={17} /><div><small>Phone</small><a href="tel:+13617650825" data-testid="link-contact-phone">+1 (361) 765-0825</a></div></div><div className="contact-item"><MapPin size={17} /><div><small>Shop / Central time</small><span>8614 Fairbanks N Houston Rd, Houston, TX 77064</span></div></div></div><div className="hero-note"><span className="pulse-dot" /><span><strong>Typical response:</strong> within one business day</span></div></div><div className="form-frame">{submitted ? <div className="success-state" data-testid="status-form-success"><Check size={27} /><h3>Request received.</h3><p>Thanks, {form.name || 'there'}. Your project is now in our queue. A member of the Orbit team will reach out within one business day.</p><button type="button" className="button-secondary" onClick={() => { setSubmitted(false); setForm({ name: '', company: '', email: '', phone: '', project: '', quantity: '', timeline: '', testing: '', details: '' }); }} data-testid="button-submit-another">Send another request</button></div> : <form onSubmit={submit}><div className="form-grid"><div className="field"><label htmlFor="name">Your name</label><input id="name" required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="First and last name" data-testid="input-name" /></div><div className="field"><label htmlFor="company">Company</label><input id="company" required value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="Company or team" data-testid="input-company" /></div><div className="field"><label htmlFor="email">Work email</label><input id="email" required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@company.com" data-testid="input-email" /></div><div className="field"><label htmlFor="phone">Phone <span className="muted">(optional)</span></label><input id="phone" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+1 (000) 000-0000" data-testid="input-phone" /></div><div className="field"><label htmlFor="quantity">Quantity required</label><input id="quantity" value={form.quantity} onChange={(e) => update('quantity', e.target.value)} placeholder="e.g. 25 panels" /></div><div className="field"><label htmlFor="timeline">Required delivery timeline</label><input id="timeline" value={form.timeline} onChange={(e) => update('timeline', e.target.value)} placeholder="Target date or lead time" /></div><div className="field full"><label htmlFor="testing">Special testing / certification</label><input id="testing" value={form.testing} onChange={(e) => update('testing', e.target.value)} placeholder="Functional test, documentation, certification needs" /></div><div className="field full"><label htmlFor="project">Project type</label><select id="project" required value={form.project} onChange={(e) => update('project', e.target.value)} data-testid="select-project"><option value="" disabled>Select an option</option><option value="build-to-print">Build-to-print assembly</option><option value="custom-panel">Custom control panel</option><option value="engineering">Engineering / design assist</option><option value="repeat-production">Repeat production run</option><option value="other">Something else</option></select></div><div className="field full"><label htmlFor="details">Project details</label><textarea id="details" required value={form.details} onChange={(e) => update('details', e.target.value)} placeholder="What are you building? Share voltage, quantity, timeline, or anything else useful." data-testid="textarea-details" /></div></div><button type="submit" className="button-primary form-submit" data-testid="button-submit-quote">Submit project brief <ArrowRight size={15} /></button></form>}</div></div></section></main></Shell>;
}

function Router() {
  return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home} /><Route path="/about" component={About} /><Route path="/control-panel" component={ControlPanel} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;