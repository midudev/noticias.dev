import { useState } from 'react'

export const RESULTS = {
  IDLE: 'IDLE',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  LOADING: 'LOADING',
  ALREADY_SUBSCRIBED: 'ALREADY_SUBSCRIBED',
}

export const useNewsletter = () => {
  const [result, setResult] = useState(RESULTS.IDLE)

  const register = async ({ email }) => {
    setResult(RESULTS.LOADING)

    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })

    if (response.status === 409) setResult(RESULTS.ALREADY_SUBSCRIBED)
    else if (!response.ok) setResult(RESULTS.ERROR)
    else setResult(RESULTS.SUCCESS)

    setTimeout(() => {
      setResult(RESULTS.IDLE)
    }, 3500)
  }

  return { register, result }
}
