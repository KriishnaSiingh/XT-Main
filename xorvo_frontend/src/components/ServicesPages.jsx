import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Shield, Cloud, Monitor, Users, Database, Workflow,
  ArrowRight, ArrowUpRight, ArrowDown, Check,
  ShieldCheck, Layers3, Headphones, ChevronDown, ChevronRight,
  Compass, Grid2X2, List, Mail, X,
} from 'lucide-react';
import {
  services,
  processSteps,
  businessPriorities,
  engagementModels,
  overviewFaqs,
  differentiators,
  servicePaths,
} from '../data/servicesData';
import heroImage from '../assets/enterprise-infrastructure.jpg';
import './ServicesPages.css';

/* ────────────────────────────────────────────────
   Shared icon / path arrays
───────────────────────────────────────────────── */
const serviceIcons = [Shield, Cloud, Monitor, Users, Database, Workflow];

/* ────────────────────────────────────────────────
   Consultation dialog
───────────────────────────────────────────────── */
function Consultation({ children = 'Talk to an Expert', service = 'Enterprise IT Services', plan, variant = 'primary', size = 'lg' }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(null);

  function prepareEmail(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const body = `Hello XorvoTech,\n\nI would like to discuss ${service}${plan ? ` — ${plan}` : ''}.\n\nName: ${form.get('name')}\nWork email: ${form.get('email')}\nCompany: ${form.get('company')}\n\nRequirements:\n${form.get('message')}\n`;
    setDraft(`mailto:sales@xorvotech.com?subject=${encodeURIComponent(`Consultation request: ${service}${plan ? ` — ${plan}` : ''}`)}&body=${encodeURIComponent(body)}`);
  }

  const btnClass = `svc-btn svc-btn-${variant}${size === 'lg' ? '' : ' svc-btn-sm'}`;

  return (
    <>
      <button className={btnClass} onClick={() => { setDraft(null); setOpen(true); }}>
        {children} <ArrowRight size={16} />
      </button>
      {open && (
        <div className="svc-modal-overlay" onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="svc-modal">
            <button className="svc-modal-close" onClick={() => setOpen(false)}><X size={18} /></button>
            <h2>{draft ? 'Your consultation email is ready' : 'Let\'s talk about your business'}</h2>
            <p>{draft ? 'Open your email app to review and send your request to sales@xorvotech.com. Nothing has been sent yet.' : `Discuss ${service}${plan ? ` · ${plan}` : ''} with the XorvoTech team.`}</p>
            {draft ? (
              <div style={{ display: 'grid', gap: 14 }}>
                <a href={draft} className="svc-btn svc-btn-primary" style={{ justifyContent: 'center' }}><Mail size={16} /> Open Email App</a>
                <a style={{ fontSize: 13, color: 'var(--svc-primary)', textAlign: 'center' }} href="tel:+919569789495">Or call +91 95697 89495</a>
              </div>
            ) : (
              <form onSubmit={prepareEmail} className="svc-consult-form">
                <label>Your name <input name="name" autoComplete="name" required placeholder="Full name" /></label>
                <label>Work email <input type="email" name="email" autoComplete="email" required placeholder="you@company.com" /></label>
                <label>Company <input name="company" autoComplete="organization" required placeholder="Company name" /></label>
                <label>What would you like to achieve? <textarea name="message" rows={3} required placeholder="Tell us about your priorities" /></label>
                <button type="submit" className="svc-btn svc-btn-primary">Prepare Consultation Email <ArrowRight size={16} /></button>
                <p style={{ fontSize: 11, color: 'var(--svc-muted-fg)', lineHeight: 1.6 }}>Your details are used only to prepare an email on your device.</p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* ────────────────────────────────────────────────
   Hero
───────────────────────────────────────────────── */
function Hero({ title, description, eyebrow = 'One partner. Many possibilities.', overview = false, service }) {
  return (
    <section className="svc-hero">
      <img src={heroImage} className="svc-hero-image" width={1920} height={1024} alt="Modern enterprise data centre infrastructure" />
      <div className="svc-page-wrap svc-hero-content">
        <div className="svc-eyebrow">{eyebrow}</div>
        {overview ? (
          <h1>Enterprise IT services.<br /><span>Built around your business.</span></h1>
        ) : (
          <h1>{title}</h1>
        )}
        <p className="svc-hero-description">{description}</p>
        <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Consultation variant="primary" service={overview ? 'Enterprise IT Services' : title}>Talk to an Expert</Consultation>
          {overview ? (
            <a href="#service-catalogue" className="svc-btn svc-btn-outline">Explore Our Services <ArrowDown size={15} /></a>
          ) : (
            <a href="#plans" className="svc-btn svc-btn-outline">Explore Plans <ArrowDown size={15} /></a>
          )}
        </div>
        <div className="svc-hero-proof">
          <span><ShieldCheck size={14} />ISO 9001:2015 Certified</span>
          <span><Layers3 size={14} />Leading OEM Partnerships</span>
          <span><Headphones size={14} />24×7 NOC &amp; Managed IT</span>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   Partner band
───────────────────────────────────────────────── */
function PartnerBand() {
  return (
    <section className="svc-partner-band">
      <div className="svc-page-wrap svc-partner-row">
        <div className="svc-partner-label">Powered by a trusted<br />technology ecosystem</div>
        <div className="svc-partners">
          <span className="svc-partner-name"><span className="svc-microsoft-mark"><i /><i /><i /><i /></span>Microsoft</span>
          <span className="svc-partner-name">FORTINET</span>
          <span className="svc-partner-name">CROWDSTRIKE</span>
          <span className="svc-partner-name">sophos</span>
          <span className="svc-partner-name">ZOHO</span>
          <span className="svc-partner-name">aws</span>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   Process
───────────────────────────────────────────────── */
function Process() {
  return (
    <section className="svc-bg-muted">
      <div className="svc-page-wrap svc-section">
        <div className="svc-section-kicker">Our approach</div>
        <h2 className="svc-section-title">Expertise at every stage. Ownership all the way.</h2>
        <p style={{ fontSize: 13, color: 'var(--svc-muted-fg)' }}>From the first conversation to ongoing support, we move forward with you.</p>
        <div className="svc-process-grid">
          {processSteps.map((step, i) => (
            <div key={step.title}>
              <div className="svc-process-number">0{i + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <div className="svc-process-deliverables">
                {step.deliverables.map(item => (
                  <span key={item}><Check size={13} />{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   Differentiators
───────────────────────────────────────────────── */
function Differentiators() {
  const icons = [Layers3, ShieldCheck, Headphones];
  return (
    <section className="svc-page-wrap svc-section">
      <div className="svc-section-kicker">The XorvoTech advantage</div>
      <h2 className="svc-section-title">A technology partner. Not just a provider.</h2>
      <div className="svc-differentiators">
        {differentiators.map((item, i) => {
          const Icon = icons[i] ?? Layers3;
          return (
            <div key={item.title}>
              <Icon />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   Closing CTA
───────────────────────────────────────────────── */
function Closing({ service }) {
  return (
    <section className="svc-closing">
      <div className="svc-page-wrap svc-closing-inner">
        <div>
          <div className="svc-eyebrow" style={{ marginBottom: 16, color: 'var(--svc-hero-muted)' }}>Let's move your business forward</div>
          <h2>Ready for technology that works for you?</h2>
          <p>Tell us what's next. We'll help you build the right way forward.</p>
        </div>
        <Consultation service={service ?? 'Enterprise IT Services'} variant="primary">Schedule a Consultation</Consultation>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   FAQ list
───────────────────────────────────────────────── */
function FaqList({ faqs }) {
  return (
    <div>
      {faqs.map(faq => (
        <details className="svc-scope-row svc-faq-row" key={faq.question}>
          <summary>{faq.question} <ChevronDown className="shrink-0" size={18} /></summary>
          <p style={{ marginTop: 16, maxWidth: 760, fontSize: 13, lineHeight: 1.8, color: 'var(--svc-muted-fg)' }}>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────
   Feature list
───────────────────────────────────────────────── */
function FeatureList({ features }) {
  return (
    <ul className="svc-feature-list">
      {features.map(f => (
        <li key={f}><Check size={13} /><span>{f}</span></li>
      ))}
    </ul>
  );
}

/* ────────────────────────────────────────────────
   Priority explorer
───────────────────────────────────────────────── */
function PriorityExplorer() {
  const [selected, setSelected] = useState(0);
  const priority = businessPriorities[selected];
  if (!priority) return null;
  return (
    <section style={{ borderBottom: '1px solid var(--svc-border)' }}>
      <div className="svc-page-wrap svc-section">
        <div className="svc-section-kicker">Start with your priority</div>
        <h2 className="svc-section-title">Your goals. A connected solution.</h2>
        <div className="svc-priority-layout">
          <div className="svc-priority-tabs" role="tablist" aria-label="Business priorities">
            {businessPriorities.map((item, index) => (
              <button
                key={item.title}
                id={`priority-tab-${index}`}
                role="tab"
                aria-controls="priority-panel"
                aria-selected={selected === index}
                className={`svc-priority-tab ${selected === index ? 'svc-priority-tab-active' : 'svc-priority-tab-inactive'}`}
                onClick={() => setSelected(index)}
                tabIndex={selected === index ? 0 : -1}
              >
                <span>0{index + 1}</span>{item.title}<ArrowUpRight size={14} />
              </button>
            ))}
          </div>
          <div id="priority-panel" role="tabpanel" aria-labelledby={`priority-tab-${selected}`} className="svc-priority-panel">
            <h3>{priority.heading}</h3>
            <p>{priority.description}</p>
            <ol className="svc-priority-steps">
              {priority.steps.map(step => (
                <li key={step}><Check size={15} />{step}</li>
              ))}
            </ol>
            <div className="svc-priority-links">
              {priority.services.map(slug => {
                const index = services.findIndex(s => s.slug === slug);
                const svc = services[index];
                const path = servicePaths[index];
                return svc && path ? (
                  <Link key={slug} to={path}>{svc.shortTitle}<ArrowUpRight size={14} /></Link>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   Engagements
───────────────────────────────────────────────── */
function Engagements() {
  const icons = [Compass, Layers3, Users];
  return (
    <section className="svc-page-wrap svc-section">
      <div className="svc-section-kicker">How we work together</div>
      <h2 className="svc-section-title">The engagement that fits your team.</h2>
      <div className="svc-engagement-grid">
        {engagementModels.map((model, i) => {
          const Icon = icons[i] ?? Compass;
          return (
            <article className="svc-engagement-item" key={model.title}>
              <Icon size={25} />
              <div className="svc-engagement-label">{model.bestFor}</div>
              <h3>{model.title}</h3>
              <p>{model.description}</p>
              <Consultation size="default" variant="outline-dark" service={model.title}>Discuss your scope</Consultation>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   SERVICES OVERVIEW PAGE
───────────────────────────────────────────────── */
export function ServicesNewOverview() {
  const [view, setView] = useState('grid');

  return (
    <div className="xrv-services">
      {/* Breadcrumb */}
      <div className="svc-breadcrumb">
        <Link to="/">Home</Link><ChevronRight size={11} />
        <span style={{ color: 'var(--svc-fg)' }}>Our Services</span>
      </div>

      <Hero
        overview
        title="Enterprise IT Services"
        description="Secure your operations. Empower your people. Scale with confidence. XorvoTech brings your entire technology lifecycle together — so you can focus on what's next."
      />
      <PartnerBand />
      <PriorityExplorer />

      {/* Service catalogue */}
      <section id="service-catalogue" style={{ scrollMarginTop: 24 }}>
        <div className="svc-page-wrap svc-section">
          <div className="svc-section-heading">
            <div style={{ minWidth: 0 }}>
              <div className="svc-section-kicker">What we do</div>
              <h2>One ecosystem. Every IT need.</h2>
              <p>From protecting your digital assets to transforming the way you work,<br className="hidden-sm" /> our services are built to solve real business challenges.</p>
            </div>
            <div className="svc-filter-control" aria-label="Service view">
              <button
                className={`svc-btn-filter ${view === 'grid' ? 'svc-btn-filter-active' : ''}`}
                onClick={() => setView('grid')}
                aria-pressed={view === 'grid'}
              ><Grid2X2 size={14} />Overview</button>
              <button
                className={`svc-btn-filter ${view === 'list' ? 'svc-btn-filter-active' : ''}`}
                onClick={() => setView('list')}
                aria-pressed={view === 'list'}
              ><List size={14} />All Capabilities</button>
            </div>
          </div>

          <div className={view === 'grid' ? 'svc-grid' : 'svc-directory'}>
            {services.map((service, index) => {
              const Icon = serviceIcons[index] ?? serviceIcons[0];
              const path = servicePaths[index] ?? servicePaths[0];
              return (
                <Link to={path} key={service.slug} className="svc-card">
                  <div className="svc-card-top">
                    <div className="svc-card-icon"><Icon size={23} strokeWidth={1.6} /></div>
                    <span className="svc-category">{service.category}</span>
                  </div>
                  <h3>{service.shortTitle}</h3>
                  <p>{service.summary}</p>
                  {view === 'grid' ? (
                    <div className="svc-card-tags">
                      {service.capabilities.slice(0, 3).map(cap => (
                        <span key={cap.title}>{cap.title}</span>
                      ))}
                    </div>
                  ) : (
                    <div className="svc-dir-capabilities">
                      {service.capabilities.map(cap => (
                        <span key={cap.title}>{cap.title}<small>{cap.description}</small></span>
                      ))}
                    </div>
                  )}
                  <div className="svc-card-link">
                    Explore {index === 3 ? 'Workspace Solutions' : `${service.shortTitle} Services`}
                    <ArrowUpRight size={16} />
                  </div>
                </Link>
              );
            })}
          </div>

          <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, fontSize: 12, color: 'var(--svc-muted-fg)' }}>
            <span>Designed for your business. Delivered by XorvoTech.</span>
            <a
              href="https://xorvotech.com/portfolio"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--svc-primary)', fontWeight: 700, fontSize: 12, textDecoration: 'none' }}
            >
              View solutions portfolio <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      <Process />
      <Engagements />
      <Differentiators />

      <section className="svc-bg-muted">
        <div className="svc-page-wrap svc-section">
          <div className="svc-section-kicker">Frequently asked questions</div>
          <h2 className="svc-section-title">A clearer starting point.</h2>
          <FaqList faqs={overviewFaqs} />
        </div>
      </section>

      <Closing />
    </div>
  );
}

/* ────────────────────────────────────────────────
   SECTION NAVIGATION (sticky, detail pages)
───────────────────────────────────────────────── */
function SectionNavigation() {
  const links = [
    ['overview', 'Overview'],
    ['capabilities', 'Capabilities'],
    ['use-cases', 'Use cases'],
    ['plans', 'Plans'],
    ['deliverables', 'Deliverables'],
    ['faqs', 'FAQs'],
  ];
  return (
    <nav aria-label="On this service page" className="svc-section-nav">
      <div className="svc-page-wrap svc-section-nav-inner">
        <span>On this page</span>
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`}>{label}</a>
        ))}
      </div>
    </nav>
  );
}

/* ────────────────────────────────────────────────
   SERVICE DETAIL PAGE
───────────────────────────────────────────────── */
export function ServiceDetailPage({ service }) {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="xrv-services">
      {/* Breadcrumb */}
      <div className="svc-breadcrumb">
        <Link to="/">Home</Link><ChevronRight size={11} />
        <Link to="/services">Services</Link><ChevronRight size={11} />
        <span style={{ color: 'var(--svc-fg)' }}>{service.title}</span>
      </div>

      <Hero
        title={service.title}
        eyebrow={`XorvoTech · ${service.category}`}
        description={`${service.headline} ${service.summary}`}
      />

      <SectionNavigation />

      {/* Outcomes band */}
      <section className="svc-outcomes-band">
        <div className="svc-page-wrap svc-outcome-grid">
          {service.outcomes.map((outcome, i) => (
            <div key={outcome.title}>
              <span className="svc-outcome-number">0{i + 1}</span>
              <h2>{outcome.title}</h2>
              <p>{outcome.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Overview */}
      <section id="overview" className="svc-page-wrap svc-section svc-detail-intro" style={{ scrollMarginTop: 80 }}>
        <div>
          <div className="svc-section-kicker">Built for your business</div>
          <h2 className="svc-section-title">{service.headline}</h2>
          <a
            href="https://xorvotech.com/portfolio"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--svc-primary)', fontWeight: 700, fontSize: 12, textDecoration: 'none', marginTop: 8 }}
          >
            View solutions portfolio <ArrowRight size={14} />
          </a>
        </div>
        <div>
          {service.overview.map(para => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="svc-bg-muted" style={{ scrollMarginTop: 80 }}>
        <div className="svc-page-wrap svc-section">
          <div className="svc-section-heading">
            <div>
              <div className="svc-section-kicker">Our capabilities</div>
              <h2>Expertise where it matters.</h2>
              <p>Purpose-built solutions, connected by a clear understanding of your business.</p>
            </div>
          </div>
          <div className="svc-capability-grid">
            {service.capabilities.map(cap => (
              <details className="svc-capability" key={cap.title} open>
                <summary>
                  <ShieldCheck style={{ flexShrink: 0, color: 'var(--svc-primary)' }} size={20} />
                  <h3>{cap.title}</h3>
                  <ChevronDown size={16} />
                </summary>
                <p>{cap.description}</p>
                <FeatureList features={cap.features} />
                <div className="svc-benefit">{cap.benefit}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section id="use-cases" className="svc-page-wrap svc-section" style={{ scrollMarginTop: 80 }}>
        <div className="svc-section-kicker">Where we can help</div>
        <h2 className="svc-section-title">Real challenges. A practical way forward.</h2>
        <p style={{ fontSize: 13, color: 'var(--svc-muted-fg)' }}>Illustrative engagement scenarios, tailored to your environment during discovery.</p>
        <div className="svc-scenario-grid">
          {service.scenarios.map((sc, i) => (
            <article key={sc.title} className="svc-scenario-item">
              <span className="svc-scenario-number">0{i + 1}</span>
              <h3>{sc.title}</h3>
              <div className="svc-scenario-label">The challenge</div>
              <p>{sc.challenge}</p>
              <div className="svc-scenario-label" style={{ color: 'var(--svc-primary)' }}>Our approach</div>
              <p>{sc.approach}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="svc-page-wrap svc-section" style={{ scrollMarginTop: 80 }}>
        <div className="svc-section-heading">
          <div>
            <div className="svc-section-kicker">Plans &amp; pricing</div>
            <h2>The right scope. The right investment.</h2>
            <p>Choose a starting point. We'll tailor the proposal to your environment, users, and priorities.</p>
          </div>
          <div className="svc-filter-control" aria-label="Billing period">
            <button
              className={`svc-btn-filter ${billing === 'monthly' ? 'svc-btn-filter-active' : ''}`}
              onClick={() => setBilling('monthly')}
            >Monthly</button>
            <button
              className={`svc-btn-filter ${billing === 'yearly' ? 'svc-btn-filter-active' : ''}`}
              onClick={() => setBilling('yearly')}
            >Yearly</button>
          </div>
        </div>
        <div className="svc-pricing-grid">
          {service.plans.map(plan => (
            <article key={plan.name} className={`svc-plan-card ${plan.recommended ? 'recommended' : ''}`}>
              {plan.recommended && <span className="svc-popular-badge">Most Popular</span>}
              <h3>{plan.name}</h3>
              <p className="svc-plan-description">{plan.description}</p>
              <span className="svc-plan-audience">
                {plan.name === 'Essential' ? 'Focused needs · a defined foundation' : plan.name === 'Business' ? 'Growing needs · connected management' : 'Complex needs · tailored governance'}
              </span>
              <div className="svc-plan-price">{plan.pricing[billing]}</div>
              <p className="svc-plan-term">{billing === 'monthly' ? 'Monthly engagement · tailored to your scope' : 'Annual engagement · tailored to your scope'}</p>
              <div className="svc-plan-highlight">{plan.highlight}</div>
              <FeatureList features={plan.features} />
              <Consultation
                variant={plan.recommended ? 'primary' : 'outline-dark'}
                service={service.title}
                plan={`${plan.name} (${billing})`}
              >
                {plan.name === 'Enterprise' ? 'Talk to Sales' : 'Get Started'}
              </Consultation>
            </article>
          ))}
        </div>
        <p style={{ marginTop: 24, textAlign: 'center', fontSize: 11, lineHeight: 1.7, color: 'var(--svc-muted-fg)' }}>
          Pricing is provided after assessment. Third-party licences, infrastructure costs, taxes, coverage hours, and SLAs are confirmed in your written proposal.
        </p>
      </section>

      {/* Deliverables */}
      <section id="deliverables" className="svc-border-y svc-bg-muted" style={{ scrollMarginTop: 80 }}>
        <div className="svc-page-wrap svc-section">
          <div className="svc-section-kicker">What's included</div>
          <h2 className="svc-section-title">Clear deliverables. No ambiguity.</h2>
          <p style={{ marginBottom: 20, fontSize: 13, color: 'var(--svc-muted-fg)' }}>The final scope is documented in your statement of work.</p>
          {service.scope.map(scope => (
            <details className="svc-scope-row" key={scope.title}>
              <summary>{scope.title}<ChevronDown size={18} /></summary>
              <ul>
                {scope.items.map(item => <li key={item}>— {item}</li>)}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <Process />
      <Differentiators />

      {/* Tools */}
      <section className="svc-bg-muted">
        <div className="svc-page-wrap svc-section">
          <div className="svc-section-kicker">Technologies &amp; tools</div>
          <h2 className="svc-section-title">Leading platforms. Expert implementation.</h2>
          <p style={{ fontSize: 13, color: 'var(--svc-muted-fg)' }}>Platforms are selected for your needs; product editions and licensing are confirmed during design.</p>
          <div className="svc-tool-list">
            {service.tools.map(tool => <span key={tool}>{tool}</span>)}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="svc-page-wrap svc-section" style={{ scrollMarginTop: 80 }}>
        <div className="svc-section-kicker">Frequently asked questions</div>
        <h2 className="svc-section-title">Before we get started.</h2>
        <FaqList faqs={service.faqs} />
        <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 20, color: 'var(--svc-primary)', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
          Explore all XorvoTech services <ArrowRight size={14} />
        </Link>
      </section>

      <Closing service={service.title} />
    </div>
  );
}

export function ServicesRoute() {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!slug) {
    return <ServicesNewOverview />;
  }

  const service = services.find(s => s.slug === slug);
  if (!service) {
    return <ServicesNewOverview />;
  }

  return <ServiceDetailPage service={service} />;
}

export default ServicesRoute;

