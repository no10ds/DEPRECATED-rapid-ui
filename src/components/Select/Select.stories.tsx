import { ComponentMeta, ComponentStory } from '@storybook/react'
import Select from './Select'

export default {
  title: 'Ellandi/Forms/Select',
  component: Select,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/3sUhnrrwoHUxg8ie3mxwtG/Ellandi-Prototype-V5?node-id=11476%3A76089'
    }
  }
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Age',
  fullWidth: true,
  data: ['Ten', 'Twenty', 'Thirty']
}
