export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = {
  options: SelectOption[] | undefined;
  placeHolder?: string;
  searchLabel?: string;
  emptyLabel?: string;
  defaultValue?: string;
  onChange?: (currentValue: string | undefined) => void;
};
