import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { pricingService } from "@/services/pricingService";
import { defaultPricingContent } from "@/content/pricingContent";
import { HeroSection } from "@/components/ui/hero-section-2";

const serviceIcons = [
  Headphones,
  RefreshCw,
  Wrench,
  Network,
  ServerCog,
  Laptop,
  ShieldCheck,
  CloudCog,
  PackageSearch,
  Boxes,
  Headphones,
  Bot,
  FileText,
  ClipboardList,
  CircleDollarSign,
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-primary">{eyebrow}</p>
      <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
      {description && <p className="mt-5 text-base leading-7 text-muted-foreground">{description}</p>}
    </div>
  );
}

function DataTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
      <table className="w-full min-w-[820px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-table-head">
            {headers.map((header) => (
              <th key={header} className="border-b border-border px-5 py-4 font-semibold text-foreground">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row[0]}-${index}`} className="border-b border-border last:border-0 hover:bg-muted/60 transition-colors">
              {row.map((cell, cellIndex) => (
                <td
                  key={`${cell}-${cellIndex}`}
                  className={`px-5 py-4 leading-6 ${
                    cellIndex === 0 ? "font-semibold text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {cell === "✓" ? (
                    <CheckCircle2 className="mx-auto size-5 text-success" aria-label="Included" />
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Pricing() {
  const navigate = useNavigate();
  const [content, setContent] = useState(defaultPricingContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set document title & metadata
    document.title = "Pricing – Managed IT Services, Zoho & Microsoft 365 Plans | Xorvo Tech";
    window.scrollTo(0, 0);

    // Fetch pricing content
    const loadContent = async () => {
      try {
        const data = await pricingService.getPricingContent();
        if (data) {
          setContent(data);
        }
      } catch (e) {
        console.error("Error loading pricing data:", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();

    // Listen for live updates from CMS
    const handleUpdate = (e) => {
      if (e.detail) {
        setContent(e.detail);
      }
    };
    window.addEventListener("pricing-content-updated", handleUpdate);
    return () => window.removeEventListener("pricing-content-updated", handleUpdate);
  }, []);

  const { hero, managed, comparison, services, zohoPlans, microsoftPlans, billingTerms, faqs, cta } = content;

  return (
    <main className="overflow-hidden bg-background text-foreground pt-16 sm:pt-20">
      {/* Hero Section – HeroSection component with framer-motion animations */}
      <HeroSection
        className="min-h-[520px] sm:min-h-[600px]"
        title={
          <>
            {hero.eyebrow}&nbsp;<br className="hidden sm:block" />
            <span className="text-primary">{hero.title.split(',')[0]}</span>
          </>
        }
        subtitle={hero.description}
        callToAction={{
          text: "GET A CUSTOM QUOTE →",
          href: "/?contact=true",
        }}
        backgroundImage="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80"
        contactInfo={{ website: "", phone: "", address: "" }}
      />

      {/* Managed IT Plans Grid */}
      <section id="managed-plans" className="px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow={managed.eyebrow} title={managed.title} description={managed.description} />
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {managed.plans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 ${
                  plan.featured
                    ? "border-primary shadow-brand ring-1 ring-primary/20"
                    : "border-border shadow-sm hover:shadow-md"
                }`}
              >
                <span
                  className={`mb-5 w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                    plan.featured ? "bg-primary text-primary-foreground" : "bg-primary-soft text-primary"
                  }`}
                >
                  {plan.badge}
                </span>
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="mt-2 min-h-14 text-sm leading-6 text-muted-foreground">{plan.tagline}</p>
                <div className="my-6 border-y border-border py-5">
                  <p className="text-2xl font-extrabold text-foreground">{plan.price}</p>
                  {plan.price !== "Custom Quotation" && (
                    <p className="mt-1 text-xs text-muted-foreground">/user /month</p>
                  )}
                  <p className="mt-3 text-xs leading-5 text-muted-foreground">{plan.range}</p>
                </div>
                <ul className="mb-7 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm leading-5 text-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.footnote && <p className="mb-5 text-xs leading-5 text-muted-foreground">{plan.footnote}</p>}
                <Button
                  onClick={() => navigate("/?contact=true")}
                  variant={plan.featured ? "default" : "outline"}
                  className="w-full font-semibold group"
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="size-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Compare Coverage Matrix */}
      <section className="bg-section px-5 py-20 sm:py-28 border-y border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Compare Coverage"
            title="See What Each Plan Includes"
            description="Compare support, monitoring, security, and strategic coverage across every managed IT tier."
          />
          <DataTable
            headers={["Capability", "Essential IT", "Managed IT", "Managed IT + Security", "Fully Managed IT"]}
            rows={comparison || []}
          />
        </div>
      </section>

      {/* Individual Services Grid */}
      <section className="px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Individual Services"
            title="Need Just One Thing? We Do That Too."
            description="Not ready for a full managed plan? These services are also available individually or bundled to fit your specific need."
          />
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {(services || []).map(([name, description], index) => {
              const Icon = serviceIcons[index] ?? Wrench;
              return (
                <article key={name} className="bg-card p-6 transition-colors hover:bg-primary-soft">
                  <div className="mb-5 flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-bold text-foreground text-base">{name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Licensing & Software (Zoho Workplace & Microsoft 365) */}
      <section className="bg-section px-5 py-20 sm:py-28 border-y border-border">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Licensing & Software"
            title="Business Email & Productivity Suites"
            description="Xorvo also handles your business email and productivity licensing — Zoho Workplace or Microsoft 365 — so you get one point of contact for procurement, setup, and support."
          />
          <Tabs defaultValue="zoho" className="w-full">
            <TabsList className="mx-auto mb-8 grid h-12 w-full max-w-md grid-cols-2 bg-muted p-1 rounded-lg">
              <TabsTrigger value="zoho" className="font-semibold text-sm">
                Zoho Workplace
              </TabsTrigger>
              <TabsTrigger value="microsoft" className="font-semibold text-sm">
                Microsoft 365
              </TabsTrigger>
            </TabsList>

            {/* Zoho Tab */}
            <TabsContent value="zoho" className="space-y-6">
              <DataTable
                headers={["Plan", "Best for", "Mail Storage", "Billed annually", "Billed monthly"]}
                rows={zohoPlans || []}
              />
              <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="font-bold text-foreground text-base">All plans include</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      "Custom domain business email",
                      "Webmail + mobile apps (iOS & Android)",
                      "24×7 support (email, chat, call)",
                      "99.9% uptime guarantee",
                      "Migration assistance from your current provider",
                      "Integrated calendar, tasks, and notes",
                    ].map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                        <Check className="size-4 shrink-0 text-success mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/30 p-6 flex flex-col justify-center">
                  <p className="text-sm leading-6 text-amber-900 dark:text-amber-200">
                    <strong>Official Zoho Partner Pricing:</strong> Prices exclude GST (18%) and are subject to official vendor catalogs. Mail Premium and Workplace Enterprise pricing can be further discounted for large volume deployments.
                  </p>
                </div>
              </div>
              <Accordion type="single" collapsible className="rounded-xl border border-border bg-card px-6 shadow-sm">
                <AccordionItem value="zoho-details" className="border-0">
                  <AccordionTrigger className="text-base font-semibold">
                    Plan-specific highlights & feature breakdown
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3 text-sm leading-6 text-muted-foreground pb-4">
                      <li>
                        <strong className="text-foreground">Mail Lite:</strong> Email only — no Zoho Cliq, Meeting, or WorkDrive.
                      </li>
                      <li>
                        <strong className="text-foreground">Mail Premium:</strong> Adds email retention/eDiscovery, S/MIME & PGP encryption, and larger attachment limits.
                      </li>
                      <li>
                        <strong className="text-foreground">Workplace Standard:</strong> Adds Zoho Cliq, Zoho Meeting, WorkDrive, and Zoho Writer/Sheet/Show.
                      </li>
                      <li>
                        <strong className="text-foreground">Workplace Professional:</strong> Adds SAML SSO, larger meetings, Zoho Connect, and Zoho Vault password management.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* Microsoft Tab */}
            <TabsContent value="microsoft" className="space-y-6">
              <DataTable
                headers={["Plan", "SKU ID", "Price per month", "Price per year"]}
                rows={microsoftPlans || []}
              />
              <div className="grid gap-5 lg:grid-cols-3">
                {[
                  [
                    "Business Basic (No Teams)",
                    [
                      "Web and mobile Word, Excel, and PowerPoint",
                      "Business-class email via Exchange Online",
                      "1 TB OneDrive storage per user",
                      "Exchange Online Protection",
                      "Admin center for users, licenses, and devices",
                    ],
                  ],
                  [
                    "Business Basic (with Teams)",
                    [
                      "Everything in Business Basic",
                      "Microsoft Teams chat and video meetings",
                      "SharePoint team sites and document libraries",
                    ],
                  ],
                  [
                    "Business Basic + Copilot",
                    [
                      "Everything in Business Basic",
                      "Copilot in Word, Excel, PowerPoint, and Outlook",
                      "AI-powered drafting, summarizing, and data analysis",
                    ],
                  ],
                ].map(([title, feats]) => (
                  <article key={title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <h3 className="font-bold text-foreground text-base">{title}</h3>
                    <ul className="mt-4 space-y-3">
                      {feats.map((feature) => (
                        <li key={feature} className="flex gap-2 text-sm text-muted-foreground">
                          <Check className="size-4 shrink-0 text-success mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
              <div className="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/30 p-6 text-sm leading-6 text-amber-900 dark:text-amber-200">
                <strong>Microsoft 365 Licensing Notes:</strong> Prices exclude GST (18%) and may adjust with Microsoft's published commercial rates. Enterprise agreements (E3/E5) and standalone Defender/Intune add-ons are also available.
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Billing & Payment Terms */}
      <section className="px-5 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-primary">Terms & Policies</p>
            <h2 className="text-3xl font-bold text-foreground">Billing & Payment Guidelines</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Clear terms for procurement, monthly commitments, invoicing, and tax compliance across India.
            </p>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {(billingTerms || []).map((item) => (
              <li key={item} className="flex gap-3 py-5 text-sm leading-6 text-muted-foreground">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-section px-5 py-20 sm:py-28 border-t border-border">
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
          <Accordion type="single" collapsible className="border-t border-border">
            {(faqs || []).map(([question, answer], index) => (
              <AccordionItem key={question} value={`faq-${index}`}>
                <AccordionTrigger className="py-6 text-left text-base sm:text-lg font-semibold hover:no-underline">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-7 text-muted-foreground">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-cta px-5 py-20 text-center sm:py-24 text-white">
        <div className="mx-auto max-w-3xl">
          <Mail className="mx-auto mb-6 size-10 text-white/80" />
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{cta?.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/80">{cta?.description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => navigate("/?contact=true")}
              variant="hero"
              size="lg"
              className="font-bold text-base px-8 py-3 bg-white text-slate-900 hover:bg-slate-100"
            >
              <span>{cta?.buttonText || "Talk to an IT Expert"}</span>
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </div>
          {cta?.contactEmail && (
            <p className="mt-6 text-sm text-white/70">
              or email us directly at{" "}
              <a href={`mailto:${cta.contactEmail}`} className="underline font-semibold text-white">
                {cta.contactEmail}
              </a>
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
