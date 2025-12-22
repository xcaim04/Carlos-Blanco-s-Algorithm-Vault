import { remark } from "remark"
import html from "remark-html"
import remarkGfm from "remark-gfm"
import type { Pluggable } from "unified"

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm as Pluggable)
    .use(html, { sanitize: false })
    .process(markdown)
  return result.toString()
}
