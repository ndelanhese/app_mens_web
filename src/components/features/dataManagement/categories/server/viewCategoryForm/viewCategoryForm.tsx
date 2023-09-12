import { ControlledInput } from '@components/ui/inputs/controlledInput';

import { CategoryPreviewProps } from './viewCategoryForm.types';

export const ViewCategoryForm = ({ category }: CategoryPreviewProps) => {
  return (
    <div className="flex w-full flex-col gap-4">
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
