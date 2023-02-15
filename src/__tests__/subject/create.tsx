import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders } from '@/lib/test-utils'
import SubjectCreatePage from '@/pages/subject/create/index'

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
    expect(screen.getByTestId('submit')).toBeInTheDocument()

    expect(screen.getByText('Management Permissions')).toBeInTheDocument()
    expect(screen.getByText('Global Write Permissions')).toBeInTheDocument()

    for (const key in mockUiData) {
      mockUiData[key].forEach
      for (const { display_name } of mockUiData[key]) {
        expect(screen.getByRole('button', { name: display_name })).toBeInTheDocument()
      }
    }
  })

  it('user prompts email field', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockUiData), { status: 200 })
    renderWithProviders(<SubjectCreatePage />)

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
    expect(screen.queryByTestId('field-email')).not.toBeInTheDocument()

    userEvent.selectOptions(screen.getByTestId('field-type'), 'User')
    expect(screen.getByTestId('field-email')).toBeInTheDocument()
  })

  describe('on submit', () => {
    const mockData = {
      client_name: 'James Bond',
      client_secret: 'secret-code-word',
      client_id: 'id-abc123',
      permissions: ['DATA_ADMIN', 'READ_PRIVATE']
    }

    it('client  success', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockUiData), { status: 200 })
      renderWithProviders(<SubjectCreatePage />)
      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

      userEvent.selectOptions(screen.getByTestId('field-type'), 'Client')
      await userEvent.type(screen.getByTestId('field-name'), 'James Bond')
      await userEvent.click(screen.getByText('Data'))
      await userEvent.click(screen.getByText('PRIVATE'))
      await userEvent.click(screen.getByTestId('submit'))

      fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 })

      await waitFor(async () => {
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/client',
          expect.objectContaining({
            body: '{"permissions":["DATA_ADMIN","READ_PRIVATE"],"client_name":"James Bond"}'
          })
        )
      })

      await waitFor(async () => {
        expect(pushSpy).toHaveBeenCalledWith({
          pathname: '/subject/create/success/',
          query: {
            Client: 'James Bond',
            Id: mockData.client_id,
            Secret: mockData.client_secret
          }
        })
      })
    })

    it(' user success', async () => {
      const mockData = {
        username: 'user-abc',
        user_id: 'id-abc123',
        email: 'test@example.com'
      }

      fetchMock.mockResponseOnce(JSON.stringify(mockUiData), { status: 200 })
      renderWithProviders(<SubjectCreatePage />)
      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

      userEvent.selectOptions(screen.getByTestId('field-type'), 'User')
      await userEvent.type(screen.getByTestId('field-name'), 'James Bond')
      await userEvent.type(screen.getByTestId('field-email'), 'test@example.com')
      await userEvent.click(screen.getByText('Data'))
      await userEvent.click(screen.getByText('PRIVATE'))
      await userEvent.click(screen.getByTestId('submit'))

      fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 })

      await waitFor(async () => {
        expect(fetchMock).toHaveBeenCalledWith(
          '/api/user',
          expect.objectContaining({
            body: '{"permissions":["DATA_ADMIN","READ_PRIVATE"],"username":"James Bond","email":"test@example.com"}'
          })
        )
      })

      await waitFor(async () => {
        expect(pushSpy).toHaveBeenCalledWith({
          pathname: '/subject/create/success/',
          query: {
            User: mockData.username,
            Id: mockData.user_id,
            Email: mockData.email
          }
        })
      })
    })

    it('server error', async () => {
      const error = 'server error message'
      fetchMock.mockResponseOnce(JSON.stringify(mockUiData), { status: 200 })
      renderWithProviders(<SubjectCreatePage />)
      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

      userEvent.selectOptions(screen.getByTestId('field-type'), 'Client')
      await userEvent.type(screen.getByTestId('field-name'), 'James Bond')
      await userEvent.click(screen.getByText('Data'))
      await userEvent.click(screen.getByText('PRIVATE'))
      await userEvent.click(screen.getByTestId('submit'))

      fetchMock.mockReject(new Error(error))

      await waitFor(async () => {
        expect(screen.getByText(error)).toBeInTheDocument()
      })
    })
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
  //       const mockData: UploadDatasetResponse = {
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
  //         [JSON.stringify(mockData), { status: 200 }]
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
