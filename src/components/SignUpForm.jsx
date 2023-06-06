import { useId } from 'react'

import { Button } from '@/components/Button'

export function SignUpForm() {
  let id = useId()

  return (
    <div>
      <form className="relative isolate mt-8 flex items-center pr-1">
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
        <Button type="submit" arrow>
          ¡Me apunto!
        </Button>
        <div className="absolute inset-0 -z-10 rounded-lg transition peer-focus:ring-4 peer-focus:ring-sky-300/15" />
        <div className="absolute inset-0 -z-10 rounded-lg bg-white/2.5 ring-1 ring-white/15 transition peer-focus:ring-sky-300" />
      </form>
      <small class="mt-2 block italic text-yellow-200/80">
        Más de 20.000 desarrolladores ya están suscritos.
      </small>
    </div>
  )
}
