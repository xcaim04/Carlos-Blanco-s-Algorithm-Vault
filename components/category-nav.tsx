"use client"

import { Badge } from "@/components/ui/badge"
import { useRouter, useSearchParams } from "next/navigation"

interface CategoryNavProps {
  categories: string[]
}

export function CategoryNav({ categories }: CategoryNavProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get("category")

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      router.push("/")
    } else {
      router.push(`/?category=${encodeURIComponent(category)}`)
    }
  }

  const handleAllClick = () => {
    router.push("/")
  }

  return (
    <div className="flex flex-wrap gap-2 mt-6">
      <Badge variant={!selectedCategory ? "default" : "outline"} className="cursor-pointer" onClick={handleAllClick}>
        All
      </Badge>
      {categories.map((category) => (
        <Badge
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  )
}
