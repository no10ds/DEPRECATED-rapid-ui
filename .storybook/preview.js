import ThemeProvider from '../src/components/ThemeProvider/ThemeProvider'
import LocalizationProvider from '../src/components/LocalizationProvider/LocalizationProvider'
import { setConfig } from 'next/config'
import { publicRuntimeConfig } from '../next.config'
setConfig({ publicRuntimeConfig })

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  backgrounds: {
    default: 'White',
    values: [
      { name: 'Ellandi dark grey', value: '#AEAEAE' },
      { name: 'Ellandi light', value: '#E9EAEC' },
      { name: 'White', value: '#fff' }
    ]
  }
}

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <LocalizationProvider>
        <Story />
      </LocalizationProvider>
    </ThemeProvider>
  )
]
