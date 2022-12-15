import { ComponentMeta, ComponentStory } from '@storybook/react'
import Chip from './Chip'

export default {
  title: 'Ellandi/Chip',
  component: Chip,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JEg4GJzDWL4NbiWXShxHiL/Ellandi-Prototype-V3.4?node-id=9204%3A77733'
    }
  },
  argTypes: {}
} as ComponentMeta<typeof Chip>

const Template: ComponentStory<typeof Chip> = (args) => <Chip {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Chip'
}

export const Toggle = Template.bind({})
Toggle.args = {
  ...Default.args,
  toggle: true
}

export const ToggleAvatarText = Template.bind({})
ToggleAvatarText.args = {
  ...Toggle.args,
  avatarText: 'C'
}
