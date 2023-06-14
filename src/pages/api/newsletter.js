export default async function handler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email } = req.body

  const data = {
    email,
    referrer_url: 'https://noticias.dev',
  }

  // try to get the email before trying to subscribe
  const responseCheckAlreadyExist = await fetch(
    `https://api.buttondown.email/v1/subscribers/${email}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Token ${process.env.API_BUTTONDOWN}`,
        'Content-Type': 'application/json',
      },
    }
  )

  const willBeNew = responseCheckAlreadyExist.status === 404

  if (!willBeNew) return res.status(409).json({ message: 'Already subscribed' })

  return fetch('https://api.buttondown.email/v1/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.API_BUTTONDOWN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      console.error(response)

      return res.status(400).json({ message: 'ko' })
    }

    return res.json({
      message: `ok`,
    })
  })
}
