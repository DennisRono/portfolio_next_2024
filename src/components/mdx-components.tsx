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
    <h1 className="text-2xl font-bold font-apercu mb-2" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl font-bold font-apercu mb-2" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-bold font-apercu mb-2" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="text-2xl font-bold font-apercu mb-2" {...props} />
  ),
  table: (props: any) => <table className="table-auto w-full" {...props} />,
  th: (props: any) => <th className="px-4 py-2" {...props} />,
  td: (props: any) => <td className="border px-4 py-2" {...props} />,
  br: (props: any) => <br {...props} />,
  p: (props: any) => (
    <p {...props} className="text-black dark:text-white text-[1.2rem]" />
  ),
  hr: (props: any) => <p {...props} className="my-4" />,
  ul: (props: any) => <ul {...props} className="ml-4 my-2 text-[1.2rem]" />,
  ol: (props: any) => <ul {...props} className="ml-4 my-2 text-[1.2rem]" />,
  li: (props: any) => (
    <li {...props} className="ml-4 !list-decimal mb-2 text-[1.2rem]" />
  ),
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
