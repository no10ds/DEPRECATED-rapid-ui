import { ComponentMeta, ComponentStory } from '@storybook/react'
import Skeleton from './Skeleton'

export default {
  title: 'Ellandi/Skeleton',
  component: Skeleton
} as ComponentMeta<typeof Skeleton>

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />

export const Default = Template.bind({})
Default.args = {}
