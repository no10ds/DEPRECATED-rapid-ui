import { ComponentMeta, ComponentStory } from '@storybook/react'
import RadioSkeleton from './RadioSkeleton'

export default {
  title: 'Ellandi/Skeleton',
  component: RadioSkeleton
} as ComponentMeta<typeof RadioSkeleton>

const Template: ComponentStory<typeof RadioSkeleton> = (args) => (
  <RadioSkeleton {...args} />
)

export const SkeletonRadio = Template.bind({})
SkeletonRadio.args = {}
