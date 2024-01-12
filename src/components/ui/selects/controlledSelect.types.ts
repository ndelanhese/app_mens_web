import { ReactNode } from 'react';

import { Control, FieldValue, FieldValues } from 'react-hook-form';
import type { GroupBase } from 'react-select';

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectGroupedOption = {
  label: string;
  options: Array<SelectOption>;
};

export type Props = {
  name: string;
  label: string;
  options: SelectOption[] | undefined;
  placeHolder?: string;
  searchLabel?: string;
  emptyLabel?: string;
  className?: string;
  errorMessage?: string;
  control?: Control<FieldValue<FieldValues>>;
  isRequired?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  closeMenuOnSelect?: boolean;
  menuPosition?: 'top' | 'bottom';
  newItemLabel?: string;
  newItemCallbackFunction?: (name: string) => void;
};

export type multiProps =
  | {
      defaultValue?: string | undefined;
      isMulti?: false;
    }
  | {
      defaultValue?: string[] | undefined;
      isMulti: true;
    };

export type optionsProps =
  | {
      formatGroupLabel: (data: GroupBase<unknown>) => ReactNode;
      options: SelectGroupedOption[] | undefined;
    }
  | {
      formatGroupLabel?: undefined;
      options: SelectOption[] | undefined;
    };

export type SelectProps = Props & multiProps & optionsProps;
