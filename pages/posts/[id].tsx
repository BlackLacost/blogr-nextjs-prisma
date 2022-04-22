import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import { PostProps } from '../../components/Post'
import TheButton from '../../components/TheButton'
import prisma from '../../lib/prisma'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params
  const post = await prisma.post.findUnique({
    where: { id: String(id) },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  })
  return {
    props: post,
  }
}

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  })
  await Router.push('/')
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Authentication ...</div>
  }

  const userHasValidSession = Boolean(session)
  const postBelongsToUser = session?.user?.email === props.author?.email

  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <div className="p-8 bg-white">
        <h2>{title}</h2>
        <p>By {props?.author?.name || 'Unknown author'}</p>
        <ReactMarkdown children={props.content} />
        {!props.published && userHasValidSession && postBelongsToUser && (
          <TheButton onClick={() => publishPost(props.id)}>Publish</TheButton>
        )}
      </div>
      <style jsx>{`
        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Post
