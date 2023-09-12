export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = {
  options: SelectOption[];
  placeHolder?: string;
  searchLabel?: string;
  emptyLabel?: string;
  defaultValue?: string;
  onChange?: (currentValue: string) => void;
};
