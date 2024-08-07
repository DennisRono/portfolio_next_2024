import Image from 'next/image'
import * as runtime from 'react/jsx-runtime'
import { Callout } from './callout'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import CodeCopyBtn from '@/components/codeCopyBtn'
import { cn } from '@/lib/utils'

const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

const components = {
  Image,
  Callout,
  h2: (props: any) => (
    <h2 className="text-xl font-bold font-apercu mb-2" {...props} />
  ),
  table: (props: any) => <table className="table-auto w-full" {...props} />,
  th: (props: any) => <th className="px-4 py-2" {...props} />,
  td: (props: any) => <td className="border px-4 py-2" {...props} />,
  br: (props: any) => <br {...props} />,
  p: (props: any) => <p {...props} className="text-black dark:text-white" />,
  hr: (props: any) => <p {...props} className="my-4" />,
  ul: (props: any) => <ul {...props} className="ml-4 my-2" />,
  ol: (props: any) => <ul {...props} className="ml-4 my-2" />,
  li: (props: any) => <li {...props} className="ml-4 !list-decimal mb-2" />,
  aside: (props: any) => (
    <aside {...props} className="p-2 rounded-md bg-amber-100/8" />
  ),
}

interface MdxProps {
  code: string
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code)
  return <Component components={components} />
}
