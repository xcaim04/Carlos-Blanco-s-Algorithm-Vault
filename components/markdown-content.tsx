"use client"

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div
      className="prose prose-neutral dark:prose-invert max-w-none
        prose-headings:font-bold prose-headings:tracking-tight
        prose-h1:text-4xl prose-h1:mb-4
        prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
        prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
        prose-p:text-base prose-p:leading-7 prose-p:mb-4
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-[#2d2d2d] prose-pre:border prose-pre:border-border prose-pre:text-gray-100
        prose-img:rounded-lg prose-img:shadow-md
        prose-table:text-sm
        prose-strong:font-semibold
        prose-ul:my-4 prose-ol:my-4
        prose-li:my-1"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
