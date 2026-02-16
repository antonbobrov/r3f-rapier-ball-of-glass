import { BASE_INSTANCE, BASE_SETTINGS } from '../../settings';
import { TOptionalSettings } from '../../types';

export function mergeStripeSettings(settings: TOptionalSettings) {
  return {
    ...BASE_SETTINGS,
    ...settings,
    instances:
      settings.instances?.map((instance) => ({
        ...BASE_INSTANCE,
        ...instance,
      })) ?? [],
  };
}
