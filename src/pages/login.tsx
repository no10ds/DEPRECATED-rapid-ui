import { Button, PublicLayout } from '@/components'
import { Typography } from '@mui/material'
import env from '@beam-australia/react-env'
import { useState } from 'react'
import { useQueries } from '@tanstack/react-query'
import { AuthResponse } from '@/service/types'
import Router from 'next/router'

const IndexPage = () => {
  const API_URL = env('API_URL')
  const [authUrl, setAuthUrl] = useState('/login')

  const results = useQueries({
    queries: [
      {
        queryKey: ['authStatus'],
        queryFn: async (): Promise<AuthResponse> => {
          const res = await fetch(`${API_URL}/auth`, { credentials: 'include' })
          return res.json()
        },
        keepPreviousData: false,
        cacheTime: 0,
        refetchInterval: 0,
        onSuccess: (data) => {
          const { detail } = data
          if (detail === 'success') {
            Router.replace({
              pathname: '/'
            })
          }
        }
      },
      {
        queryKey: ['loginLink'],
        queryFn: async () => {
          const res = await fetch(`${API_URL}/oauth2/login`)
          return res.json()
        },
        onSuccess: (data) => {
          setAuthUrl(data.auth_url)
        },
        keepPreviousData: false,
        cacheTime: 0,
        refetchInterval: 0
      }
    ]
  })

  if (results[0].isLoading || results[1].isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Button href={authUrl} color="primary" size="large" fullWidth disableRoute>
        Login
      </Button>
    </>
  )
}

export default IndexPage
IndexPage.getLayout = (page) => (
  <PublicLayout
    title="Welcome Back"
    promo={
      <>
        <Typography gutterBottom variant="body1">
          Project rAPId aims to create consistent, secure, interoperable data storage and
          sharing interfaces (APIs) that enable departments to discover, manage and share
          data and metadata amongst themselves.
        </Typography>

        <Typography gutterBottom variant="body1">
          This will improve the government's use of data by making it more scalable,
          secure, and resilient, helping to match the rising demand for good-quality
          evidence in the design, delivery, and evaluation of public policy.
        </Typography>

        <Typography gutterBottom variant="body1">
          The project aims to deliver a replicable template for simple data storage
          infrastructure in AWS, a RESTful API and custom frontend UI to ingest and share
          named, standardised datasets.
        </Typography>
      </>
    }
  >
    {page}
  </PublicLayout>
)
