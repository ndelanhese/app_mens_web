import { ControlledInput } from '@components/ui/inputs/controlledInput';

import { PromotionPreviewProps } from './viewPromotionForm.types';

export const ViewPromotionForm = ({ promotion }: PromotionPreviewProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 overflow-y-auto sm:h-auto sm:grid-cols-2">
      <ControlledInput value={promotion?.id} id="id" label="Código" readOnly />
      <ControlledInput
        value={promotion?.name}
        id="name"
        label="Promoção"
        readOnly
      />
    </div>
  );
};
