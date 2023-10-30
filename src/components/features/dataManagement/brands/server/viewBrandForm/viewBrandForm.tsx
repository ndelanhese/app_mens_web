import { ControlledInput } from '@components/ui/inputs/controlledInput';

import { BrandPreviewProps } from './viewBrandForm.types';

export const ViewBrandForm = ({ brand }: BrandPreviewProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 overflow-y-auto sm:h-auto sm:grid-cols-2">
      <ControlledInput value={brand?.id} id="id" label="Código" readOnly />
      <ControlledInput value={brand?.name} id="name" label="Marca" readOnly />
    </div>
  );
};
