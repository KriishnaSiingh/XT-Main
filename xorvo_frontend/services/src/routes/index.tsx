import { createFileRoute, Navigate } from "@tanstack/react-router";
import { serviceHead } from "@/data/services";
export const Route = createFileRoute("/")({
  head: () => ({ meta: serviceHead().meta.map(meta => 'title' in meta ? { title: 'XorvoTech | Enterprise Technology Solutions' } : meta.property === 'og:title' ? { property: 'og:title', content: 'XorvoTech | Enterprise Technology Solutions' } : meta) }),
  component: Index,
});
function Index() {
  return <Navigate to="/services" replace />;
}
