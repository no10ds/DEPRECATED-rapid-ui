import { ComponentMeta, ComponentStory } from '@storybook/react'
import SimpleTable from './SimpleTable'

export default {
  title: 'Ellandi/Table/SimpleTable',
  component: SimpleTable,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/WeQvrqCCo3rxUbQkxT31Q8/Ellandi-Prototype-V4?node-id=8805%3A74218'
    }
  }
} as ComponentMeta<typeof SimpleTable>

const Template: ComponentStory<typeof SimpleTable> = (args) => <SimpleTable {...args} />

export const Default = Template.bind({})
Default.args = {
  list: [
    [
      { children: 'Colors', component: 'th' },
      { children: 'Food', component: 'th' }
    ],
    [{ children: <p>Red</p> }, { children: <p>Chips</p> }],
    [{ children: <p>Blue</p> }, { children: <p>Pizza</p> }]
  ]
}

export const VerticalHeadings = Template.bind({})
VerticalHeadings.args = {
  list: [
    [
      { children: 'Colors', component: 'th' },
      { children: <p>Red</p> },
      { children: <p>Blue</p> }
    ],
    [
      { children: 'Food', component: 'th' },
      { children: <p>Pizza</p> },
      { children: <p>Chips</p> }
    ]
  ]
}
