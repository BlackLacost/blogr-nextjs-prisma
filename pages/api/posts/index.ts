import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'

export default async function assetHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const posts = await prisma.post.findMany()
        res.status(200).json(posts)
      } catch (e) {
        console.error('Request error', e)
        res.status(500).json({ error: 'Error fetching posts' })
      }
      break

    case 'POST':
      try {
        const { title, content } = req.body

        const session = await getSession({ req })
        const result = await prisma.post.create({
          data: {
            title: title,
            content: content,
            author: { connect: { email: session?.user?.email } },
          },
        })
        res.json(result)
      } catch (err) {
        console.error('Request error', err)
        res.status(500).json({ error: 'Error create post' })
      }
      break

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
