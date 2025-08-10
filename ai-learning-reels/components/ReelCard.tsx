"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { usePreferencesStore } from "@/store/preferences"

interface ReelCardProps {
  topic: string
}

export default function ReelCard({ topic }: ReelCardProps) {
  const { theme } = usePreferencesStore()
  const [prompt, setPrompt] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!topic) return
    setLoading(true)
    async function fetchVideo() {
      try {
        const promptRes = await fetch("/api/expand-prompt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic }),
        })
        const { prompt } = await promptRes.json()
        setPrompt(prompt)
        const videoRes = await fetch("/api/generate-video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        })
        const { url } = await videoRes.json()
        setVideoUrl(url)
      } finally {
        setLoading(false)
      }
    }
    fetchVideo()
  }, [topic])

  const poster = `https://placehold.co/300x600?text=${encodeURIComponent(theme)}`

  return (
    <div className="w-full max-w-sm bg-gray-100 rounded-lg p-4">
      {loading ? (
        <div className="aspect-[9/16] w-full mb-2 bg-gray-300 animate-pulse" />
      ) : (
        <video
          className="aspect-[9/16] w-full mb-2"
          controls
          src={videoUrl}
          poster={poster}
        />
      )}
      {loading ? (
        <div className="h-4 w-3/4 mb-2 bg-gray-300 animate-pulse" />
      ) : (
        <p className="mb-2">{prompt}</p>
      )}
      <Button>Read aloud</Button>
    </div>
  )
}
