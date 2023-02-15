import {
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders } from '@/lib/test-utils'
import SubjectCreatePage from '@/pages/subject/create/index'
import { UploadDatasetResponse } from '@/service/types'

const mockUiData: { [key: string]: { [key: string]: string }[] } = {
  ADMIN: [
    {
      display_name: 'Data',
      display_name_full: 'Data admin',
      name: 'DATA_ADMIN'
    },
    {
      display_name: 'User',
      display_name_full: 'User admin',
      name: 'USER_ADMIN'
    }
  ],
  GLOBAL_WRITE: [
    {
      display_name: 'ALL',
      display_name_full: 'Read all',
      name: 'READ_ALL'
    },
    {
      display_name: 'PRIVATE',
      display_name_full: 'Read private',
      name: 'READ_PRIVATE'
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

describe('Page: Subject Create', () => {
  afterEach(() => {
    fetchMock.resetMocks()
    jest.clearAllMocks()
  })

  it('renders', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockUiData), { status: 200 })
    renderWithProviders(<SubjectCreatePage />)

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
    expect(screen.getByTestId('field-type')).toBeInTheDocument()
    expect(screen.queryByTestId('field-email')).not.toBeInTheDocument()
    expect(screen.getByTestId('field-name')).toBeInTheDocument()

    expect(screen.getByText('Management Permissions')).toBeInTheDocument()
    expect(screen.getByText('Global Write Permissions')).toBeInTheDocument()

    for (const key in mockUiData) {
      mockUiData[key].forEach
      for (const { display_name } of mockUiData[key]) {
        expect(screen.getByRole('button', { name: display_name })).toBeInTheDocument()
      }
    }
  })

  //   it('renders', async () => {
  //     fetchMock.mockResponseOnce(JSON.stringify(mockUiData), { status: 200 })
  //     renderWithProviders(<SubjectCreatePage />)

  //     await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

  //     const datasetDropdown = screen.getByTestId('select-dataset')
  //     expect(datasetDropdown).toBeVisible()

  //     for (const key in mockUiData) {
  //       mockUiData[key].forEach
  //       for (const { dataset } of mockUiData[key]) {
  //         const option = within(datasetDropdown).getByRole('option', {
  //           name: dataset
  //         })
  //         expect(option).toBeInTheDocument()
  //         expect(option).toHaveValue(`${key}/${dataset}`)
  //       }
  //     }

  //     expect(screen.getByTestId('upload')).toBeInTheDocument()
  //   })

  //   it('error on fetch', async () => {
  //     fetchMock.mockReject(new Error('fake error message'))
  //     renderWithProviders(<SubjectCreatePage />)

  //     await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

  //     await waitFor(async () => {
  //       expect(screen.getByText('fake error message')).toBeInTheDocument()
  //     })
  //   })

  //   describe('on submit', () => {
  //     const file = new File(['test'], 'testfile.txt', { type: 'text/plain' })

  //     it('success', async () => {
  //       fetchMock.mockResponseOnce(JSON.stringify(mockUiData), { status: 200 })
  //       renderWithProviders(<SubjectCreatePage />)

  //       await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

  //       await fireEvent.change(screen.getByTestId('upload'), {
  //         target: { files: [file] }
  //       })

  //       userEvent.selectOptions(
  //         screen.getByTestId('select-dataset'),
  //         mockUiData['Pizza'][0].dataset
  //       )

  //       await userEvent.click(screen.getByTestId('submit'))

  //       await waitFor(async () => {
  //         expect(fetchMock).toHaveBeenLastCalledWith(
  //           '/api/datasets/Pizza/bit_complicated',
  //           expect.objectContaining({
  //             body: new FormData(),
  //             credentials: 'include',
  //             method: 'POST'
  //           })
  //         )
  //       })
  //     })

  //     it('upload status', async () => {
  //       const mockSuccess: UploadDatasetResponse = {
  //         details: {
  //           dataset_version: 12314,
  //           job_id: 'abc123',
  //           original_filename: 'my_original_name.txt',
  //           raw_filename: 'my_raw_name.txt',
  //           status: 'winning'
  //         }
  //       }

  //       fetchMock.mockResponses(
  //         [JSON.stringify(mockUiData), { status: 200 }],
  //         [JSON.stringify(mockSuccess), { status: 200 }]
  //       )
  //       renderWithProviders(<SubjectCreatePage />)
  //       await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

  //       await userEvent.click(screen.getByTestId('submit'))

  //       await waitFor(async () => {
  //         expect(screen.getByTestId('upload-status')).toBeInTheDocument()
  //       })

  //       const trackLink = screen.getByText('Track upload progress')

  //       expect(screen.getByText('Raw file name: my_raw_name.txt')).toBeInTheDocument()
  //       expect(screen.getByText('Status: winning')).toBeInTheDocument()
  //       expect(screen.getByText('Status: winning')).toBeInTheDocument()
  //       expect(screen.getByText('Version: 12314')).toBeInTheDocument()
  //       expect(trackLink).toBeInTheDocument()
  //       expect(trackLink).toHaveAttribute('href', '/tasks/abc123')
  //     })

  //     it('api error', async () => {
  //       fetchMock.mockResponseOnce(JSON.stringify(mockUiData), { status: 200 })
  //       renderWithProviders(<SubjectCreatePage />)

  //       await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

  //       fetchMock.mockReject(new Error('fake error message'))

  //       await userEvent.click(screen.getByTestId('submit'))

  //       await waitFor(async () => {
  //         expect(screen.getByText('fake error message')).toBeInTheDocument()
  //       })
  //     })
  //   })
})
