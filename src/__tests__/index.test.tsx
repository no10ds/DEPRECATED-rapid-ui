import { screen, waitFor } from '@testing-library/react'
import fetchMock from 'jest-fetch-mock'
import { renderWithProviders } from '@/lib/test-utils'
import IndexPage from '@/pages/index'
import { MethodsResponse } from '@/service/types'

const mockData: MethodsResponse = {
  can_manage_users: false,
  can_upload: false,
  can_download: false,
  can_create_schema: false,
  message: 'hello world'
}

describe('Page: Debug page', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('preloader', async () => {
    renderWithProviders(<IndexPage />)

    expect(screen.getByRole('progressbar')).toBeVisible()
  })

  describe('permissions', () => {
    it('none', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockData))
      renderWithProviders(<IndexPage />)

      await waitFor(async () =>
        expect(screen.getByText('Welcome to rAPId')).toBeVisible()
      )

      expect(screen.getByTestId('intro')).toBeVisible()

      expect(screen.queryByTitle('User Management')).not.toBeInTheDocument()
      expect(screen.queryByTitle('Data Management')).not.toBeInTheDocument()
      expect(screen.queryByTitle('Schema Management')).not.toBeInTheDocument()
      expect(screen.queryByTitle('Task Status')).not.toBeInTheDocument()
    })
  })
})
