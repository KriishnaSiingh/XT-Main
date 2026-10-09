import { createFileRoute } from "@tanstack/react-router";
import { PricingPage } from "@/components/PricingPage";

const title = "Pricing – Managed IT Services, Zoho & Microsoft 365 Plans | Xorvo Tech";
const description = "Transparent pricing for managed IT support, monitoring & security, plus Zoho Workplace and Microsoft 365 licensing — all in one place. Get a custom quote today.";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: PricingPage,
});
