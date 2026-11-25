import PropertyManagerServicePage, { propertyManagerMetadata } from '@/components/PropertyManagerServicePage';
import { PROPERTY_MANAGER_SERVICES } from '@/lib/propertyManagerServices';

const SERVICE = PROPERTY_MANAGER_SERVICES['interior-remodels'];

export const metadata = propertyManagerMetadata(SERVICE);

export default function Page() {
  return <PropertyManagerServicePage service={SERVICE} />;
}
