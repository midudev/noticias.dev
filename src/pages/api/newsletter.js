export default function handler(req, res) {
  // only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email } = req.body

  const data = {
    email,
    referrer_url: 'https://aprendejavascript.dev',
    tags: ['aprendejavascript'],
  }

  return fetch('https://api.buttondown.email/v1/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Token ${API_BUTTONDOWN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) {
      console.error(res)

      return new Response(JSON.stringify({ message: 'ko' }), { status: 400 })
    }

    return new Response(JSON.stringify({ message: 'ok' }), { status: 200 })
  })

  res.status(200).json({ name: 'John Doe' })
}
