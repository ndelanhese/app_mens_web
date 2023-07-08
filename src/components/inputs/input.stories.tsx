import { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'

const meta: Meta = {
  title: 'Mens Lib/ui/inputs',
  component: Input,
}

export default meta

type Story = StoryObj<typeof Input>

export const Component: Story = {
  args: {},
}
