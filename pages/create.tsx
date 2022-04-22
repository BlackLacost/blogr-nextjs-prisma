import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Layout from '../components/Layout'
import TheButton from '../components/TheButton'

const Draft: React.FC = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, content }
      await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await router.push('/drafts')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            className="w-full p-2 my-2 rounded-sm border-2 border-black/20"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            className="w-full p-2 my-2 rounded-sm border-2 border-black/20"
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <div className="flex gap-2">
            <TheButton disabled={!content || !title} type="submit">
              Create
            </TheButton>
            <TheButton href="/">or Cancel</TheButton>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Draft
