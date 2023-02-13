import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders } from '@/lib/test-utils'
import DownloadPage from '@/pages/data/download/'

const mockData: { [key: string]: { [key: string]: string }[] } = {
  Pizza: [
    {
      dataset: 'complicated',
      version: '3'
    },
    {
      dataset: 'complicated_high',
      version: '3'
    }
  ],
  Apples: [
    {
      dataset: 'juicy',
      version: '2'
    }
  ]
}

const pushSpy = jest.fn()
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(() => ({
    locale: 'en',
    push: pushSpy
  }))
}))

describe('Page: Login page', () => {
  afterEach(() => {
    fetchMock.resetMocks()
    jest.clearAllMocks()
  })

  it('renders dataset drodown', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 })
    renderWithProviders(<DownloadPage />)

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
    const datasetDropdown = screen.getByTestId('select-dataset')
    expect(datasetDropdown).toBeVisible()

    for (const key in mockData) {
      mockData[key].forEach
      for (const { dataset } of mockData[key]) {
        const option = within(datasetDropdown).getByRole('option', {
          name: dataset
        })
        expect(option).toBeInTheDocument()
        expect(option).toHaveValue(`${key}/${dataset}`)
      }
    }
  })

  it('renders version', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 })

    renderWithProviders(<DownloadPage />)
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
    await waitFor(async () => {
      expect(screen.getByTestId('select-version')).toBeInTheDocument()
    })
    ;[...Array(2).keys()].forEach((i) => {
      expect(
        within(screen.getByTestId('select-version')).getByRole('option', {
          name: (i + 1).toString()
        })
      ).toBeInTheDocument()
    })
  })

  it('fetch error', async () => {
    fetchMock.mockReject(new Error('fake error message'))

    renderWithProviders(<DownloadPage />)
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

    expect(screen.getByText('fake error message')).toBeInTheDocument()
  })

  it('on submit', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 })

    renderWithProviders(<DownloadPage />)
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
    await waitFor(async () => {
      expect(screen.getByTestId('select-version')).toBeInTheDocument()
    })

    await userEvent.click(screen.getByTestId('submit'))

    await waitFor(async () => {
      expect(pushSpy).toHaveBeenCalledWith(`/data/download/Pizza/complicated?version=1`)
    })
  })
})
