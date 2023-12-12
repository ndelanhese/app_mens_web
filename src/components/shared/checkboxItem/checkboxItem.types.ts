export type CheckboxItemProps = {
  title: string;
  id: number;
  description?: string;
  checked?: boolean;
  handleChange?: (value: string | boolean) => void;
  handleChildrenChange?: (itemId: number) => void;
};
