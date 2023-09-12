export type SelectOption = {
  label: string;
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
  control: any;
};
