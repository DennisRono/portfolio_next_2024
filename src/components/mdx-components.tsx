import Image from 'next/image'
import * as runtime from 'react/jsx-runtime'
import { Callout } from './callout'
import type { Toc } from '@stefanprobst/rehype-extract-toc'
import React from 'react'
import CodeBlockHeader from '@/components/code-block-header'
import "katex/dist/katex.min.css"

const useMDXComponent = (code: string) => {
  const fn = new Function('components', `${code}; return MDXContent`)
  return {
    Component: fn({ ...runtime }).default,
    TableOfContents: fn({ ...runtime }).toc as Toc,
  }
}

const components = {
  Image,
  Callout,
  h1: (props: any) => (
    <h1 className="text-2xl font-bold font-apercu mb-2 scroll-mt-20" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl font-bold font-apercu mb-2 scroll-mt-20" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-bold font-apercu mb-2 scroll-mt-20" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="text-2xl font-bold font-apercu mb-2 scroll-mt-20" {...props} />
  ),
  table: (props: any) => <table className="table-auto w-full" {...props} />,
  th: (props: any) => <th className="px-4 py-2" {...props} />,
  td: (props: any) => <td className="border px-4 py-2" {...props} />,
  br: (props: any) => <br {...props} />,
  p: (props: any) => (
    <p {...props} className="text-black dark:text-white text-[1.1rem] mb-4" />
  ),
  hr: (props: any) => <hr {...props} className="my-4" />,
  ul: (props: any) => (
    <ul {...props} className="ml-4 my-2 text-[1.1rem] list-disc" />
  ),
  ol: (props: any) => (
    <ol {...props} className="ml-4 my-2 text-[1.1rem] list-decimal" />
  ),
  li: (props: any) => <li {...props} className="ml-4 mb-2 text-[1.1rem]" />,
  aside: (props: any) => (
    <aside
      {...props}
      className="p-4 rounded-md bg-amber-100/8 my-4 border-l-4 border-amber-500"
    />
  ),
  pre: ({ children, ...props }: any) => {
    return (
      <div className="relative my-4">
        <CodeBlockHeader>{children?.props?.children}</CodeBlockHeader>
        <pre className='!my-0' {...props}>{children}</pre>
      </div>
    )
  },
  code: ({ children, className, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '')
    return match ? (
      <code className={className} {...props}>
        {children}
      </code>
    ) : (
      <code
        className="bg-[#0a0a0a] px-1.5 py-0.5 rounded-b-[7px] font-mono text-sm border-[#2e2e2e]"
        {...props}
      >
        {children}
      </code>
    )
  },

  a: (props: any) => {
    if (
      props.className === 'subheading-anchor' &&
      props.href?.startsWith('#')
    ) {
      return (
        <a {...props} aria-label={props['aria-label'] || 'Link to section'}>
          {props.children}
        </a>
      )
    }
    return <a {...props}>{props.children}</a>
  },
}

interface MdxProps {
  code: string
}

export function MDXContent({ code }: MdxProps) {
  const { Component } = useMDXComponent(code)
  return <Component components={components} />
}

export function MDXToC({ code }: { code: string }) {
  const { TableOfContents } = useMDXComponent(code)

  return TableOfContents
}
