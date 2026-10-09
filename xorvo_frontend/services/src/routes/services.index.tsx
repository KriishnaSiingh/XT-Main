import { createFileRoute } from '@tanstack/react-router';
import { ServicesOverview } from '@/components/services/overview';
import { serviceHead } from '@/data/services';
export const Route = createFileRoute('/services/')({ head: () => serviceHead(), component: ServicesOverview });
