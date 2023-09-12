export type Category = {
  id: number;
  name: string;
};

export type CategoriesTableProps = {
  rows: Array<Category>;
};
