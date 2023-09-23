export type SelectOption = {
  key: string;
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
