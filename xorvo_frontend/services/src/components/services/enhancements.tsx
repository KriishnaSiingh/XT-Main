import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Check, ChevronDown, Compass, Layers3, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { businessPriorities, engagementModels, services, type Service } from '@/data/services';
import { Consultation, paths } from './shared';

export function PriorityExplorer() {
  const [selected, setSelected] = useState(0);
  const priority = businessPriorities[selected];
  if (!priority) return null;
  return <section className="border-b border-border"><div className="page-wrap section">
    <div className="section-kicker">Start with your priority</div><h2 className="section-title">Your goals. A connected solution.</h2>
    <div className="priority-layout">
      <div className="priority-tabs" role="tablist" aria-label="Business priorities">{businessPriorities.map((item, index) => <Button key={item.title} id={`priority-tab-${index}`} role="tab" aria-controls="priority-panel" aria-selected={selected === index} variant={selected === index ? 'filterActive' : 'ghost'} onClick={() => setSelected(index)} onKeyDown={event => { if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); const next = (index + (event.key === 'ArrowDown' ? 1 : -1) + businessPriorities.length) % businessPriorities.length; setSelected(next); document.getElementById(`priority-tab-${next}`)?.focus(); } }} tabIndex={selected === index ? 0 : -1}><span>0{index + 1}</span>{item.title}<ArrowUpRight/></Button>)}</div>
      <div id="priority-panel" role="tabpanel" aria-labelledby={`priority-tab-${selected}`} className="priority-panel"><h3>{priority.heading}</h3><p>{priority.description}</p><ol className="priority-steps">{priority.steps.map(step => <li key={step}><Check size={15}/>{step}</li>)}</ol><div className="priority-links">{priority.services.map(slug => { const index = services.findIndex(service => service.slug === slug); const service = services[index]; const path = paths[index]; return service && path ? <Link key={slug} to={path}>{service.shortTitle}<ArrowUpRight size={14}/></Link> : null; })}</div></div>
    </div>
  </div></section>;
}

export function Engagements() {
  const icons = [Compass, Layers3, Users];
  return <section className="page-wrap section"><div className="section-kicker">How we work together</div><h2 className="section-title">The engagement that fits your team.</h2><div className="engagement-grid">{engagementModels.map((model, index) => { const Icon = icons[index] ?? Compass; return <article className="engagement-item" key={model.title}><Icon size={25}/><div className="engagement-label">{model.bestFor}</div><h3>{model.title}</h3><p>{model.description}</p><Consultation size="default" variant="outline" service={model.title}>Discuss your scope</Consultation></article>; })}</div></section>;
}

export function FaqList({ faqs }: { faqs: Service['faqs'] }) {
  return <div className="faq-list">{faqs.map(faq => <details className="scope-row" key={faq.question}><summary>{faq.question}<ChevronDown className="shrink-0" size={18}/></summary><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{faq.answer}</p></details>)}</div>;
}

export function ServiceOutcomes({ service }: { service: Service }) {
  return <section className="outcomes-band"><div className="page-wrap outcome-grid">{service.outcomes.map((outcome, index) => <div key={outcome.title}><span className="outcome-number">0{index + 1}</span><h2>{outcome.title}</h2><p>{outcome.description}</p></div>)}</div></section>;
}

export function ServiceScenarios({ service }: { service: Service }) {
  return <section id="use-cases" className="page-wrap section scroll-mt-20"><div className="section-kicker">Where we can help</div><h2 className="section-title">Real challenges. A practical way forward.</h2><p className="text-sm text-muted-foreground">Illustrative engagement scenarios, tailored to your environment during discovery.</p><div className="scenario-grid">{service.scenarios.map((scenario, index) => <article key={scenario.title} className="scenario-item"><span className="scenario-number">0{index + 1}</span><h3>{scenario.title}</h3><div className="scenario-label">The challenge</div><p>{scenario.challenge}</p><div className="scenario-label text-primary">Our approach</div><p>{scenario.approach}</p></article>)}</div></section>;
}

export function SectionNavigation() {
  return <nav aria-label="On this service page" className="section-navigation"><div className="page-wrap section-navigation-inner"><span>On this page</span>{[['overview', 'Overview'], ['capabilities', 'Capabilities'], ['use-cases', 'Use cases'], ['plans', 'Plans'], ['deliverables', 'Deliverables'], ['faqs', 'FAQs']].map(([id, label]) => <Button key={id} asChild variant="ghost" size="sm"><a href={`#${id}`}>{label}</a></Button>)}</div></nav>;
}