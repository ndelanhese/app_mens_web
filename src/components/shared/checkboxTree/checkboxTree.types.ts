export type CheckboxTreeProps = {
  title: string;
  id: number;
  description?: string;
  treeChildren: Array<string>;
  treeChildrenIds: Array<number>;
  handleChange?: (checkedIds: Array<number>) => void;
};
