import { describe, expect, it } from 'vitest';
import { services } from '@/data/services';
describe('Service plan rules', () => {
  it.each(services)('$slug has exactly three plan tiers', service => {
    expect(service.plans).toHaveLength(3);
  });
  it.each(services)('$slug recommends only the middle plan', service => {
    expect(service.plans.map(plan => plan.recommended)).toEqual([false, true, false]);
  });
});