import {
  ArrowRight,
  Bot,
  Boxes,
  Check,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  CloudCog,
  FileText,
  Headphones,
  Laptop,
  Mail,
  Network,
  PackageSearch,
  RefreshCw,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pricingContent } from "@/content/pricing-content";

const serviceIcons = [Headphones, RefreshCw, Wrench, Network, ServerCog, Laptop, ShieldCheck, CloudCog, PackageSearch, Boxes, Headphones, Bot, FileText, ClipboardList, CircleDollarSign];
const contactHref = "https://www.xorvotech.com/contact";

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="mx-auto mb-12 max-w-3xl text-center">
    <p className="mb-3 text-xs font-bold uppercase text-primary">{eyebrow}</p>
    <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
    {description && <p className="mt-5 text-base leading-7 text-muted-foreground">{description}</p>}
  </div>;
}

function DataTable({ headers, rows }: { headers: string[]; rows: readonly (readonly string[])[] }) {
  return <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
    <table className="w-full min-w-[820px] border-collapse text-left text-sm">
      <thead><tr className="bg-table-head">{headers.map((header) => <th key={header} className="border-b border-border px-5 py-4 font-semibold text-foreground">{header}</th>)}</tr></thead>
      <tbody>{rows.map((row, index) => <tr key={`${row[0]}-${index}`} className="border-b border-border last:border-0 hover:bg-muted/60">{row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`} className={`px-5 py-4 leading-6 ${cellIndex === 0 ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{cell === "✓" ? <CheckCircle2 className="mx-auto size-5 text-success" aria-label="Included" /> : cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

export function PricingPage() {
  const { hero, managed } = pricingContent;
  return <main className="overflow-hidden bg-background">
    <section className="relative border-b border-border bg-hero px-5 pb-20 pt-24 sm:pb-28 sm:pt-32">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1.5 text-xs font-bold uppercase text-primary"><Sparkles className="size-3.5" />{hero.eyebrow}</div>
        <h1 className="text-4xl font-extrabold text-foreground sm:text-6xl">{hero.title}</h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{hero.description}</p>
        <p className="mt-9 text-xs text-muted-foreground">{hero.helper}</p>
      </div>
    </section>

    <section className="px-5 py-20 sm:py-28"><div className="mx-auto max-w-7xl">
      <SectionHeading eyebrow={managed.eyebrow} title={managed.title} description={managed.description} />
      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
        {managed.plans.map((plan) => <article key={plan.name} className={`relative flex flex-col rounded-lg border bg-card p-6 transition-transform duration-300 hover:-translate-y-1 ${plan.featured ? "border-primary shadow-brand" : "border-border shadow-sm"}`}>
          <span className={`mb-5 w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase ${plan.featured ? "bg-primary text-primary-foreground" : "bg-primary-soft text-primary"}`}>{plan.badge}</span>
          <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
          <p className="mt-2 min-h-16 text-sm leading-6 text-muted-foreground">{plan.tagline}</p>
          <div className="my-6 border-y border-border py-5"><p className="text-2xl font-extrabold text-foreground">{plan.price}</p>{plan.price !== "Custom Quotation" && <p className="mt-1 text-xs text-muted-foreground">/user /month</p>}<p className="mt-3 text-xs leading-5 text-muted-foreground">{plan.range}</p></div>
          <ul className="mb-7 flex-1 space-y-3">{plan.features.map((feature) => <li key={feature} className="flex gap-2.5 text-sm leading-5 text-foreground"><Check className="mt-0.5 size-4 shrink-0 text-success" />{feature}</li>)}</ul>
          {plan.footnote && <p className="mb-5 text-xs leading-5 text-muted-foreground">{plan.footnote}</p>}
          <Button asChild variant={plan.featured ? "default" : "outline"} className="w-full"><a href={contactHref}>{plan.cta}<ArrowRight /></a></Button>
        </article>)}
      </div>
    </div></section>

    <section className="bg-section px-5 py-20 sm:py-28"><div className="mx-auto max-w-7xl">
      <SectionHeading eyebrow="Compare Coverage" title="See What Each Plan Includes" description="Compare support, monitoring, security, and strategic coverage across every managed IT tier." />
      <DataTable headers={["Capability", "Essential IT", "Managed IT", "Managed IT + Security", "Fully Managed IT"]} rows={pricingContent.comparison} />
    </div></section>

    <section className="px-5 py-20 sm:py-28"><div className="mx-auto max-w-7xl">
      <SectionHeading eyebrow="Individual Services" title="Need Just One Thing? We Do That Too." description="Not ready for a full managed plan? These services are also available individually or bundled to fit your specific need." />
      <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {pricingContent.services.map(([name, description], index) => { const Icon = serviceIcons[index] ?? Wrench; return <article key={name} className="bg-card p-6 transition-colors hover:bg-primary-soft"><div className="mb-5 flex size-10 items-center justify-center rounded-md bg-primary-soft text-primary"><Icon className="size-5" /></div><h3 className="font-bold text-foreground">{name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p></article>; })}
      </div>
    </div></section>

    <section className="bg-section px-5 py-20 sm:py-28"><div className="mx-auto max-w-7xl">
      <SectionHeading eyebrow="Licensing & Software" title="Business Email & Productivity Suites" description="Xorvo also handles your business email and productivity licensing — Zoho Workplace or Microsoft 365 — so you get one point of contact for procurement, setup, and support." />
      <Tabs defaultValue="zoho" className="w-full"><TabsList className="mx-auto mb-8 grid h-11 w-full max-w-md grid-cols-2"><TabsTrigger value="zoho">Zoho Workplace</TabsTrigger><TabsTrigger value="microsoft">Microsoft 365</TabsTrigger></TabsList>
        <TabsContent value="zoho" className="space-y-6"><DataTable headers={["Plan", "Best for", "Mail Storage", "Billed annually", "Billed monthly"]} rows={pricingContent.zohoPlans} />
          <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]"><div className="rounded-lg border border-border bg-card p-6"><h3 className="font-bold text-foreground">All plans include</h3><ul className="mt-4 grid gap-3 sm:grid-cols-2">{["Custom domain business email", "Webmail + mobile apps (iOS & Android)", "24×7 support (email, chat, call)", "99.9% uptime guarantee", "Migration assistance from your current provider", "Integrated calendar, tasks, and notes"].map(item => <li key={item} className="flex gap-2 text-sm text-muted-foreground"><Check className="size-4 shrink-0 text-success" />{item}</li>)}</ul></div>
          <div className="rounded-lg border border-warning/40 bg-warning-soft p-6"><p className="text-sm leading-6 text-warning-foreground"><strong>Verify before publishing:</strong> The source PDF had a fifth price (₹199) that did not align cleanly with a named plan. Confirm Mail Premium and Workplace Enterprise pricing in the Zoho Partner console.</p></div></div>
          <Accordion type="single" collapsible className="rounded-lg border border-border bg-card px-6"><AccordionItem value="zoho-details" className="border-0"><AccordionTrigger className="text-base">Plan-specific highlights</AccordionTrigger><AccordionContent><ul className="space-y-3 text-sm leading-6 text-muted-foreground"><li><strong className="text-foreground">Mail Lite:</strong> Email only — no Zoho Cliq, Meeting, or WorkDrive.</li><li><strong className="text-foreground">Mail Premium:</strong> Adds email retention/eDiscovery, S/MIME & PGP encryption, and a larger attachment limit.</li><li><strong className="text-foreground">Workplace Standard:</strong> Adds Zoho Cliq, Zoho Meeting, WorkDrive, and Zoho Writer/Sheet/Show.</li><li><strong className="text-foreground">Workplace Professional:</strong> Adds SAML SSO, larger meetings, Zoho Connect, and Zoho Vault.</li></ul></AccordionContent></AccordionItem></Accordion>
        </TabsContent>
        <TabsContent value="microsoft" className="space-y-6"><DataTable headers={["Plan", "SKU ID", "Price per month", "Price per year"]} rows={pricingContent.microsoftPlans} />
          <div className="grid gap-5 lg:grid-cols-3">{[
            ["Business Basic (No Teams)", ["Web and mobile Word, Excel, and PowerPoint", "Business-class email via Exchange Online", "1 TB OneDrive storage per user", "Exchange Online Protection", "Admin center for users, licenses, and devices"]],
            ["Business Basic (with Teams)", ["Everything in Business Basic", "Microsoft Teams chat and video meetings", "SharePoint team sites and document libraries"]],
            ["Business Basic + Copilot", ["Everything in Business Basic", "Copilot in Word, Excel, PowerPoint, and Outlook", "AI-powered drafting, summarizing, and data analysis"]],
          ].map(([title, features]) => <article key={title as string} className="rounded-lg border border-border bg-card p-6"><h3 className="font-bold text-foreground">{title as string}</h3><ul className="mt-4 space-y-3">{(features as string[]).map(feature => <li key={feature} className="flex gap-2 text-sm text-muted-foreground"><Check className="size-4 shrink-0 text-success" />{feature}</li>)}</ul></article>)}</div>
          <div className="rounded-lg border border-warning/40 bg-warning-soft p-6 text-sm leading-6 text-warning-foreground"><strong>Verify before publishing:</strong> Confirm the Copilot bundle SKU suffix (0011K vs 001K) in Microsoft Partner Center. Prices exclude GST ([GST_RATE]) and may change with Microsoft’s published rates.</div>
        </TabsContent>
      </Tabs>
    </div></section>

    <section className="px-5 py-20 sm:py-28"><div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.8fr_1.2fr]">
      <div><p className="mb-3 text-xs font-bold uppercase text-primary">Terms</p><h2 className="text-3xl font-bold text-foreground">Billing & Payment</h2><div className="mt-7 rounded-lg border border-warning/40 bg-warning-soft p-5 text-sm leading-6 text-warning-foreground">These policy values are intentionally marked for confirmation before publishing.</div></div>
      <ul className="divide-y divide-border border-y border-border">{["All prices listed are exclusive of GST. GST is charged at [GST_RATE]% as applicable under Indian tax law.", "Billing cycle: [e.g., Monthly / Quarterly / Annually]", "Payment methods accepted: [e.g., NEFT/RTGS, UPI, Credit/Debit Card]", "Invoice payment terms: [e.g., Due on receipt / Net 7 / Net 15]", "Minimum commitment: [e.g., 3-month minimum on Managed IT plans, if applicable]", "Software licensing is billed [in advance / per vendor terms] and subject to vendor pricing changes."].map(item => <li key={item} className="flex gap-3 py-5 text-sm leading-6 text-muted-foreground"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />{item}</li>)}</ul>
    </div></section>

    <section className="bg-section px-5 py-20 sm:py-28"><div className="mx-auto max-w-4xl"><SectionHeading eyebrow="FAQ" title="Common Pricing Questions" /><Accordion type="single" collapsible className="border-t border-border">{pricingContent.faqs.map(([question, answer], index) => <AccordionItem key={question} value={`faq-${index}`}><AccordionTrigger className="py-6 text-base sm:text-lg">{question}</AccordionTrigger><AccordionContent className="pb-6 text-base leading-7 text-muted-foreground">{answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>

    <section className="bg-cta px-5 py-20 text-center sm:py-24"><div className="mx-auto max-w-3xl"><Mail className="mx-auto mb-6 size-9 text-primary-foreground/80" /><h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">Not Sure Which Plan Fits Your Business?</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-primary-foreground/75">Tell us your team size and what's slowing your IT down — we'll recommend a plan and give you an exact quote, no obligation.</p><Button asChild variant="secondary" size="lg" className="mt-8"><a href={contactHref}>Talk to an IT Expert <ArrowRight /></a></Button><p className="mt-5 text-sm text-primary-foreground/70">or email us at [CONTACT_EMAIL]</p></div></section>
  </main>;
}