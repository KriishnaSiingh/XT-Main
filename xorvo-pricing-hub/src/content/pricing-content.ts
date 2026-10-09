export type PricingPlan = {
  name: string;
  badge: string;
  tagline: string;
  price: string;
  range: string;
  features: string[];
  footnote?: string;
  cta: string;
  featured?: boolean;
};

export const pricingContent = {
  hero: {
    eyebrow: "Pricing",
    title: "Simple, Transparent Pricing for IT That Just Works",
    description:
      "Whether you need a fully outsourced IT department, day-to-day helpdesk support, or business email and productivity licensing — Xorvo has a plan that fits. No hidden fees, no long onboarding calls required to see a price.",
    helper: "All prices are per user, per month, in INR, and exclude GST ([GST_RATE]) unless stated otherwise.",
  },
  managed: {
    eyebrow: "Managed IT Services",
    title: "Your IT Team, Without the Cost of a Full-Time IT Department",
    description:
      "Xorvo provides proactive IT management, helpdesk support, monitoring, patching, security, and infrastructure operations — so your technology works reliably without you having to manage it yourself. Choose the level of coverage that matches how your business runs today, and scale up as you grow.",
    plans: [
      {
        name: "Essential IT",
        badge: "Starter",
        tagline: "For small businesses that don't have (or need) an internal IT team yet.",
        price: "Starting at ₹699",
        range: "Range: ₹699–₹999/user/month depending on user count and environment",
        cta: "Get a Custom Quote",
        features: ["Helpdesk support (remote)", "Endpoint monitoring (CPU, RAM, disk, services)", "Basic patch management", "Hardware & software inventory", "User support", "Monthly summary report"],
      },
      {
        name: "Managed IT",
        badge: "Most Popular",
        tagline: "For growing businesses that need proactive monitoring, not just reactive support.",
        price: "Starting at ₹1,199",
        range: "Range: ₹1,199–₹1,799/user/month depending on user count and environment",
        cta: "Get a Custom Quote",
        featured: true,
        features: ["Everything in Essential IT", "Advanced remote monitoring & management (RMM)", "Full patch management", "Software management", "Server monitoring", "Network monitoring", "Microsoft 365 administration", "User onboarding / offboarding", "Security monitoring", "Backup monitoring", "Monthly IT report", "Vendor coordination"],
      },
      {
        name: "Managed IT + Security",
        badge: "Best for Compliance-Conscious Teams",
        tagline: "Outsourced IT plus active cybersecurity — one bill, one team.",
        price: "Starting at ₹1,999",
        range: "Range: ₹1,999–₹2,999/user/month depending on user count and environment",
        cta: "Get a Custom Quote",
        features: ["Everything in Managed IT", "Endpoint security management", "EDR/XDR management", "Security alerts & monitoring", "Vulnerability management", "IT reporting (security-inclusive)", "Vendor management", "Security review"],
        footnote: "OEM security/antivirus licensing (e.g. CrowdStrike, Sophos, Bitdefender) may be billed separately based on the vendor you choose.",
      },
      {
        name: "Fully Managed IT",
        badge: "Enterprise",
        tagline: "For companies with no internal IT department — Xorvo runs it all.",
        price: "Custom Quotation",
        range: "Typical range: ₹2,999–₹4,999+/user/month, scoped to your environment",
        cta: "Talk to Our Team",
        features: ["Everything above", "Complete IT administration (Microsoft 365, network, firewall, servers, endpoints, security, backup)", "Vendor coordination & IT procurement", "IT asset management", "IT documentation", "Strategic IT review", "Dedicated/assigned IT resource where applicable"],
      },
    ] satisfies PricingPlan[],
  },
  comparison: [
    ["Helpdesk & remote support", "✓", "✓", "✓", "✓"],
    ["Endpoint monitoring (RMM)", "Basic", "Advanced", "Advanced", "Advanced"],
    ["Patch management", "Basic", "Full", "Full", "Full"],
    ["Server monitoring", "—", "✓", "✓", "✓"],
    ["Network monitoring (NOC)", "—", "✓", "✓", "✓"],
    ["Microsoft 365 administration", "—", "✓", "✓", "✓"],
    ["Security monitoring", "—", "Basic", "Advanced (EDR/XDR)", "Advanced (EDR/XDR)"],
    ["Vulnerability management", "—", "—", "✓", "✓"],
    ["Backup monitoring", "—", "✓", "✓", "✓"],
    ["Vendor coordination", "—", "✓", "✓", "✓"],
    ["IT asset management", "—", "—", "—", "✓"],
    ["IT procurement & documentation", "—", "—", "—", "✓"],
    ["Dedicated IT resource", "—", "—", "—", "Available"],
    ["Reporting", "Monthly", "Monthly", "Monthly (security-inclusive)", "Monthly + strategic review"],
  ],
  services: [
    ["IT Helpdesk & User Support", "Your team contacts our helpdesk for laptop, software, email, printer, Wi-Fi, VPN, and account issues — we handle it end to end."],
    ["Remote Monitoring & Management (RMM)", "Continuous monitoring of CPU, RAM, disk, services, and network connectivity so issues are caught before employees notice them."],
    ["Patch Management", "Centralized patching of Windows, Microsoft security updates, browsers, and third-party apps, from assessment through deployment and reporting."],
    ["NOC — Network Operations Centre", "Round-the-clock monitoring of your internet, firewalls, routers, switches, Wi-Fi, servers, and VPN, with SLA-based escalation."],
    ["Server Monitoring & Management", "Coverage for Windows servers, application servers, and cloud servers (Azure, AWS, and other environments)."],
    ["Endpoint Management", "Centralized management of employee devices: inventory, remote support, software deployment, patching, and policy management."],
    ["Antivirus / EDR Management", "Deployment and monitoring of leading security platforms (Microsoft Defender, Bitdefender, CrowdStrike, Sophos, Kaspersky, and more), including incident escalation and renewal management."],
    ["Microsoft 365 Management", "Full administration of Exchange Online, Outlook, Teams, SharePoint, OneDrive, Intune, Entra ID, MFA, and Conditional Access — including new-user onboarding, from account creation through device setup."],
    ["IT Asset Management", "A live inventory of your hardware (laptops, servers, printers, network gear) and software (licenses, OS, applications)."],
    ["Software Management", "Installation, removal, updates, and license tracking for approved business applications."],
    ["Remote Desktop Support", "Fast remote troubleshooting for Outlook, Office, applications, printers, Windows, and network/configuration issues — no on-site visit required."],
    ["IT Automation", "Repetitive tasks (temp file cleanup, service restarts, patch installs, script runs, disk checks) automated across every device."],
    ["IT Documentation", "A living record of your environment — firewall, ISP, backup solution, Microsoft 365 tenant, servers, devices, and critical applications — kept current for fast troubleshooting."],
    ["IT Reporting", "Monthly reports covering devices, tickets, patch compliance, critical alerts, security issues, and backup status, so you always know what you're paying for."],
    ["Vendor Coordination", "We deal with your ISP, Microsoft, and hardware vendors on your behalf — from raising the ticket to confirming resolution."],
  ],
  zohoPlans: [
    ["Mail Lite", "Startups needing professional email only", "5 GB or 10 GB per user", "₹59 /user/month", "Annual billing only"],
    ["Mail Premium", "Small teams needing more storage & retention", "50 GB + 50 GB retention", "₹75 /user/month ⚠", "Annual billing only"],
    ["Workplace Standard", "Teams needing email + collaboration apps", "30 GB mail + 10 GB WorkDrive", "₹99 /user/month", "₹129 /user/month"],
    ["Workplace Professional", "Full productivity suite for growing companies", "100 GB mail + 100 GB retention + 100 GB WorkDrive/user", "₹399 /user/month", "₹489 /user/month"],
    ["Workplace Enterprise", "Large orgs needing custom SSO, admin & security controls", "Custom", "Contact Us", "Contact Us"],
  ],
  microsoftPlans: [
    ["Microsoft 365 Business Basic (No Teams)", "CFQ7TTC0LH18:000P", "₹130", "₹1,250"],
    ["Microsoft 365 Business Basic (with Teams)", "CFQ7TTC0LH18:0001", "₹165", "₹1,635"],
    ["Microsoft 365 Business Basic + Microsoft 365 Copilot Business", "CFQ7TTC0LH18:0011K ⚠", "₹2,240", "₹22,370"],
  ],
  faqs: [
    ["Is there a minimum number of users?", "[Fill in — e.g., No minimum for software licensing; Managed IT plans typically start at X users.]"],
    ["Can I mix plans — e.g., Managed IT for some staff and Essential IT for others?", "Yes. Managed IT plans and software licensing (Zoho/Microsoft 365) can be mixed and matched per user based on role and need."],
    ["What happens if I need to upgrade or downgrade mid-cycle?", "[Fill in your policy — e.g., Upgrades take effect immediately; downgrades take effect at the next billing cycle.]"],
    ["Are the software licensing prices (Zoho/Microsoft 365) fixed, or can they change?", "These prices are set by Zoho and Microsoft respectively and may change when they update their pricing. Xorvo will notify you in advance of any change affecting your renewal."],
    ["Do you offer a contract, or is it month-to-month?", "[Fill in — e.g., Managed IT plans are billed monthly with no long-term lock-in, or state your actual minimum term.]"],
    ["What's included in support response times?", "[Fill in your SLA — e.g., Critical issues: 1-hour response. Standard issues: 4-hour response, business hours.]"],
  ],
} as const;

export type PricingContent = typeof pricingContent;