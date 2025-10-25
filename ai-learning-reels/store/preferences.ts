"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface PreferencesState {
  theme: string
  voice: string
  quizFrequency: number
  setTheme: (theme: string) => void
  setVoice: (voice: string) => void
  setQuizFrequency: (quizFrequency: number) => void
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: "galaxy",
      voice: "default",
      quizFrequency: 4,
      setTheme: (theme) => set({ theme }),
      setVoice: (voice) => set({ voice }),
      setQuizFrequency: (quizFrequency) => set({ quizFrequency }),
    }),
    { name: "preferences" }
  )
)
