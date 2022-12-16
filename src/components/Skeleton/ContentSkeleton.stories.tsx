import { ComponentMeta, ComponentStory } from '@storybook/react'
import ContentSkeleton from './ContentSkeleton'

export default {
  title: 'Ellandi/Skeleton',
  component: ContentSkeleton
} as ComponentMeta<typeof ContentSkeleton>

const Template: ComponentStory<typeof ContentSkeleton> = (args) => (
  <ContentSkeleton {...args} />
)

export const SkeletonContent = Template.bind({})
SkeletonContent.args = {}
