"use client"

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div
      className="prose prose-lg prose-neutral dark:prose-invert max-w-none
        prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
        prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12 prose-h1:pb-4 prose-h1:border-b prose-h1:border-border
        prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-5 prose-h2:text-primary
        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:font-semibold
        prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3 prose-h4:font-semibold
        prose-p:text-base prose-p:leading-8 prose-p:mb-6 prose-p:text-foreground/90
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-a:transition-colors
        prose-code:text-sm prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:border prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-slate-900 prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-6 prose-pre:text-gray-100 prose-pre:shadow-lg prose-pre:overflow-x-auto
        prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-muted/30 prose-blockquote:py-4 prose-blockquote:rounded-r-lg
        prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-border
        prose-table:text-sm prose-table:border-collapse prose-table:w-full
        prose-th:bg-muted prose-th:border prose-th:border-border prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold
        prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-3
        prose-strong:font-bold prose-strong:text-foreground
        prose-em:italic prose-em:text-foreground/80
        prose-ul:my-6 prose-ol:my-6
        prose-li:my-2 prose-li:leading-7
        prose-hr:border-border prose-hr:my-12
        [&_pre_code]:bg-transparent [&_pre_code]:border-0 [&_pre_code]:p-0"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
