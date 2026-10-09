// Services data for XorvoTech — adapted from services/src/data/services.ts

const capability = (title, description, features, benefit) => ({ title, description, features, benefit });

const plans = (essential, business, enterprise) => [
  { name: 'Essential', description: 'A focused foundation for growing businesses.', features: essential, highlight: 'Build the right foundation', recommended: false, pricing: { monthly: 'Custom quote', yearly: 'Custom quote' } },
  { name: 'Business', description: 'Integrated management for evolving operations.', features: business, highlight: 'A more connected, proactive approach', recommended: true, pricing: { monthly: 'Custom quote', yearly: 'Custom quote' } },
  { name: 'Enterprise', description: 'Tailored coverage for complex environments.', features: enterprise, highlight: 'Designed around your business', recommended: false, pricing: { monthly: 'Custom quote', yearly: 'Custom quote' } },
];

const baseScope = [
  { title: 'Assessment & solution design', items: ['Current-state assessment and business requirements', 'Documented solution architecture and agreed statement of work', 'Licensing, dependencies, and implementation schedule'] },
  { title: 'Implementation & handover', items: ['Configuration and staged rollout', 'Validation against agreed acceptance criteria', 'Administrator documentation and knowledge transfer'] },
  { title: 'Ongoing management & reporting', items: ['Support channels and escalation matrix', 'Service reporting at the agreed cadence', 'Recommendations for continuous improvement'] },
];

