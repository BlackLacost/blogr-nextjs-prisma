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
  Router.push('/')
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  })
  Router.push('/')
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
      <div className="grid gap-y-2 p-8 bg-white">
        <h2>{title}</h2>
        <p>By {props?.author?.name || 'Unknown author'}</p>
        <ReactMarkdown children={props.content} />
        <div className="flex gap-4">
          {!props.published && userHasValidSession && postBelongsToUser && (
            <TheButton onClick={() => publishPost(props.id)}>Publish</TheButton>
          )}
          {userHasValidSession && postBelongsToUser && (
            <TheButton onClick={() => deletePost(props.id)}>Delete</TheButton>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Post
