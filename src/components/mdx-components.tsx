import Image from 'next/image'
import * as runtime from 'react/jsx-runtime'
import { Callout } from './callout'
import CodeCopyBtn from '@/components/codeCopyBtn'

const useMDXComponent = (code: string) => {
  const fn = new Function('components', `${code}; return MDXContent`)
  return fn({ ...runtime }).default
}

const components = {
  Image,
  Callout,
  h1: (props: any) => (
    <h1 className="text-2xl font-bold font-apercu mb-2" {...props} id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl font-bold font-apercu mb-2" {...props} id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-bold font-apercu mb-2" {...props} id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} />
  ),
  h4: (props: any) => (
    <h4 className="text-2xl font-bold font-apercu mb-2" {...props} id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} />
  ),
  table: (props: any) => <table className="table-auto w-full" {...props} />,
  th: (props: any) => <th className="px-4 py-2" {...props} />,
  td: (props: any) => <td className="border px-4 py-2" {...props} />,
  br: (props: any) => <br {...props} />,
  p: (props: any) => (
    <p {...props} className="text-black dark:text-white text-[1.2rem] mb-4" />
  ),
  hr: (props: any) => <hr {...props} className="my-4" />,
  ul: (props: any) => <ul {...props} className="ml-4 my-2 text-[1.2rem] list-disc" />,
  ol: (props: any) => <ol {...props} className="ml-4 my-2 text-[1.2rem] list-decimal" />,
  li: (props: any) => (
    <li {...props} className="ml-4 mb-2 text-[1.2rem]" />
  ),
  aside: (props: any) => (
    <aside {...props} className="p-4 rounded-md bg-amber-100/8 my-4 border-l-4 border-amber-500" />
  ),
  pre: ({ children, ...props }: any) => {
    return (
      <div className="relative">
        <pre {...props}>{children}</pre>
        <CodeCopyBtn>{children?.props?.children}</CodeCopyBtn>
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
      <code className="bg-muted px-1.5 py-0.5 rounded-sm font-mono text-sm" {...props}>
        {children}
      </code>
    )
  },
}

interface MdxProps {
  code: string
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code)
  return <Component components={components} />
}