const serviceDefinitions = [
  {
    slug: 'cybersecurity', title: 'Cybersecurity Services', shortTitle: 'Cybersecurity', category: 'Protect',
    summary: 'Stay ahead of threats. Protect your people, systems, and reputation with layered security.',
    headline: 'Confidence in every layer of your security.',
    overview: [
      'Modern cyber risks cross endpoints, networks, cloud workloads, and human behaviour. XorvoTech brings these layers together with security architecture, best-fit OEM technologies, and managed operations that align protection with your business priorities.',
      'From a targeted vulnerability assessment to a managed detection programme, we help you understand exposure, prioritise remediation, and strengthen response readiness. Our lifecycle approach covers assessment, licensing, deployment, monitoring, and post-sales support.',
      'Controls and reporting can be mapped to applicable ISO 27001, GDPR, PCI DSS, and HIPAA requirements. Scope is agreed around your obligations; assessment and implementation support do not constitute a guarantee of certification or legal compliance.',
    ],
    capabilities: [
      capability('Network Security', 'Protect the perimeter and connect distributed teams securely.', ['Next-generation firewalls & SD-WAN', 'Network segmentation & VPN configuration', 'Policy review and firewall lifecycle support'], 'Reduce exposure without sacrificing connectivity.'),
      capability('Endpoint Protection', 'Layer prevention and detection across your devices.', ['Endpoint protection, EDR & XDR deployment', 'Device policy configuration', 'Centralised security visibility'], 'Contain device threats before they spread.'),
      capability('Threat Detection & SOC', 'Connect security signals with actionable response.', ['SIEM integration and alert triage', 'Managed detection & threat hunting', 'Incident escalation and investigation'], 'Improve threat visibility and response readiness.'),
      capability('Vulnerability Management', 'Turn technical findings into a prioritised action plan.', ['Vulnerability assessment & penetration testing', 'Risk-ranked findings and remediation guidance', 'Retesting within the agreed scope'], 'Focus resources on the risks that matter most.'),
      capability('Incident Response & Forensics', 'Prepare for incidents and investigate with clarity.', ['Response playbooks and readiness reviews', 'Containment and recovery coordination', 'Digital evidence collection and analysis'], 'Build a coordinated response to disruption.'),
      capability('Email & Web Security', 'Defend the channels your employees use every day.', ['Anti-phishing and email protection', 'Web filtering and malicious content controls', 'Outbound email safeguards'], 'Reduce social engineering and data exposure.'),
      capability('Security Awareness & Training', 'Give employees the confidence to recognise threats.', ['Phishing simulations', 'Role-appropriate awareness sessions', 'Campaign reporting and follow-up training'], 'Create stronger everyday security habits.'),
      capability('Compliance & Audit', 'Align security controls with your regulatory needs.', ['ISO, GDPR, PCI DSS & HIPAA control mapping', 'Gap assessments and evidence preparation', 'Policy and governance advisory'], 'Make audit readiness a repeatable process.'),
    ],
    tools: ['Fortinet', 'CrowdStrike', 'Sophos', 'Bitdefender', 'SonicWall', 'Check Point', 'Rapid7', 'Kaspersky', 'Goldphish', 'VMRay'],
    scope: baseScope,
    plans: plans(
      ['Security posture review', 'Endpoint protection deployment', 'Firewall configuration review', 'Remediation recommendations'],
      ['Everything in Essential', 'EDR/XDR integration', 'Scheduled vulnerability assessments', 'Email security & awareness programme', 'Security reporting and reviews'],
      ['Everything in Business', 'Managed detection & SOC scope', 'Threat hunting & incident response planning', 'Multi-site security architecture', 'Compliance evidence and executive reporting']
    ),
    faqs: [
      { question: 'Can you work with our existing security tools?', answer: 'Yes. We assess your existing platforms and recommend integrations or improvements before proposing replacements. Licensing and compatibility are confirmed during solution design.' },
      { question: 'Is 24x7 security coverage available?', answer: 'Managed detection and response coverage can be scoped for round-the-clock operations. Monitoring coverage, escalation, response responsibilities, and commercial terms are documented in your proposal.' },
      { question: 'What should we prepare for a security assessment?', answer: 'An inventory of systems, existing security products, network diagrams where available, and your key business or audit concerns are a useful starting point. We agree testing permissions, exclusions, and the assessment scope before accessing your environment.' },
      { question: 'How do you handle vulnerability testing on production systems?', answer: 'Testing boundaries, approved windows, contacts, and potential operational risks are agreed in advance. The approach is tailored to the environment; intrusive testing is not assumed or performed without an agreed scope and authorisation.' },
      { question: 'Will you replace all our existing security products?', answer: 'Not by default. We review effectiveness, configuration, compatibility, and licensing first. Recommendations can include better use of current platforms, integrations, or a phased replacement where a gap justifies it.' },
    ],
    outcomes: [
      { title: 'A clearer risk picture', description: 'Connect technical exposure with business impact and a prioritised remediation roadmap.' },
      { title: 'Stronger everyday protection', description: 'Align endpoint, network, identity, and email controls instead of managing isolated tools.' },
      { title: 'Better response readiness', description: 'Define how alerts are investigated, who owns escalation, and what happens during an incident.' },
    ],
    scenarios: [
      { title: 'An expanding attack surface', challenge: 'New devices, remote users, and cloud applications make security ownership harder to track.', approach: 'Review assets and access paths, identify control gaps, and phase in endpoint protection, segmentation, and centralised visibility.' },
      { title: 'Too many disconnected alerts', challenge: 'Security tools generate signals without a consistent investigation or escalation process.', approach: 'Assess log sources and integrations, tune detection policies, and agree triage workflows and incident responsibilities.' },
      { title: 'An upcoming security review', challenge: 'Customers or auditors need evidence that security controls are understood and maintained.', approach: 'Map the relevant requirements to controls, document gaps, and organise a remediation and evidence-preparation programme.' },
    ],
  },
  {
    slug: 'cloud-infrastructure', title: 'Cloud & Infrastructure', shortTitle: 'Cloud & Infrastructure', category: 'Scale',
    summary: 'Build a resilient foundation with cloud platforms and infrastructure designed to grow with you.',
    headline: 'Infrastructure built for your next chapter.',
    overview: [
      'XorvoTech designs, deploys, and manages the infrastructure behind your business. We connect cloud services, on-premises systems, and network operations into an environment that is easier to run, secure, and scale.',
      'Our approach starts with workload requirements, dependencies, availability needs, and cost visibility. Whether you are migrating to AWS or Azure, modernising a network, or deploying a managed VPS, we build a phased plan with clear ownership and validation.',
      'Ongoing monitoring, backup design, and recovery planning help maintain a dependable foundation. Availability targets and recovery objectives are defined for your environment rather than assumed.',
    ],
    capabilities: [
      capability('Cloud Migration', 'Move workloads with a carefully sequenced migration plan.', ['Readiness and dependency assessment', 'AWS/Azure migration and validation', 'Cutover planning and rollback strategy'], 'Modernise with controlled business disruption.'),
      capability('VPS Hosting', 'Provision Windows and Linux environments for your applications.', ['Managed VPS provisioning', 'Security hardening and backup setup', 'Capacity and availability planning'], 'Match hosting resources to real workload needs.'),
      capability('Infrastructure Design', 'Build a reliable network and compute foundation.', ['Switching, routing, firewall & VPN design', 'Server, storage and hardware advisory', 'Capacity planning and architecture documentation'], 'Remove bottlenecks and support future growth.'),
      capability('Hybrid & Multi-Cloud Management', 'Bring distributed infrastructure under consistent control.', ['Hybrid connectivity and access controls', 'Cloud resource governance', 'Usage reviews and cost optimisation'], 'Improve consistency across environments.'),
      capability('Backup & Disaster Recovery', 'Plan recovery around the business impact of downtime.', ['Workload-specific backup policies', 'RPO/RTO definition and recovery runbooks', 'Restore testing and DR exercises'], 'Recover with a plan you can validate.'),
      capability('Infrastructure Monitoring (NOC)', 'Maintain visibility over critical systems.', ['24x7 monitoring options', 'Performance and availability alerting', 'Incident escalation and service reports'], 'Spot operational issues earlier.'),
    ],
    tools: ['AWS', 'Microsoft Azure', 'Google Cloud', 'HP', 'Cisco', 'Aruba', 'MSP360', 'PRTG', 'Site24x7'],
    scope: baseScope,
    plans: plans(
      ['Infrastructure assessment', 'Single-environment setup', 'Baseline monitoring configuration', 'Backup policy design'],
      ['Everything in Essential', 'Cloud migration planning & execution', 'Hybrid infrastructure management', 'Cost optimisation reviews', 'Scheduled recovery validation'],
      ['Everything in Business', 'Multi-cloud and multi-site architecture', '24x7 NOC monitoring scope', 'High-availability and DR design', 'Custom governance & service reporting']
    ),
    faqs: [
      { question: 'Can you manage both cloud and on-premises infrastructure?', answer: 'Yes. Our hybrid approach includes connectivity, access, monitoring, backup, and operational ownership across supported cloud and on-premises systems.' },
      { question: 'Are cloud hosting charges included?', answer: 'Cloud consumption, hardware, third-party licences, and professional services are itemised in your proposal. No usage allowance or hosting cost is assumed in the plan descriptions.' },
      { question: 'How do you choose between cloud and on-premises?', answer: 'We consider application compatibility, connectivity, data location, availability, security, existing investments, and ongoing cost. The recommendation follows your requirements; migrating every workload to the cloud is not assumed to be the best answer.' },
      { question: 'Can migration happen in stages?', answer: 'Yes. Workloads can be grouped by dependency and business criticality, with pilots and validation before later phases. Cutover windows, rollback options, and any expected disruption are documented in the delivery plan.' },
      { question: 'What recovery targets will you provide?', answer: 'Recovery point and recovery time objectives are defined after assessing workload criticality, backup design, dependencies, and budget. A target is not a guarantee; the proposal sets out the test scope and the conditions needed to support it.' },
    ],
    outcomes: [
      { title: 'Room to grow', description: 'Plan compute, storage, and connectivity around actual workload needs and business demand.' },
      { title: 'Operational visibility', description: 'Bring availability, resource usage, and infrastructure ownership into a more consistent view.' },
      { title: 'A recoverable foundation', description: 'Define backup coverage and validate recovery against agreed business objectives.' },
    ],
    scenarios: [
      { title: 'Moving beyond ageing infrastructure', challenge: 'Legacy servers and capacity limits are holding back applications and increasing maintenance effort.', approach: 'Assess workload dependencies, compare cloud and on-premises options, and create a migration sequence with pilot validation and rollback planning.' },
      { title: 'Cloud spending without clear ownership', challenge: 'Resources have grown across teams without consistent usage reviews or governance.', approach: 'Review resource utilisation, ownership, access, and budget visibility, then recommend right-sizing and governance improvements.' },
      { title: 'Recovery that has not been tested', challenge: 'Backups exist, but the team cannot confidently describe the steps to restore a critical service.', approach: 'Agree recovery objectives, document application dependencies, and coordinate scoped restore tests and recovery runbooks.' },
    ],
  },
  {
    slug: 'managed-it', title: 'Managed IT Services', shortTitle: 'Managed IT', category: 'Operate',
    summary: 'Keep your business moving with proactive monitoring, dependable support, and expert IT management.',
    headline: 'Less IT friction. More business momentum.',
    overview: [
      'Your team needs technology that works, not a growing queue of IT issues. XorvoTech combines proactive maintenance, monitoring, helpdesk support, and lifecycle management to keep daily operations running with clear accountability.',
      'We manage supported servers, networks, endpoints, and cloud environments under an agreed scope. A documented onboarding process establishes asset visibility, access controls, escalation paths, and service priorities before ongoing operations begin.',
      'Our managed IT and NOC services can support round-the-clock monitoring while helpdesk coverage and response targets are tailored to your requirements. Regular reporting turns operational data into practical improvement and budgeting decisions.',
    ],
    capabilities: [
      capability('Monitoring & Maintenance', 'Keep supported systems visible and maintained.', ['Server, network and endpoint monitoring', 'Preventive maintenance schedules', 'Alert triage and incident escalation'], 'Move from reactive repairs to proactive care.'),
      capability('Remote Support & Helpdesk', 'Resolve everyday issues wherever employees work.', ['L1/L2 end-user support', 'Remote diagnostics and service requests', 'RMM platform administration'], 'Give employees a reliable route to support.'),
      capability('Asset & Patch Management', 'Keep your technology inventory and updates under control.', ['Hardware and software asset inventory', 'Patch testing and staged deployment', 'Lifecycle and licence reviews'], 'Reduce unmanaged devices and avoidable exposure.'),
      capability('SLA & Reporting', 'Set measurable expectations for your IT service.', ['Agreed priorities and response targets', 'Service reports and review meetings', 'Documented escalation responsibilities'], 'Make service performance transparent.'),
      capability('IT Strategy & Budget Planning', 'Plan investment instead of reacting to surprises.', ['Technology roadmap and risk review', 'Refresh and renewal planning', 'Budget prioritisation and vendor coordination'], 'Connect IT spending with business priorities.'),
    ],
    tools: ['MSP360', 'Atera', 'NinjaOne', 'ManageEngine', 'Site24x7', 'PRTG', 'TSplus', 'IPM+'],
    scope: baseScope,
    plans: plans(
      ['Asset discovery and onboarding', 'Baseline monitoring', 'Scheduled patch management', 'Remote support scope'],
      ['Everything in Essential', 'Proactive maintenance', 'L1/L2 helpdesk coverage', 'Backup oversight', 'Monthly service reviews'],
      ['Everything in Business', '24x7 NOC monitoring scope', 'Multi-location management', 'Custom SLAs and escalation model', 'Strategic roadmap & budget planning']
    ),
    faqs: [
      { question: 'Can managed IT complement our internal team?', answer: 'Yes. Co-managed arrangements define the systems and responsibilities we handle while your team retains ownership of other areas. Shared escalation and reporting are agreed during onboarding.' },
      { question: 'What support hours and response times apply?', answer: 'Coverage windows, incident priorities, and response targets depend on the agreed service scope. These are confirmed in the proposal and service agreement, not implied by a tier name.' },
      { question: 'How does managed IT onboarding work?', answer: 'We first document supported assets, existing issues, access arrangements, and responsibilities. Monitoring and support processes are then configured and validated before the agreed service starts. Unresolved legacy issues and exclusions are made explicit rather than silently absorbed.' },
      { question: 'Is on-site support included?', answer: 'On-site visits, locations, travel, and any dedicated staffing are included only when stated in the proposal. Remote helpdesk, monitoring, and on-site work have distinct coverage arrangements.' },
      { question: 'Who approves patches and system changes?', answer: 'Approval responsibilities and maintenance windows are agreed during onboarding. Changes can follow your existing process, with testing, staged deployment, and exception handling appropriate to the supported systems.' },
    ],
    outcomes: [
      { title: 'Less operational friction', description: 'Give employees a defined support route and reduce recurring issues through preventive maintenance.' },
      { title: 'Clear accountability', description: 'Document asset ownership, support boundaries, incident priorities, and escalation responsibilities.' },
      { title: 'More informed investment', description: 'Use service reviews and lifecycle visibility to prioritise renewals, refreshes, and improvements.' },
    ],
    scenarios: [
      { title: 'A small IT team with a growing workload', challenge: 'Day-to-day tickets and routine maintenance leave little time for strategic projects.', approach: 'Define a co-managed support boundary, establish shared escalation, and take ownership of the agreed monitoring, patching, and helpdesk activities.' },
      { title: 'Support across multiple locations', challenge: 'Offices and remote employees receive inconsistent support and device management.', approach: 'Build an asset baseline, standardise support intake and device policies, and coordinate location-specific dependencies.' },
      { title: 'Recurring problems and limited visibility', challenge: 'Issues are resolved one at a time without a reliable view of underlying causes or asset health.', approach: 'Introduce monitoring, planned maintenance, patch oversight, and service reviews that turn recurring incidents into improvement actions.' },
    ],
  },
  {
    slug: 'workspace-collaboration', title: 'Workspace & Collaboration', shortTitle: 'Workspace & Collaboration', category: 'Empower',
    summary: 'Connect your teams with secure productivity tools, seamless migrations, and simpler collaboration.',
    headline: 'A connected workplace. A stronger team.',
    overview: [
      'Productive teams need secure access to email, documents, and collaboration tools from any location. XorvoTech brings licensing, migration, configuration, and ongoing administration together for a more consistent digital workplace.',
      'We help businesses deploy Microsoft 365, Zoho Workplace, and Google Workspace around their workflows. From mailbox migration to Teams and SharePoint configuration, our approach considers identity, data, user adoption, and operational handover.',
      'Identity controls, SaaS backup, device management, and document productivity solutions help extend collaboration without losing oversight. Platform licences and feature availability are validated against the selected editions.',
    ],
    capabilities: [
      capability('Microsoft 365', 'Build a secure, managed Microsoft workplace.', ['Microsoft 365 licensing and administration', 'Exchange Online, Teams & SharePoint setup', 'Security policies and adoption support'], 'Make familiar tools work better together.'),
      capability('Zoho Workplace', 'Bring business email and productivity into one ecosystem.', ['Zoho Mail and collaboration setup', 'Workplace administration and migration', 'Zoho business application alignment'], 'Simplify collaboration for growing teams.'),
      capability('Google Workspace', 'Configure a cloud-first collaboration environment.', ['Gmail, Drive and Meet configuration', 'Organisation and sharing policies', 'Administrator handover and user enablement'], 'Enable secure, flexible teamwork.'),
      capability('Email Migration', 'Move mailboxes through a planned transition.', ['Mailbox and domain readiness assessment', 'Staged migration and cutover support', 'Mail flow and data validation'], 'Reduce disruption during platform changes.'),
      capability('Identity & Access', 'Give the right people secure access to the right tools.', ['Single sign-on and multi-factor authentication', 'Role-based access and lifecycle processes', 'MDM and zero-trust access options'], 'Strengthen access without needless friction.'),
      capability('SaaS Backup & Document Workflows', 'Protect collaboration data and streamline documents.', ['SaaS backup and restore configuration', 'PDF, OCR and eSignature deployment', 'Secure file sharing and email signatures'], 'Protect work and simplify approvals.'),
    ],
    tools: ['Microsoft 365', 'Zoho', 'Google Workspace', 'miniOrange', 'Axidian', '42Gears', 'Foxit', 'Nitro', 'ABBYY', 'FileCloud', 'Crossware'],
    scope: baseScope,
    plans: plans(
      ['Workspace readiness assessment', 'Single-platform setup', 'Baseline identity policies', 'Administrator handover'],
      ['Everything in Essential', 'Email migration scope', 'SSO and MFA configuration', 'Collaboration policy management', 'SaaS backup configuration'],
      ['Everything in Business', 'Multi-domain workspace design', 'Advanced identity & device management', 'Document workflow integrations', 'Ongoing administration & adoption programme']
    ),
    faqs: [
      { question: 'Can you migrate without losing existing email?', answer: 'We assess source compatibility, mailbox volume, retention, and dependencies before agreeing a migration method. Pilot migration and validation help identify issues before the final cutover.' },
      { question: 'Are Microsoft or Zoho licences included?', answer: 'Licences are quoted separately or explicitly bundled in a written proposal. User count, platform edition, storage, and security requirements determine the licensing scope.' },
      { question: 'Can we keep our existing company domain?', answer: 'Usually, your existing domain can be retained when moving to a supported platform. Domain ownership, DNS access, mail routing, and any connected applications are reviewed before the cutover plan is agreed.' },
      { question: 'How are user access and offboarding handled?', answer: 'We can define account provisioning, access changes, and offboarding workflows alongside your HR and IT stakeholders. Automation and identity controls depend on the selected platform edition and the integrations included in the scope.' },
      { question: 'Why consider a separate SaaS backup?', answer: 'Platform retention and recovery features may not match your operational recovery or retention requirements. We assess those needs and, where appropriate, configure a separate backup solution with agreed restore scenarios and licensing.' },
    ],
    outcomes: [
      { title: 'Connected teams', description: 'Align email, shared documents, meetings, and collaboration with the way your people work.' },
      { title: 'Controlled access', description: 'Establish identity, sharing, and device policies that support flexible work without losing oversight.' },
      { title: 'A smoother transition', description: 'Use readiness checks, pilots, and user enablement to support platform changes and adoption.' },
    ],
    scenarios: [
      { title: 'Moving to a new email platform', challenge: 'Mailboxes, domains, and business workflows need to move without an unplanned transition.', approach: 'Review source compatibility and data volumes, pilot the migration, and coordinate domain changes, mail-flow validation, and user communications.' },
      { title: 'Collaboration without consistent controls', challenge: 'Shared files and employee access are difficult to govern as teams grow or work remotely.', approach: 'Review tenant policies, configure identity and sharing controls, and document joiner, mover, and leaver responsibilities.' },
      { title: 'Tools that are not being fully adopted', challenge: 'Employees have productivity licences but continue relying on fragmented or manual workflows.', approach: 'Identify everyday use cases, configure collaboration spaces and document tools, and provide role-appropriate enablement and handover.' },
    ],
  },
  {
    slug: 'data-protection-compliance', title: 'Data Protection & Compliance', shortTitle: 'Data Protection & Compliance', category: 'Govern',
    summary: 'Protect critical information, strengthen governance, and turn compliance requirements into clear action.',
    headline: 'Protect your data. Strengthen your trust.',
    overview: [
      'Business data moves across endpoints, applications, cloud services, and people. XorvoTech helps you understand where sensitive information lives and implement controls that reduce leakage, improve recovery, and support accountable governance.',
      'Our solutions combine backup and recovery, data loss prevention, encryption, access controls, and compliance readiness. We assess your data flows and obligations before recommending policies and technologies appropriate to your risk profile.',
      'From DPDP advisory and ISO control alignment to disaster recovery exercises, we focus on documented evidence and practical improvement. Regulatory applicability and legal interpretations should be validated with qualified counsel; no platform alone guarantees compliance.',
    ],
    capabilities: [
      capability('Backup & Recovery', 'Protect important workloads with verifiable recovery.', ['Backup coverage and retention planning', 'Restore validation and reporting', 'SaaS, server and cloud backup options'], 'Build confidence in recovering critical information.'),
      capability('Data Loss Prevention', 'Reduce sensitive-data exposure across channels.', ['Data discovery and classification', 'Endpoint, network and cloud DLP policies', 'Device control and insider-risk visibility'], 'Keep sensitive information under control.'),
      capability('Compliance Audits & GRC', 'Translate obligations into evidence and improvements.', ['DPDP guidance and risk assessment', 'Control gap assessment and policy development', 'Audit evidence and remediation tracking'], 'Make governance actionable and auditable.'),
      capability('Encryption & Key Management', 'Protect information in transit and at rest.', ['Encryption policy and platform configuration', 'Key lifecycle and access reviews', 'Data masking and privacy controls'], 'Limit exposure when data crosses boundaries.'),
      capability('DR Planning & Testing', 'Prepare your business for disruption.', ['Business impact and recovery objectives', 'Recovery runbooks and ownership mapping', 'Tabletop exercises and scoped recovery tests'], 'Validate resilience before an incident.'),
    ],
    tools: ['Safetica', 'GTB Technologies', 'MSP360', 'SecuPi', 'FileCloud', 'TransferChain', 'VIPRE Safesend', 'miniOrange'],
    scope: baseScope,
    plans: plans(
      ['Data protection assessment', 'Backup policy design', 'Baseline data classification', 'Gap and remediation report'],
      ['Everything in Essential', 'DLP deployment and policy tuning', 'Restore testing programme', 'Compliance evidence preparation', 'Encryption and access review'],
      ['Everything in Business', 'Enterprise data governance framework', 'Cross-platform DLP integration', 'DR planning and test coordination', 'Custom compliance reporting and reviews']
    ),
    faqs: [
      { question: 'Do your services guarantee regulatory compliance?', answer: 'No. We support assessment, controls, documentation, and audit readiness. Compliance depends on your legal obligations, implementation, business processes, and ongoing governance.' },
      { question: 'Can you help with India\'s DPDP requirements?', answer: 'Yes. We can scope data discovery, policy guidance, access controls, and evidence preparation around applicable DPDP requirements, working alongside your legal and governance stakeholders.' },
      { question: 'Can DLP be introduced without disrupting normal work?', answer: 'A phased approach can begin with discovery and monitoring, followed by policy tuning and agreed enforcement. Exceptions, business workflows, and user communication are considered before broader rollout. The exact capabilities depend on the chosen product and licence.' },
      { question: 'Who decides which regulations apply to us?', answer: 'Your legal and governance stakeholders determine applicability and legal interpretation. XorvoTech supports technical assessment, control implementation, and evidence preparation against the requirements agreed with those stakeholders.' },
      { question: 'Do backups and DLP solve the same problem?', answer: 'No. Backups support recovery after loss, corruption, or disruption. DLP focuses on detecting or restricting sensitive-data exposure. They can complement one another as part of a wider data protection programme.' },
    ],
    outcomes: [
      { title: 'Visibility into sensitive data', description: 'Understand where important information lives, how it moves, and who can access it.' },
      { title: 'Practical protection controls', description: 'Align data classification, loss prevention, encryption, and recovery with your risk profile.' },
      { title: 'Evidence-led governance', description: 'Turn identified gaps into documented ownership, remediation actions, and audit-readiness evidence.' },
    ],
    scenarios: [
      { title: 'Sensitive information across many channels', challenge: 'Data moves through email, endpoints, file shares, and cloud applications without consistent policies.', approach: 'Map priority data flows, agree classification rules, and pilot DLP policies before wider enforcement and exception handling.' },
      { title: 'Governance requirements becoming more complex', challenge: 'Business stakeholders need clearer policies, evidence, and accountability around data handling.', approach: 'Work with your governance and legal teams to assess applicable requirements, map controls, and maintain a prioritised evidence and remediation plan.' },
      { title: 'Critical information at risk of loss', challenge: 'Backup coverage, retention, and restore ownership are unclear across business systems.', approach: 'Identify priority datasets and workloads, define recovery objectives, and validate the agreed recovery process through scoped tests.' },
    ],
  },
  {
    slug: 'it-consulting-deployment', title: 'IT Consulting & Deployment', shortTitle: 'IT Consulting & Deployment', category: 'Transform',
    summary: 'Turn technology ambitions into business outcomes with expert advice, tailored solutions, and precise delivery.',
    headline: 'From the right strategy to a successful rollout.',
    overview: [
      'Technology projects succeed when business requirements, architecture, and delivery stay aligned. XorvoTech helps you assess options, create a practical roadmap, and implement solutions with clear milestones and ownership.',
      'We support infrastructure design, application deployment, custom development, and business-system implementation. Our consulting work brings together hardware, software, cloud, integrations, and operational readiness instead of treating each as an isolated purchase.',
      'From a website and business portal to CRM, ERP, HRMS, or monitoring rollout, each engagement includes agreed deliverables, acceptance criteria, and handover. Digital visibility programmes can include SEO, answer-engine optimisation, and generative-engine optimisation, without promises of rankings or traffic.',
    ],
    capabilities: [
      capability('Network Design & IT Setup', 'Create a fit-for-purpose technology foundation.', ['Network architecture and site readiness', 'Hardware, software and licensing advisory', 'Domain, hosting and email setup'], 'Build an environment matched to your operations.'),
      capability('Application Deployment', 'Take applications from configuration to production.', ['Environment setup and dependency review', 'Deployment planning and acceptance testing', 'Administrator documentation and handover'], 'Deliver a controlled, supportable rollout.'),
      capability('CI/CD & Deployment Automation', 'Make releases repeatable and easier to manage.', ['Build and release pipeline design', 'Environment and deployment automation', 'Rollback and release validation'], 'Reduce manual steps and release risk.'),
      capability('Custom Applications & UI/UX', 'Design software around your business workflows.', ['Web and mobile application development', 'Business portals and API integrations', 'User research, interface design and validation'], 'Remove workflow friction with purposeful software.'),
      capability('Monitoring & NOC Setup', 'Build operational visibility into your rollout.', ['Monitoring platform implementation', 'Alert routing and escalation configuration', 'Open-source Wazuh and Zabbix deployment options'], 'Give teams a clearer view of system health.'),
      capability('Website Development & Search', 'Create a stronger digital presence.', ['Business websites and eCommerce experiences', 'Technical and on-page SEO', 'AEO/GEO content structure and discoverability'], 'Improve your foundation for digital discovery.'),
      capability('CRM, ERP & HRMS Implementation', 'Connect business processes with the right platform.', ['Zoho CRM, Desk, Books, People & Projects', 'Process mapping and data migration', 'Integrations, training and SAP support options'], 'Bring information and teams into alignment.'),
    ],
    tools: ['Zoho', 'Microsoft', 'AWS', 'Microsoft Azure', 'HP', 'Apple', 'Wazuh', 'Zabbix', 'SAP'],
    scope: baseScope,
    plans: plans(
      ['Discovery and requirements workshop', 'Technology assessment', 'Implementation roadmap', 'Single-solution deployment scope'],
      ['Everything in Essential', 'Multi-system implementation', 'Integration and migration planning', 'User acceptance testing', 'Training and post-launch support scope'],
      ['Everything in Business', 'Enterprise architecture programme', 'CI/CD and deployment automation', 'Cross-functional governance', 'Custom rollout and operational transition']
    ),
    faqs: [
      { question: 'Do you work on fixed-scope projects?', answer: 'Yes. Deliverables, dependencies, milestones, acceptance criteria, and change-control terms are defined in a statement of work before delivery begins.' },
      { question: 'Can you support us after deployment?', answer: 'Post-launch support, application management, monitoring, and managed IT can be included in your proposal or scoped as a separate ongoing engagement.' },
      { question: 'Can you help us select a platform before implementation?', answer: 'Yes. Discovery can compare options against your workflows, integrations, security needs, licensing, and operational capacity. The assessment produces a recommendation and delivery roadmap rather than assuming a product in advance.' },
      { question: 'How are changes handled during a project?', answer: 'The statement of work defines the baseline scope and approval process. New requirements are assessed for impact on cost, dependencies, and delivery before they are approved and added to the plan.' },
      { question: 'Do you guarantee search rankings for website projects?', answer: 'No. Technical SEO, on-page structure, and AEO/GEO work can improve the foundations for discoverability, but rankings and traffic depend on many external factors. Deliverables and measurement are agreed without ranking or traffic guarantees.' },
    ],
    outcomes: [
      { title: 'A practical technology roadmap', description: 'Translate business needs into prioritised architecture choices and a sequenced delivery plan.' },
      { title: 'More controlled delivery', description: 'Keep scope, dependencies, changes, and acceptance criteria visible throughout implementation.' },
      { title: 'A supportable handover', description: 'Prepare documentation, training, and operational ownership before the project transitions to support.' },
    ],
    scenarios: [
      { title: 'Disconnected business systems', challenge: 'Teams re-enter data between applications and struggle to maintain a consistent workflow.', approach: 'Map the process and data ownership, assess supported integration options, and implement a phased solution with user acceptance testing.' },
      { title: 'A rollout with many moving parts', challenge: 'Infrastructure, applications, vendors, and users need to be ready at the same time.', approach: 'Define architecture and dependencies, coordinate milestones and responsibilities, and validate operational readiness before production release.' },
      { title: 'A digital experience that needs to evolve', challenge: 'Your website or business portal no longer reflects customer needs or internal processes.', approach: 'Clarify audience and workflow requirements, design the experience, and build an agreed website or application scope with testing and handover.' },
    ],
  },
];

