import { Dispatch, ElementType, SetStateAction } from 'react';

export type CommandKeyItemProps = {
  icon: ElementType;
  route: string;
  title: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export type CommandKeyProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export type CommandKeyItemsProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};
