import { useId } from 'react'
import { useNewsletter, RESULTS } from '@/hooks/useNewsletter'
import { Button } from '@/components/Button'

export function SignUpForm() {
  const { result, register } = useNewsletter()

  let id = useId()

  const handleSubmit = async (event) => {
    event.preventDefault()

    // get email from formData from event
    const formData = new FormData(event.target)
    const email = formData.get('email')
    register({ email })
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
        className="relative flex items-center pr-1 mt-8 isolate"
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
        <div className="absolute inset-0 transition rounded-lg -z-10 peer-focus:ring-4 peer-focus:ring-sky-300/15" />
        <div className="absolute inset-0 -z-10 rounded-lg bg-white/2.5 ring-1 ring-white/15 transition peer-focus:ring-sky-300" />
      </form>
      <small className="block mt-2 italic text-yellow-200/80">
        ¡+32.000 desarrolladores suscritos! 🎉
      </small>
    </div>
  )
}
