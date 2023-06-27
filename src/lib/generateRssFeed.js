import ReactDOMServer from 'react-dom/server'
import { MDXProvider } from '@mdx-js/react'
import { Feed } from 'feed'
import { mkdir, writeFile } from 'fs/promises'

import { FeedProvider } from '@/components/FeedProvider'
import * as mdxComponents from '@/components/mdx'
import Content from '@/pages/index.mdx'

export async function generateRssFeed() {
  const siteUrl = 'https://noticias.dev'
  const author = {
    name: 'Miguel Ángel Durán',
    email: 'miduga@gmail.com',
  }

  const feed = new Feed({
    title: 'noticias.dev',
    description:
      'Newsletter para programadores y desarrolladores web. 100% gratis. Todos los martes.',
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.png`,
    favicon: `${siteUrl}/favicon.png`,
    copyright: `Las marcas registradas son de sus respectivos dueños.`,
    feedLinks: {
      rss2: `${siteUrl}/rss/feed.xml`,
    },
  })

  const contentHtml = ReactDOMServer.renderToStaticMarkup(
    <FeedProvider>
      <MDXProvider components={mdxComponents}>
        <Content />
      </MDXProvider>
    </FeedProvider>
  )

  let articles = contentHtml.split(/(?<=<\/article>)\s*(?=<article)/)

  for (let article of articles) {
    let meta = JSON.parse(
      article.match(/<script type="text\/metadata">(.*?)<\/script>/)[1]
    )
    let url = `${siteUrl}/#${meta.id}`

    feed.addItem({
      title: meta.title,
      id: url,
      link: url,
      content: article,
      author: [author],
      contributor: [author],
      date: new Date(meta.date),
    })
  }

  await mkdir('./public/rss', { recursive: true })
  await writeFile('./public/rss/feed.xml', feed.rss2(), 'utf8')
}
