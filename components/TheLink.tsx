import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  children: ReactNode
  href: string
  className?: string
  [x: string]: any
}

export default function TheLink({ children, href, ...props }: Props) {
  const router = useRouter()
  const isActive: (href: string) => boolean = (href) => router.pathname === href

  const className = twMerge(
    `font-bold ${isActive(href) ? 'text-gray-500' : 'text-black'}`,
    props.className,
  )

  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  )
}
