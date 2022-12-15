import { ComponentMeta, ComponentStory } from '@storybook/react'
import TextField from './TextField'

export default {
  title: 'Ellandi/Forms/TextField',
  component: TextField,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/WeQvrqCCo3rxUbQkxT31Q8/Ellandi-Prototype-V4?node-id=10150%3A62998'
    }
  },
  argTypes: { onChange: { action: 'changed' } }
} as ComponentMeta<typeof TextField>

const Template: ComponentStory<typeof TextField> = ({ ...args }) => (
  <TextField {...args} />
)

export const Default = Template.bind({})
Default.args = {
  label: 'Enter your name'
}

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = {
  ...Default.args,
  placeholder: 'e.g. Joe Bloggs'
}
