export type Brand = {
  id: number;
  name: string;
};

export type BrandsPageSearchParams = {
  params: { slugName: string; id: string };
};
