import { defaultPricingContent } from "@/content/pricingContent";

const STORAGE_KEY = "xorvo_pricing_content_v1";

const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl.trim() !== "") {
    return envUrl.replace(/\/+$/, "");
  }
  return "http://localhost:3001";
};

export const pricingService = {
  /**
   * Retrieves the current pricing content.
   * Priority: Backend API -> LocalStorage -> Default bundled content.
   */
  async getPricingContent() {
    // 1. Try to fetch from backend API
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/pricing`, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          // Cache in local storage for offline resiliency
          localStorage.setItem(STORAGE_KEY, JSON.stringify(result.data));
          return result.data;
        }
      }
    } catch (err) {
      console.warn("Could not reach pricing API, checking local storage cache...", err.message);
    }

    // 2. Check local storage cache
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (err) {
      console.warn("Could not parse cached pricing content:", err);
    }

    // 3. Fallback to default
    return defaultPricingContent;
  },

  /**
   * Saves updated pricing content to the backend API and localStorage.
   */
  async savePricingContent(newContent) {
    let apiSuccess = false;
    let errorMessage = null;

    // 1. Attempt to save to backend API
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/pricing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContent),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          apiSuccess = true;
        }
      } else {
        errorMessage = `Server returned status ${response.status}`;
      }
    } catch (err) {
      errorMessage = err.message || "Failed to reach server";
    }

    // 2. Always persist locally
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
    } catch (err) {
      console.error("Failed to save to localStorage:", err);
    }

    // 3. Notify listening components
    window.dispatchEvent(new CustomEvent("pricing-content-updated", { detail: newContent }));

    return {
      success: true,
      apiSynced: apiSuccess,
      warning: apiSuccess ? null : `Saved locally. Backend sync notice: ${errorMessage || "Backend offline"}`
    };
  },

  /**
   * Resets pricing content back to default values.
   */
  async resetToDefault() {
    return this.savePricingContent(defaultPricingContent);
  }
};
