"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trash2, Edit2, X } from "lucide-react"
import Link from "next/link"
import type { User } from "@supabase/supabase-js"

interface Comment {
  id: string
  content: string
  created_at: string
  updated_at: string
  user_id: string
  profiles: {
    username: string
  }[] | null
}

interface CommentsSectionProps {
  articleSlug: string
  user: User | null
}

export function CommentsSection({ articleSlug, user }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingComments, setIsLoadingComments] = useState(true)
  const supabase = createClient()

  const fetchComments = async () => {
    setIsLoadingComments(true)
    const { data, error } = await supabase
      .from("comments")
      .select(
        `
        id,
        content,
        created_at,
        updated_at,
        user_id,
        profiles (
          username
        )
      `,
      )
      .eq("article_slug", articleSlug)
      .order("created_at", { ascending: false })

    if (!error && data) {
      setComments(data as Comment[])
    }
    setIsLoadingComments(false)
  }

  useEffect(() => {
    fetchComments()
  }, [articleSlug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newComment.trim()) return

    setIsLoading(true)
    const { error } = await supabase.from("comments").insert({
      article_slug: articleSlug,
      user_id: user.id,
      content: newComment.trim(),
    })

    if (error) {
      console.error("Error posting comment:", error)
      // TODO: Add toast notification for error
    } else {
      setNewComment("")
      await fetchComments()
    }
    setIsLoading(false)
  }

  const handleDelete = async (commentId: string) => {
    if (!user) return

    const { error } = await supabase.from("comments").delete().eq("id", commentId).eq("user_id", user.id)

    if (!error) {
      await fetchComments()
    }
  }

  const handleEdit = async (commentId: string) => {
    if (!user || !editContent.trim()) return

    const { error } = await supabase
      .from("comments")
      .update({
        content: editContent.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", commentId)
      .eq("user_id", user.id)

    if (!error) {
      setEditingId(null)
      setEditContent("")
      await fetchComments()
    }
  }

  const startEdit = (comment: Comment) => {
    setEditingId(comment.id)
    setEditContent(comment.content)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditContent("")
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

      {user ? (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit}>
              <Textarea
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-4 min-h-[100px]"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !newComment.trim()}>
                {isLoading ? "Posting..." : "Post Comment"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-8">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">Sign in to join the discussion</p>
            <div className="flex items-center justify-center gap-2">
              <Button asChild variant="outline">
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {isLoadingComments ? (
          <div className="text-center py-8 text-muted-foreground">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No comments yet. Be the first to comment!</div>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{comment.profiles?.[0]?.username?.substring(0, 2).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{comment.profiles?.[0]?.username || "Anonymous"}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(comment.created_at).toLocaleDateString()} at{" "}
                        {new Date(comment.created_at).toLocaleTimeString()}
                        {comment.updated_at !== comment.created_at && " (edited)"}
                      </p>
                    </div>
                  </div>
                  {user && user.id === comment.user_id && (
                    <div className="flex items-center gap-2">
                      {editingId !== comment.id && (
                        <>
                          <Button variant="ghost" size="icon" onClick={() => startEdit(comment)}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(comment.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {editingId === comment.id ? (
                  <div>
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="mb-4 min-h-[100px]"
                    />
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={() => handleEdit(comment.id)}>
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelEdit}>
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{comment.content}</p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
