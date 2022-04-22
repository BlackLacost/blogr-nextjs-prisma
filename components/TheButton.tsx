import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  type?: 'button' | 'submit'
  children: ReactNode
  href?: string
  className?: string
  [x: string]: any
}

export default function TheButton({
  children,
  href,
  className,
  type,
  ...props
}: Props) {
  const router = useRouter()
  const isActive: (href: string) => boolean = (href) => router.pathname === href

  const mergedClassName = twMerge(
    `inline-block px-4 py-1 hover:no-underline border-black border-2 rounded-sm
		font-bold ${isActive(href) ? 'text-gray-500' : 'text-black'}`,
    props.className,
  )

  if (href) {
    return (
      <Link href={href}>
        <a className={mergedClassName} {...props}>
          {children}
        </a>
      </Link>
    )
  }

  return (
    <button type={type} className={mergedClassName} {...props}>
      {children}
    </button>
  )
}
