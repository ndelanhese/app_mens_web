import { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

const meta: Meta = {
  title: 'Mens Lib/ui/buttons',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Component: Story = {
  args: {
    children: 'Button',
  },
};
