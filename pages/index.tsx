import { GetServerSideProps } from 'next'
import React from 'react'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = [
    {
      id: '1',
      title: 'Prisma is the perfect ORM for Next.js',
      content:
        '[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!',
      published: false,
      author: {
        name: 'Nikolas Burk',
        email: 'burk@prisma.io',
      },
    },
    {
      id: '2',
      title: 'Prisma is the perfect ORM for Next.js',
      content:
        '[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!',
      published: false,
      author: {
        name: 'Nikolas Burk',
        email: 'burk@prisma.io',
      },
    },
    {
      id: '3',
      title: 'Prisma is the perfect ORM for Next.js',
      content:
        '[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!',
      published: false,
      author: {
        name: 'Nikolas Burk',
        email: 'burk@prisma.io',
      },
    },
    {
      id: '4',
      title: 'Prisma is the perfect ORM for Next.js',
      content:
        '[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!',
      published: false,
      author: {
        name: 'Nikolas Burk',
        email: 'burk@prisma.io',
      },
    },
  ]
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
