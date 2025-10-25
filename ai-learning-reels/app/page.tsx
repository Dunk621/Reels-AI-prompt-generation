"use client"

import { useState } from "react"
import ReelCard from "@/components/ReelCard"
import QuizCard from "@/components/QuizCard"
import { Button } from "@/components/ui/button"
import { usePreferencesStore } from "@/store/preferences"

export default function FeedPage() {
  const [topic, setTopic] = useState("")
  const [submittedTopic, setSubmittedTopic] = useState("")
  const [openSettings, setOpenSettings] = useState(false)
  const {
    theme,
    voice,
    quizFrequency,
    setTheme,
    setVoice,
    setQuizFrequency,
  } = usePreferencesStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittedTopic(topic)
  }

  const reels = Array.from({ length: submittedTopic ? quizFrequency : 0 })

  return (
    <main className="flex flex-col items-center space-y-4 p-4">
      <Button
        className="self-end"
        onClick={() => setOpenSettings(true)}
      >
        Settings
      </Button>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex space-x-2"
      >
        <input
          className="flex-1 border rounded p-2"
          placeholder="Enter a topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button type="submit">Go</Button>
      </form>
      {submittedTopic && (
        <div className="flex flex-col items-center space-y-4">
          {reels.map((_, i) => (
            <ReelCard key={i} topic={submittedTopic} />
          ))}
          <QuizCard topic={submittedTopic} />
        </div>
      )}
      {openSettings && (
        <div className="fixed inset-0 bg-black/50 flex justify-end">
          <div className="h-full w-64 bg-white p-4 space-y-4">
            <Button
              className="mb-4"
              onClick={() => setOpenSettings(false)}
            >
              Close
            </Button>
            <div>
              <label className="block mb-1">Theme</label>
              <select
                className="border p-2 w-full"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="galaxy">Galaxy</option>
                <option value="jungle">Jungle</option>
                <option value="cartoon gorilla">Cartoon Gorilla</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Voice</label>
              <select
                className="border p-2 w-full"
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Quiz frequency</label>
              <input
                type="number"
                min={1}
                className="border p-2 w-full"
                value={quizFrequency}
                onChange={(e) => setQuizFrequency(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
