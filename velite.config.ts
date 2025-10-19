import { defineConfig, defineCollection, s } from 'velite'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeToc from '@stefanprobst/rehype-extract-toc'
import rehypeTocExtract from '@stefanprobst/rehype-extract-toc/mdx'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split('/').slice(1).join('/'),
})

const fileExtensions = [
  'pdf',
  'docx',
  'doc',
  'txt',
  'md',
  'rtf',
  'csv',
  'xlsx',
  'xls',
  'ods',
  'pptx',
  'ppt',
  'odp',
  'html',
  'json',
  'xml',
  'yaml',
  'yml',
  'jpg',
  'jpeg',
  'png',
  'gif',
  'svg',
  'webp',
  'zip',
  'rar',
  'tar',
  '7z',
  'mp3',
  'wav',
  'mp4',
  'mov',
  'avi',
] as const

type FileExtension = (typeof fileExtensions)[number]

export interface DocType {
  type: FileExtension
  path: string
  file_name: string
}

const posts = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.mdx',
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      image: s.string().optional(),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      tags: s.array(s.string()).optional(),
      files: s.array(s.string()).optional().default([]),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...computedFields(data),
      files: data.files.map((path) => {
        const match = path.match(/([^/\\]+)\.([^.]+)$/)
        const file_name = (match ? match[1] : path).replace(/[^a-zA-Z0-9\s.-]/g, '').replace(/[_-]+/g, ' ').trim()
        const ext = match ? match[2].toLowerCase() : 'unknown'

        return {
          type: fileExtensions.includes(ext as FileExtension)
            ? (ext as FileExtension)
            : ('unknown' as any),
          path: '/docs/blog/' + path,
          file_name,
        } as DocType
      }),
    })),
})

const my_projects = defineCollection({
  name: 'Project',
  pattern: 'projects/**/*.mdx',
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99).optional(),
      description: s.string().max(999).optional(),
      date: s.isodate().optional(),
      published: s.boolean().default(true),
      body: s.mdx(),
    })
    .transform(computedFields),
})

export default defineConfig({
  root: 'src/content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts, my_projects },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          defaultLang: 'typescript',
          theme: {
            dark: 'one-dark-pro',
            light: 'github-light',
          },
          grid: true,
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['subheading-anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
      rehypeToc,
      [rehypeTocExtract, { name: 'toc' }],
      rehypeKatex,
    ],
    remarkPlugins: [remarkMath],
  },
})
