import { useState, type FormEvent, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowDown, ArrowRight, Check, ShieldCheck, Layers3, Headphones, Mail, ChevronRight, Cloud, Shield, Monitor, Users, Database, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { processSteps, differentiators } from '@/data/services';
import heroImage from '@/assets/enterprise-infrastructure.jpg';
import portfolio from '@/assets/portfolio.pdf.asset.json';
export const serviceIcons = [Shield, Cloud, Monitor, Users, Database, Workflow] as const;
export const paths = ['/services/cybersecurity', '/services/cloud-infrastructure', '/services/managed-it', '/services/workspace-collaboration', '/services/data-protection-compliance', '/services/it-consulting-deployment'] as const;
export function Breadcrumb({ title }: { title?: string }) {
 return <div className="page-wrap breadcrumb"><Link to="/services">Home</Link><ChevronRight size={11}/>{title ? <><Link to="/services">Services</Link><ChevronRight size={11}/><span className="text-foreground">{title}</span></> : <span className="text-foreground">Our Services</span>}</div>;
}
export function Consultation({ children = 'Talk to an Expert', service = 'Enterprise IT Services', plan, variant = 'default', size = 'lg' }: { children?: ReactNode; service?: string; plan?: string; variant?: 'default' | 'outline' | 'hero' | 'heroOutline'; size?: 'default' | 'lg' }) {
 const [open, setOpen] = useState(false);
 const [draft, setDraft] = useState<string | null>(null);
 function prepareEmail(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const body = `Hello XorvoTech,\n\nI would like to discuss ${service}${plan ? ` — ${plan}` : ''}.\n\nName: ${form.get('name')}\nWork email: ${form.get('email')}\nCompany: ${form.get('company')}\n\nRequirements:\n${form.get('message')}\n`;
  setDraft(`mailto:sales@xorvotech.com?subject=${encodeURIComponent(`Consultation request: ${service}${plan ? ` — ${plan}` : ''}`)}&body=${encodeURIComponent(body)}`);
 }
 return <><Button size={size} variant={variant} onClick={() => { setDraft(null); setOpen(true); }}>{children}<ArrowRight size={16}/></Button>
 <Dialog open={open} onOpenChange={setOpen}><DialogContent className="max-w-lg"><DialogTitle>{draft ? 'Your consultation email is ready' : 'Let’s talk about your business'}</DialogTitle><DialogDescription>{draft ? 'Open your email app to review and send your request to sales@xorvotech.com. Nothing has been sent yet.' : `Discuss ${service}${plan ? ` · ${plan}` : ''} with the XorvoTech team.`}</DialogDescription>
 {draft ? <div className="grid gap-4"><Button asChild size="lg"><a href={draft}><Mail/>Open Email App</a></Button><a className="text-sm text-primary" href="tel:+919569789495">Or call +91 95697 89495</a></div> : <form onSubmit={prepareEmail} className="consult-form"><label>Your name<input name="name" autoComplete="name" required placeholder="Full name"/></label><label>Work email<input type="email" name="email" autoComplete="email" required placeholder="you@company.com"/></label><label>Company<input name="company" autoComplete="organization" required placeholder="Company name"/></label><label>What would you like to achieve?<textarea name="message" rows={3} required placeholder="Tell us about your priorities"/></label><Button type="submit" size="lg">Prepare Consultation Email<ArrowRight/></Button><p className="text-xs leading-relaxed text-muted-foreground">Your details are used only to prepare an email on your device.</p></form>}
 </DialogContent></Dialog></>;
}
export function Hero({ title, description, eyebrow = 'One partner. Many possibilities.', overview = false }: { title: string; description: string; eyebrow?: string; overview?: boolean }) {
 return <section className="hero"><img src={heroImage} className="hero-image" width={1920} height={1024} alt="Modern enterprise data centre infrastructure" fetchPriority="high"/><div className="page-wrap hero-content"><div className="eyebrow">{eyebrow}</div>{overview ? <h1>Enterprise IT services.<br/><span>Built around your business.</span></h1> : <h1>{title}</h1>}<p className="hero-description">{description}</p><div className="mt-7 flex flex-wrap gap-3"><Consultation variant="hero" service={overview ? 'Enterprise IT Services' : title}/>{overview ? <Button asChild variant="heroOutline" size="lg"><a href="#service-catalogue">Explore Our Services<ArrowDown size={15}/></a></Button> : <Button asChild variant="heroOutline" size="lg"><a href="#plans">Explore Plans<ArrowDown size={15}/></a></Button>}</div><div className="hero-proof"><span><ShieldCheck/>ISO 9001:2015 Certified</span><span><Layers3/>Leading OEM Partnerships</span><span><Headphones/>24×7 NOC & Managed IT</span></div></div></section>;
}
export function PartnerBand() {
 return <section className="partner-band" aria-label="Technology partners"><div className="page-wrap partner-row"><div className="partner-label">Powered by a trusted<br/>technology ecosystem</div><div className="partners"><span className="partner-name"><span className="microsoft-mark"><i/><i/><i/><i/></span>Microsoft</span><span className="partner-name">FORTINET</span><span className="partner-name">CROWDSTRIKE</span><span className="partner-name">sophos</span><span className="partner-name">ZOHO</span><span className="partner-name">aws</span></div></div></section>;
}
export function Process() {
  return <section className="bg-muted"><div className="page-wrap section"><div className="section-kicker">Our approach</div><h2 className="section-title">Expertise at every stage. Ownership all the way.</h2><p className="text-sm text-muted-foreground">From the first conversation to ongoing support, we move forward with you.</p><div className="process-grid">{processSteps.map((step, i) => <div key={step.title}><div className="process-number">0{i + 1}</div><h3>{step.title}</h3><p>{step.description}</p><div className="process-deliverables">{step.deliverables.map(item => <span key={item}><Check size={13}/>{item}</span>)}</div></div>)}</div></div></section>;
}
export function Differentiators() {
  const icons = [Layers3, ShieldCheck, Headphones];
  const items = differentiators.map((item, index) => ({ ...item, icon: icons[index] ?? Layers3 }));
 return <section className="page-wrap section"><div className="section-kicker">The XorvoTech advantage</div><h2 className="section-title">A technology partner. Not just a provider.</h2><div className="differentiators">{items.map(item => <div key={item.title}><item.icon/><h3>{item.title}</h3><p>{item.description}</p></div>)}</div></section>;
}
export function Closing({ service }: { service?: string }) {
 return <section className="closing"><div className="page-wrap closing-inner"><div><div className="eyebrow mb-4">Let’s move your business forward</div><h2>Ready for technology that works for you?</h2><p>Tell us what’s next. We’ll help you build the right way forward.</p></div><Consultation service={service ?? 'Enterprise IT Services'} variant="hero">Schedule a Consultation</Consultation></div></section>;
}
export function PortfolioLink() { return <Button asChild variant="link" className="px-0"><a href={portfolio.url} target="_blank" rel="noreferrer">View solutions portfolio<ArrowRight/></a></Button>; }
export function FeatureList({ features }: { features: string[] }) { return <ul className="feature-list">{features.map(feature => <li key={feature}><Check/><span>{feature}</span></li>)}</ul>; }
