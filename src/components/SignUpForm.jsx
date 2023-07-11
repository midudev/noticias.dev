import { useEffect, useId, useState } from 'react'

import { Button } from '@/components/Button'

const RESULTS = {
  IDLE: 'IDLE',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  LOADING: 'LOADING',
  ALREADY_SUBSCRIBED: 'ALREADY_SUBSCRIBED',
}

export function SignUpForm() {
  const [result, setResult] = useState(RESULTS.IDLE)

  let id = useId()

  const handleSubmit = async (event) => {
    event.preventDefault()

    // get email from formData from event
    const formData = new FormData(event.target)
    const email = formData.get('email')

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

  const getButtonClasses = () => {
    if (result === RESULTS.LOADING) return 'border-transparent text-white'
    if (result === RESULTS.SUCCESS) return 'border-green-500 text-white'
    if (result === RESULTS.ALREADY_SUBSCRIBED)
      return 'border-blue-500 text-white'
    if (result === RESULTS.ERROR) return 'border-red-500 text-white'
    return 'border-transparent text-white'
  }

  const getButtonLiteral = () => {
    if (result === RESULTS.LOADING) return null
    if (result === RESULTS.SUCCESS) return '¡Hecho!'
    if (result === RESULTS.ALREADY_SUBSCRIBED) return '¡Ya estás apuntado!'
    if (result === RESULTS.ERROR) return 'Error'
    return '¡Me apunto!'
  }

  return (
    <div>
      <form
        className="relative isolate mt-8 flex items-center pr-1"
        onSubmit={handleSubmit}
      >
        <label htmlFor={id} className="sr-only">
          Escribe aquí tu email
        </label>
        <input
          required
          type="email"
          autoComplete="email"
          name="email"
          id={id}
          placeholder="Escribe aquí tu email"
          className="peer w-0 flex-auto bg-transparent px-4 py-2.5 text-base text-white placeholder:text-gray-300 focus:outline-none sm:text-[0.8125rem]/6"
        />
        <Button
          className={getButtonClasses()}
          disabled={result !== RESULTS.IDLE}
          loading={result === RESULTS.LOADING}
          type="submit"
          arrow={result === RESULTS.IDLE}
        >
          {getButtonLiteral()}
        </Button>
        <div className="absolute inset-0 -z-10 rounded-lg transition peer-focus:ring-4 peer-focus:ring-sky-300/15" />
        <div className="absolute inset-0 -z-10 rounded-lg bg-white/2.5 ring-1 ring-white/15 transition peer-focus:ring-sky-300" />
      </form>
      <small className="mt-2 block italic text-yellow-200/80">
        ¡+32.000 desarrolladores suscritos! 🎉
      </small>
    </div>
  )
}
