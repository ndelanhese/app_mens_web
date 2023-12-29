'use client';

import { memo, useMemo } from 'react';

import { Controller } from 'react-hook-form';
import type { StylesConfig } from 'react-select';
import Select from 'react-select';
import { twMerge } from 'tailwind-merge';
import { SelectProps } from './controlledSelect.types';
import { useTheme } from 'next-themes';

const ControlledSelectComponent = ({
  name,
  label,
  options,
  placeHolder,
  isRequired = false,
  emptyLabel,
  defaultValue,
  className,
  errorMessage,
  control,
  disabled = false,
  isLoading = false,
  isClearable = true,
  isSearchable = true,
  menuPosition = 'top',
}: SelectProps) => {
  const { theme } = useTheme();

  const colorStyles: StylesConfig = {
    control: styles => ({
      ...styles,
      backgroundColor: theme === 'light' ? '#ffffff' : '#09090b',
      color: theme === 'light' ? '#09090b' : '#fafafa',
      border: theme === 'light' ? '1px solid #e7e7e7' : '1px solid #1C1C1C',
      boxShadow: 'none',
      '&:hover': {
        border: theme === 'light' ? '1px solid #cccccc' : '1px solid #555555',
      },
    }),
    group: styles => ({
      ...styles,
      backgroundColor: '#09090b',
      color: '#fafafa',
    }),
    menu: styles => ({
      ...styles,
      backgroundColor: theme === 'light' ? '#e7e7e7' : '#09090b',
      border: theme === 'light' ? '1px solid #cccccc' : '1px solid #27272a',
      borderRadius: '6px',
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? theme === 'light'
            ? '#2e2e2e'
            : '#3f3f46'
          : isSelected
            ? theme === 'light'
              ? '#646464'
              : '#27272a'
            : isFocused
              ? theme === 'light'
                ? '#ffffff'
                : '#18181b'
              : undefined,
        color:
          theme === 'light'
            ? isDisabled
              ? '#2e2e2e'
              : '#09090b'
            : isDisabled
              ? '#3f3f46'
              : '#fafafa',
        cursor: isDisabled ? 'not-allowed' : 'default',
        fontSize: '0.75rem',
        lineHeight: '1.125rem',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? theme === 'light'
                ? '#adadad '
                : '#111827 '
              : undefined
            : undefined,
        },
      };
    },
    input: styles => ({
      ...styles,
      color: theme === 'light' ? '#09090b' : '#fafafa',
      padding: '0.5925rem .5rem 0.5925rem .5rem',
      borderRadius: '8px',
    }),

    placeholder: styles => ({
      ...styles,
      color: theme === 'light' ? '#dbdbdb' : '#3f3f46',
      padding: '.5rem .5rem .5rem .5rem',
      fontSize: '.9rem',
      lineHeight: '1.125rem',
    }),
    singleValue: styles => ({
      ...styles,
      color: theme === 'light' ? '#09090b' : '#fafafa',
      borderRadius: '8px',
      padding: '.5rem .5rem .5rem .5rem',
      fontSize: '.95rem',
      lineHeight: '1.125rem',
    }),
    indicatorSeparator: styles => ({
      ...styles,
      backgroundColor: '#27272a',
    }),
    clearIndicator: styles => ({
      ...styles,
      color: theme === 'light' ? '#cccccc' : '#3f3f46',
    }),
    dropdownIndicator: styles => ({
      ...styles,
      color: theme === 'light' ? '#cccccc' : '#3f3f46',
    }),
    loadingIndicator: styles => ({
      ...styles,
      color: theme === 'light' ? '#cccccc' : '#3f3f46',
    }),
  };

  const memoizedDefaultValue = useMemo(
    () =>
      options?.find(
        option =>
          option?.label === defaultValue || option?.value === defaultValue,
      ),
    [defaultValue, options],
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={memoizedDefaultValue ?? ''}
      render={({ field: { onChange, value } }) => (
        <div className={twMerge('flex flex-col transition-colors', className)}>
          <label className="mb-2 text-black-40 dark:text-white-80">
            {label} {isRequired && <span className="text-red-700"> *</span>}
          </label>
          <Select
            options={options}
            onChange={onChange}
            defaultValue={memoizedDefaultValue}
            value={value}
            isLoading={isLoading}
            isDisabled={disabled}
            isClearable={isClearable}
            isSearchable={isSearchable}
            menuPlacement={menuPosition}
            styles={colorStyles}
            closeMenuOnScroll
            placeholder={placeHolder}
            noOptionsMessage={() => emptyLabel ?? 'Sem itens'}
          />
          {errorMessage && (
            <span className="text-sm text-red-600">{errorMessage}</span>
          )}
        </div>
      )}
    />
  );
};

export const ControlledSelect = memo(ControlledSelectComponent);
