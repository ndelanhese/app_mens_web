import { Meta, StoryObj } from '@storybook/react'
import { ControlledInput as Input } from './controlledInput'

const meta: Meta = {
  title: 'Mens Lib/ui/inputs',
  component: Input,
}

export default meta

type Story = StoryObj<typeof Input>

export const ControlledInput: Story = {
  args: {
    label: 'teste',
  },
}
