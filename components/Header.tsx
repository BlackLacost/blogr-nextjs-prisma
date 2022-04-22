import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import TheButton from './TheButton'
import TheLink from './TheLink'

const Header: React.FC = () => {
  const { data: session, status } = useSession()

  let left = <TheLink href="/">Feed</TheLink>

  let right = null

  switch (status) {
    case 'loading': {
      right = <p>Validating session ...</p>
      break
    }

    case 'unauthenticated': {
      right = <TheButton href="/api/auth/signin">Log in</TheButton>
      break
    }

    case 'authenticated': {
      left = (
        <>
          <TheLink href="/">Feed</TheLink>
          <TheLink href="/drafts" className="ml-2">
            My drafts
          </TheLink>
        </>
      )
      right = (
        <>
          <p>
            {session.user.name} ({session.user.email})
          </p>
          <TheButton href="/create">New post</TheButton>
          <TheButton className="ml-2" onClick={() => signOut()}>
            Log out
          </TheButton>
        </>
      )
      break
    }
  }

  return (
    <nav className="flex p-8 items-center justify-between">
      <div>{left}</div>
      <div className="flex items-center gap-2">{right}</div>
    </nav>
  )
}

export default Header
