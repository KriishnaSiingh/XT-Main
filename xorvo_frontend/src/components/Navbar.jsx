import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  ChevronRight, 
  ArrowUpRight 
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BubbleMenuOverlay from "./BubbleMenuOverlay";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveSection, setMobileActiveSection] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  
  // Check if we're on a page with hero section
  const hasHeroSection = ['/', '/services', '/solutions', '/resources'].includes(location.pathname);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100); // Change to white after scrolling 100px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Determine if navbar should be transparent
  const isTransparent = hasHeroSection && !isScrolled;

  // Map Services columns to their corresponding new service pages
  const servicesAnchorMap = {
    'Cybersecurity Services': '/services/cybersecurity',
    'Cloud & Infrastructure': '/services/cloud-infrastructure',
    'Managed IT Services': '/services/managed-it',
    'Workspace & Collaboration': '/services/workspace-collaboration',
    'Data Protection & Compliance': '/services/data-protection-compliance',
    'IT Consulting & Deployment': '/services/it-consulting-deployment',
  };

  // Map individual services to their corresponding new service pages and card IDs
  const individualServiceMap = {
    // Cybersecurity Services
    'Network Security': { page: '/cybersecurity-services', anchor: '#network-security' },
    'Endpoint Protection': { page: '/cybersecurity-services', anchor: '#endpoint-protection' },
    'Threat Detection & SOC': { page: '/cybersecurity-services', anchor: '#threat-detection-soc' },
    'Vulnerability Management': { page: '/cybersecurity-services', anchor: '#vulnerability-management' },
    'Incident Response & Forensics': { page: '/cybersecurity-services', anchor: '#incident-response-forensics' },
    'Email & Web Security': { page: '/cybersecurity-services', anchor: '#email-web-security' },
    'Security Awareness & Training': { page: '/cybersecurity-services', anchor: '#security-awareness-training' },
    'Compliance & Audit (ISO / GDPR / PCI DSS / HIPAA)': { page: '/cybersecurity-services', anchor: '#compliance-audit' },
    
    // Cloud & Infrastructure
    'Cloud Migration': { page: '/cloud-infrastructure-services', anchor: '#cloud-migration' },
    'VPS Hosting': { page: '/cloud-infrastructure-services', anchor: '#vps-hosting' },
    'Infrastructure Design': { page: '/cloud-infrastructure-services', anchor: '#infrastructure-design' },
    'Hybrid & Multi-Cloud Management': { page: '/cloud-infrastructure-services', anchor: '#hybrid-multi-cloud' },
    'Backup & Disaster Recovery': { page: '/cloud-infrastructure-services', anchor: '#backup-disaster-recovery' },
    'Infrastructure Monitoring (NOC)': { page: '/cloud-infrastructure-services', anchor: '#infrastructure-monitoring' },
    
    // Managed IT Services
    'Monitoring & Maintenance': { page: '/managed-it-services', anchor: '#monitoring-maintenance' },
    'Remote Support (Helpdesk & RMM)': { page: '/managed-it-services', anchor: '#remote-support' },
    'Asset & Patch Management': { page: '/managed-it-services', anchor: '#asset-management' },
    'SLA & Reporting': { page: '/managed-it-services', anchor: '#sla-reporting' },
    'IT Strategy & Budget Planning': { page: '/managed-it-services', anchor: '#it-strategy' },
    
    // Workspace & Collaboration
    'Microsoft 365': { page: '/workspace-collaboration-services', anchor: '#microsoft-365' },
    'Zoho Workspace': { page: '/workspace-collaboration-services', anchor: '#zoho-workspace' },
    'Google Workspace': { page: '/workspace-collaboration-services', anchor: '#google-workspace' },
    'Email Migration': { page: '/workspace-collaboration-services', anchor: '#email-migration' },
    'Identity & Access (SSO, MFA)': { page: '/workspace-collaboration-services', anchor: '#identity-access' },
    'SaaS Backup (M365/Google/Zoho)': { page: '/workspace-collaboration-services', anchor: '#saas-backup' },
    
    // Data Protection & Compliance
    'Backup & Recovery': { page: '/data-protection-compliance-services', anchor: '#backup-recovery' },
    'DLP (Data Loss Prevention)': { page: '/data-protection-compliance-services', anchor: '#dlp' },
    'Compliance Audits': { page: '/data-protection-compliance-services', anchor: '#compliance-audits' },
    'Encryption & Key Management': { page: '/data-protection-compliance-services', anchor: '#encryption-key' },
    'DR Planning & Testing': { page: '/data-protection-compliance-services', anchor: '#dr-planning' },
    
    // IT Consulting & Deployment
    'Network Design': { page: '/it-consulting-deployment-services', anchor: '#network-designing' },
    'Application Deployment': { page: '/it-consulting-deployment-services', anchor: '#application-deployment' },
    'CI/CD Automation': { page: '/it-consulting-deployment-services', anchor: '#ci-cd-automation' },
    'Custom Applications': { page: '/it-consulting-deployment-services', anchor: '#custom-applications' },
    'Application Designing (UI/UX)': { page: '/it-consulting-deployment-services', anchor: '#application-designing' },
    'Deployment Automation': { page: '/it-consulting-deployment-services', anchor: '#deployment-automation' },
    'Monitoring & NOC Setup': { page: '/it-consulting-deployment-services', anchor: '#monitoring-noc-setup' },
    'Website Development': { page: '/it-consulting-deployment-services', anchor: '#website-development' },
    'SEO Optimization': { page: '/it-consulting-deployment-services', anchor: '#seo-optimization' },
    'AEO (Answer Engine Optimization)': { page: '/it-consulting-deployment-services', anchor: '#aeo-optimization' },
    'GEO (Local SEO)': { page: '/it-consulting-deployment-services', anchor: '#geo-local-seo' },
    'CRM Implementation': { page: '/it-consulting-deployment-services', anchor: '#crm-implementation' },
    'ERP Implementation': { page: '/it-consulting-deployment-services', anchor: '#erp-implementation' },
    'HRMS Implementation': { page: '/it-consulting-deployment-services', anchor: '#hrms-implementation' },
    'Network Designing': { page: '/it-consulting-deployment-services', anchor: '#network-designing' },
    
    // Resources
    'Blog': { page: '/blog', anchor: '' },
    'Case Studies': { page: '/resources', anchor: '#case-studies' },
    'Guides & Whitepapers': { page: '/resources', anchor: '#technical-papers' },
    'Security Alerts': { page: '/resources', anchor: '#security-updates' },
  };

  // Map Solutions columns to anchors on /solutions
  const solutionsAnchorMap = {
    'Business Solutions': '#business-solutions',
    'Development & Hosting': '#development-hosting',
    'Digital Marketing & Infrastructure': '#digital-marketing-infrastructure',
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const navItems = [
    {
      name: "Services",
      columns: [
        {
          title: "Cybersecurity Services",
          items: [
            "Network Security",
            "Endpoint Protection",
            "Threat Detection & SOC",
            "Vulnerability Management",
            "Incident Response & Forensics",
            "Email & Web Security",
            "Security Awareness & Training",
            "Compliance & Audit (ISO / GDPR / PCI DSS / HIPAA)",
          ],
        },
        {
          title: "Cloud & Infrastructure",
          items: [
            "Cloud Migration",
            "VPS Hosting",
            "Infrastructure Design",
            "Hybrid & Multi-Cloud Management",
            "Backup & Disaster Recovery",
            "Infrastructure Monitoring (NOC)",
          ],
        },
        {
          title: "Managed IT Services",
          items: [
            "Monitoring & Maintenance",
            "Remote Support (Helpdesk & RMM)",
            "Asset & Patch Management",
            "SLA & Reporting",
            "IT Strategy & Budget Planning",
          ],
        },
        {
          title: "Workspace & Collaboration",
          items: [
            "Microsoft 365",
            "Zoho Workspace",
            "Google Workspace",
            "Email Migration",
            "Identity & Access (SSO, MFA)",
            "SaaS Backup (M365/Google/Zoho)",
          ],
        },
        {
          title: "Data Protection & Compliance",
          items: [
            "Backup & Recovery",
            "DLP (Data Loss Prevention)",
            "Compliance Audits",
            "Encryption & Key Management",
            "DR Planning & Testing",
          ],
        },
        {
          title: "IT Consulting & Deployment",
          items: [
            "Network Design",
            "Application Deployment",
            "CI/CD Automation",
            "Custom Applications",
            "Application Designing (UI/UX)",
            "Deployment Automation",
            "Monitoring & NOC Setup",
            "Website Development",
            "SEO Optimization",
            "AEO (Answer Engine Optimization)",
            "GEO (Local SEO)",
            "CRM Implementation",
            "ERP Implementation",
            "HRMS Implementation",
            "Network Designing",
          ],
        },
      ],
    },
    {
      name: "Solutions",
      columns: [
        {
          title: "Business Solutions",
          items: [
            { name: "CRM", path: "/solutions/crm" },
            { name: "ERP", path: "/solutions/erp" },
            { name: "HRMS", path: "/solutions/hrms" },
            { name: "Custom Application", path: "/solutions/custom-application" },
            { name: "Application Designing (UI/UX)", path: "/solutions/application-designing" },
          ],
        },
        {
          title: "Development & Hosting",
          items: [
            { name: "Website Development", path: "/solutions/website" },
            { name: "App Development", path: "/solutions/app" },
            { name: "VPS Hosting", path: "/solutions/vps-hosting" },
            { name: "Cloud Services", path: "/solutions/cloud" },
            { name: "Deployment Automation", path: "/solutions/deployment" },
          ],
        },
        {
          title: "Digital Marketing & Infrastructure",
          items: [
            { name: "SEO Optimization", path: "/solutions/seo" },
            { name: "AEO (Answer Engine Optimization)", path: "/solutions/aeo" },
            { name: "GEO (Local SEO)", path: "/solutions/geo" },
            { name: "Monitoring (NOC)", path: "/solutions/monitoring" },
            { name: "Network Designing", path: "/solutions/network-designing" },
          ],
        },
      ],
    },
    {
      name: "Resources",
      columns: [
        {
          title: "Resources",
          items: [
            "Blog",
            "Case Studies",
            "Guides & Whitepapers",
            "Security Alerts",
          ],
        },
      ],
    },
  ];

  const currentNavData = navItems.find((item) => item.name === activeDropdown);
  const currentColumn =
    currentNavData?.columns.find((col) => col.title === activeSubCategory) ||
    currentNavData?.columns[0];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-md relative transition-colors duration-300 bg-white/95 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3.5 cursor-pointer shrink-0">
              <img
                src="/xorvo_im.png"
                alt="Logo"
                className="h-8 sm:h-10 w-auto transition-all"
                onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                loading="lazy"
                decoding="async"
              />
              <div className="h-7 sm:h-8 w-px bg-slate-300"></div>
              <img
                src="/logo_xorvo1.png"
                alt="Xorvo Technologies"
                className="h-10 sm:h-12 w-auto"
                onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                loading="lazy"
                decoding="async"
              />
            </Link>

            {/* Navigation Items - Clean Desktop Layout */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  onMouseEnter={() => {
                    if (dropdownTimeoutRef.current) {
                      clearTimeout(dropdownTimeoutRef.current);
                      dropdownTimeoutRef.current = null;
                    }
                    setActiveDropdown(item.name);
                    if (item.columns && item.columns.length > 0) {
                      setActiveSubCategory(item.columns[0].title);
                    }
                  }}
                  onMouseLeave={(e) => {
                    const relatedTarget = e.relatedTarget;
                    if (!relatedTarget || !relatedTarget.closest('.mega-menu-dropdown')) {
                      dropdownTimeoutRef.current = setTimeout(() => {
                        setActiveDropdown(null);
                        dropdownTimeoutRef.current = null;
                      }, 100);
                    }
                  }}
                >
                  <button
                    className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                      activeDropdown === item.name
                        ? "text-blue-600 bg-blue-50/70"
                        : "text-slate-800 hover:text-blue-600 hover:bg-slate-100/70"
                    }`}
                    onClick={() => {
                      setActiveDropdown(null);
                      if (item.name === 'Resources') {
                        navigate('/resources');
                      }
                      if (item.name === 'Services') {
                        navigate('/services');
                      }
                      if (item.name === 'Solutions') {
                        navigate('/solutions');
                      }
                    }}
                  >
                    {item.name}
                  </button>
                </div>
              ))}

              <button
                className="px-3 py-2 text-sm font-medium text-slate-800 hover:text-blue-600 hover:bg-slate-100/70 rounded-md transition-colors"
                onClick={() => navigate('/pricing')}
              >
                Pricing
              </button>

              <button
                className="px-3 py-2 text-sm font-medium text-slate-800 hover:text-blue-600 hover:bg-slate-100/70 rounded-md transition-colors"
                onClick={() => navigate('/about')}
              >
                About Us
              </button>
            </div>

            {/* Right Action CTA Button */}
            <div className="hidden lg:flex items-center">
              <Button
                onClick={() => navigate('/?contact=true')}
                className="rounded-full px-5 py-2 text-sm font-semibold bg-[#001f3f] text-white hover:bg-blue-700 shadow-sm transition-all hover:shadow"
              >
                Contact Us
              </Button>
            </div>

            {/* Mobile Menu Button - Shows on Mobile & Tablet */}
            <div className="lg:hidden flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="transition-colors p-2 active:scale-95 transition-transform text-gray-800 hover:text-[#001f3f]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mega Menu Dropdown - Clean Simple White Two-Pane Hover */}
      {activeDropdown && currentNavData && (
        <div
          className="mega-menu-dropdown hidden lg:block fixed top-16 sm:top-20 left-0 right-0 z-[60] pt-2 animate-in fade-in slide-in-from-top-2 duration-150"
          onMouseEnter={() => {
            if (dropdownTimeoutRef.current) {
              clearTimeout(dropdownTimeoutRef.current);
              dropdownTimeoutRef.current = null;
            }
          }}
          onMouseLeave={(e) => {
            const relatedTarget = e.relatedTarget;
            if (!relatedTarget || !relatedTarget.closest('.mega-menu-dropdown')) {
              dropdownTimeoutRef.current = setTimeout(() => {
                setActiveDropdown(null);
                dropdownTimeoutRef.current = null;
              }, 150);
            }
          }}
        >
          {/* Invisible hit-area bridge to avoid mouse leave gaps */}
          <div className="absolute -top-3 left-0 right-0 h-3 bg-transparent" />

          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[360px] divide-y md:divide-y-0 md:divide-x divide-gray-100">
              
              {/* Left Pane: Sub Headings List */}
              <div className="w-full md:w-[280px] bg-slate-50/80 p-3 shrink-0 flex flex-col justify-between">
                <div className="space-y-1">
                  {currentNavData.columns.map((column) => {
                    const isActive = currentColumn?.title === column.title;
                    return (
                      <div
                        key={column.title}
                        onMouseEnter={() => setActiveSubCategory(column.title)}
                        onClick={() => {
                          setActiveDropdown(null);
                          const path = activeDropdown === 'Services' 
                            ? servicesAnchorMap[column.title] || '/services'
                            : activeDropdown === 'Solutions'
                            ? `/solutions${solutionsAnchorMap[column.title] || ''}`
                            : '/resources';
                          navigate(path);
                        }}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer text-sm transition-all duration-150 ${
                          isActive
                            ? "bg-white text-blue-600 font-semibold shadow-sm border border-gray-200/80"
                            : "text-slate-700 hover:text-slate-900 hover:bg-gray-200/50 font-medium"
                        }`}
                      >
                        <span>{column.title}</span>
                        <ChevronRight
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isActive ? "text-blue-600 translate-x-0.5" : "text-slate-400"
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Pane: Just the services */}
              <div className="flex-1 p-6 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
                    <h3 className="text-base font-bold text-slate-900">
                      {currentColumn?.title}
                    </h3>
                    <Link
                      to={
                        activeDropdown === "Services"
                          ? servicesAnchorMap[currentColumn?.title] || "/services"
                          : activeDropdown === "Solutions"
                          ? `/solutions${solutionsAnchorMap[currentColumn?.title] || ""}`
                          : activeDropdown === "Resources"
                          ? "/resources"
                          : "#"
                      }
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <span>View all</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Sub-sub Headings: Services list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 max-h-[340px] overflow-y-auto pr-1">
                    {currentColumn?.items.map((subItem, subIdx) => {
                      const itemName = typeof subItem === "string" ? subItem : subItem.name;
                      const itemPath = typeof subItem === "string" ? "#" : subItem.path;
                      const individualServiceAnchor = individualServiceMap[itemName] || "";

                      const finalPath =
                        activeDropdown === "Services"
                          ? individualServiceAnchor
                            ? `${individualServiceAnchor.page}${individualServiceAnchor.anchor}`
                            : servicesAnchorMap[currentColumn.title] || "/cybersecurity-services"
                          : activeDropdown === "Solutions"
                          ? `/solutions${solutionsAnchorMap[currentColumn.title] || ""}`
                          : activeDropdown === "Resources"
                          ? `/resources${individualServiceMap[itemName]?.anchor || ""}`
                          : itemPath;

                      return (
                        <Link
                          key={subIdx}
                          to={finalPath}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50/70 transition-colors font-medium group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-600 shrink-0 transition-colors" />
                          <span className="truncate">{itemName}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu - Shows on Mobile & Tablet */}
      {mobileMenuOpen && (
        <>
          {/* Bubble Menu Overlay for Mobile */}
          <div className="lg:hidden md:hidden">
            <BubbleMenuOverlay
              isOpen={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
            />
          </div>
          
          {/* Traditional Mobile Menu for Tablet */}
          <div className="hidden lg:hidden md:block bg-white border-t border-border animate-in slide-in-from-top duration-300">
            <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-border/50 last:border-0">
                <button
                  onClick={() => setMobileActiveSection(mobileActiveSection === item.name ? null : item.name)}
                  className="w-full flex items-center justify-between py-4 text-black font-medium hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </button>

                {/* Mobile Submenu */}
                {mobileActiveSection === item.name && (
                  <div className="pb-4 space-y-4 sm:space-y-6">
                    {item.columns.map((column, idx) => (
                      <div key={idx} className="space-y-2 sm:space-y-3">
                        <h4 className="text-blue-600 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                          {column.title}
                        </h4>
                        <ul className="space-y-2 pl-3 sm:pl-4">
                          {column.items.map((subItem, subIdx) => {
                            const isHighlighted = column.highlightLast && subIdx === column.items.length - 1;
                            // Handle both string and object items
                            const itemName = typeof subItem === 'string' ? subItem : subItem.name;
                            const itemPath = typeof subItem === 'string' ? '#' : subItem.path;

                            return (
                              <li key={subIdx}>
                                <Link
                                  to={item.name === 'Solutions' ? `/solutions${solutionsAnchorMap[column.title] || ''}` : 
                                       item.name === 'Services' ? (servicesAnchorMap[column.title] || '/services') : 
                                       item.name === 'Resources' ? `/resources${individualServiceMap[itemName] || ''}` : 
                                       itemPath}
                                  className={`block text-sm sm:text-base py-2 transition-colors active:scale-95 ${isHighlighted
                                      ? 'text-blue-600 font-medium'
                                      : 'text-gray-700 hover:text-black'
                                    }`}
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {itemName}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Additional Menu Items for Mobile */}
            <div className="border-t border-border/50 pt-4 space-y-2">
              <button
                onClick={() => {
                  navigate('/pricing');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-3 text-black font-medium hover:text-blue-600 transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => {
                  navigate('/about');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-3 text-black font-medium hover:text-blue-600 transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => {
                  navigate('/?contact=true');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-3 text-black font-medium hover:text-blue-600 transition-colors"
              >
                Contact
              </button>
            </div>

            {/* Logo for Mobile */}
            <div className="py-4 mt-4 border-t border-border/50">
              <div className="flex items-center">
                <img
                  src="/logo_xorvo1.png"
                  alt="Xorvo logo"
                  className="h-8 sm:h-9 w-auto object-contain"
                  onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
