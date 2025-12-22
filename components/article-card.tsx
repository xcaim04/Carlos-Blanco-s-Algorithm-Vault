import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ArrowRight } from "lucide-react"
import type { ArticleMetadata } from "@/lib/articles"

interface ArticleCardProps {
  article: ArticleMetadata
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`} className="group h-full block">
      <Card className="h-full hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group-hover:border-primary/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Badge
              variant="secondary"
              className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            >
              {article.category}
            </Badge>
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors leading-tight">
            {article.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 leading-relaxed">{article.description}</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{article.readTime}</span>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
