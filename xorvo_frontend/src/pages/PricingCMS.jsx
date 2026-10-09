import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Save,
  RotateCcw,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileJson,
  UploadCloud,
  ChevronRight,
  Layers,
  Sparkles,
  HelpCircle,
  Table,
  Briefcase,
  CreditCard,
  ShieldCheck,
  Lock,
  LogOut,
  KeyRound,
  Eye,
  EyeOff,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pricingService } from "@/services/pricingService";
import { defaultPricingContent } from "@/content/pricingContent";

export default function PricingCMS() {
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [activeTab, setActiveTab] = useState("hero");
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Admin Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return (
      sessionStorage.getItem("xorvo_admin_auth") === "true" ||
      localStorage.getItem("xorvo_admin_auth") === "true"
    );
  });
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [rememberAdmin, setRememberAdmin] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError("");

    const validUsernames = ["admin", "xorvo", "superadmin"];
    const validPasswords = ["xorvo2026", "admin", "admin123", "xorvo"];

    const isUserValid = validUsernames.includes(adminUsername.trim().toLowerCase());
    const isPassValid = validPasswords.includes(adminPassword.trim());

    if (isUserValid && isPassValid) {
      setIsAuthenticated(true);
      if (rememberAdmin) {
        localStorage.setItem("xorvo_admin_auth", "true");
      } else {
        sessionStorage.setItem("xorvo_admin_auth", "true");
      }
    } else {
      setAuthError("Invalid username or password. Please try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("xorvo_admin_auth");
    localStorage.removeItem("xorvo_admin_auth");
    setIsAuthenticated(false);
    setAdminPassword("");
    setAuthError("");
  };

  useEffect(() => {
    document.title = "Pricing CMS – Content Management | Xorvo Tech";
    window.scrollTo(0, 0);

    const load = async () => {
      try {
        const data = await pricingService.getPricingContent();
        setContent(data ? JSON.parse(JSON.stringify(data)) : JSON.parse(JSON.stringify(defaultPricingContent)));
      } catch (err) {
        console.error("Error loading pricing data for CMS:", err);
        setContent(JSON.parse(JSON.stringify(defaultPricingContent)));
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    if (!content) return;
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const result = await pricingService.savePricingContent(content);
      if (result.success) {
        setStatusMessage({
          type: "success",
          text: result.apiSynced
            ? "Changes saved and synced to backend successfully!"
            : "Changes saved to local storage! (Backend was offline or not reachable)",
        });
      } else {
        setStatusMessage({
          type: "error",
          text: "Failed to save changes. Check browser console.",
        });
      }
    } catch (e) {
      setStatusMessage({
        type: "error",
        text: `Error saving: ${e.message}`,
      });
    } finally {
      setIsSaving(false);
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  const handleReset = async () => {
    if (window.confirm("Are you sure you want to reset all pricing content back to default values?")) {
      const defaultClone = JSON.parse(JSON.stringify(defaultPricingContent));
      setContent(defaultClone);
      await pricingService.savePricingContent(defaultClone);
      setStatusMessage({
        type: "success",
        text: "Pricing content has been reset to defaults.",
      });
    }
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "xorvo-pricing-content.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (event) => {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      fileReader.readAsText(event.target.files[0], "UTF-8");
      fileReader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target.result);
          if (parsed && parsed.hero && parsed.managed) {
            setContent(parsed);
            setStatusMessage({
              type: "success",
              text: "Configuration successfully imported! Remember to click 'Save Changes'.",
            });
          } else {
            alert("Uploaded JSON does not match the pricing schema.");
          }
        } catch (err) {
          alert("Invalid JSON file: " + err.message);
        }
      };
    }
  };

  if (!content) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block size-8 animate-spin rounded-full border-4 border-primary border-t-transparent mb-4"></div>
          <p className="text-muted-foreground">Loading Pricing CMS Editor...</p>
        </div>
      </div>
    );
  }

  // Helpers for editing plans
  const updatePlan = (index, field, value) => {
    const updated = { ...content };
    updated.managed.plans[index][field] = value;
    setContent(updated);
  };

  const addPlanFeature = (planIndex) => {
    const updated = { ...content };
    updated.managed.plans[planIndex].features.push("New plan feature");
    setContent(updated);
  };

  const updatePlanFeature = (planIndex, featureIndex, value) => {
    const updated = { ...content };
    updated.managed.plans[planIndex].features[featureIndex] = value;
    setContent(updated);
  };

  const removePlanFeature = (planIndex, featureIndex) => {
    const updated = { ...content };
    updated.managed.plans[planIndex].features.splice(featureIndex, 1);
    setContent(updated);
  };

  // Helpers for Comparison matrix
  const updateComparisonRow = (rowIndex, colIndex, value) => {
    const updated = { ...content };
    updated.comparison[rowIndex][colIndex] = value;
    setContent(updated);
  };

  const addComparisonRow = () => {
    const updated = { ...content };
    updated.comparison.push(["New Capability", "—", "✓", "✓", "✓"]);
    setContent(updated);
  };

  const removeComparisonRow = (index) => {
    const updated = { ...content };
    updated.comparison.splice(index, 1);
    setContent(updated);
  };

  // Helpers for Individual Services
  const updateService = (index, name, desc) => {
    const updated = { ...content };
    updated.services[index] = [name, desc];
    setContent(updated);
  };

  const addService = () => {
    const updated = { ...content };
    updated.services.push(["New IT Service", "Description of what Xorvo provides for this service."]);
    setContent(updated);
  };

  const removeService = (index) => {
    const updated = { ...content };
    updated.services.splice(index, 1);
    setContent(updated);
  };

  // Helpers for FAQs
  const updateFaq = (index, q, a) => {
    const updated = { ...content };
    updated.faqs[index] = [q, a];
    setContent(updated);
  };

  const addFaq = () => {
    const updated = { ...content };
    updated.faqs.push(["Frequently Asked Question Title?", "Answer explaining Xorvo's policy or service details."]);
    setContent(updated);
  };

  const removeFaq = (index) => {
    const updated = { ...content };
    updated.faqs.splice(index, 1);
    setContent(updated);
  };

  // Helpers for Billing Terms
  const updateBillingTerm = (index, value) => {
    const updated = { ...content };
    updated.billingTerms[index] = value;
    setContent(updated);
  };

  const addBillingTerm = () => {
    const updated = { ...content };
    updated.billingTerms.push("New billing policy term line.");
    setContent(updated);
  };

  const removeBillingTerm = (index) => {
    const updated = { ...content };
    updated.billingTerms.splice(index, 1);
    setContent(updated);
  };

  // If not authenticated, require Admin Login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* Left Panel – Animated Brand */}
        <div
          className="hidden lg:flex flex-col justify-between w-[45%] xl:w-[42%] p-12 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0a0a1a 0%, #001f3f 40%, #003366 70%, #0a1628 100%)",
          }}
        >
          {/* Animated orbs */}
          <div
            className="absolute top-[-80px] right-[-80px] w-[320px] h-[320px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, #3b82f6, transparent 70%)",
              animation: "pulse 6s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-[-60px] left-[-60px] w-[260px] h-[260px] rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, #06b6d4, transparent 70%)",
              animation: "pulse 8s ease-in-out infinite 2s",
            }}
          />
          <div
            className="absolute top-[45%] left-[20%] w-[180px] h-[180px] rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, #8b5cf6, transparent 70%)",
              animation: "pulse 7s ease-in-out infinite 1s",
            }}
          />

          {/* Top logo */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <img src="/xorvo_im.png" alt="Xorvo" className="h-8 w-auto brightness-200" onError={(e) => { e.currentTarget.style.display = "none"; }} />
              <div className="h-6 w-px bg-white/20" />
              <img src="/logo_xorvo1.png" alt="Xorvo Technologies" className="h-10 w-auto brightness-200 contrast-125" onError={(e) => { e.currentTarget.style.display = "none"; }} />
            </div>
          </div>

          {/* Center message */}
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", color: "#93c5fd" }}>
              <Lock className="size-3" />
              Admin Portal
            </div>
            <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight">
              Pricing Content<br />
              <span style={{ color: "#60a5fa" }}>Management</span> System
            </h2>
            <p className="text-sm leading-7 text-blue-200/70 max-w-sm">
              Securely manage your IT pricing tiers, service matrices, plan features, and CMS content — all from one central dashboard.
            </p>
            <div className="flex flex-col gap-3 pt-2">
              {[
                "Managed IT plan editor",
                "Zoho & Microsoft 365 pricing",
                "Real-time preview & publish",
                "FAQ & billing terms control",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2.5 text-sm text-blue-100/80">
                  <div className="size-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(59,130,246,0.2)" }}>
                    <CheckCircle2 className="size-3 text-blue-400" />
                  </div>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom attribution */}
          <div className="relative z-10 text-xs text-blue-200/40">
            © {new Date().getFullYear()} Xorvo Technologies · Admin Access Only
          </div>
        </div>

        {/* Right Panel – Login Form */}
        <div
          className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative"
          style={{ background: "#0d0d1a" }}
        >
          {/* Subtle bg grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 w-full max-w-[400px]">
            {/* Mobile logo */}
            <div className="flex items-center gap-3 mb-10 lg:hidden">
              <img src="/xorvo_im.png" alt="Xorvo" className="h-7 w-auto" onError={(e) => { e.currentTarget.style.display = "none"; }} />
              <div className="h-5 w-px bg-white/20" />
              <img src="/logo_xorvo1.png" alt="Xorvo Technologies" className="h-8 w-auto brightness-200" onError={(e) => { e.currentTarget.style.display = "none"; }} />
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back</h1>
              <p className="mt-1.5 text-sm text-slate-400">Sign in to your admin account to continue</p>
            </div>

            {/* Error */}
            {authError && (
              <div
                className="mb-5 flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#fca5a5" }}
              >
                <AlertCircle className="size-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="size-4" />
                  </span>
                  <input
                    id="cms-admin-username"
                    type="text"
                    required
                    autoComplete="username"
                    placeholder="admin"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 transition-all outline-none"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onFocus={(e) => { e.currentTarget.style.border = "1px solid rgba(59,130,246,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)"; }}
                    onBlur={(e) => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <KeyRound className="size-4" />
                  </span>
                  <input
                    id="cms-admin-password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 rounded-xl text-sm text-white placeholder-slate-600 transition-all outline-none"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onFocus={(e) => { e.currentTarget.style.border = "1px solid rgba(59,130,246,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)"; }}
                    onBlur={(e) => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2.5 pt-1">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={rememberAdmin}
                  onClick={() => setRememberAdmin(!rememberAdmin)}
                  className="size-4 rounded flex items-center justify-center transition-all shrink-0"
                  style={{
                    background: rememberAdmin ? "#3b82f6" : "rgba(255,255,255,0.08)",
                    border: rememberAdmin ? "1px solid #3b82f6" : "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  {rememberAdmin && (
                    <svg className="size-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <span className="text-xs text-slate-400 select-none cursor-pointer" onClick={() => setRememberAdmin(!rememberAdmin)}>
                  Keep me signed in on this device
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 mt-2 relative overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  boxShadow: "0 4px 24px rgba(37,99,235,0.35)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 32px rgba(37,99,235,0.55)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 24px rgba(37,99,235,0.35)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Lock className="size-4" />
                  Sign in to Admin CMS
                </span>
              </button>
            </form>

            {/* Back link */}
            <div className="mt-8 text-center">
              <Link
                to="/pricing"
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-400 transition-colors"
              >
                <ChevronRight className="size-3 rotate-180" />
                Back to Public Pricing Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block size-8 animate-spin rounded-full border-4 border-primary border-t-transparent mb-4"></div>
          <p className="text-muted-foreground">Loading Pricing CMS Editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-24 text-slate-900 dark:text-slate-100">
      {/* CMS Top Action Bar */}
      <div className="sticky top-16 sm:top-20 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Layers className="size-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Pricing Content Management (CMS)</h1>
              <p className="text-xs text-slate-500">Edit transparent IT tiers, licensing tables, and FAQ content</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/pricing")}
              className="gap-1 text-xs"
            >
              <ExternalLink className="size-3.5" />
              <span>Live Pricing Page</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportJson}
              className="gap-1 text-xs"
              title="Download backup JSON"
            >
              <FileJson className="size-3.5" />
              <span>Export</span>
            </Button>
            <label className="cursor-pointer">
              <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
              <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <UploadCloud className="size-3.5" />
                <span>Import</span>
              </span>
            </label>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="gap-1 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <RotateCcw className="size-3.5" />
              <span>Reset</span>
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              size="sm"
              className="gap-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Save className="size-4" />
              <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            </Button>
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-1 text-xs text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
              title="Sign out of Admin CMS"
            >
              <LogOut className="size-3.5" />
              <span>Log Out</span>
            </Button>
          </div>
        </div>

        {/* Status Message Notification */}
        {statusMessage && (
          <div className="max-w-7xl mx-auto mt-3">
            <div
              className={`p-3 rounded-lg text-xs font-medium flex items-center gap-2 ${
                statusMessage.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {statusMessage.type === "success" ? (
                <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="size-4 shrink-0 text-red-600" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          </div>
        )}
      </div>

      {/* CMS Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex flex-wrap h-auto p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl gap-1">
            <TabsTrigger value="hero" className="text-xs sm:text-sm py-2 px-3">
              Hero & Notice
            </TabsTrigger>
            <TabsTrigger value="managed" className="text-xs sm:text-sm py-2 px-3">
              Managed IT Plans (4 Tiers)
            </TabsTrigger>
            <TabsTrigger value="comparison" className="text-xs sm:text-sm py-2 px-3">
              Coverage Matrix
            </TabsTrigger>
            <TabsTrigger value="services" className="text-xs sm:text-sm py-2 px-3">
              Individual Services
            </TabsTrigger>
            <TabsTrigger value="licensing" className="text-xs sm:text-sm py-2 px-3">
              Zoho & Microsoft
            </TabsTrigger>
            <TabsTrigger value="billing-faq" className="text-xs sm:text-sm py-2 px-3">
              Billing Terms & FAQ
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: HERO & NOTICE */}
          <TabsContent value="hero" className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <h2 className="text-base font-bold flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <span>Header & Hero Section Content</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Eyebrow Tag</label>
                  <input
                    type="text"
                    value={content.hero.eyebrow}
                    onChange={(e) => {
                      const updated = { ...content };
                      updated.hero.eyebrow = e.target.value;
                      setContent(updated);
                    }}
                    className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">GST & Helper Notice</label>
                  <input
                    type="text"
                    value={content.hero.helper}
                    onChange={(e) => {
                      const updated = { ...content };
                      updated.hero.helper = e.target.value;
                      setContent(updated);
                    }}
                    className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Main Title</label>
                <input
                  type="text"
                  value={content.hero.title}
                  onChange={(e) => {
                    const updated = { ...content };
                    updated.hero.title = e.target.value;
                    setContent(updated);
                  }}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Description</label>
                <textarea
                  rows={3}
                  value={content.hero.description}
                  onChange={(e) => {
                    const updated = { ...content };
                    updated.hero.description = e.target.value;
                    setContent(updated);
                  }}
                  className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
                />
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: MANAGED IT PLANS */}
          <TabsContent value="managed" className="space-y-6">
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <Briefcase className="size-4 text-primary" />
                  <span>Section Header</span>
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase">Section Eyebrow</label>
                    <input
                      type="text"
                      value={content.managed.eyebrow}
                      onChange={(e) => {
                        const updated = { ...content };
                        updated.managed.eyebrow = e.target.value;
                        setContent(updated);
                      }}
                      className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase">Section Title</label>
                    <input
                      type="text"
                      value={content.managed.title}
                      onChange={(e) => {
                        const updated = { ...content };
                        updated.managed.title = e.target.value;
                        setContent(updated);
                      }}
                      className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm font-semibold"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Section Description</label>
                  <textarea
                    rows={2}
                    value={content.managed.description}
                    onChange={(e) => {
                      const updated = { ...content };
                      updated.managed.description = e.target.value;
                      setContent(updated);
                    }}
                    className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Plans Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {content.managed.plans.map((plan, planIdx) => (
                  <div
                    key={planIdx}
                    className={`bg-white dark:bg-slate-900 rounded-xl border p-6 shadow-sm space-y-4 relative ${
                      plan.featured ? "border-primary ring-2 ring-primary/20" : "border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="size-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold">
                          {planIdx + 1}
                        </span>
                        <h3 className="font-bold text-base">{plan.name}</h3>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                        <input
                          type="checkbox"
                          checked={!!plan.featured}
                          onChange={(e) => updatePlan(planIdx, "featured", e.target.checked)}
                          className="rounded text-primary focus:ring-primary"
                        />
                        <span>Highlight ("Most Popular")</span>
                      </label>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold uppercase">Plan Name</label>
                        <input
                          type="text"
                          value={plan.name}
                          onChange={(e) => updatePlan(planIdx, "name", e.target.value)}
                          className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-1.5 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold uppercase">Badge Text</label>
                        <input
                          type="text"
                          value={plan.badge}
                          onChange={(e) => updatePlan(planIdx, "badge", e.target.value)}
                          className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-1.5 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-500 font-semibold uppercase">Tagline / Subheading</label>
                      <input
                        type="text"
                        value={plan.tagline}
                        onChange={(e) => updatePlan(planIdx, "tagline", e.target.value)}
                        className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-1.5 text-sm"
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-xs text-slate-500 font-semibold uppercase">Price Display</label>
                        <input
                          type="text"
                          value={plan.price}
                          onChange={(e) => updatePlan(planIdx, "price", e.target.value)}
                          className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-1.5 text-sm font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-semibold uppercase">CTA Button Label</label>
                        <input
                          type="text"
                          value={plan.cta}
                          onChange={(e) => updatePlan(planIdx, "cta", e.target.value)}
                          className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-1.5 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-500 font-semibold uppercase">Price Range Explanation</label>
                      <input
                        type="text"
                        value={plan.range}
                        onChange={(e) => updatePlan(planIdx, "range", e.target.value)}
                        className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-1.5 text-sm"
                      />
                    </div>

                    {/* Features checklist */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs text-slate-500 font-semibold uppercase">
                          Included Features ({plan.features.length})
                        </label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => addPlanFeature(planIdx)}
                          className="h-6 text-xs text-primary hover:bg-primary/10 px-2"
                        >
                          <Plus className="size-3 mr-1" /> Add Feature
                        </Button>
                      </div>
                      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                        {plan.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) => updatePlanFeature(planIdx, fIdx, e.target.value)}
                              className="w-full rounded border border-slate-300 dark:border-slate-700 bg-transparent px-2.5 py-1 text-xs"
                            />
                            <button
                              onClick={() => removePlanFeature(planIdx, fIdx)}
                              className="text-slate-400 hover:text-red-500 p-1"
                              title="Delete feature"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-500 font-semibold uppercase">Footnote (optional)</label>
                      <input
                        type="text"
                        value={plan.footnote || ""}
                        placeholder="e.g. OEM antivirus licensing billed separately"
                        onChange={(e) => updatePlan(planIdx, "footnote", e.target.value)}
                        className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-1.5 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: COMPARISON MATRIX */}
          <TabsContent value="comparison" className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold flex items-center gap-2">
                    <Table className="size-4 text-primary" />
                    <span>Coverage Comparison Table</span>
                  </h2>
                  <p className="text-xs text-slate-500">Edit capabilities across the 4 tiers (use ✓ for checkmark, — for not included)</p>
                </div>
                <Button onClick={addComparisonRow} size="sm" variant="outline" className="text-xs gap-1">
                  <Plus className="size-3.5" /> Add Capability
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                      <th className="text-left py-2 px-2 font-semibold">Capability</th>
                      <th className="text-left py-2 px-2 font-semibold">Essential IT</th>
                      <th className="text-left py-2 px-2 font-semibold">Managed IT</th>
                      <th className="text-left py-2 px-2 font-semibold">Managed + Security</th>
                      <th className="text-left py-2 px-2 font-semibold">Fully Managed IT</th>
                      <th className="text-center py-2 px-2 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {content.comparison.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                        <td className="py-2 px-2">
                          <input
                            type="text"
                            value={row[0]}
                            onChange={(e) => updateComparisonRow(rIdx, 0, e.target.value)}
                            className="w-full rounded border border-slate-300 dark:border-slate-700 bg-transparent px-2 py-1 font-medium"
                          />
                        </td>
                        {[1, 2, 3, 4].map((colIdx) => (
                          <td key={colIdx} className="py-2 px-2">
                            <input
                              type="text"
                              value={row[colIdx]}
                              onChange={(e) => updateComparisonRow(rIdx, colIdx, e.target.value)}
                              className="w-24 rounded border border-slate-300 dark:border-slate-700 bg-transparent px-2 py-1 text-center"
                            />
                          </td>
                        ))}
                        <td className="py-2 px-2 text-center">
                          <button
                            onClick={() => removeComparisonRow(rIdx)}
                            className="text-slate-400 hover:text-red-500"
                            title="Delete row"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* TAB 4: INDIVIDUAL SERVICES */}
          <TabsContent value="services" className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold flex items-center gap-2">
                    <Briefcase className="size-4 text-primary" />
                    <span>Individual Services Grid</span>
                  </h2>
                  <p className="text-xs text-slate-500">Standalone services offered individually or bundled</p>
                </div>
                <Button onClick={addService} size="sm" variant="outline" className="text-xs gap-1">
                  <Plus className="size-3.5" /> Add Service
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {content.services.map(([name, desc], sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-primary">Service #{sIdx + 1}</span>
                      <button
                        onClick={() => removeService(sIdx)}
                        className="text-slate-400 hover:text-red-500"
                        title="Delete service"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => updateService(sIdx, e.target.value, desc)}
                      className="w-full rounded border border-slate-300 dark:border-slate-700 bg-transparent px-2.5 py-1 text-sm font-semibold"
                    />
                    <textarea
                      rows={3}
                      value={desc}
                      onChange={(e) => updateService(sIdx, name, e.target.value)}
                      className="w-full rounded border border-slate-300 dark:border-slate-700 bg-transparent px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 5: LICENSING & SOFTWARE (ZOHO & MICROSOFT) */}
          <TabsContent value="licensing" className="space-y-6">
            {/* Zoho Plans */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-base font-bold flex items-center gap-2">
                <CreditCard className="size-4 text-primary" />
                <span>Zoho Workplace Licensing Rates</span>
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                      <th className="text-left py-2 px-2 font-semibold">Plan</th>
                      <th className="text-left py-2 px-2 font-semibold">Best for</th>
                      <th className="text-left py-2 px-2 font-semibold">Storage</th>
                      <th className="text-left py-2 px-2 font-semibold">Billed Annually</th>
                      <th className="text-left py-2 px-2 font-semibold">Billed Monthly</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {content.zohoPlans.map((row, idx) => (
                      <tr key={idx}>
                        {[0, 1, 2, 3, 4].map((colIdx) => (
                          <td key={colIdx} className="py-2 px-2">
                            <input
                              type="text"
                              value={row[colIdx]}
                              onChange={(e) => {
                                const updated = { ...content };
                                updated.zohoPlans[idx][colIdx] = e.target.value;
                                setContent(updated);
                              }}
                              className="w-full rounded border border-slate-300 dark:border-slate-700 bg-transparent px-2 py-1 text-xs"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Microsoft 365 Plans */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-base font-bold flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" />
                <span>Microsoft 365 Licensing Rates</span>
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                      <th className="text-left py-2 px-2 font-semibold">Plan</th>
                      <th className="text-left py-2 px-2 font-semibold">SKU ID</th>
                      <th className="text-left py-2 px-2 font-semibold">Price per month</th>
                      <th className="text-left py-2 px-2 font-semibold">Price per year</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {content.microsoftPlans.map((row, idx) => (
                      <tr key={idx}>
                        {[0, 1, 2, 3].map((colIdx) => (
                          <td key={colIdx} className="py-2 px-2">
                            <input
                              type="text"
                              value={row[colIdx]}
                              onChange={(e) => {
                                const updated = { ...content };
                                updated.microsoftPlans[idx][colIdx] = e.target.value;
                                setContent(updated);
                              }}
                              className="w-full rounded border border-slate-300 dark:border-slate-700 bg-transparent px-2 py-1 text-xs"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* TAB 6: BILLING TERMS & FAQs */}
          <TabsContent value="billing-faq" className="space-y-6">
            {/* Billing Terms */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold flex items-center gap-2">
                    <CreditCard className="size-4 text-primary" />
                    <span>Billing & Invoicing Terms</span>
                  </h2>
                  <p className="text-xs text-slate-500">Terms displayed under the Billing & Payment section</p>
                </div>
                <Button onClick={addBillingTerm} size="sm" variant="outline" className="text-xs gap-1">
                  <Plus className="size-3.5" /> Add Term
                </Button>
              </div>

              <div className="space-y-2">
                {content.billingTerms.map((term, tIdx) => (
                  <div key={tIdx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={term}
                      onChange={(e) => updateBillingTerm(tIdx, e.target.value)}
                      className="w-full rounded border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-1.5 text-xs"
                    />
                    <button
                      onClick={() => removeBillingTerm(tIdx)}
                      className="text-slate-400 hover:text-red-500 p-1"
                      title="Delete term"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold flex items-center gap-2">
                    <HelpCircle className="size-4 text-primary" />
                    <span>Frequently Asked Questions (FAQ)</span>
                  </h2>
                  <p className="text-xs text-slate-500">Add or edit questions and responses</p>
                </div>
                <Button onClick={addFaq} size="sm" variant="outline" className="text-xs gap-1">
                  <Plus className="size-3.5" /> Add Question
                </Button>
              </div>

              <div className="space-y-4">
                {content.faqs.map(([q, a], fIdx) => (
                  <div
                    key={fIdx}
                    className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-primary">Question #{fIdx + 1}</label>
                      <button
                        onClick={() => removeFaq(fIdx)}
                        className="text-slate-400 hover:text-red-500 p-1"
                        title="Delete question"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={q}
                      onChange={(e) => updateFaq(fIdx, e.target.value, a)}
                      className="w-full rounded border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-1.5 text-sm font-semibold"
                    />
                    <textarea
                      rows={2}
                      value={a}
                      onChange={(e) => updateFaq(fIdx, q, e.target.value)}
                      className="w-full rounded border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Banner Config */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-base font-bold">Bottom Call-To-Action Banner</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Banner Headline</label>
                  <input
                    type="text"
                    value={content.cta?.title || ""}
                    onChange={(e) => {
                      const updated = { ...content };
                      if (!updated.cta) updated.cta = {};
                      updated.cta.title = e.target.value;
                      setContent(updated);
                    }}
                    className="mt-1 w-full rounded border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-1.5 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Button Text</label>
                  <input
                    type="text"
                    value={content.cta?.buttonText || ""}
                    onChange={(e) => {
                      const updated = { ...content };
                      if (!updated.cta) updated.cta = {};
                      updated.cta.buttonText = e.target.value;
                      setContent(updated);
                    }}
                    className="mt-1 w-full rounded border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-1.5 text-sm"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Description</label>
                  <textarea
                    rows={2}
                    value={content.cta?.description || ""}
                    onChange={(e) => {
                      const updated = { ...content };
                      if (!updated.cta) updated.cta = {};
                      updated.cta.description = e.target.value;
                      setContent(updated);
                    }}
                    className="mt-1 w-full rounded border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-1.5 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Contact Email</label>
                  <input
                    type="text"
                    value={content.cta?.contactEmail || ""}
                    onChange={(e) => {
                      const updated = { ...content };
                      if (!updated.cta) updated.cta = {};
                      updated.cta.contactEmail = e.target.value;
                      setContent(updated);
                    }}
                    className="mt-1 w-full rounded border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-1.5 text-sm"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
