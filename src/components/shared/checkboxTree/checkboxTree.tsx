'use client';

import { useCallback, useEffect, useState } from 'react';

import { CheckboxItem } from '@components/shared/checkboxItem';

import { nanoid } from 'nanoid';
import { CheckboxTreeProps } from './checkboxTree.types';

export const CheckboxTree = ({
  title,
  description,
  id,
  treeChildren,
  treeChildrenIds,
  handleChange,
  defaultChecked,
  disabled = false,
}: CheckboxTreeProps) => {
  const [groupIsChecked, setGroupIsChecked] = useState<boolean>(false);
  const [childrenChecked, setChildrenChecked] = useState<Array<number>>(
    defaultChecked ?? [],
  );

  const handleCheckGroup = useCallback(
    (value: boolean | string) => {
      setGroupIsChecked(value as boolean);
      if (!value) {
        setChildrenChecked([]);
        return;
      }
      setChildrenChecked(treeChildrenIds);
    },
    [treeChildrenIds],
  );

  useEffect(() => {
    if (childrenChecked.length < treeChildrenIds.length && groupIsChecked) {
      return setGroupIsChecked(false);
    }
    if (childrenChecked.length === treeChildrenIds.length && !groupIsChecked) {
      return setGroupIsChecked(true);
    }
  }, [childrenChecked.length, groupIsChecked, treeChildrenIds.length]);

  const handleCheckChildren = useCallback((value: number) => {
    setChildrenChecked(prev => {
      const existingValues = new Set(prev);
      if (existingValues.has(value)) {
        return prev.filter(item => item !== value);
      }

      return prev ? [...prev, value] : [value];
    });
  }, []);

  useEffect(() => {
    handleChange?.(childrenChecked, title);
  }, [childrenChecked, handleChange, title]);

  return (
    <div
      className="flex flex-col gap-4 data-[disabled=true]:pointer-events-none"
      data-disabled={disabled}
    >
      <CheckboxItem
        title={title}
        description={description}
        id={id}
        checked={groupIsChecked}
        handleChange={handleCheckGroup}
      />
      <div className="flex flex-col gap-4 pl-4">
        {treeChildren.map((children, index) => (
          <CheckboxItem
            key={nanoid()}
            title={children}
            id={treeChildrenIds[index]}
            checked={childrenChecked.includes(treeChildrenIds[index])}
            handleChildrenChange={handleCheckChildren}
          />
        ))}
      </div>
    </div>
  );
};
