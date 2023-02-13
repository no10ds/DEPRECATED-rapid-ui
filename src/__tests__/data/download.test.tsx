import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders } from '@/lib/test-utils'
import DownloadPage from '@/pages/data/download/'
import { AuthResponse, GetLoginResponse } from '@/service/types'

const mockAuth: AuthResponse = { detail: 'success' }
const mockLogin: GetLoginResponse = { auth_url: 'http://my-apiurl/' }

const replaceSpy = jest.fn()
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(() => ({
    locale: 'en',
    replace: replaceSpy
  }))
}))

describe('Page: Login page', () => {
  afterEach(() => {
    fetchMock.resetMocks()
    jest.clearAllMocks()
  })

  it('fetch error', async () => {
    fetchMock.mockReject(new Error('fake error message'))

    renderWithProviders(<DownloadPage />)
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

    expect(screen.getByText('fake error message')).toBeInTheDocument()
  })

  // it('renders after preloader', async () => {
  //   renderWithProviders(<DownloadPage />)

  //   await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
  //   const link = screen.getByTestId('login-link')
  //   expect(link).toBeVisible()
  //   expect(link).toHaveAttribute('href', '/login')
  // })

  // it('on valid auth redirects', async () => {
  //   fetchMock.mockResponses(
  //     [JSON.stringify(mockAuth), { status: 200 }],
  //     [JSON.stringify(mockLogin), { status: 200 }]
  //   )
  //   renderWithProviders(<DownloadPage />)
  //   await waitFor(async () => {
  //     expect(replaceSpy).toHaveBeenCalledWith({
  //       pathname: '/'
  //     })
  //   })
  //   expect(screen.getByTestId('login-link')).toHaveAttribute('href', mockLogin.auth_url)
  // })

  // it.skip('on error', () => jest.fn())
})
