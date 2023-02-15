import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within
} from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders } from '@/lib/test-utils'
import SubjectModifyPage from '@/pages/subject/modify/index'

const mockData: Array<Record<string, string | undefined>> = [
  ...[...Array(2).keys()].map((i) => ({
    subject_id: `id_client_${i}`,
    subject_name: `client_title_${i}`,
    type: 'CLIENT'
  })),
  ...[...Array(2).keys()].map((i) => ({
    subject_id: `id_user_${i}`,
    subject_name: `user_title_${i}`,
    email: `${i}@example.com`,
    type: 'USER'
  }))
]

const pushSpy = jest.fn()
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(() => ({
    locale: 'en',
    push: pushSpy
  }))
}))

describe('Page: Subject Modify', () => {
  afterEach(() => {
    fetchMock.resetMocks()
    jest.clearAllMocks()
  })

  it.only('renders', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 })
    renderWithProviders(<SubjectModifyPage />)

    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
    expect(screen.getByTestId('field-user')).toBeInTheDocument()

    expect(fetchMock).toHaveBeenCalled()

    await waitFor(async () => {
      expect(
        within(screen.getByTestId('field-user')).getAllByRole('option')
      ).toHaveLength(mockData.length)
    })

    for (const { subject_id, subject_name } of mockData) {
      const option = screen.getByRole('option', { name: subject_name })
      expect(option).toBeInTheDocument()
      expect(option).toHaveValue(subject_id)
    }
  })

  // it('user prompts email field', async () => {
  //   fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 })
  //   renderWithProviders(<SubjectModifyPage />)

  //   await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
  //   expect(screen.queryByTestId('field-email')).not.toBeInTheDocument()

  //   userEvent.selectOptions(screen.getByTestId('field-type'), 'User')
  //   expect(screen.getByTestId('field-email')).toBeInTheDocument()
  // })

  // describe('on submit', () => {
  //   const mockData = {
  //     client_name: 'James Bond',
  //     client_secret: 'secret-code-word',
  //     client_id: 'id-abc123',
  //     permissions: ['DATA_ADMIN', 'READ_PRIVATE']
  //   }

  //   it('client  success', async () => {
  //     fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 })
  //     renderWithProviders(<SubjectModifyPage />)
  //     await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

  //     userEvent.selectOptions(screen.getByTestId('field-type'), 'Client')
  //     await userEvent.type(screen.getByTestId('field-name'), 'James Bond')
  //     await userEvent.click(screen.getByText('Data'))
  //     await userEvent.click(screen.getByText('PRIVATE'))
  //     await userEvent.click(screen.getByTestId('submit'))

  //     fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 })

  //     await waitFor(async () => {
  //       expect(fetchMock).toHaveBeenCalledWith(
  //         '/api/client',
  //         expect.objectContaining({
  //           body: '{"permissions":["DATA_ADMIN","READ_PRIVATE"],"client_name":"James Bond"}'
  //         })
  //       )
  //     })

  //     await waitFor(async () => {
  //       expect(pushSpy).toHaveBeenCalledWith({
  //         pathname: '/subject/create/success/',
  //         query: {
  //           Client: 'James Bond',
  //           Id: mockData.client_id,
  //           Secret: mockData.client_secret
  //         }
  //       })
  //     })
  //   })

  //   it(' user success', async () => {
  //     const mockData = {
  //       username: 'user-abc',
  //       user_id: 'id-abc123',
  //       email: 'test@example.com'
  //     }

  //     fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 })
  //     renderWithProviders(<SubjectModifyPage />)
  //     await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

  //     userEvent.selectOptions(screen.getByTestId('field-type'), 'User')
  //     await userEvent.type(screen.getByTestId('field-name'), 'James Bond')
  //     await userEvent.type(screen.getByTestId('field-email'), 'test@example.com')
  //     await userEvent.click(screen.getByText('Data'))
  //     await userEvent.click(screen.getByText('PRIVATE'))
  //     await userEvent.click(screen.getByTestId('submit'))

  //     fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 })

  //     await waitFor(async () => {
  //       expect(fetchMock).toHaveBeenCalledWith(
  //         '/api/user',
  //         expect.objectContaining({
  //           body: '{"permissions":["DATA_ADMIN","READ_PRIVATE"],"username":"James Bond","email":"test@example.com"}'
  //         })
  //       )
  //     })

  //     await waitFor(async () => {
  //       expect(pushSpy).toHaveBeenCalledWith({
  //         pathname: '/subject/create/success/',
  //         query: {
  //           User: mockData.username,
  //           Id: mockData.user_id,
  //           Email: mockData.email
  //         }
  //       })
  //     })
  //   })

  //   it('server error', async () => {
  //     const error = 'server error message'
  //     fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 })
  //     renderWithProviders(<SubjectModifyPage />)
  //     await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

  //     userEvent.selectOptions(screen.getByTestId('field-type'), 'Client')
  //     await userEvent.type(screen.getByTestId('field-name'), 'James Bond')
  //     await userEvent.click(screen.getByText('Data'))
  //     await userEvent.click(screen.getByText('PRIVATE'))
  //     await userEvent.click(screen.getByTestId('submit'))

  //     fetchMock.mockReject(new Error(error))

  //     await waitFor(async () => {
  //       expect(screen.getByText(error)).toBeInTheDocument()
  //     })
  //   })
  // })
})
