import { useQuery } from '@tanstack/react-query'
import React from 'react'

function ApiPage() {
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTestData
  })

  if (isLoading) return <p>Loading...</p>
  if (isSuccess)
    return (
      <div>
        <p>api data:</p>
        <textarea style={{ width: '80%', height: '200px' }}>
          {JSON.stringify({ data })}
        </textarea>
      </div>
    )
}

export default ApiPage

export const fetchTestData = async (): Promise<string[]> => {
  const res = await fetch('https://swapi.dev/api/planets/1/')
  if (res.ok) return res.json()
}
