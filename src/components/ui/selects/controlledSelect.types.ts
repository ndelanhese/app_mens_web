import { Control, FieldValue, FieldValues } from 'react-hook-form';

export type SelectOption = {
  key: string;
  value: string;
};

export type SelectProps = {
  name: string;
  label: string;
  options: SelectOption[];
  placeHolder?: string;
  searchLabel?: string;
  emptyLabel?: string;
  defaultValue?: string;
  className?: string;
  errorMessage?: string;
  control: Control<FieldValue<FieldValues>>;
  isRequired?: boolean;
};
