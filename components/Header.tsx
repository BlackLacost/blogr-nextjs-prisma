import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Header: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

  let right = null

  return (
    <nav className="flex p-8 items-center">
      <div className="left">
        <Link href="/">
          <a
            className={`font-bold ${
              isActive('/') ? 'text-gray-500' : 'text-black'
            }`}
          >
            Feed
          </a>
        </Link>
      </div>
      {right}
    </nav>
  )
}

export default Header
