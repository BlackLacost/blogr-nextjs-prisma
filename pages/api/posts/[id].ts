import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function assetHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  switch (method) {
    case 'DELETE':
      const postId = req.query.id as string
      try {
        const result = await prisma.post.delete({
          where: { id: postId },
        })

        res.json(result)
      } catch (err) {
        console.error('Request error', err)
        res.status(500).json({ error: `Error delete post id=${postId}` })
      }
      break

    default:
      res.setHeader('Allow', ['DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
