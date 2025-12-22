import { searchArticles, getAllCategories } from "@/lib/articles"
import { ArticleCard } from "@/components/article-card"
import { CategoryNav } from "@/components/category-nav"
import { SearchBar } from "@/components/search-bar"
import { createClient } from "@/lib/supabase/server"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen } from "lucide-react"

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = q || ""
  const articles = query ? searchArticles(query) : []
  const categories = getAllCategories()
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
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="h-6 w-6" />
            <span>CP Algorithms</span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <UserNav user={user} username={username} />
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <SearchBar />

        <CategoryNav categories={categories} />

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">
            Search Results for "{query}" ({articles.length} {articles.length === 1 ? "result" : "results"})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {articles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
