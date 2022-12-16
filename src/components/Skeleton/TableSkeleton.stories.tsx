import { ComponentMeta, ComponentStory } from '@storybook/react'
import TableSkeleton from './TableSkeleton'

export default {
  title: 'Ellandi/Skeleton',
  component: TableSkeleton
} as ComponentMeta<typeof TableSkeleton>

const Template: ComponentStory<typeof TableSkeleton> = (args) => (
  <TableSkeleton {...args} />
)

export const SkeletonTable = Template.bind({})
SkeletonTable.args = {}
