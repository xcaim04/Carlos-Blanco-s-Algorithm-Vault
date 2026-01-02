import { notFound } from "next/navigation"
import { getArticleBySlug, getAllArticles } from "@/lib/articles"
import { markdownToHtml } from "@/lib/markdown"
import { MarkdownContent } from "@/components/markdown-content"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CommentsSection } from "@/components/comments-section"
import { createClient } from "@/lib/supabase/server"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: article.title,
    description: article.description,
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const htmlContent = await markdownToHtml(article.content)
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let username: string | undefined
  if (user) {
    const { data: profile } = await supabase.from("profiles").select("username").eq("id", user.id).single()
    username = profile?.username
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              CP Algorithms
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <UserNav user={user} username={username} />
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild className="shadow-lg shadow-primary/20">
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-8 group">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </Link>
        </Button>

        <article className="bg-card/50 backdrop-blur rounded-2xl border shadow-xl p-8 md:p-12 lg:p-16">
          <header className="mb-12">
            <Badge className="mb-6 shadow-sm text-sm px-3 py-1">{article.category}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight text-balance">
              {article.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed text-pretty max-w-4xl">
              {article.description}
            </p>

            <div className="flex flex-wrap items-center gap-8 text-sm text-muted-foreground bg-muted/30 rounded-xl p-6 border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{article.author}</p>
                  <p className="text-xs">Author</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p className="text-xs">Published</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{article.readTime}</p>
                  <p className="text-xs">Read time</p>
                </div>
              </div>
            </div>
          </header>

          <Separator className="mb-12" />

          <div className="article-content">
            <MarkdownContent content={htmlContent} />
          </div>
        </article>

        <Separator className="my-16" />

        <CommentsSection articleSlug={slug} user={user} />
      </div>

      <footer className="border-t mt-20 bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <span className="font-semibold">CP Algorithms</span>
            </div>

            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} CP Algorithms. All rights reserved.
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/about" className="hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
