import { ControlledInput } from '@components/ui/inputs/controlledInput';

import { CategoryPreviewProps } from './viewCategoryForm.types';

export const ViewCategoryForm = ({ category }: CategoryPreviewProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 overflow-y-auto sm:h-auto sm:grid-cols-2">
      <ControlledInput value={category?.id} id="id" label="Código" readOnly />
      <ControlledInput
        value={category?.name}
        id="name"
        label="Categoria"
        readOnly
      />
    </div>
  );
};
