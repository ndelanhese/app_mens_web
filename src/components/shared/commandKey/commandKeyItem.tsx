'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { CommandItem } from '@components/ui/shadcn/command/command';

import { CommandKeyItemProps } from './commandKey.types';

export const CommandKeyItem = ({
  icon: Icon,
  title,
  route,
  setOpen,
}: CommandKeyItemProps) => {
  const router = useRouter();
  return (
    <Link href={route} passHref prefetch={true}>
      <CommandItem
        onSelect={() => {
          setOpen(open => !open);
          router.push(route);
        }}
        onClick={() => {
          setOpen(open => !open);
          router.push(route);
        }}
        className="cursor-pointer"
      >
        <Icon className="mr-2 h-4 w-4" />
        <span>{title}</span>
      </CommandItem>
    </Link>
  );
};
