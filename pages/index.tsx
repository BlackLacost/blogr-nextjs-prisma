import { GetServerSideProps } from 'next'
import React from 'react'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
import prisma from '../lib/prisma'

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  })
  return { props: { feed } }
}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="grid grid-cols-2 gap-8">
        <h1 className="col-span-full">Public Feed</h1>
        {props.feed.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </Layout>
  )
}

export default Blog
