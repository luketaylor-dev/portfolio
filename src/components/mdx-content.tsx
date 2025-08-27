'use client'
import * as React from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'

export function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code)
  return (
    <div className="prose">
      <Component />
    </div>
  )
}
