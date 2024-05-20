import { useEffect, useId } from 'react'
import { useNewsletter, RESULTS } from '@/hooks/useNewsletter'
import { Button } from '@/components/Button'

if (typeof window !== 'undefined') {
  window.CustomSubstackWidget = {
    substackUrl: "midudev.substack.com",
    placeholder: "pepito@gmail.com",
    buttonText: "Suscribirse",
    theme: "custom",
    colors: {
      primary: "#FFFFFF",
      input: "#000000",
      email: "#FFFFFF",
      text: "#000000",
    },
  };
}

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

  useEffect(() => {
    // load asynchronously a script
    const script = document.createElement('script')
    script.src = 'https://substackapi.com/widget.js'
    script.id = id
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div className='mt-4'>
      <div id="custom-substack-embed"></div>
      <small className="block mt-2 italic text-yellow-200/80">
        ¡+33.000 desarrolladores suscritos! 🎉
      </small>
    </div>
  )
}