export const services = serviceDefinitions;

export const processSteps = [
  { title: 'Discover', description: 'Review your systems, stakeholders, dependencies, and business priorities. Establish what needs to change and why.', deliverables: ['Current-state assessment', 'Prioritised requirements & risks'] },
  { title: 'Design', description: 'Evaluate platform options, define responsibilities, and sequence the work around your operational constraints.', deliverables: ['Solution architecture & scope', 'Proposal & delivery milestones'] },
  { title: 'Deploy', description: 'Configure and pilot the solution, validate agreed acceptance criteria, and prepare your people for the transition.', deliverables: ['Staged rollout & validation', 'Documentation & knowledge transfer'] },
  { title: 'Manage', description: 'Where ongoing management is included, review service health, coordinate support, and identify practical improvements.', deliverables: ['Agreed reporting & escalation', 'Improvement recommendations'] },
];

export const businessPriorities = [
  { title: 'Protect the business', heading: 'Build protection around your real risks.', description: 'Connect cyber defence, sensitive-data controls, and recovery planning into a coordinated programme. Start with your most important assets and obligations, then prioritise the gaps.', services: ['cybersecurity', 'data-protection-compliance', 'cloud-infrastructure'], steps: ['Assess exposure and data flows', 'Implement layered protection', 'Validate response and recovery'] },
  { title: 'Scale infrastructure', heading: 'Make your foundation ready for what\'s next.', description: 'Plan a new environment, modernise existing infrastructure, or migrate selected workloads. Architecture, cost visibility, and operational handover stay connected from the start.', services: ['cloud-infrastructure', 'it-consulting-deployment', 'managed-it'], steps: ['Review workloads and dependencies', 'Design and deliver in phases', 'Establish monitoring and ownership'] },
  { title: 'Simplify IT operations', heading: 'Give everyday IT a clearer owner.', description: 'Bring asset visibility, helpdesk, preventive maintenance, and lifecycle planning together. Choose a fully managed or co-managed scope around your team\'s responsibilities.', services: ['managed-it', 'cybersecurity', 'workspace-collaboration'], steps: ['Baseline assets and service needs', 'Define support and escalation', 'Review trends and improve'] },
  { title: 'Connect your teams', heading: 'Create a workplace that works together.', description: 'Align email, identity, shared documents, and business applications with everyday workflows. Pair platform changes with migration planning and user enablement.', services: ['workspace-collaboration', 'it-consulting-deployment', 'data-protection-compliance'], steps: ['Map users and business workflows', 'Configure, migrate, and validate', 'Equip users and administrators'] },
];

