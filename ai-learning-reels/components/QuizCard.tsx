"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface Quiz {
  question: string
  choices: string[]
}

interface QuizCardProps {
  topic: string
}

export default function QuizCard({ topic }: QuizCardProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!topic) return
    setLoading(true)
    fetch(`/api/quiz/${encodeURIComponent(topic)}`)
      .then((res) => res.json())
      .then((data) => setQuiz(data))
      .finally(() => setLoading(false))
  }, [topic])

  return (
    <div className="w-full max-w-sm bg-gray-100 rounded-lg p-4">
      {loading ? (
        <>
          <div className="h-4 w-3/4 mb-4 bg-gray-300 animate-pulse" />
          <div className="flex flex-col space-y-2">
            <div className="h-8 bg-gray-300 animate-pulse" />
            <div className="h-8 bg-gray-300 animate-pulse" />
            <div className="h-8 bg-gray-300 animate-pulse" />
          </div>
        </>
      ) : (
        <>
          <p className="mb-4 font-medium">{quiz?.question}</p>
          <div className="flex flex-col space-y-2">
            {quiz?.choices.map((choice, idx) => (
              <Button key={idx} variant="outline">
                {choice}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
