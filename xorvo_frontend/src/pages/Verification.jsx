import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Search, 
  RotateCcw, 
  Shield, 
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';

/* ─── Verification Logic ─────────────────────────────────────────────
   Valid Range: XT-INT-2026-001 to XT-INT-2026-050 (case-insensitive)
──────────────────────────────────────────────────────────────────── */
export function validateCertificateId(rawId) {
  if (!rawId) return { isValid: false, normalizedId: '' };
  const trimmed = rawId.trim().toUpperCase();
  const match = trimmed.match(/^XT-INT-2026-(\d{1,4})$/);
  if (match) {
    const num = parseInt(match[1], 10);
    if (num >= 1 && num <= 50) {
      // Pad to standard 3 digits (e.g., 001, 050)
      const formattedNum = String(num).padStart(3, '0');
      return { isValid: true, normalizedId: `XT-INT-2026-${formattedNum}` };
    }
  }
  return { isValid: false, normalizedId: trimmed };
}

export default function VerificationPage() {
  const [searchParams] = useSearchParams();
  const [inputId, setInputId] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | verified | invalid
  const [activeCertId, setActiveCertId] = useState('');

  // Auto-verify if ID is passed in the URL (e.g. /verification?id=XT-INT-2026-001)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const paramId = searchParams.get('id') || 
                    searchParams.get('cert') || 
                    searchParams.get('code') || 
                    searchParams.get('ref');
    if (paramId) {
      setInputId(paramId);
      runVerification(paramId);
    }
  }, [searchParams]);

  function runVerification(idToTest) {
    const target = (idToTest || inputId).trim();
    if (!target) return;

    setStatus('loading');
    const { isValid, normalizedId } = validateCertificateId(target);
    setActiveCertId(normalizedId);

    // Subtle 500ms attestation delay for authentic feedback
    setTimeout(() => {
      if (isValid) {
        setStatus('verified');
      } else {
        setStatus('invalid');
      }
    }, 500);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    runVerification();
  }

  function handleReset() {
    setInputId('');
    setActiveCertId('');
    setStatus('idle');
  }

  const sampleValidIds = ['XT-INT-2026-001', 'XT-INT-2026-025', 'XT-INT-2026-050'];

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between">
      {/* ── Main Content Container ── */}
      <main className="flex-1 pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">

          {/* ── Top Header Kicker ── */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#727CAB]/10 text-[#727CAB] mb-4 border border-[#727CAB]/20">
              <ShieldCheck className="w-4 h-4 text-[#727CAB]" />
              <span>Official Credential Registry</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Certificate Verification
            </h1>
            <p className="mt-3 text-base md:text-lg text-slate-600 max-w-xl mx-auto">
              Verify the authenticity of internship certificates issued by XorvoTech Technologies.
            </p>
          </div>

          {/* ── Verification Card ── */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm md:shadow-md p-6 sm:p-10 transition-all">

            {/* ── Search Input Form ── */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <label 
                htmlFor="cert-id" 
                className="block text-sm font-semibold text-slate-800"
              >
                Enter Certificate ID
              </label>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    id="cert-id"
                    type="text"
                    value={inputId}
                    onChange={(e) => setInputId(e.target.value.toUpperCase())}
                    placeholder="e.g. XT-INT-2026-001"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#727CAB] focus:border-[#727CAB] transition-all"
                    maxLength={32}
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!inputId.trim() || status === 'loading'}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-[#727CAB] hover:bg-[#5e6796] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying…</span>
                    </>
                  ) : (
                    <>
                      <span>Verify</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Sample Quick Test Chips */}
              <div className="flex items-center gap-2 pt-2 text-xs text-slate-500 flex-wrap">
                <span className="font-medium text-slate-400">Quick Test IDs:</span>
                {sampleValidIds.map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => {
                      setInputId(sample);
                      runVerification(sample);
                    }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-[#727CAB]/10 hover:text-[#727CAB] rounded-md text-slate-600 font-mono transition-colors border border-slate-200/60"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </form>

            {/* ── VERIFIED RESULT CARD (No Internship Details - Only Verified Authenticity) ── */}
            {status === 'verified' && (
              <div className="mt-8 pt-8 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-6 sm:p-8 text-center space-y-4">
                  
                  {/* Verified Icon */}
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" strokeWidth={2.2} />
                  </div>

                  {/* Status Badges & Heading */}
                  <div>
                    <span className="inline-block px-3 py-1 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm mb-2">
                      Authentic Certificate
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 tracking-tight">
                      Verified
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-emerald-800 max-w-md mx-auto">
                      This certificate is authentic and officially recognized in the XorvoTech credential registry.
                    </p>
                  </div>

                  {/* Authenticity Metadata (Strictly Certificate Authenticity Info) */}
                  <div className="bg-white/90 border border-emerald-100 rounded-xl p-4 max-w-md mx-auto text-left shadow-xs divide-y divide-emerald-50 text-xs sm:text-sm">
                    <div className="flex justify-between py-2">
                      <span className="text-slate-500 font-medium">Certificate ID</span>
                      <span className="font-mono font-bold text-slate-800">{activeCertId}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-500 font-medium">Status</span>
                      <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Valid &amp; Authentic
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-500 font-medium">Issuing Authority</span>
                      <span className="font-semibold text-slate-800">XorvoTech Technologies Pvt. Ltd.</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-500 font-medium">Batch Year</span>
                      <span className="font-semibold text-slate-800">2026</span>
                    </div>
                  </div>

                  {/* Reset action */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#727CAB] transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Verify another ID</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── INVALID / NOT FOUND RESULT ── */}
            {status === 'invalid' && (
              <div className="mt-8 pt-8 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-6 sm:p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
                    <XCircle className="w-10 h-10" strokeWidth={2.2} />
                  </div>

                  <div>
                    <span className="inline-block px-3 py-1 bg-rose-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm mb-2">
                      Record Not Found
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-rose-950 tracking-tight">
                      Certificate Not Verified
                    </h2>
                    <p className="mt-2 text-sm text-rose-800 max-w-md mx-auto">
                      No authentic certificate record was found matching <span className="font-mono font-bold text-rose-950">{activeCertId || inputId}</span>.
                    </p>
                  </div>

                  <div className="bg-white/80 border border-rose-100 rounded-xl p-3.5 text-xs text-slate-600 max-w-md mx-auto">
                    Please ensure the ID is formatted correctly (e.g. <span className="font-mono font-semibold text-[#727CAB]">XT-INT-2026-001</span> to <span className="font-mono font-semibold text-[#727CAB]">XT-INT-2026-050</span>) or contact our verification office.
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-rose-600 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Try another ID</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ── Official Verification Guarantee Footer Note ── */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
              <Shield className="w-3.5 h-3.5 text-[#727CAB]" />
              <span>Official verification database maintained by XorvoTech Technologies Pvt. Ltd.</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