export const engagementModels = [
  { title: 'Project delivery', description: 'A defined implementation, migration, or assessment with agreed deliverables, milestones, and acceptance criteria.', bestFor: 'A specific technology change' },
  { title: 'Managed services', description: 'Ongoing operations and support for an agreed environment, with documented coverage, responsibilities, and reporting.', bestFor: 'Continuity and operational ownership' },
  { title: 'Co-managed IT', description: 'Specialist support alongside your internal team, with a clear division of work and a shared escalation process.', bestFor: 'Extending an existing IT team' },
];

export const overviewFaqs = [
  { question: 'Where should we start if several services are relevant?', answer: 'Start with your business priority and the systems most affected. A consultation can establish the current environment, immediate risks, and dependencies so the proposal connects the right services in a sensible sequence.' },
  { question: 'Can we combine multiple services in one engagement?', answer: 'Yes. For example, a cloud migration can include security design, backup, and ongoing management. The written proposal separates deliverables, licences, infrastructure charges, and ongoing responsibilities so the combined scope stays clear.' },
  { question: 'How is a proposal priced?', answer: 'Pricing depends on the assessment, user and asset counts, platform editions, delivery complexity, and required service coverage. The plan tiers are starting points for scope, not fixed prices or automatic service guarantees.' },
  { question: 'Do you support an existing technology environment?', answer: 'We review existing products, configurations, licences, and dependencies before recommending changes. Supported platforms, integrations, access arrangements, and any exclusions are confirmed during discovery.' },
];

export const differentiators = [
  { title: 'One partner, end to end', description: 'Solution design, licensing, implementation, and post-sales support — with a single point of accountability.' },
  { title: 'The right technology, not just more', description: 'A multi-OEM ecosystem and vendor-neutral guidance matched to your risks, priorities, and budget.' },
  { title: 'Support beyond the rollout', description: 'Managed IT, helpdesk, and 24x7 NOC services that keep your technology lifecycle connected.' },
];

export const portfolioUrl = 'https://xorvotech.com/portfolio';

export const servicePaths = [
  '/services/cybersecurity',
  '/services/cloud-infrastructure',
  '/services/managed-it',
  '/services/workspace-collaboration',
  '/services/data-protection-compliance',
  '/services/it-consulting-deployment',
];
