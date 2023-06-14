import { useEffect, useId, useState } from 'react'

import { Button } from '@/components/Button'

export function SignUpForm() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  let id = useId()

  const handleSubmit = async (event) => {
    event.preventDefault()

    // get email from formData from event
    const formData = new FormData(event.target)
    const email = formData.get('email')

    setLoading(true)
    setResult(null)
    setError(null)

    const response = await fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
    })

    response.ok ? setResult(true) : setError(true)

    setLoading(false)
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
        <Button disabled={loading} type="submit" arrow>
          {loading ? 'Cargando...' : '¡Me apunto!'}
        </Button>
        <div className="absolute inset-0 -z-10 rounded-lg transition peer-focus:ring-4 peer-focus:ring-sky-300/15" />
        <div className="absolute inset-0 -z-10 rounded-lg bg-white/2.5 ring-1 ring-white/15 transition peer-focus:ring-sky-300" />
      </form>
      <small className="mt-2 block italic text-yellow-200/80">
        ¡+20.000 desarrolladores suscritos! 🎉
      </small>
    </div>
  )
}
