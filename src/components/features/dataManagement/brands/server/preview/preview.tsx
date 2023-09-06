import { Input } from '@/components/ui/shadcn/input';

import { ControlledInput } from '@components/ui/inputs/controlledInput';

import { BrandPreviewProps } from './preview.types';

export const BrandPreview = ({ brand }: BrandPreviewProps) => {
  return (
    <div className="flex flex-row gap-4">
      <ControlledInput value={brand.id} id="id" label="Código" readOnly />
      <ControlledInput value={brand.name} id="name" label="Marca" readOnly />
    </div>
  );
};
