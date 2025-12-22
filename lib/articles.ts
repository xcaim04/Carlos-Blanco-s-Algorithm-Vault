import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface Article {
  slug: string
  title: string
  description: string
  date: string
  category: string
  author: string
  content: string
  readTime: string
}

export interface ArticleMetadata {
  slug: string
  title: string
  description: string
  date: string
  category: string
  author: string
  readTime: string
}

const articlesDirectory = path.join(process.cwd(), "articles")

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(articlesDirectory)) {
    return []
  }
  return fs.readdirSync(articlesDirectory).filter((file) => file.endsWith(".md"))
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const realSlug = slug.replace(/\.md$/, "")
    const fullPath = path.join(articlesDirectory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug: realSlug,
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      category: data.category || "",
      author: data.author || "",
      content,
      readTime: data.readTime || calculateReadTime(content),
    }
  } catch {
    return null
  }
}

export function getAllArticles(): ArticleMetadata[] {
  const slugs = getArticleSlugs()
  const articles = slugs
    .map((slug) => {
      const article = getArticleBySlug(slug)
      if (!article) return null
      const { content, ...metadata } = article
      return metadata
    })
    .filter((article): article is ArticleMetadata => article !== null)
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))

  return articles
}

export function getArticlesByCategory(category: string): ArticleMetadata[] {
  const allArticles = getAllArticles()
  return allArticles.filter((article) => article.category.toLowerCase() === category.toLowerCase())
}

export function searchArticles(query: string): ArticleMetadata[] {
  const allArticles = getAllArticles()
  const lowerQuery = query.toLowerCase()
  return allArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.description.toLowerCase().includes(lowerQuery) ||
      article.category.toLowerCase().includes(lowerQuery),
  )
}

export function getAllCategories(): string[] {
  const articles = getAllArticles()
  const categories = new Set(articles.map((article) => article.category))
  return Array.from(categories).sort()
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}
