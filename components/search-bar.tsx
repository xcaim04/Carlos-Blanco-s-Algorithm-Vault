"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")

  useEffect(() => {
    setQuery(searchParams.get("q") || "")
  }, [searchParams])

  const handleSearch = (value: string) => {
    setQuery(value)
    if (value) {
      router.push(`/search?q=${encodeURIComponent(value)}`)
    } else {
      router.push("/")
    }
  }

  return (
    <div className="relative max-w-2xl mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search articles by title, description, or category..."
        className="pl-10"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  )
}
