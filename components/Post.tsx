import Router from 'next/router'
import React from 'react'
import ReactMarkdown from 'react-markdown'

export type PostProps = {
  id: string
  title: string
  author: {
    name: string
    email: string
  } | null
  content: string
  published: boolean
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown author'
  return (
    <article
      className="p-8 rounded-md bg-white duration-100 transition ease-in hover:shadow-md"
      onClick={() => Router.push('/posts/[id]', `/posts/${post.id}`)}
    >
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
    </article>
  )
}

export default Post
