import { ControlledInput } from '@components/ui/inputs/controlledInput';

import { BrandPreviewProps } from './viewBrandForm.types';

export const ViewBrandForm = ({ brand }: BrandPreviewProps) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <ControlledInput value={brand?.id} id="id" label="Código" readOnly />
      <ControlledInput value={brand?.name} id="name" label="Marca" readOnly />
    </div>
  );
};
