export type CheckboxTreeProps = {
  title: string;
  id: number;
  description?: string;
  treeChildren: Array<string>;
  treeChildrenIds: Array<number>;
  handleChange?: (checkedIds: Array<number>, title: string) => void;
  defaultChecked?: Array<number>;
  disabled?: boolean;
};
