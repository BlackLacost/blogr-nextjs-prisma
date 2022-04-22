import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function assetHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  switch (method) {
    case 'PUT':
      const postId = req.query.id as string
      try {
        const post = await prisma.post.update({
          where: { id: postId },
          data: { published: true },
        })
        res.json(post)
      } catch (err) {
        console.error('Request error', err)
        res.status(500).json({ error: `Error update post ${postId}` })
      }
      break

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
