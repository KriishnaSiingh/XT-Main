import { createFileRoute } from '@tanstack/react-router';
import { ServiceDetail } from '@/components/services/detail';
import { services, serviceHead } from '@/data/services';
const service = services[1];
export const Route = createFileRoute('/services/cloud-infrastructure')({
 head: () => serviceHead(service),
 component: ServicePage,
});
function ServicePage() { return service ? <ServiceDetail service={service}/> : null; }
