import { getAllArticles, getAllCategories, getArticlesByCategory } from "@/lib/articles"
import { ArticleCard } from "@/components/article-card"
import { CategoryNav } from "@/components/category-nav"
import { SearchBar } from "@/components/search-bar"
import { createClient } from "@/lib/supabase/server"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface HomePageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { category } = await searchParams
  const categories = getAllCategories()

  const articles = category ? getArticlesByCategory(category) : getAllArticles()

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
              Carlos Blanco's Algorithm Vault
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

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Competitive Programming Resources</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            Master Algorithms
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Learn essential algorithms and data structures with detailed explanations, implementations, and practice
            problems
          </p>
        </div>

        <SearchBar />

        <CategoryNav categories={categories} />

        {category && (
          <div className="mt-8 mb-4">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 rounded-full bg-primary"></div>
              <h2 className="text-3xl font-bold">{category}</h2>
            </div>
            <p className="text-muted-foreground mt-2">
              {articles.length} {articles.length === 1 ? "article" : "articles"} found
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {articles.map((article, index) => (
            <div
              key={article.slug}
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: "backwards" }}
            >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-lg text-muted-foreground">No articles found in this category</p>
            <Button variant="link" asChild className="mt-4">
              <Link href="/">View all articles</Link>
            </Button>
          </div>
        )}
      </main>

      <footer className="border-t mt-20 bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <span className="font-semibold">Carlos Blanco's Algorithm Vault</span>
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
