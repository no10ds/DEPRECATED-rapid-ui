import { ComponentMeta, ComponentStory } from '@storybook/react'
import BadgeNumber from './BadgeNumber'

export default {
  title: 'Ellandi/BadgeNumber',
  component: BadgeNumber,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JEg4GJzDWL4NbiWXShxHiL/Ellandi-Prototype-V3.4?node-id=9316%3A77037'
    }
  }
} as ComponentMeta<typeof BadgeNumber>

const Template: ComponentStory<typeof BadgeNumber> = (args) => <BadgeNumber {...args} />

export const Default = Template.bind({})
Default.args = {
  label: '1'
}
